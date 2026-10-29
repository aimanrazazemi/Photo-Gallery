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
    ? `<span>${esc(heading.slice(0, split))}</span><span class="script">${esc(heading.slice(split + 1))}</span>`
    : esc(heading);
  document.getElementById("intro-by").textContent = SITE.author ? `by ${SITE.author}` : "";
  document.getElementById("intro-tagline").textContent = SITE.tagline;
  const foot = document.getElementById("foot-author");
  foot.innerHTML = `© ${new Date().getFullYear()} ${esc(SITE.author)}` +
    (SITE.instagram ? ` · <a href="${esc(SITE.instagram)}" target="_blank" rel="noopener">Instagram</a>` : "");

  const categories = [...new Set(photos.map((p) => p.category).filter(Boolean))];

  /* ---------- Grid bubbles on the divider: A1, B2, C3 ... one per column line ---------- */
  const divider = document.getElementById("divider");
  const drawBubbles = () => {
    const cols = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--cols")) || 12;
    if (divider.dataset.cols === String(cols)) return;
    divider.dataset.cols = cols;
    const tag = (i) => `${String.fromCharCode(65 + i)}${i + 1}`;
    divider.innerHTML = Array.from({ length: cols }, (_, i) => `<div class="bubble"><span>${tag(i)}</span></div>`).join("") +
      `<div class="bubble-end">${tag(cols)}</div>`;
  };
  drawBubbles();
  window.addEventListener("resize", drawBubbles);

  /* ---------- Filters ---------- */
  const renderFilters = (active) => {
    const items = [["all", "All", photos.length], ...categories.map((c) => [slug(c), c, photos.filter((p) => p.category === c).length])];
    filtersEl.innerHTML = items.map(([id, label, n]) =>
      `<button class="filter" type="button" data-cat="${id}" aria-pressed="${id === active}">${esc(label)}<sup>${n}</sup></button>`
    ).join("");
  };
  filtersEl.addEventListener("click", (e) => {
    const b = e.target.closest(".filter");
    if (!b) return;
    location.hash = b.dataset.cat === "all" ? "" : b.dataset.cat;
    if (b.dataset.cat === "all") route();
  });

  /* ---------- Measure each photo once, so the layout knows its shape ---------- */
  const measure = (p) => new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve({ ...p, w: img.naturalWidth, h: img.naturalHeight });
    img.onerror = () => resolve({ ...p, w: 4, h: 3 });
    img.src = p.file;
  });
  // Justified collage: photos are packed edge to edge in rows that alternate between tall and short,
  // so each group forms a solid block without cropping anyone's photo.
  const ROW_HEIGHTS = { wide: [0.40, 0.24, 0.31], narrow: [0.62, 0.42] };

  const pack = (collage) => {
    const shots = collage._shots || (collage._shots = [...collage.querySelectorAll(".shot")]);
    const W = collage.clientWidth;
    if (!W) return;
    const g = parseFloat(getComputedStyle(collage).rowGap) || 0;
    const pattern = W < 600 ? ROW_HEIGHTS.narrow : ROW_HEIGHTS.wide;
    const rows = [];
    let cur = [], sum = 0;
    const height = (items, total) => (W - g * (items.length - 1)) / total;
    const maxRow = Math.max(240, Math.min(W * (W < 600 ? 1 : 0.6), window.innerHeight * 0.9));

    shots.forEach((el) => {
      const ar = +el.dataset.ar;
      const target = Math.max(140, W * pattern[rows.length % pattern.length]);
      // Close the row early if adding this photo would squeeze it further from the target height.
      if (cur.length) {
        const without = height(cur, sum), withIt = height([...cur, el], sum + ar);
        if (without <= target * 1.35 && Math.abs(without - target) < Math.abs(withIt - target)) {
          rows.push({ items: cur, sum });
          cur = []; sum = 0;
        }
      }
      cur.push(el);
      sum += ar;
      if (height(cur, sum) <= target) {
        rows.push({ items: cur, sum });
        cur = []; sum = 0;
      }
    });
    if (cur.length) {
      // A short leftover row would be stretched too tall, so share the photos of the
      // last row and the leftovers between two rows of as-close-as-possible height.
      const target = Math.max(140, W * pattern[rows.length % pattern.length]);
      const last = rows[rows.length - 1];
      if (last && height(cur, sum) > target * 1.5) {
        const all = [...last.items, ...cur];
        const ars = all.map((el) => +el.dataset.ar);
        let best = null;
        for (let k = 1; k < all.length; k++) {
          const s1 = ars.slice(0, k).reduce((a, b) => a + b, 0), s2 = sum + last.sum - s1;
          const diff = Math.abs(height(all.slice(0, k), s1) - height(all.slice(k), s2));
          if (!best || diff < best.diff) best = { k, s1, s2, diff };
        }
        rows.splice(-1, 1,
          { items: all.slice(0, best.k), sum: best.s1 },
          { items: all.slice(best.k), sum: best.s2 });
      }
      else rows.push({ items: cur, sum });
    }

    collage.replaceChildren(...rows.map(({ items, sum }) => {
      const row = document.createElement("div");
      row.className = "crow";
      // Cap the height so a short group (say, two portraits) doesn't stretch into giant tiles;
      // a capped row keeps its natural width and sits on the left.
      const h = Math.min(height(items, sum), maxRow);
      row.style.height = `${h.toFixed(2)}px`;
      if (h < height(items, sum)) row.style.width = `${(sum * h + g * (items.length - 1)).toFixed(2)}px`;
      row.append(...items);
      return row;
    }));
  };

  const packAll = () => gallery.querySelectorAll(".collage").forEach(pack);
  let lastWidth = 0;
  new ResizeObserver(() => {
    if (gallery.clientWidth !== lastWidth) { lastWidth = gallery.clientWidth; packAll(); }
  }).observe(gallery);

  const exifRow = (label, v) => v ? `<div><dt>${label}</dt><dd>${esc(v)}</dd></div>` : "";
  const shotHTML = (p, idx, n) => {
    const line = [p.focal, p.aperture, p.shutter, p.iso && `ISO ${p.iso}`].filter(Boolean).join(" · ");
    const exif = exifRow("Camera", p.camera) + exifRow("Lens", p.lens) + exifRow("Focal", p.focal) +
      exifRow("Aperture", p.aperture) + exifRow("Shutter", p.shutter) + exifRow("ISO", p.iso);
    return `
    <figure class="shot" style="--ar:${(p.w / p.h).toFixed(4)}" data-ar="${p.w / p.h}" data-i="${idx}">
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
    gallery.innerHTML = groups.map((c) => {
      const items = list.filter((p) => p.category === c);
      if (!items.length) return "";
      return `<section class="group" id="group-${slug(c)}">
        <div class="group-head">
          <h2 class="group-title">${esc(c)}</h2>
          <p class="group-meta">${String(items.length).padStart(2, "0")} ${items.length === 1 ? "photo" : "photos"}${yearSpan(items) ? " · " + yearSpan(items) : ""}</p>
        </div>
        <div class="collage">${items.map((p, j) => shotHTML(p, ++idx, j + 1)).join("")}</div>
      </section>`;
    }).join("");
    counterTotal.textContent = String(list.length).padStart(2, "0");
    counterNow.textContent = "01";
    packAll();
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
