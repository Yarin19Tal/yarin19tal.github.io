// ─────────────────────────────────────────────────────────────
//  HEBREW — the עב / EN button
//  Loaded in <head> of every page, before everything else.
//
//  Only the texts listed in HE switch to Hebrew. Everything else
//  (menus, headings, buttons, layout) stays in English.
//
//  Left side  = the English exactly as it appears on the site.
//  Right side = what shows in Hebrew. To change a Hebrew sentence, edit the right side.
//  To make another text switch to Hebrew, add a line with its English and Hebrew.
//  If you change English text on a page, change its left side here too.
// ─────────────────────────────────────────────────────────────
const HE = {
  // ---------- Homepage: About & Contact ----------
  "Street, portrait & fashion photographer chasing raw atmosphere and authentic moments. Shooting on pocket-sized digicams for that early-2000s look and vibe.":
    "צלם רחוב, פורטרטים ואופנה, שרודף אחרי אווירה גולמית ורגעים אמיתיים. מצלם עם מצלמות דיגיטליות קטנות שנכנסות לכיס, בשביל המראה והאווירה של תחילת שנות ה-2000.",
  'Founder of <a href="shop.html">DIGICAM store</a> — inspiring you to grab a camera, step outside, and create.':
    'מייסד <a href="shop.html">חנות DIGICAM</a>, שנועדה לגרום לכם לקחת מצלמה, לצאת החוצה וליצור.',
  "For prints, commissions or just to talk cameras.":
    "להדפסים, הזמנות עבודה, או סתם לדבר על מצלמות.",

  // ---------- Presets: intro ----------
  'Film-inspired styles for <strong>Capture One</strong>, built to bring the mood of a real roll of film to digital street photos.':
    'סגנונות בהשראת פילם ל-<strong>Capture One</strong>, שנבנו כדי להביא את האווירה של פילם אמיתי לצילומי רחוב דיגיטליים.',
  "Drag across any picture to compare before and after.":
    "גררו על כל תמונה כדי להשוות לפני ואחרי.",

  // ---------- Presets: built to feel like film ----------
  "Digital files are clean, sharp and a little cold. Film isn't. It rolls off highlights softly, shifts colors in the shadows and adds grain that makes a frame feel like a moment instead of a file.":
    "קבצים דיגיטליים הם נקיים, חדים וקצת קרים. פילם לא. הוא מרכך את האזורים הבהירים, מזיז את הצבעים בצללים ומוסיף גרעיניות שגורמת לפריים להרגיש כמו רגע ולא כמו קובץ.",
  "I built these styles to chase that feeling on my own photos from the street. Each one starts from how a type of film reacts to light, then gets tuned on hundreds of real frames, in harsh sun, at night and under flash, so it holds up outside the perfect example.":
    "בניתי את הסגנונות האלה כדי להשיג את התחושה הזאת בתמונות הרחוב שלי. כל אחד מתחיל מהאופן שבו סוג מסוים של פילם מגיב לאור, ואז מכוונן על מאות פריימים אמיתיים, בשמש קשה, בלילה ועם פלאש, כדי שיעבוד גם מחוץ לדוגמה המושלמת.",
  "Soft highlight roll-off and film-style curves, no crushed whites.":
    "מעבר רך באזורים הבהירים ועקומות בסגנון פילם, בלי לבנים שרופים.",
  "Shadow and highlight tints that give each style its mood.":
    "גוונים בצללים ובאזורים הבהירים שנותנים לכל סגנון את האווירה שלו.",
  "Fine, even grain that reads as film, not noise.":
    "גרעיניות עדינה ואחידה שנראית כמו פילם, לא כמו רעש.",
  "Kept natural, because street photos are mostly about people.":
    "נשאר טבעי, כי צילומי רחוב הם בעיקר על אנשים.",

  // ---------- Presets: the four styles ----------
  "Modeled on cheap consumer film shot with on-camera flash: cool shadows, bright skin and colors that jump off the page.":
    "בהשראת פילם זול שצולם עם פלאש מובנה: צללים קרירים, עור בהיר וצבעים שקופצים מהמסך.",
  "A push-processed black and white look: deep blacks, gritty mid-tones and grain that holds up in hard midday light.":
    "לוק שחור-לבן בפיתוח דחוף: שחורים עמוקים, טונים בינוניים מחוספסים וגרעיניות שמחזיקה גם באור צהריים קשה.",
  "Like tungsten film under street lamps: amber highlights, teal shadows and soft grain for pictures made after dark.":
    "כמו פילם טונגסטן מתחת לפנסי רחוב: אזורים בהירים בגוון ענבר, צללים בטורקיז וגרעיניות רכה לתמונות שצולמו אחרי החשכה.",
  "Lifted blacks and gentle pastels, like an expired roll or a print left on the dashboard all summer.":
    "שחורים מורמים ופסטלים עדינים, כמו פילם שפג תוקפו או הדפסה שנשכחה על הדשבורד כל הקיץ.",

  // ---------- Presets: the full set & install ----------
  "All four styles in one download, plus every update I make to them.":
    "כל ארבעת הסגנונות בהורדה אחת, כולל כל עדכון עתידי שלהם.",
  "<h3>Download</h3><p>After payment the .costyle files arrive in your email.</p>":
    "<h3>הורדה</h3><p>אחרי התשלום קבצי ה-costyle מגיעים למייל שלכם.</p>",
  "<h3>Import</h3><p>In Capture One open <em>Adjustments → Styles → Import</em> and choose the files.</p>":
    '<h3>ייבוא</h3><p>ב-Capture One פותחים את <em dir="ltr">Adjustments → Styles → Import</em> ובוחרים את הקבצים.</p>',
  "<h3>Apply</h3><p>Click a style, then fine-tune exposure and white balance for your photo.</p>":
    "<h3>החלה</h3><p>לוחצים על סגנון, ומכווננים חשיפה ואיזון לבן לפי התמונה.</p>",

  // ---------- Presets: FAQ ----------
  "Which software do they work with?": "עם איזו תוכנה הם עובדים?",
  "Capture One (Pro, Pro subscription and the iPad app). Styles come as .costyle files. They don't work in Lightroom.":
    "Capture One (גרסת Pro, מנוי Pro ואפליקציית ה-iPad). הסגנונות מגיעים כקבצי costyle. הם לא עובדים ב-Lightroom.",
  "Will my photos look exactly like these?": "התמונות שלי ייראו בדיוק ככה?",
  "Close, but light and camera change everything. Expect to nudge exposure and white balance after applying. That's normal with any film look.":
    "קרוב, אבל האור והמצלמה משנים הכל. סביר שתצטרכו לכוונן קצת חשיפה ואיזון לבן אחרי ההחלה. זה רגיל בכל לוק של פילם.",
  "RAW or JPEG?": "RAW או JPEG?",
  "Both work. You'll get the most out of them on RAW files, but they're tested on JPEGs too.":
    "שניהם עובדים. הכי טוב על קבצי RAW, אבל הם נבדקו גם על JPEG.",
  "Which cameras were they made on?": "על אילו מצלמות הם נבנו?",
  "Mainly the Fuji X100V and Ricoh GR, the cameras behind my street work. They work on files from any camera Capture One supports.":
    "בעיקר Fuji X100V ו-Ricoh GR, המצלמות שמאחורי צילומי הרחוב שלי. הם עובדים על קבצים מכל מצלמה ש-Capture One תומכת בה.",
  "How do I get them after paying?": "איך מקבלים אותם אחרי התשלום?",
  "Pay with PayPal or a credit card in PayPal's secure window. The files are sent to your email within a few hours.":
    "משלמים ב-PayPal או בכרטיס אשראי בחלון המאובטח של PayPal. הקבצים נשלחים למייל שלכם תוך כמה שעות.",
  "Something not working?": "משהו לא עובד?",
  'Email <a href="mailto:yarintal.digicam@gmail.com">yarintal.digicam@gmail.com</a> and I\'ll sort it out.':
    'שלחו מייל ל-<a href="mailto:yarintal.digicam@gmail.com">yarintal.digicam@gmail.com</a> ואני אסדר את זה.',

  // ---------- Contact page ----------
  "For prints, commissions, presets or DIGICAM questions, contact me by email.":
    "להדפסים, הזמנות עבודה, פריסטים או שאלות על DIGICAM, אפשר לפנות אליי במייל.",
  "Name": "שם",
  "First name": "שם פרטי",
  "Last name": "שם משפחה",
  "(required)": "(חובה)",
  "Email": "אימייל",
  "Subject": "נושא",
  "Message": "הודעה",
  "Send": "שליחה",
  "Sending…": "שליחה…",
  "Please fill in all the fields.": "נא למלא את כל השדות.",
  "Thank you. Your email app should open with the message ready. Just press send.":
    "תודה! אפליקציית המייל שלכם אמורה להיפתח עם ההודעה מוכנה. נשאר רק ללחוץ שליחה.",
  "Thank you. Your message was sent, I'll get back to you soon.": "תודה! ההודעה נשלחה, אחזור אליכם בקרוב.",
  "Couldn't send right now. Please email {to} directly.": "לא הצלחנו לשלוח כרגע. אפשר לשלוח מייל ישירות ל-{to}.",

  // ---------- DIGICAM shop ----------
  "Point-and-shoots, early digicams & 35mm film bodies. Every one cleaned, tested and shot before it ships.":
    "מצלמות קומפקטיות, דיג'יקאמים מוקדמים ומצלמות פילם 35 מ\"מ. כל אחת מנוקה, נבדקת ומצלמת לפני שהיא יוצאת אליכם.",
  "Fresh 35mm stock, spare batteries and SD cards that actually fit a 2004 camera. Bundled with every order if you ask.":
    "פילם 35 מ\"מ טרי, סוללות רזרביות וכרטיסי SD שבאמת מתאימים למצלמה מ-2004. אפשר לצרף לכל הזמנה, רק תבקשו.",
  "Color 200 — 36 exp": "פילם צבע 200 — 36 פריימים",
  "B&W 400 — 36 exp": "פילם שחור-לבן 400 — 36 פריימים",
  "CR2 lithium battery": "סוללת ליתיום CR2",
  "xD / SD card + reader": "כרטיס xD / SD + קורא כרטיסים",
  "Clean": "ניקוי",
  "Lens, viewfinder and battery contacts cleaned. Sensor dust checked on digicams.":
    "ניקוי עדשה, עינית ומגעי סוללה. בדיקת אבק על החיישן בדיג'יקאמים.",
  "Shoot": "צילום",
  "A full roll or 50 frames, indoors and out, with and without flash.": "פילם שלם או 50 פריימים, בפנים ובחוץ, עם פלאש ובלי.",
  "Ship": "משלוח",
  "Sample photos from your exact camera go in the listing. 30-day warranty in the box.":
    "תמונות לדוגמה מהמצלמה המדויקת שתקבלו מופיעות במודעה. 30 יום אחריות בקופסה.",
  "Looking for a specific camera?": "מחפשים מצלמה מסוימת?",
  "Tell us the model. We hunt it down, test it, and send you photos before you pay.":
    "ספרו לנו מה הדגם. נמצא אותה, נבדוק אותה ונשלח לכם תמונות לפני שתשלמו.",
  "Camera you're after": "איזו מצלמה אתם מחפשים",
  "e.g. Canon IXUS 70, silver": "למשל Canon IXUS 70, כסופה",
  "Send request": "שליחת בקשה",
  "Got it. We'll be in touch within two days.": "קיבלנו! נחזור אליכם תוך יומיים.",
  "New cameras coming soon.": "מצלמות חדשות בקרוב.",
  'The shelf is empty right now. Follow <a href="https://www.instagram.com/digicam_il/" target="_blank" rel="noopener">@digicam_il</a> to see the next drop first.':
    'המדף ריק כרגע. עקבו אחרי <a href="https://www.instagram.com/digicam_il/" target="_blank" rel="noopener">@digicam_il</a> כדי לראות ראשונים את המצלמות הבאות.',

  // ---------- The bag, when it's empty ----------
  "Your bag is empty.": "הסל שלכם ריק.",
  "Shop presets →": "לפריסטים ←",
  "Shop cameras →": "למצלמות ←",
};

// ─────────────────────────────────────────────────────────────
//  How it works (no need to edit below)
// ─────────────────────────────────────────────────────────────
const LANG = (() => {
  try { return localStorage.getItem("yt-lang") === "he" ? "he" : "en"; } catch { return "en"; }
})();

// T("English text") → the Hebrew from HE when Hebrew is on and the text is listed; otherwise the English.
function T(text, vars) {
  let s = LANG === "he" && Object.prototype.hasOwnProperty.call(HE, text) ? HE[text] : text;
  if (vars) s = s.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? vars[k] : m));
  return s;
}

(() => {
  const root = document.documentElement;
  const HEBREW = /[֐-׿]/;
  const norm = s => s.replace(/\s+/g, " ").trim();
  const SKIP = new Set(["SCRIPT", "STYLE", "SVG", "NOSCRIPT", "TEXTAREA"]);

  if (LANG === "he") {
    root.classList.add("i18n-pending");          // hide for a moment so English doesn't flash first
    setTimeout(() => root.classList.remove("i18n-pending"), 1500);
    const font = document.createElement("link");
    font.rel = "stylesheet";
    font.href = "https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;700;900&display=swap";
    document.head.appendChild(font);
  }

  function translate(el) {
    if (SKIP.has(el.tagName.toUpperCase()) || el.classList.contains("lang")) return;
    const ph = el.getAttribute("placeholder");      // example text inside a form field
    if (ph && HE[norm(ph)]) { el.setAttribute("placeholder", HE[norm(ph)]); el.dir = "rtl"; }
    if (el.tagName === "INPUT") return;
    if (el.children.length) {                    // a sentence with a link or bold inside
      const html = norm(el.innerHTML);
      if (HE[html]) { el.innerHTML = HE[html]; return; }
    }
    for (const node of [...el.childNodes]) {
      if (node.nodeType === 1) translate(node);
      else if (node.nodeType === 3) {
        const t = norm(node.nodeValue);
        if (t && HE[t]) {
          const lead = /^\s/.test(node.nodeValue) ? " " : "", tail = /\s$/.test(node.nodeValue) ? " " : "";
          node.nodeValue = lead + HE[t] + tail;
        }
      }
    }
  }

  // Every block that now holds Hebrew reads right to left, in the Hebrew font.
  function markHebrew() {
    const tw = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let n;
    while ((n = tw.nextNode())) {
      if (!HEBREW.test(n.nodeValue)) continue;
      const block = n.parentElement.closest("p, li, dt, dd, h1, h2, h3, h4, label, legend, button");
      if (!block || block.closest(".lang") || block.classList.contains("he")) continue;
      block.dir = "rtl";
      block.classList.add("he");
      const cs = getComputedStyle(block);
      if (cs.textAlign === "center") continue;                            // centered texts stay centered
      block.classList.add("he-right");
      if (cs.maxWidth !== "none" && cs.display === "block") block.classList.add("he-push");   // narrow box → right edge
    }
  }

  function addToggle() {
    const end = document.querySelector(".topbar__side--end");
    if (!end) return;
    const b = document.createElement("button");
    b.type = "button";
    b.className = "lang";
    b.textContent = LANG === "he" ? "EN" : "עב";
    b.lang = LANG === "he" ? "en" : "he";
    b.setAttribute("aria-label", LANG === "he" ? "Switch to English" : "החלפה לעברית");
    b.addEventListener("click", () => {
      try { localStorage.setItem("yt-lang", LANG === "he" ? "en" : "he"); } catch {}
      location.reload();
    });
    end.prepend(b);
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (LANG === "he") {
      translate(document.body);
      markHebrew();
      root.classList.remove("i18n-pending");
    }
    addToggle();
  });
})();
