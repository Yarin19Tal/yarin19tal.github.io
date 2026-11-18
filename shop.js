// Shop page: camera grid + filters. The camera list is in cameras-data.js, the bag in cart.js.

const grid = document.getElementById("grid");
grid.innerHTML = cameras.map((c, i) => `
  <li class="card" data-type="${c.type}">
    <div class="card__frame" style="--tint:${c.tint}">
      ${c.sold ? `<span class="card__badge card__badge--sold">${T("Sold")}</span>` : c.badge ? `<span class="card__badge">${T(c.badge)}</span>` : ""}
      ${c.img ? `<img src="${c.img}" alt="${c.name}">` : cameraSVG(c)}
    </div>
    <div class="card__meta"><span>${c.name}</span><span>$${c.price}</span></div>
    <div class="card__spec">${c.spec}</div>
    <button class="card__add" type="button" data-id="${c.id}" ${c.sold ? "disabled" : ""}>${c.sold ? T("Sold out") : T("Add to bag")}</button>
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

// ---------- Add to bag ----------
function syncButtons() {
  grid.querySelectorAll(".card__add:not([disabled])").forEach(b => {
    const inBag = Cart.has(b.dataset.id);
    b.textContent = inBag ? T("In bag ✓") : T("Add to bag");
    b.classList.toggle("is-in", inBag);
  });
}
grid.addEventListener("click", e => {
  const btn = e.target.closest(".card__add");
  if (btn && !btn.disabled) Cart.add(btn.dataset.id);
});
Cart.onChange(syncButtons);
syncButtons();

// Contact form (front-end only for now)
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  e.target.reset();
  document.getElementById("formOk").hidden = false;
});
