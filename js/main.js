(() => {
  const gallery = document.getElementById("gallery");
  const filtersEl = document.getElementById("filters");
  const counterNow = document.getElementById("counter-now");
  const counterTotal = document.getElementById("counter-total");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const touch = window.matchMedia("(hover: none)").matches;

  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const pad = (n) => String(n).padStart(2, "0");
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const fmtDate = (d) => {
    if (!d) return "";
    const [y, m] = d.split("-");
    return m ? `${MONTHS[+m - 1]} ${y}` : y;
  };
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // Number photos from the oldest (bottom of the list) so a photo keeps its number as new ones are added on top.
  const photos = PHOTOS.map((p, i) => ({ ...(SITE.defaults || {}), ...p, no: PHOTOS.length - i }));

  /* ---------- Site text ---------- */
  const heading = SITE.title || SITE.name;
  document.title = heading === SITE.name ? SITE.name : `${heading} · ${SITE.name}`;
  document.getElementById("brand").textContent = SITE.name;
  // The heading is set on two lines; the last word goes on the second line in a calligraphy script.
  const split = heading.lastIndexOf(" ");
  document.getElementById("intro-title").innerHTML = split > 0
    ? `<span class="after" data-echo="${esc(heading.slice(0, split))}">${esc(heading.slice(0, split))}</span><span class="script" data-echo="${esc(heading.slice(split + 1))}">${esc(heading.slice(split + 1))}</span>`
    : esc(heading);
  // The author's name inside the byline is set as a signature
  const byline = SITE.byline || (SITE.author ? `by ${SITE.author}` : "");
  const at = SITE.author ? byline.lastIndexOf(SITE.author) : -1;
  document.getElementById("intro-by").innerHTML = at >= 0
    ? `${esc(byline.slice(0, at))}<img class="sig" src="images/signature.webp" alt="${esc(SITE.author)}" width="1400" height="392">${esc(byline.slice(at + SITE.author.length))}`
    : esc(byline);
  document.getElementById("intro-tagline").textContent = SITE.tagline;
  const foot = document.getElementById("foot-author");
  foot.innerHTML = `© ${new Date().getFullYear()} ${esc(SITE.author)}` +
    (SITE.instagram ? ` · <a href="${esc(SITE.instagram)}" target="_blank" rel="noopener">Instagram</a>` : "");

  const categories = [...new Set(photos.map((p) => p.category).filter(Boolean))];

  // Plan-style grid tags: A1, B2, C3 ... used on the menu and on each category heading
  const gridTag = (i) => `${String.fromCharCode(65 + i)}${i + 1}`;

  /* ---------- Filters ---------- */
  const renderFilters = (active) => {
    // One tag per category. Clicking the selected tag again shows every photo.
    const items = categories.map((c) => [slug(c), c, photos.filter((p) => p.category === c).length]);
    filtersEl.innerHTML = items.map(([id, label, n], i) =>
      `<button class="filter" type="button" data-cat="${id}" aria-pressed="${id === active}"><span class="tag">${gridTag(i)}</span><span class="name">${esc(label)}</span><span class="n">${n}</span></button>`
    ).join("");
  };
  document.getElementById("shuffle").addEventListener("click", () => {
    seed = (seed * 1103515245 + 12345) >>> 0;
    gallery.classList.remove("shuffled"); void gallery.offsetWidth; gallery.classList.add("shuffled");
    route();
  });
  filtersEl.addEventListener("click", (e) => {
    const b = e.target.closest(".filter");
    if (!b) return;
    const showAll = b.getAttribute("aria-pressed") === "true";
    if (showAll) { history.replaceState(null, "", location.pathname + location.search); route(); }
    else location.hash = b.dataset.cat;
  });

  /* ---------- Measure each photo once, so the layout knows its shape ---------- */
  const measure = (p) => new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ ...p, w: img.naturalWidth, h: img.naturalHeight });
    img.onerror = () => resolve({ ...p, w: 4, h: 3 });
    img.src = p.file;
  });
  // Mosaic: every photo gets one of four tile sizes (S, M, L, XL), picked at random but suited to
  // its shape. Tiles are measured in square cells on a 12-column grid (6 on phones) and packed densely.
  const shape = (p) => { const r = p.w / p.h; return r > 1.15 ? "land" : r < .87 ? "port" : "square"; };
  const SIZES = {            // [columns, rows] on desktop, then on phones
    port:   { S: [2, 3, 2, 3], M: [3, 4, 3, 4], L: [4, 6, 3, 5], XL: [5, 7, 4, 6] },
    land:   { S: [3, 2, 3, 2], M: [4, 3, 4, 3], L: [6, 4, 6, 4], XL: [8, 5, 6, 4] },
    square: { S: [3, 3, 2, 2], M: [4, 4, 3, 3], L: [5, 5, 4, 4], XL: [6, 6, 6, 6] },
  };
  const WEIGHTS = [["S", .3], ["M", .35], ["L", .22], ["XL", .13]];
  let seed = 20261102;
  const rng = (s) => () => { s |= 0; s = s + 0x6D2B79F5 | 0; let t = Math.imul(s ^ s >>> 15, 1 | s); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  // Place tiles first-fit on the grid, then let tiles grow right/down/left/up into any empty cells,
  // so every group ends up as a solid block with no holes.
  const packGrid = (tiles, cols) => {
    const grid = [];   // grid[row][col] = tile index, or undefined
    const free = (r, c) => c >= 0 && c < cols && r >= 0 && (grid[r] === undefined || grid[r][c] === undefined);
    const fits = (r, c, h, w) => { for (let y = r; y < r + h; y++) for (let x = c; x < c + w; x++) if (!free(y, x)) return false; return true; };
    const mark = (t, i) => { for (let y = t.r; y < t.r + t.h; y++) { grid[y] = grid[y] || []; for (let x = t.c; x < t.c + t.w; x++) grid[y][x] = i; } };
    tiles.forEach((t, i) => {
      t.w = Math.min(t.w, cols);
      for (let r = 0; ; r++) {
        let placed = false;
        for (let c = 0; c + t.w <= cols; c++) if (fits(r, c, t.h, t.w)) { t.r = r; t.c = c; placed = true; break; }
        if (placed) break;
      }
      mark(t, i);
    });
    const bottom = Math.max(...tiles.map((t) => t.r + t.h));
    const empty = (r, c) => r < bottom && c >= 0 && c < cols && r >= 0 && free(r, c);
    let grew = true;
    while (grew) {
      grew = false;
      tiles.forEach((t, i) => {
        const colFree = (x) => { for (let y = t.r; y < t.r + t.h; y++) if (!empty(y, x)) return false; return true; };
        const rowFree = (y) => { for (let x = t.c; x < t.c + t.w; x++) if (!empty(y, x)) return false; return true; };
        if (colFree(t.c + t.w)) { t.w++; grew = true; }
        else if (rowFree(t.r + t.h)) { t.h++; grew = true; }
        else if (colFree(t.c - 1)) { t.c--; t.w++; grew = true; }
        else if (rowFree(t.r - 1)) { t.r--; t.h++; grew = true; }
        mark(t, i);
      });
    }
    return tiles;
  };
  // Deal sizes for a group; try a few deals and keep the first that packs with no holes (or the best one).
  const bestDeal = (items, cols, rand) => {
    let best = null;
    for (let attempt = 0; attempt < 80; attempt++) {
      const tiles = packGrid(items.map((p, j) => {
        const size = pickSize(rand, j === 0), s = SIZES[shape(p)][size], phone = cols < 12;
        return { p, size, w: phone ? s[2] : s[0], h: phone ? s[3] : s[1] };
      }), cols);
      const bottom = Math.max(...tiles.map((t) => t.r + t.h));
      const holes = cols * bottom - tiles.reduce((a, t) => a + t.w * t.h, 0);
      // how far tiles were stretched from each photo's real shape (crop), plus any tile wider than 2/3 of the row
      const stretch = tiles.reduce((a, t) => a + Math.abs(Math.log((t.w / t.h) / (t.p.w / t.p.h))) + (t.w > cols * .67 ? 2 : 0), 0);
      const score = holes * 100 + stretch;
      if (!best || score < best.score) best = { tiles, score };
    }
    return best.tiles;
  };
  const pickSize = (rand, first) => {
    if (first) return rand() < .5 ? "L" : "XL";      // each group opens on a big one
    let x = rand();
    for (const [k, w] of WEIGHTS) { if ((x -= w) < 0) return k; }
    return "M";
  };

  const exifRow = (label, v) => v ? `<div><dt>${label}</dt><dd>${esc(v)}</dd></div>` : "";
  const shotHTML = (p, idx, n, t) => {
    const line = [p.focal, p.aperture, p.shutter, p.iso && `ISO ${p.iso}`].filter(Boolean).join(" · ");
    const exif = exifRow("Camera", p.camera) + exifRow("Lens", p.lens) + exifRow("Focal", p.focal) +
      exifRow("Aperture", p.aperture) + exifRow("Shutter", p.shutter) + exifRow("ISO", p.iso);
    return `
    <figure class="shot size-${t.size.toLowerCase()}" style="grid-area:${t.r + 1} / ${t.c + 1} / span ${t.h} / span ${t.w};--d:${(idx % 12) * 45}" data-i="${idx}">
      <div class="frame" tabindex="0" aria-label="${esc(p.title)}, show details">
        <img src="${esc(p.file)}" alt="${esc(p.title)}${p.location ? ", " + esc(p.location) : ""}" decoding="async">
        <figcaption class="details">
          <span class="d-no">${pad(n)}</span>
          <span class="d-cat">${esc(p.category || "")}</span>
          <h3 class="d-title">${esc(p.title)}</h3>
          ${p.location || p.date ? `<span class="d-place">${[p.location, fmtDate(p.date)].filter(Boolean).map(esc).join(" · ")}</span>` : ""}
          ${line || p.camera ? `<span class="d-line">${esc([p.camera, line].filter(Boolean).join(" — "))}</span>` : ""}
          ${exif ? `<dl class="d-exif">${exif}</dl>` : ""}
          ${p.note ? `<p class="d-note">${esc(p.note)}</p>` : ""}
        </figcaption>
      </div>
    </figure>`;
  };

  const yearSpan = (list) => {
    const ys = list.map((p) => parseInt(p.date)).filter(Boolean);
    if (!ys.length) return "";
    const a = Math.min(...ys), b = Math.max(...ys);
    return a === b ? `${a}` : `${a}–${b}`;
  };

  /* ---------- Render ---------- */
  const currentCols = () => parseInt(getComputedStyle(document.documentElement).getPropertyValue("--cols")) || 12;
  let renderedCols = 0;
  window.addEventListener("resize", () => { if (currentCols() !== renderedCols && measured.length) route(); });
  let measured = [];
  let revealObs, countObs;

  const render = (cat) => {
    const list = cat === "all" ? measured : measured.filter((p) => slug(p.category || "") === cat);
    if (!list.length) {
      gallery.innerHTML = `<p class="empty">No photos in this category yet.</p>`;
      counterTotal.textContent = "00";
      return;
    }
    const groups = cat === "all" ? categories : categories.filter((c) => slug(c) === cat);
    let idx = 0;
    const rand = rng(seed);
    const cols = currentCols();
    renderedCols = cols;
    gallery.innerHTML = groups.map((c) => {
      const items = list.filter((p) => p.category === c);
      if (!items.length) return "";
      return `<section class="group" id="group-${slug(c)}">
        <div class="group-head">
          <h2 class="group-title"><span class="tag">${gridTag(categories.indexOf(c))}</span>${esc(c)}</h2>
          <p class="group-meta">${String(items.length).padStart(2, "0")} ${items.length === 1 ? "photo" : "photos"}${yearSpan(items) ? " · " + yearSpan(items) : ""}</p>
        </div>
        <div class="collage-wrap"><div class="collage">${bestDeal(items, cols, rand).map((t, j) => shotHTML(t.p, ++idx, j + 1, t)).join("")}</div></div>
      </section>`;
    }).join("");
    counterTotal.textContent = String(list.length).padStart(2, "0");
    counterNow.textContent = "01";
    observe();
  };

  /* ---------- Scroll: reveal and counter ---------- */
  const observe = () => {
    revealObs?.disconnect();
    countObs?.disconnect();
    const shots = [...gallery.querySelectorAll(".shot")];

    if (!reduceMotion && "IntersectionObserver" in window) {
      revealObs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.replace("pending", "shown");
            revealObs.unobserve(e.target);
          }
        });
      }, { rootMargin: "0px 0px -8% 0px" });
      shots.forEach((s) => {
        // Only photos that start below the fold animate in; everything on screen is shown immediately.
        if (s.getBoundingClientRect().top > window.innerHeight) {
          s.classList.add("pending");
          s.style.setProperty("--delay", `${(+s.dataset.i % 4) * 70}ms`);
          revealObs.observe(s);
        }
      });
    }

    if ("IntersectionObserver" in window) {
      countObs = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) counterNow.textContent = String(e.target.dataset.i).padStart(2, "0");
        });
      }, { rootMargin: "-50% 0px -50% 0px" });
      shots.forEach((s) => countObs.observe(s));
    }
  };

  /* ---------- Touch: tap a photo to show or hide its details ---------- */
  gallery.addEventListener("click", (e) => {
    const shot = e.target.closest(".shot");
    if (!shot || !touch) return;
    const wasOpen = shot.classList.contains("open");
    gallery.querySelectorAll(".shot.open").forEach((s) => s.classList.remove("open"));
    if (!wasOpen) shot.classList.add("open");
  });
  gallery.addEventListener("keydown", (e) => {
    if (e.key === "Escape") document.activeElement?.blur();
  });

  /* ---------- Routing by #category ---------- */
  const route = () => {
    const h = location.hash.slice(1);
    const cat = categories.some((c) => slug(c) === h) ? h : "all";
    renderFilters(cat);
    if (measured.length) render(cat);
  };
  window.addEventListener("hashchange", () => {
    route();
    document.getElementById("divider").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  });

  route();
  Promise.all(photos.map(measure)).then((m) => { measured = m; route(); });
})();
