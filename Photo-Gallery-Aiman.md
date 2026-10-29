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
| Theme | Simple, clean and architectural |
| Colours | Light grey and warm neutrals |
| Typeface | Montserrat for everything: "After" (medium), other headings (semi-bold), text (regular) and small labels (medium, spaced capitals) |
| Script typeface | Mrs Saint Delafield, for "Hours" in the main heading. It's a free stand-in for Amsterdam, which is a paid font and isn't on Google Fonts. |
| Layout | Collage grouped by category: photos packed edge to edge in rows of mixed heights, with white space between groups |
| Interaction | Hover (or tap on phones) shows photo details. Clicking doesn't open a lightbox. |
| Categories | Yes, with a filter menu |
| Hosting | GitHub, published with GitHub Pages |

### Colour palette

| Name | Hex | Used for |
|---|---|---|
| Paper | `#E6E4E0` | Page background |
| Stone | `#D4CFC7` | Image backgrounds while photos load |
| Sand | `#B9AFA1` | Lines and dividers |
| Umber | `#8A7B68` | Accent and active menu item |
| Ink | `#2A2723` | Main text |
| Ink soft | `#6C655C` | Secondary text |

---

## 2. Features

- **Clean layout:** faint vertical column lines run behind the page (12 on desktop, 6 on phones), with thin horizontal lines under the header and between the intro and the gallery.
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
- Only `file`, `title` and `category` are required. Any field you leave out won't be shown. Camera and focal length come from `defaults` in the `SITE` block.
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
  instagram: "",            // optional, e.g. "https://instagram.com/yourhandle"

  // Applied to every photo unless that photo sets its own value.
  defaults: {
    camera: "Fujifilm X-E5",
    focal: "23mm"
  }
};
```

Every photo shows "Fujifilm X-E5" and "23mm" automatically. To add a photo's own settings, put them in its entry, e.g. `aperture: "f/2.8", shutter: "1/400s", iso: "2000"`. If you ever use a different camera or lens for a photo, set `camera` or `focal` in that photo's entry and it overrides the default.

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
- [x] Replace the 30 sample images with your own photos (35 added)
- [x] Add the camera and lens to all photos (Fujifilm X-E5, 23mm)
- [ ] Add aperture, shutter speed, ISO, locations and dates for individual photos (optional)
- [x] Set the site name and heading in `SITE`
- [ ] Write your own tagline in `SITE`
- [ ] Rename or adjust the categories (currently Interiors, Architecture, People, Nature and Travel)
- [ ] Share reference layouts so the design can be fine-tuned

---

## 9. Change log

Newest first.

| Date | Change |
|---|---|
| 2026-10-30 | Added five more photos: "Capulus est Vita" and "The Myst" (Interiors), "Terrace Mosaic" (Architecture), "Play Festival" (People) and "Garden Café" (Nature). Locations from signs: The Myst Sa Pa Resort, Vietnam, and Suria KLCC, Kuala Lumpur. 35 photos in 5 categories. |
| 2026-10-30 | Removed the City category and moved its four photos into Travel: "Park Skyline", "Clouds over Sapa", "Red Roofs" and "Corn & Lanterns" (files renamed from `city-` to `travel-`). Added "Beach Ponies" to Travel. 30 photos in 5 categories. |
| 2026-10-30 | All photos now show "Fujifilm X-E5" and "23mm" in their hover details, set once as `defaults` in the `SITE` block. Aperture, shutter speed and ISO vary from photo to photo and can be added per photo. |
| 2026-10-30 | Added five more photos: "Paper Lantern" and "Pizza Oven" (Interiors), "Hanging Vines" (People), "Beach Umbrellas" (Nature) and "Beach Café" (Travel). 29 photos in 6 categories. |
| 2026-10-30 | Added five more photos: "Sapa Station" (Architecture), "Clouds over Sapa", "Red Roofs" and "Corn & Lanterns" (City), and "Night Gate" in a new Travel category. Locations come from signs in the photos: Sun Plaza, Sa Pa; Sa Pa, Vietnam (twice); and Kuala Lumpur International Airport. 24 photos in 6 categories. |
| 2026-10-30 | Added five more photos: "Hanging Letters" and "Open Doors" (Interiors), "Incense Wall" (People), and "Palm Beach" and "Mountain Mist" in a new Nature category. 19 photos in 5 categories. |
| 2026-10-30 | Added five more photos: "Block C", "Steel Stair" and "Glass Lifts" (Architecture), "Terracotta Walk" (People) and "Park Skyline" in a new City category. "Glass Lifts" and "Park Skyline" have locations (Suria KLCC and KLCC Park, Kuala Lumpur), read from the signs in the photos. Improved the collage: when a group ends with a few leftover photos, they're now shared across two evenly sized rows instead of being squeezed into one thin row. 14 photos in total. |
| 2026-10-30 | Added four more photos: "Café Corner" and "Rattan Lounge" (Interiors), "Spiral Stair" (Architecture) and "Brick Screen" in a new People category. Skipped one upload that was the same shot as "Blue Stripe". Category counts now say "photo" for a single photo. 9 photos in total. |
| 2026-10-30 | Added your first five WebP photos and removed all 30 sample photos. Interiors: "Lamplight", "Yellow Kitchen", "Wine Bar". Architecture: "Blue Stripe", "Terracotta Steps". The files had no camera data, so only titles show for now. The intro stats now spread evenly when there's no Years figure, and the footer hint reads correctly on phones. |
| 2026-10-30 | Reverted the retro pop theme. The site is back to the warm grey look with Montserrat and the Mrs Saint Delafield script "Hours". The two Interiors photos stay removed. |
| 2026-10-30 | Removed the two Interiors photos ("Lamplight" and "Yellow Kitchen"). WebP versions are coming. |
| 2026-10-30 | Tried a retro pop theme (cream, mustard, tomato, teal and pink, with Shrikhand, Yellowtail and Poppins). Reverted the same day. |
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
