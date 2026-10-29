/*
  Your photos live here.

  To add a photo:
    1. Put the image file in the /images folder (WebP or JPG, about 2000px on the long edge is plenty).
    2. Copy one of the blocks below, paste it at the top of the list and fill it in.
       Only "file", "title" and "category" are required; leave out anything you don't know.
    3. Commit and push. The layout arranges itself, so you never have to place photos by hand.

  A new category appears automatically the first time you use it.
  Categories appear on the page in the order they first show up in this list.
*/

const SITE = {
  name: "Photo Dump",              // small name at the top left of every page
  title: "After Hours",            // large heading at the top of the page
  tagline: "A personal collection, exploration of light, vibe and scale through a lens. Taken on free days, long walks and away from the office.",
  author: "Aiman Razazemi",
  instagram: "", // optional, e.g. "https://instagram.com/yourhandle"

  // Applied to every photo unless that photo sets its own value.
  defaults: {
    camera: "Fujifilm X-E5",
    focal: "23mm"
  }
};

const PHOTOS = [
  {
    file: "images/interiors-lamplight.webp",
    title: "Lamplight",
    category: "Interiors"
  },
  {
    file: "images/interiors-yellow-kitchen.webp",
    title: "Yellow Kitchen",
    category: "Interiors"
  },
  {
    file: "images/interiors-wine-bar.webp",
    title: "Wine Bar",
    category: "Interiors"
  },
  {
    file: "images/interiors-cafe-corner.webp",
    title: "Café Corner",
    category: "Interiors"
  },
  {
    file: "images/interiors-rattan-lounge.webp",
    title: "Rattan Lounge",
    category: "Interiors"
  },
  {
    file: "images/interiors-hanging-letters.webp",
    title: "Hanging Letters",
    category: "Interiors"
  },
  {
    file: "images/interiors-open-doors.webp",
    title: "Open Doors",
    category: "Interiors"
  },
  {
    file: "images/interiors-paper-lantern.webp",
    title: "Paper Lantern",
    category: "Interiors"
  },
  {
    file: "images/interiors-pizza-oven.webp",
    title: "Pizza Oven",
    category: "Interiors"
  },
  {
    file: "images/interiors-capulus-est-vita.webp",
    title: "Capulus est Vita",
    category: "Interiors"
  },
  {
    file: "images/interiors-the-myst.webp",
    title: "The Myst",
    category: "Interiors",
    location: "The Myst Sa Pa Resort, Vietnam"
  },
  {
    file: "images/interiors-copper-hearth.webp",
    title: "Copper Hearth",
    category: "Interiors"
  },
  {
    file: "images/interiors-slate-bath.webp",
    title: "Slate Bath",
    category: "Interiors"
  },
  {
    file: "images/interiors-night-table.webp",
    title: "Night Table",
    category: "Interiors"
  },
  {
    file: "images/interiors-clay-bar.webp",
    title: "Clay Bar",
    category: "Interiors"
  },
  {
    file: "images/architecture-blue-stripe.webp",
    title: "Blue Stripe",
    category: "Architecture"
  },
  {
    file: "images/architecture-terracotta-steps.webp",
    title: "Terracotta Steps",
    category: "Architecture"
  },
  {
    file: "images/architecture-spiral-stair.webp",
    title: "Spiral Stair",
    category: "Architecture"
  },
  {
    file: "images/architecture-block-c.webp",
    title: "Block C",
    category: "Architecture"
  },
  {
    file: "images/architecture-steel-stair.webp",
    title: "Steel Stair",
    category: "Architecture"
  },
  {
    file: "images/architecture-glass-lifts.webp",
    title: "Glass Lifts",
    category: "Architecture",
    location: "Suria KLCC, Kuala Lumpur"
  },
  {
    file: "images/architecture-sapa-station.webp",
    title: "Sapa Station",
    category: "Architecture",
    location: "Sun Plaza, Sa Pa, Vietnam"
  },
  {
    file: "images/architecture-terrace-mosaic.webp",
    title: "Terrace Mosaic",
    category: "Architecture"
  },
  {
    file: "images/architecture-mosaic-stair.webp",
    title: "Mosaic Stair",
    category: "Architecture"
  },
  {
    file: "images/architecture-twin-towers.webp",
    title: "Twin Towers",
    category: "Architecture",
    location: "Petronas Twin Towers, Kuala Lumpur"
  },
  {
    file: "images/people-brick-screen.webp",
    title: "Brick Screen",
    category: "People"
  },
  {
    file: "images/people-terracotta-walk.webp",
    title: "Terracotta Walk",
    category: "People"
  },
  {
    file: "images/people-incense-wall.webp",
    title: "Incense Wall",
    category: "People"
  },
  {
    file: "images/people-hanging-vines.webp",
    title: "Hanging Vines",
    category: "People"
  },
  {
    file: "images/people-play-festival.webp",
    title: "Play Festival",
    category: "People",
    location: "Suria KLCC, Kuala Lumpur"
  },
  {
    file: "images/people-moss-garden.webp",
    title: "Moss Garden",
    category: "People"
  },
  {
    file: "images/people-chestnut-stall.webp",
    title: "Chestnut Stall",
    category: "People"
  },
  {
    file: "images/nature-palm-beach.webp",
    title: "Palm Beach",
    category: "Nature"
  },
  {
    file: "images/nature-mountain-mist.webp",
    title: "Mountain Mist",
    category: "Nature"
  },
  {
    file: "images/nature-beach-umbrellas.webp",
    title: "Beach Umbrellas",
    category: "Nature"
  },
  {
    file: "images/nature-garden-cafe.webp",
    title: "Garden Café",
    category: "Nature"
  },
  {
    file: "images/travel-night-gate.webp",
    title: "Night Gate",
    category: "Travel",
    location: "Kuala Lumpur International Airport"
  },
  {
    file: "images/travel-beach-cafe.webp",
    title: "Beach Café",
    category: "Travel"
  },
  {
    file: "images/travel-klcc-park.webp",
    title: "Park Skyline",
    category: "Travel",
    location: "KLCC Park, Kuala Lumpur"
  },
  {
    file: "images/travel-clouds-over-sapa.webp",
    title: "Clouds over Sapa",
    category: "Travel",
    location: "Sa Pa, Vietnam"
  },
  {
    file: "images/travel-red-roofs.webp",
    title: "Red Roofs",
    category: "Travel",
    location: "Sa Pa, Vietnam"
  },
  {
    file: "images/travel-corn-and-lanterns.webp",
    title: "Corn & Lanterns",
    category: "Travel"
  },
  {
    file: "images/travel-beach-ponies.webp",
    title: "Beach Ponies",
    category: "Travel"
  },
  {
    file: "images/travel-buddha-in-mist.webp",
    title: "Buddha in the Mist",
    category: "Travel"
  },
  {
    file: "images/travel-temple-guardian.webp",
    title: "Temple Guardian",
    category: "Travel"
  }
];
