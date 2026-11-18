// ─────────────────────────────────────────────────────────────
//  DIGICAM CAMERAS
//  Edit this list to change what's for sale in the shop.
//  id     — short unique name, no spaces
//  name   — shown on the card
//  spec   — the small line under the name
//  price  — in shekels; leave null to show "Price on request"
//  img    — the photo, in assets/cameras/
//  type   — "digital" or "film" (used by the filter buttons)
//  sold   — true to show "Sold"
//
//  Buying: the button opens a DM to @digicam_il on Instagram (BUY_LINK).
// ─────────────────────────────────────────────────────────────
const SHOW_CAMERAS = false;     // false = no cameras on the page, a "coming soon" note instead. true = show the list below.
const CAMERA_CURRENCY = "₪";
const BUY_LINK = "https://ig.me/m/digicam_il";
const CAMERAS_IN_BAG = false;   // true = cameras go in the bag and are paid online with PayPal

const cameras = [
  { id: "sony-tx7",               name: "Sony Cyber-shot TX7",     spec: "Like new · case, charger & battery included", price: 850, type: "digital", img: "assets/cameras/sony-tx7.jpg" },
  { id: "canon-a720",             name: "Canon PowerShot A720 IS", spec: "8 MP · 6× zoom · optical viewfinder", price: null, type: "digital", img: "assets/cameras/canon-a720.jpg" },
  { id: "nikon-coolpix-red",      name: "Nikon Coolpix · red",     spec: "7× wide zoom",                    price: null, type: "digital", img: "assets/cameras/nikon-coolpix-red.jpg" },
  { id: "canon-ixus-black",       name: "Canon IXUS · black",      spec: "12× zoom",                         price: null, type: "digital", img: "assets/cameras/canon-ixus-black.jpg" },
  { id: "sony-cybershot-t",       name: "Sony Cyber-shot · slide cover", spec: "Slim body, sliding lens cover", price: null, type: "digital", img: "assets/cameras/sony-cybershot-t.jpg" },
  { id: "canon-powershot-silver", name: "Canon PowerShot · silver", spec: "16 MP · 5× zoom",                 price: null, type: "digital", img: "assets/cameras/canon-powershot-silver.jpg" },
  { id: "nikon-coolpix-touch",    name: "Nikon Coolpix · black",   spec: "16 MP · 6× zoom · touch screen",   price: null, type: "digital", img: "assets/cameras/nikon-s4300-black.jpg" },
  { id: "olympus-stylus",         name: "Olympus Stylus · silver", spec: "Slim metal body",                  price: null, type: "digital", img: "assets/cameras/olympus-stylus.jpg" },
  { id: "canon-ixus-red",         name: "Canon IXUS · red",        spec: "8× zoom",                          price: null, type: "digital", img: "assets/cameras/canon-ixus-red.jpg" },
  { id: "nikon-coolpix-silver",   name: "Nikon Coolpix · silver",  spec: "16 MP · 6× zoom · lens-shift VR",  price: null, type: "digital", img: "assets/cameras/nikon-s3300-silver.jpg" },
  { id: "canon-powershot-black",  name: "Canon PowerShot · black", spec: "16 MP · 5× zoom",                  price: null, type: "digital", img: "assets/cameras/canon-powershot-black.jpg" },
];

// Simple front-view camera drawing, varied by body color and type.
function cameraSVG(c) {
  const film = c.type === "film";
  const lensR = film ? 22 : 17;
  return `
  <svg viewBox="0 0 160 100" role="img" aria-label="${c.name}">
    <rect x="6" y="18" width="148" height="76" rx="${film ? 18 : 10}" fill="${c.body}" stroke="#1C1608" stroke-width="2.5"/>
    ${film ? `<rect x="22" y="10" width="34" height="12" rx="4" fill="${c.body}" stroke="#1C1608" stroke-width="2.5"/>` : ""}
    <rect x="${film ? 112 : 18}" y="28" width="26" height="14" rx="3" fill="#FFF7DA" stroke="#1C1608" stroke-width="2"/>
    <circle cx="${film ? 70 : 104}" cy="58" r="${lensR + 9}" fill="#1C1608"/>
    <circle cx="${film ? 70 : 104}" cy="58" r="${lensR}" fill="#3a5a7a"/>
    <circle cx="${film ? 64 : 98}" cy="52" r="${lensR / 3}" fill="#FFF7DA" opacity=".8"/>
    <circle cx="${film ? 128 : 36}" cy="72" r="5" fill="#DC0000"/>
    <rect x="120" y="12" width="20" height="8" rx="3" fill="#1C1608"/>
  </svg>`;
}
