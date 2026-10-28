# Off Hours: Photo Portfolio Project Guide

A personal website for favourite photos taken in free time. It's built as plain HTML, CSS and JavaScript, with no build step and nothing to install.

- **Preview (private to you):** https://claude.ai/artifact/CU9gPWMXNbQyburLL7moef
- **Status:** first version built and committed to git, not yet pushed to GitHub.

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
photo-portfolio/
├── index.html          The page
├── css/style.css       Colours, fonts, layout
├── js/photos.js        YOUR PHOTOS AND SITE TEXT (the only file you normally edit)
├── js/main.js          Layout and interactions
├── images/             Photo files
├── README.md           Short instructions
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

## 5. Changing the site name and intro

Edit the `SITE` block at the top of `js/photos.js`:

```js
const SITE = {
  name: "Off Hours",
  tagline: "Photographs taken on free days, long walks and the way home.",
  author: "Your Name",
  instagram: ""   // optional, e.g. "https://instagram.com/yourhandle"
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

## 7. Putting it on GitHub

1. Connect GitHub to Claude at https://claude.ai/connect-github and install the Claude GitHub App when it asks.
2. On GitHub, create an empty repository, for example `photo-portfolio`.
3. Send Claude your GitHub username and the repository name so the site can be pushed.
4. In the repository on GitHub, open **Settings → Pages**. Set **Source** to *Deploy from a branch*, choose `main` and `/ (root)`, then save.
5. The site will be live at `https://<your-username>.github.io/photo-portfolio/`.

---

## 8. To do

- [ ] Connect GitHub and push the site
- [ ] Turn on GitHub Pages
- [ ] Replace the 30 sample images and their details with your own photos
- [ ] Set your real site name, tagline and name in `SITE`
- [ ] Rename or adjust the categories (currently Architecture, Street, Nature, Travel)
- [ ] Share reference layouts so the design can be fine-tuned
