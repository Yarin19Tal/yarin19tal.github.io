// Shop page: camera grid + filters. The camera list is in cameras-data.js, the bag in cart.js.

const grid = document.getElementById("grid");
const priceText = c => (c.price ? `${CAMERA_CURRENCY}${c.price}` : "Price on request");
const buyButton = c => {
  if (c.sold) return `<button class="card__add" type="button" disabled>${T("Sold out")}</button>`;
  if (CAMERAS_IN_BAG && c.price) return `<button class="card__add" type="button" data-id="${c.id}">${T("Add to bag")}</button>`;
  return `<a class="card__add" href="${BUY_LINK}" target="_blank" rel="noopener">Message to buy →</a>`;
};
const onShelf = SHOW_CAMERAS ? cameras : [];
if (!onShelf.length) {
  // Nothing in stock: a short note instead of the grid, and no filter buttons.
  document.querySelector(".filters").hidden = true;
  grid.insertAdjacentHTML("afterend", `
    <div class="empty-shelf">
      <p class="empty-shelf__title">${T("New cameras coming soon.")}</p>
      <p>${T('The shelf is empty right now. Follow <a href="https://www.instagram.com/digicam_il/" target="_blank" rel="noopener">@digicam_il</a> to see the next drop first.')}</p>
    </div>`);
}
grid.innerHTML = onShelf.map(c => `
  <li class="card" data-type="${c.type}">
    <div class="card__frame${c.img ? " card__frame--photo" : ""}" style="--tint:${c.tint || "#f3e7b8"}">
      ${c.sold ? `<span class="card__badge card__badge--sold">${T("Sold")}</span>` : c.badge ? `<span class="card__badge">${T(c.badge)}</span>` : ""}
      ${c.img ? `<img src="${c.img}" alt="${c.name}" loading="lazy">` : cameraSVG(c)}
    </div>
    <div class="card__meta"><span>${c.name}</span><span>${priceText(c)}</span></div>
    <div class="card__spec">${c.spec}</div>
    ${buyButton(c)}
  </li>`).join("");

// Filters — a filter with no cameras in it is hidden
document.querySelectorAll(".filters button").forEach(btn => {
  const f = btn.dataset.filter;
  if (f !== "all" && !cameras.some(c => c.type === f)) btn.hidden = true;
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
  grid.querySelectorAll("button.card__add[data-id]").forEach(b => {
    const inBag = Cart.has(b.dataset.id);
    b.textContent = inBag ? T("In bag ✓") : T("Add to bag");
    b.classList.toggle("is-in", inBag);
  });
}
grid.addEventListener("click", e => {
  const btn = e.target.closest("button.card__add[data-id]");
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
