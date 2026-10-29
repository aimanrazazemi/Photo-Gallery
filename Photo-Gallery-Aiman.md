# Photo Gallery: Aiman

A personal website for favourite photos taken in free time. It's built as plain HTML, CSS and JavaScript, with no build step and nothing to install.

This file is the project's working record. Every change to the site is noted in the change log at the end.

- **Repository:** https://github.com/aimanrazazemi/Photo-Gallery
- **Live site (once GitHub Pages is on):** https://aimanrazazemi.github.io/Photo-Gallery/
- **Preview (private to you):** https://claude.ai/artifact/CU9gPWMXNbQyburLL7moef
- **Status:** pushed to GitHub. GitHub Pages still needs to be switched on (see section 7).

---

## 1. Design brief

| Item | Choice |
|---|---|
| Theme | Retro pop: sunny cream page with a faint halftone dot texture, bold outlines, hard offset shadows and three-colour stripes, picking up the colours in the photos |
| Colours | Cream background with aubergine text; mustard, tomato, teal and pink accents |
| Heading typeface | Shrikhand (bold retro display): "After", category names, photo titles, numbers |
| Script typeface | Yellowtail (retro brush script): "Hours" in the main heading |
| Text typeface | Poppins: tagline, byline, menu, labels and camera details |
| Layout | Collage grouped by category: photos packed edge to edge in rows of mixed heights, with space between groups |
| Interaction | Hover (or tap on phones) shows photo details. Clicking doesn't open a lightbox. |
| Categories | Yes, with a filter menu |
| Hosting | GitHub, published with GitHub Pages |

### Colour palette

| Name | Hex | Used for |
|---|---|---|
| Paper | `#FBF1DC` | Page background |
| Stone | `#F1DFBB` | Image backgrounds while photos load |
| Ink | `#2B1B3D` | Main text, outlines and lines |
| Ink soft | `#6B5A6E` | Secondary text |
| Tomato | `#E8462A` | "Hours", photo numbers, menu counts, top stripe |
| Mustard | `#F4B224` | Shadows behind headings, menu hover, middle stripe |
| Teal | `#1F6F6A` | Small labels, bottom stripe |
| Pink | `#F28AB2` | Heading shadow for every fourth category |

---

## 2. Features

- **Retro pop styling:** faint vertical column lines run behind the page (12 on desktop, 6 on phones), over a faint halftone dot texture. A bold line runs under the header, and tomato, mustard and teal stripes separate the intro from the gallery. Category headings take turns casting a mustard, tomato, teal or pink shadow. Menu buttons are outlined pills. Photo corners are slightly rounded.
- **Collage by category:** each category is its own section with a large heading, a photo count and its years. Photos are packed edge to edge with thin gaps, so each group forms a solid block that's easy to scan.
- **Automatic layout:** rows alternate between tall and short for a mix of sizes. Photos are never cropped, and the collage repacks itself to fit any screen width.
- **Hover details:** a panel fades in over the photo with its number, title, location and date. Large photos also show the camera, lens, focal length, aperture, shutter speed, ISO and your note. Small photos show a one-line summary of the settings instead.
- **Scroll effects:** photos fade up as you reach them, and a counter in the corner shows your position (e.g. `06 / 30`).
- **Categories:** a filter menu with photo counts. Each category has its own link, e.g. `#street`.
- **Phones:** rows are taller with fewer photos in each, and you tap a photo to show or hide its details.
- **Accessibility:** works with the keyboard and turns off motion for visitors who have reduced motion enabled.

---

## 3. Project files

```
Photo-Gallery/
├── index.html          The page
├── css/style.css       Colours, fonts, layout
├── js/photos.js        YOUR PHOTOS AND SITE TEXT (the only file you normally edit)
├── js/main.js          Layout and interactions
├── images/             Photo files
├── README.md           Short instructions
├── Photo-Gallery-Aiman.md   This file: project record and change log
└── .nojekyll           Tells GitHub Pages to serve the files as-is
```

---

## 4. Adding a photo

1. Put the image in the `images/` folder. WebP or JPG, about 2000px on the long edge, is plenty.
2. Open `js/photos.js`, copy one entry and paste it at the **top** of the `PHOTOS` list.
3. Fill it in (photos appear in a category's collage in the order they're listed):

```js
{
  file: "images/my-photo.jpg",
  title: "Stair Core",
  category: "Architecture",
  location: "Kuala Lumpur",
  date: "2025-03-14",
  camera: "Fujifilm X100V",
  lens: "23mm f/2",
  focal: "23mm",
  aperture: "f/5.6",
  shutter: "1/250s",
  iso: "200",
  note: "A sentence about the moment."
},
```

4. Save, commit and push. The site updates on its own.

**Tips**
- Only `file`, `title` and `category` are required. Any field you leave out won't be shown.
- Dates use the format `YYYY-MM-DD`. They display as "Mar 2025".
- A new category appears in the menu the first time you use it.
- Photos are numbered from oldest to newest, so existing numbers don't change when you add new photos at the top.

## 5. Changing the names and intro

Edit the `SITE` block at the top of `js/photos.js`:

```js
const SITE = {
  name: "Photo Dump",       // small name at the top left of every page
  title: "After Hours",     // large heading at the top of the page
  tagline: "Photographs taken on free days, long walks and the way home.",
  author: "Aiman Razazemi", // name in the footer
  instagram: ""             // optional, e.g. "https://instagram.com/yourhandle"
};
```

---

## 6. Previewing on your computer

From inside the project folder, run:

```bash
python3 -m http.server
```

Then open http://localhost:8000 in your browser.

---

## 7. GitHub and publishing

The site lives in **https://github.com/aimanrazazemi/Photo-Gallery** on the `main` branch.

To put it online with GitHub Pages (one-time):

1. Open https://github.com/aimanrazazemi/Photo-Gallery/settings/pages
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Set the branch to `main` and the folder to `/ (root)`, then click **Save**.
4. After 1–2 minutes the site is live at **https://aimanrazazemi.github.io/Photo-Gallery/**

GitHub Pages is free only for public repositories. If the Pages settings are greyed out, change the repository to public under **Settings → General → Danger Zone → Change visibility**.

After that, every push to `main` updates the live site within a minute or two.

---

## 8. To do

- [x] Connect GitHub and push the site
- [ ] Turn on GitHub Pages
- [ ] Replace the 30 sample images and their details with your own photos (WebP versions coming)
- [x] Set the site name and heading in `SITE`
- [ ] Write your own tagline in `SITE`
- [ ] Rename or adjust the categories (currently Architecture, Street, Nature, Travel)
- [ ] Share reference layouts so the design can be fine-tuned

---

## 9. Change log

Newest first.

| Date | Change |
|---|---|
| 2026-10-30 | Removed the two Interiors photos ("Lamplight" and "Yellow Kitchen"). WebP versions are coming. |
| 2026-10-30 | New retro pop theme. Colours: cream, aubergine, mustard, tomato, teal and pink, taken from the photos. Fonts: Shrikhand for headings, Yellowtail script for "Hours" (in tomato), Poppins for text. Added a faint halftone texture, outlined pill menu buttons, offset shadows on headings, a three-colour stripe divider, rounded photo corners and a pill-shaped counter. The collage layout and hover details are unchanged. |
| 2026-10-29 | Added the first two real photos in a new Interiors category: "Lamplight" (`images/interiors-lamplight.jpg`) and "Yellow Kitchen" (`images/interiors-yellow-kitchen.jpg`). Their camera data was removed during upload, so only titles are shown. A category with only a few tall photos no longer stretches into oversized tiles, and empty detail lines are hidden. The 30 samples stay until more real photos arrive. |
| 2026-10-29 | Made the script "Hours" about 20% bigger and moved "by Aiman Razazemi" up so it sits directly under "Hours", right-aligned with its final stroke. |
| 2026-10-29 | Refined the heading so it reads as one lockup: "Hours" moved down slightly so its H just touches the bottom of "After" instead of cutting through the letters, and "After" is now medium weight to sit better beside the fine script. "by Aiman Razazemi" moved under "Hours" and right-aligned with its last stroke. |
| 2026-10-29 | Made "After Hours" bigger (about 30% larger) and moved the script "Hours" to the right and just below "After", like a signature, with the top of its H crossing the bottom of "After". |
| 2026-10-29 | "Hours" changed back to the dark text colour and set in a calligraphy script (Mrs Saint Delafield, the closest free match to Amsterdam). Added "by Aiman Razazemi" under the heading in Montserrat semi-bold, the same font as "After". The byline uses `author` from the `SITE` block. |
| 2026-10-29 | Top-left name changed from "Aiman Razazemi" to "Photo Dump". Browser tab now reads "After Hours · Photo Dump". The footer still shows "© Aiman Razazemi". |
| 2026-10-29 | Made the "After Hours" heading much bigger and set it on two lines: "After" on top, "Hours" below in dark blue (`#1F3354`). Removed the thin line between the tagline and the stats. |
| 2026-10-29 | Tidied the intro block next to "After Hours": the tagline is now justified and spans the full right-hand column, a thin line separates it from the stats, the stats spread evenly with "Years" flush to the right edge, and the block ends level with the heading's baseline. |
| 2026-10-29 | Brought back the faint vertical column lines behind the page. The A–L letters stay removed. |
| 2026-10-29 | Cleaner layout: removed the A–L column letters and the faint column lines behind the page. Changed all text to Montserrat (replacing Bebas Neue, Archivo and IBM Plex Mono). The "After Hours" heading is now semi-bold in title case. |
| 2026-10-29 | Top-left name changed from "Off Hours" to "Aiman Razazemi". Large heading changed from "Off Hours" to "After Hours". Footer now shows "© Aiman Razazemi". Browser tab reads "After Hours · Aiman Razazemi". |
| 2026-10-28 | This file became the project record (renamed from `Off-Hours-Project-Guide.md`). Added the GitHub details and this change log. |
| 2026-10-28 | Pushed the site to GitHub: `aimanrazazemi/Photo-Gallery`, branch `main`. |
| 2026-10-28 | Switched the gallery to a collage grouped by category: photos packed edge to edge in rows of mixed heights, no cropping. Hover details adapt to photo size. |
| 2026-10-28 | First version: warm grey palette, Bebas Neue headings, 12-column structural grid, category filters, hover details, 30 sample photos. |
