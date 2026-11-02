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
| Colours | Black background, white text and ink; only the photos are in colour |
| Typeface | "After": Agraham (look-alike Gloock). "Hours": Lust (look-alike Mr Dafoe). Name signature: Bastliga One (look-alike Herr Von Muellerhoff). Titles, byline, tagline: Eden Meadow (look-alike Gilda Display). Menu and small labels: Montserrat. |
| Layout | Mosaic per category: tiles in four random sizes (S, M, L, XL) on a square-cell grid, packed with no gaps; Shuffle re-deals them |
| Interaction | Hover (or tap on phones) shows photo details. Clicking doesn't open a lightbox. |
| Categories | Four tags on a line, plan-style: A1 Architecture, B2 People, C3 Nature, D4 Travel. Clicking a selected tag again shows all photos. Sticks to the top while scrolling. |
| Hosting | GitHub, published with GitHub Pages |

### Colour palette

A black gallery wall; only the photos are in colour.

| Name | Hex | Used for |
|---|---|---|
| Black | `#0B0B0B` | Page background |
| Near black | `#1A1A1A` | Photo placeholders while loading |
| Line grey | `#3A3A3A` | Lines, menu and tag outlines |
| White | `#F2F2F2` | Text, headings, the ink spill, active menu item |
| Soft grey | `#9A9A9A` | Secondary text |

---|---|---|
| White | `#FFFFFF` | Page background, portrait background, hover panel (slightly see-through) |
| Light grey | `#F0F0F0` | Photo placeholders while loading |
| Line grey | `#CFCFCF` | Lines, dividers, grid bubble outlines (column lines are black at 7%) |
| Black | `#111111` | Text, headings, accent, portrait outline |
| Dark grey | `#5C5C5C` | Secondary text |
| Portrait grey | `#CCCCCC` | Face shading in the portrait |

---|---|---|
| Cream | `#EFEACA` | Page background, highlights on the portrait's face |
| Tan | `#C7A68F` | Lines and dividers, column lines (faint), photo placeholders, portrait background |
| White | `#FFFFFF` | Hover details panel (slightly see-through), the 3D edge and glow on the heading and portrait |
| Warm grey | `#9E9A95` | Face colour in the round portrait |
| Dark brown | `#463122` | Accent: active menu underline, focus outline |
| Ink | `#2A2723` | Main text (unchanged) |
| Ink soft | `#6C655C` | Secondary text (unchanged) |

---|---|---|
| Paper | `#E6E4E0` | Page background |
| Stone | `#D4CFC7` | Image backgrounds while photos load |
| Sand | `#B9AFA1` | Lines and dividers |
| Umber | `#8A7B68` | Accent and active menu item |
| Ink | `#2A2723` | Main text |
| Ink soft | `#6C655C` | Secondary text |

---

## 2. Features

- **Ink-spill hero:** "After" in Montserrat, "Hours" in script, and ink running off the end of "Hours" into a pool that holds the round portrait. It's all drawn to one scale, so it looks the same on any screen. Round grid bubbles (A1, B2, C3…) sit on the line between the intro and the gallery.
- **Collage by category:** each category is its own section with a large heading, a photo count and its years. Photos are packed edge to edge with thin gaps, so each group forms a solid block that's easy to scan.
- **Automatic layout:** rows alternate between tall and short for a mix of sizes. Photos are never cropped, and the collage repacks itself to fit any screen width.
- **Hover details:** a panel fades in over the photo with its number within its category, title, location and date. Large photos also show the camera, lens, focal length, aperture, shutter speed, ISO and your note. Small photos show a one-line summary of the settings instead.
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
├── images/             Photo files (plus portrait.webp, the round portrait in the intro)
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
- On hover, each photo shows its position within its category (01, 02, 03…), following the order in `js/photos.js`.

## 5. Changing the names and intro

Edit the `SITE` block at the top of `js/photos.js`:

```js
const SITE = {
  name: "Photo Dump",       // small name at the top left of every page
  title: "After Hours",     // large heading at the top of the page
  tagline: "A personal collection, exploration of light, vibe and scale through a lens. Taken on free days, long walks and away from the office.",
  author: "Aiman Razazemi", // name in the footer
  byline: "Shots on Fujifilm, by Aiman Razazemi", // line under "Hours", beside the portrait
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
- [x] Replace the 30 sample images with your own photos (45 added)
- [x] Add the camera and lens to all photos (Fujifilm X-E5, 23mm)
- [ ] Add aperture, shutter speed, ISO, locations and dates for individual photos (optional)
- [x] Set the site name and heading in `SITE`
- [ ] Write your own tagline in `SITE`
- [x] Categories set to Architecture, People, Nature and Travel
- [ ] Share reference layouts so the design can be fine-tuned

---

## 9. Change log

Newest first.

| Date | Change |
|---|---|
| 2026-11-02 | New fonts: "After" in Agraham style (free look-alike Gloock), title "Photo Dump", byline, tagline, category headings and photo titles in Eden Meadow style (look-alike Gilda Display), and the name "Aiman Razazemi" as a Bastliga One-style signature (look-alike Herr Von Muellerhoff). "Hours" keeps the Lust style. Removed the underline under the byline. "After" is larger and its baseline now sits on the portrait's eye line, reaching close to the face, with "Hours" tucked across its lower right. On phones the byline sits just below the artwork. `css/fonts.css` has slots for all four licensed fonts. |
| 2026-11-02 | New fonts. "Hours": Lust style (free look-alike Mr Dafoe). "After": Oldport Script style (free look-alike Pacifico). Title "Photo Dump", byline, tagline, category headings and photo titles: Freiburg style in capitals (free look-alike Saira Condensed). The licensed fonts are paid; `css/fonts.css` has ready slots so their web font files can be dropped into `/fonts` later and the site switches to them automatically. |
| 2026-11-02 | Removed "Photographs · Fujifilm X-E5" from the top bar; it now shows only "Photo Dump". |
| 2026-11-02 | The hand-drawn underline now runs under the whole line, "Shots on Fujifilm, by Aiman Razazemi", and is straighter, with just a slight lift at the end. |
| 2026-11-02 | Added a hand-drawn pen underline under "Shots on Fujifilm" (the part of the byline before the comma). The outlined double behind "Hours" is now filled with light grey at 40% opacity. |
| 2026-11-02 | Removed the ink stroke joining "Hours" to the portrait, so the title and the head stand apart. The sharp, tailed droplets are replaced by soft clusters of ink flecks thrown off the head's rim (bigger near the edge, finer further out), plus a light dusting over the title. |
| 2026-11-02 | Portrait reshaped: the white ink now hugs the head as an uneven organic rim (no large pool, so no leftover white areas), and the portrait ends just below the mouth with a wavy cut and white drips. The ink stroke from "Hours" runs into the rim. The head is sized to the title's height so it no longer overlaps the header or tagline. |
| 2026-11-02 | Byline now reads "Shots on Fujifilm, by Aiman Razazemi", set like Apple's "Shot on iPhone" line: Apple's own San Francisco font on Apple devices, Inter (its closest free match) everywhere else, medium weight, slightly smaller than before. |
| 2026-11-02 | Round dots in the splatter replaced with small irregular ink flecks to match the larger splats. Portrait re-exported at 1400px (was 600px) for sharper detail on large and high-resolution screens. "After Hours" now has a doubled background: a thin outlined copy of each word set just behind and below-right of it. |
| 2026-11-02 | Byline now reads "Shots by Aiman Razazemi on Fujifilm". The portrait is now painted inside the splash: cropped by the ink edge at a much larger size (hair and chin run off the edges), with a fine white outline, a more random splash shape with 14 runs, and drips falling from under it. The gallery is now a mosaic of four random tile sizes (S, M, L, XL) chosen to suit each photo's shape, packed with no gaps; each category opens on a large tile. A new Shuffle button next to the tags re-deals the sizes and tiles fade back in. Tiles lift slightly on hover. |
| 2026-11-02 | Category tags now sit together on the left, all the same width (196px) and evenly spaced; inside each, the count is right-aligned so the tags line up. |
| 2026-11-02 | Interiors merged into Architecture: its 15 photos are now Architecture (files renamed from `interiors-` to `architecture-`), giving 25 Architecture, 7 People, 4 Nature and 9 Travel. The menu now has just four tags (A1 Architecture, B2 People, C3 Nature, D4 Travel) with no "All" tag: clicking a selected tag again, or "Photo Dump", shows every photo. The portrait is cropped tight to the head and enlarged so it fills the spill. The spill is more organic: a larger pool with finger-like runs, droplets with tails flung outward, three drips, and splashes and fine spray across the title (kept clear of the line of text). |
| 2026-11-02 | Portrait: removed the round black disc, so the head sits straight in the white ink spill, now in black and greys (black hair, mid-grey face, light grey highlights, transparent background). The line under "Hours" now reads "Shots from Aiman Razazemi Fujifilm" in Montserrat, the same font as "After"; it's set as `byline` in the `SITE` block. The signature font is no longer used. |
| 2026-11-02 | Black theme: black background, white text, white ink spill; the portrait is inverted to suit (white hair and linework on black). The signature "by Aiman Razazemi" now sits under "Hours" on the right, just left of the portrait. The category menu moved out of the header onto the line above the gallery as grid-tag pills (A1 All, B2 Interiors, C3 Architecture, D4 People, E5 Nature, F6 Travel); it sticks to the top while scrolling and swipes sideways on phones and tablets. Each category heading carries its matching tag. The header is now just "Photo Dump" plus "Photographs · Fujifilm X-E5". The separate A1–M13 bubble row is replaced by the menu. |
| 2026-11-02 | Hero made horizontal: the ink pool and portrait now sit to the right of the title, centred level with "After / Hours", with the spill running sideways from the tail of "Hours". The signature and tagline sit on one line below (stacked on phones). "by Aiman Razazemi" is now in a handwritten signature font, Herr Von Muellerhoff. |
| 2026-11-02 | Redesigned the opening section as one composition. The vertical column lines are removed. The tail of the script "Hours" now spills as ink into a lopsided pool with drips and droplets, and the round portrait sits in that pool, overlapping the end of "Hours". On larger screens the byline and tagline tuck under "After"; on phones they sit below. The whole piece scales as one to fill the phone screen. On phones the category menu is a single swipeable row with larger tap targets. |
| 2026-10-30 | New black-and-white theme: white background, black text and accents, light grey lines. Portrait redone in greyscale (white background, black hair, light grey face, white highlights) with a thin black outline. The heading's white effect is now a faint soft shadow, the same as under the portrait. Photos keep their colour. |
| 2026-10-30 | Portrait: the white effect is now subtler and even all the way round: a thin white rim plus a faint white halo, instead of the offset lower-right edge. |
| 2026-10-30 | The 3D effect is now white: a thin white edge down and right of the letters plus a soft white glow, on both "After Hours" and the round portrait. |
| 2026-10-30 | Gave "After Hours" a subtle 3D lift: a thin tan edge one step down and right of the letters, plus a soft brown shadow beneath. The effect scales with the heading size. |
| 2026-10-30 | Added architectural grid bubbles on the line between the intro and the gallery: a small circle where each vertical column line crosses it, labelled A1, B2, C3 … M13 on desktop (13 lines) and A1 … G7 on phones (7 lines). |
| 2026-10-30 | Portrait: the white highlights on the face are now cream (`#EFEACA`), the same as the page background. |
| 2026-10-30 | Portrait: the blue on the face is now a warm mid-grey (`#9E9A95`), including the soft edges into the black and white areas. |
| 2026-10-30 | New colour palette from your template: cream `#EFEACA` background, tan `#C7A68F` lines and portrait background, white hover panel, dark brown `#463122` accent. Text colours unchanged. The yellow behind the portrait is now tan. |
| 2026-10-30 | Made the round portrait much bigger: it now fills the right-hand column (about 410px on desktop), its top lines up with the top of "After", and portrait plus tagline together span the same height as the two-line "After / Hours" heading. On phones it's up to 200px wide, above the tagline. |
| 2026-10-30 | Added your illustrated portrait in a circle on the right, above the tagline (`images/portrait.webp`). The illustration is centred on the head with an even yellow margin so the whole head fits inside the circle. It's 140px wide on large screens and scales down to 88px on phones. (Later enlarged; see the newer entry.) |
| 2026-10-30 | Reverted the one-line heading: "Hours" is back below and to the right of "After". "by Aiman Razazemi" now uses the tagline's font (Montserrat regular, soft grey) instead of the script. |
| 2026-10-30 | Heading redesigned as one line: script "Hours" now sits to the right of "After" on the same baseline, sized larger (1.32×) so the script's small letters match the weight of "After". The whole lockup scales with the screen. "by Aiman Razazemi" is now in the same script as "Hours", right-aligned underneath it. |
| 2026-10-30 | New tagline: "A personal collection, exploration of light, vibe and scale through a lens. Taken on free days, long walks and away from the office." |
| 2026-10-30 | Removed the Photos / Categories counts under the tagline (the counts in the top menu stay). The hover panel now shows just the photo's number within its category, e.g. "03" next to "Interiors", with no "No." label. |
| 2026-10-30 | Added five more photos: "Clay Bar" (Interiors), "Mosaic Stair" and "Twin Towers" (Architecture), and "Buddha in the Mist" and "Temple Guardian" (Travel). "Twin Towers" is tagged Petronas Twin Towers, Kuala Lumpur. 45 photos in 5 categories. |
| 2026-10-30 | Added five more photos: "Copper Hearth", "Slate Bath" and "Night Table" (Interiors), and "Moss Garden" and "Chestnut Stall" (People). 40 photos in 5 categories. |
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
