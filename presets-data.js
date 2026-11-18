// ─────────────────────────────────────────────────────────────
//  PRESETS — shared by presets.html and checkout.html
//
//  photo       : the untouched photo (photos folder) shown as "Before"
//  afterPhoto  : the SAME photo exported from Capture One with this style
//                applied. When set, the slider shows the real preset.
//                Until then, `look` is a rough stand-in.
//  checkoutUrl : the link to this product's payment page at your payment
//                provider (Grow / PayPlus / Cardcom / Morning...).
//                Empty = the checkout page says payments aren't connected yet.
//                (See PAYMENTS-SETUP.md)
// ─────────────────────────────────────────────────────────────
const EMAIL = "yarintal.digicam@gmail.com";
const CURRENCY = "$";

// PAYPAL — see PAYPAL-SETUP.md
//  merchantId : your PayPal Merchant ID → a "Pay with PayPal" button that
//               opens PayPal's checkout page (PayPal account or card).
//  clientId   : optional, from developer.paypal.com → PayPal's in-page
//               buttons instead. Used when filled in.
const PAYPAL = {
  merchantId: "2W26GBG2ABNTN",
  clientId: "",
  currency: "USD",
};

const PRESETS = [
  {
    id: "digicam-04",
    name: "Digicam 04",
    mood: "Cool · punchy · flash",
    desc: "Modeled on cheap consumer film shot with on-camera flash: cool shadows, bright skin and colors that jump off the page.",
    price: 14,
    photo: "ricoh-02.jpg",
    afterPhoto: "",
    look: "contrast(1.18) saturate(1.15) hue-rotate(-8deg) brightness(1.04)",
    checkoutUrl: "",
  },
  {
    id: "concrete",
    name: "Concrete",
    mood: "Black & white · high contrast",
    desc: "A push-processed black and white look: deep blacks, gritty mid-tones and grain that holds up in hard midday light.",
    price: 14,
    photo: "fuji-29.jpg",
    afterPhoto: "",
    look: "grayscale(1) contrast(1.4) brightness(.95)",
    checkoutUrl: "",
  },
  {
    id: "last-bus",
    name: "Last Bus",
    mood: "Warm · night · tungsten",
    desc: "Like tungsten film under street lamps: amber highlights, teal shadows and soft grain for pictures made after dark.",
    price: 14,
    photo: "fuji-31.jpg",
    afterPhoto: "",
    look: "sepia(.35) saturate(1.35) contrast(1.1) hue-rotate(-10deg) brightness(.96)",
    checkoutUrl: "",
  },
  {
    id: "faded-noon",
    name: "Faded Noon",
    mood: "Soft · washed · summer",
    desc: "Lifted blacks and gentle pastels, like an expired roll or a print left on the dashboard all summer.",
    price: 14,
    photo: "fuji-15.jpg",
    afterPhoto: "",
    look: "contrast(.85) saturate(.8) brightness(1.1) sepia(.15)",
    checkoutUrl: "",
  },
];

const BUNDLE = {
  id: "full-set",
  name: "The Full Set",
  mood: "All four styles",
  desc: "All four Capture One styles in one download, plus every update I make to them.",
  price: 35,
  was: 56,
  photo: "fuji-29.jpg",
  checkoutUrl: "",
};

const ALL_PRODUCTS = [...PRESETS, BUNDLE];
const findProduct = id => ALL_PRODUCTS.find(p => p.id === id);
