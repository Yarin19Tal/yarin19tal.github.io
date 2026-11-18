// Product list. Replace the drawings with real photos later by adding `img: "assets/your-photo.jpg"`.
const cameras = [
  { name: "Canon IXUS 70",        spec: "7.1 MP · 3× zoom · 2007",   price: 145, type: "digital", body: "#C9CCD1", tint: "#F4D9D9" },
  { name: "Sony Cyber-shot T7",   spec: "5.1 MP · slim metal · 2005", price: 120, type: "digital", body: "#2B2B2E", tint: "#D9EBE9" },
  { name: "Olympus µ[mju:] II",   spec: "35mm · 35mm f/2.8 · 1997",  price: 290, type: "film",    body: "#1F1F1F", tint: "#F6E7B0", badge: "Staff pick" },
  { name: "Nikon Coolpix 4100",   spec: "4 MP · AA batteries · 2004", price: 85,  type: "digital", body: "#B8BCC2", tint: "#E3E0F2" },
  { name: "Pentax Espio 140",     spec: "35mm · 38–140mm · 1996",    price: 95,  type: "film",    body: "#8E8F93", tint: "#F2E2CF" },
  { name: "Fujifilm FinePix Z1",  spec: "5.1 MP · sliding cover · 2005", price: 110, type: "digital", body: "#7A1A1A", tint: "#F7DCC6", sold: true },
  { name: "Konica Big Mini",      spec: "35mm · 35mm f/3.5 · 1989",  price: 160, type: "film",    body: "#3A3A3C", tint: "#DDEBD4" },
  { name: "Casio Exilim EX-Z75",  spec: "7.2 MP · pink edition · 2007", price: 100, type: "digital", body: "#E7A6B8", tint: "#FFF0C2" },
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

const grid = document.getElementById("grid");
grid.innerHTML = cameras.map((c, i) => `
  <li class="card" data-type="${c.type}">
    <div class="card__frame" style="--tint:${c.tint}">
      ${c.sold ? `<span class="card__badge card__badge--sold">Sold</span>` : c.badge ? `<span class="card__badge">${c.badge}</span>` : ""}
      ${c.img ? `<img src="${c.img}" alt="${c.name}">` : cameraSVG(c)}
    </div>
    <div class="card__meta"><span>${c.name}</span><span>$${c.price}</span></div>
    <div class="card__spec">${c.spec}</div>
    <button class="card__add" type="button" data-i="${i}" ${c.sold ? "disabled" : ""}>${c.sold ? "Sold out" : "Add to bag"}</button>
  </li>`).join("");

// Filters
document.querySelectorAll(".filters button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".filters button").forEach(b => b.classList.toggle("is-on", b === btn));
    const f = btn.dataset.filter;
    grid.querySelectorAll(".card").forEach(card => {
      card.hidden = f !== "all" && card.dataset.type !== f;
    });
  });
});

// Bag counter
const bag = document.querySelector(".bag");
const count = document.querySelector(".bag__count");
let items = 0;
grid.addEventListener("click", e => {
  const btn = e.target.closest(".card__add");
  if (!btn || btn.disabled) return;
  items++;
  count.textContent = items;
  bag.setAttribute("aria-label", `Bag, ${items} item${items === 1 ? "" : "s"}`);
  btn.textContent = "Added ✓";
  setTimeout(() => (btn.textContent = "Add to bag"), 1400);
  bag.classList.remove("bump"); void bag.offsetWidth; bag.classList.add("bump");
});

// Contact form (front-end only for now)
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  e.target.reset();
  document.getElementById("formOk").hidden = false;
});
