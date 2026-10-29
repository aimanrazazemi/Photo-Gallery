# After Hours · Aiman Razazemi

A personal photo portfolio: light warm-grey palette, Bebas Neue headings, a collage layout grouped by category, and details for each photo on hover (or tap, on phones).

No build step and no dependencies. It's plain HTML, CSS and JavaScript, so it runs on GitHub Pages as-is.

## Adding a photo

1. Put the image in `images/` (JPG, around 2000px on the long edge).
2. Open `js/photos.js`, copy one entry, paste it at the **top** of the `PHOTOS` list and fill it in:

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

Only `file`, `title` and `category` are required. Leave out any field you don't have and it won't be shown.

3. Commit and push. The collage packs photos automatically, keeping each photo's full shape, so you don't have to position anything.

New categories appear in the menu the first time you use them. Each category also has its own link, e.g. `/#street`.

## Changing the names and intro

Edit the `SITE` block at the top of `js/photos.js`.

## Previewing locally

```bash
python3 -m http.server
```

Then open http://localhost:8000.

## Publishing with GitHub Pages

In the repository on GitHub, open **Settings → Pages**, set **Source** to "Deploy from a branch", choose `main` and `/ (root)`, then save. The site will be at `https://<your-username>.github.io/<repo-name>/`.
