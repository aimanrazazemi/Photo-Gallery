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
| Heading font | Bebas Neue |
| Body font | Archivo |
| Camera details font | IBM Plex Mono |
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

- **Structural grid:** faint column lines run behind the page like a plan drawing, with the columns labelled A to L.
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

1. Put the image in the `images/` folder. A JPG about 2000px on the long edge is plenty.
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
  name: "Aiman Razazemi",   // small name at the top left of every page
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
- [ ] Replace the 30 sample images and their details with your own photos
- [x] Set the site name and heading in `SITE`
- [ ] Write your own tagline in `SITE`
- [ ] Rename or adjust the categories (currently Architecture, Street, Nature, Travel)
- [ ] Share reference layouts so the design can be fine-tuned

---

## 9. Change log

Newest first.

| Date | Change |
|---|---|
| 2026-10-29 | Top-left name changed from "Off Hours" to "Aiman Razazemi". Large heading changed from "Off Hours" to "After Hours". Footer now shows "© Aiman Razazemi". Browser tab reads "After Hours · Aiman Razazemi". |
| 2026-10-28 | This file became the project record (renamed from `Off-Hours-Project-Guide.md`). Added the GitHub details and this change log. |
| 2026-10-28 | Pushed the site to GitHub: `aimanrazazemi/Photo-Gallery`, branch `main`. |
| 2026-10-28 | Switched the gallery to a collage grouped by category: photos packed edge to edge in rows of mixed heights, no cropping. Hover details adapt to photo size. |
| 2026-10-28 | First version: warm grey palette, Bebas Neue headings, 12-column structural grid, category filters, hover details, 30 sample photos. |
