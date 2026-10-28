(() => {
  const gallery = document.getElementById("gallery");
  const filtersEl = document.getElementById("filters");
  const axis = document.getElementById("axis");
  const counterNow = document.getElementById("counter-now");
  const counterTotal = document.getElementById("counter-total");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const touch = window.matchMedia("(hover: none)").matches;

  const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  const pad = (n) => String(n).padStart(3, "0");
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const fmtDate = (d) => {
    if (!d) return "";
    const [y, m] = d.split("-");
    return m ? `${MONTHS[+m - 1]} ${y}` : y;
  };
  const esc = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // Number photos from the oldest (bottom of the list) so a photo keeps its number as new ones are added on top.
  const photos = PHOTOS.map((p, i) => ({ ...p, no: PHOTOS.length - i }));

  /* ---------- Site text ---------- */
  document.title = SITE.name;
  document.getElementById("brand").textContent = SITE.name;
  document.getElementById("intro-title").textContent = SITE.name;
  document.getElementById("intro-tagline").textContent = SITE.tagline;
  const foot = document.getElementById("foot-author");
  foot.innerHTML = `© ${new Date().getFullYear()} ${esc(SITE.author)}` +
    (SITE.instagram ? ` · <a href="${esc(SITE.instagram)}" target="_blank" rel="noopener">Instagram</a>` : "");

  const categories = [...new Set(photos.map((p) => p.category).filter(Boolean))];
  const years = photos.map((p) => parseInt(p.date)).filter(Boolean);
  const yMin = Math.min(...years), yMax = Math.max(...years);
  document.getElementById("intro-stats").innerHTML =
    `<dt>Photos</dt><dd>${photos.length}</dd>` +
    `<dt>Categories</dt><dd>${categories.length}</dd>` +
    (years.length ? `<dt>Years</dt><dd>${yMin === yMax ? yMin : `${yMin}–${String(yMax).slice(2)}`}</dd>` : "");

  /* ---------- Structural grid ---------- */
  const LETTERS = "ABCDEFGHIJKL";
  document.querySelector(".grid-lines").innerHTML = "<span></span>".repeat(12);
  axis.innerHTML = [...LETTERS].map((l) => `<span>${l}</span>`).join("");
  const axisLabels = [...axis.children];

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
  const shape = (p) => {
    const r = p.w / p.h;
    if (r >= 1.6) return "wide";
    if (r >= 1.15) return "land";
    if (r > 0.88) return "square";
    return "port";
  };
  const SPAN = { wide: 10, land: 7, square: 5, port: 4 };
  const DROP = "clamp(40px, 9vw, 160px)";

  /* ---------- Asymmetric layout: build rows of one or two photos ---------- */
  const layout = (list) => {
    const rows = [];
    let k = 0, r = 0;
    while (k < list.length) {
      const a = list[k], b = list[k + 1];
      const sa = shape(a), sb = b && shape(b);
      if (sa === "wide") {
        rows.push([{ p: a, c: r % 2 ? 3 : 1, s: 10, m: "1 / -1" }]);
        k += 1;
      } else if (r % 4 === 3 || !b || sb === "wide") {
        // a single photo in its own bay, set off-centre
        const s = sa === "land" ? 7 : sa === "square" ? 6 : 5;
        const c = r % 8 === 3 ? 13 - s - 1 : 2;
        rows.push([{ p: a, c, s, m: sa === "land" ? "1 / -1" : "2 / span 4" }]);
        k += 1;
      } else {
        let s1 = SPAN[sa], s2 = SPAN[sb];
        while (s1 + s2 > 11) s1 >= s2 ? s1-- : s2--;
        let c1, c2, d1 = "0px", d2 = "0px";
        if (r % 2 === 0) { c1 = 1; c2 = 13 - s2; d2 = DROP; }
        else { c1 = 2; c2 = Math.min(c1 + s1 + 1, 13 - s2); d1 = DROP; }
        const mob = (sh, left) => sh === "land" ? "1 / -1" : left ? "1 / span 4" : "3 / span 4";
        rows.push([
          { p: a, c: c1, s: s1, d: d1, m: mob(sa, true) },
          { p: b, c: c2, s: s2, d: d2, m: mob(sb, false) },
        ]);
        k += 2;
      }
      r++;
    }
    return rows;
  };

  const exifRow = (label, v) => v ? `<div><dt>${label}</dt><dd>${esc(v)}</dd></div>` : "";
  const shotHTML = ({ p, c, s, d = "0px", m }, idx) => `
    <figure class="shot" style="--col:${c} / span ${s};--mcol:${m};--drop:${d}" data-c="${c}" data-s="${s}" data-i="${idx}">
      <div class="frame" style="--ratio:${p.w} / ${p.h}" tabindex="0" aria-label="${esc(p.title)}, show details">
        <img src="${esc(p.file)}" alt="${esc(p.title)}${p.location ? ", " + esc(p.location) : ""}" width="${p.w}" height="${p.h}" decoding="async">
        <div class="details">
          <div class="d-head">
            <h2 class="d-title">${esc(p.title)}</h2>
            <span class="d-place">${[p.location, fmtDate(p.date)].filter(Boolean).map(esc).join(" · ")}</span>
          </div>
          <dl class="d-exif">
            ${exifRow("Camera", p.camera)}${exifRow("Lens", p.lens)}${exifRow("Focal", p.focal)}
            ${exifRow("Aperture", p.aperture)}${exifRow("Shutter", p.shutter)}${exifRow("ISO", p.iso)}
          </dl>
          ${p.note ? `<p class="d-note">${esc(p.note)}</p>` : ""}
        </div>
      </div>
      <figcaption class="cap"><span>No. ${pad(p.no)} &nbsp;<b>${esc(p.title)}</b></span><span>${esc(p.category || "")}</span></figcaption>
    </figure>`;

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
    let idx = 0;
    gallery.innerHTML = layout(list).map((row) =>
      `<div class="row">${row.map((it) => shotHTML(it, ++idx)).join("")}</div>`
    ).join("");
    counterTotal.textContent = String(list.length).padStart(2, "0");
    counterNow.textContent = "01";
    observe();
    parallax();
  };

  /* ---------- Scroll: reveal, counter, parallax ---------- */
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

  let ticking = false;
  const parallax = () => {
    if (reduceMotion) return;
    const vh = window.innerHeight;
    gallery.querySelectorAll(".frame").forEach((f) => {
      const r = f.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100) return;
      const offset = ((r.top + r.height / 2) - vh / 2) / vh;  // -1 .. 1 across the screen
      const max = r.height * 0.028;                           // stays inside the 6% overscale
      f.firstElementChild.style.setProperty("--px", `${(-offset * max).toFixed(1)}px`);
    });
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(parallax); }
  }, { passive: true });
  window.addEventListener("resize", parallax);

  /* ---------- Hover: light up the grid columns a photo spans ---------- */
  const lightAxis = (shot) => {
    axisLabels.forEach((l) => l.classList.remove("on"));
    if (!shot) return;
    const c = +shot.dataset.c, s = +shot.dataset.s;
    for (let i = c - 1; i < c - 1 + s; i++) axisLabels[i]?.classList.add("on");
  };
  gallery.addEventListener("mouseover", (e) => lightAxis(e.target.closest(".shot")));
  gallery.addEventListener("mouseleave", () => lightAxis(null));
  gallery.addEventListener("focusin", (e) => lightAxis(e.target.closest(".shot")));

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
    document.querySelector(".axis").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  });

  route();
  Promise.all(photos.map(measure)).then((m) => { measured = m; route(); });
})();
