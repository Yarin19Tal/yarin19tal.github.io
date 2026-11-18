// Renders the preset list from presets-data.js and drives the before/after sliders.

const list = document.getElementById("presets");
list.innerHTML = PRESETS.map(p => `
  <article class="preset" id="${p.id}">
    <div class="compare" style="--pos:50%">
      <div class="compare__layer compare__before"></div>
      <div class="compare__layer compare__after" style="${p.afterPhoto ? "" : `filter:${p.look}`}"></div>
      <div class="compare__line"></div>
      <span class="compare__tag compare__tag--before">${T("Before")}</span>
      <span class="compare__tag compare__tag--after">${p.name}${p.afterPhoto ? "" : T(" · preview")}</span>
      <input type="range" min="0" max="100" value="50" step="0.5" aria-label="${T("Compare before and after for {name}", { name: p.name })}">
    </div>
    <div class="preset__text">
      <h2 class="preset__name">${p.name}</h2>
      <p class="preset__mood">${T(p.mood)}</p>
      <p class="preset__desc">${T(p.desc)}</p>
      <div class="preset__buy">
        <span class="preset__price">${CURRENCY}${p.price}</span>
        <a class="btn" href="checkout.html?item=${p.id}">${T("Add to bag")}</a>
      </div>
    </div>
  </article>`).join("");

document.getElementById("bundlePrice").innerHTML = `<s>${CURRENCY}${BUNDLE.was}</s> ${CURRENCY}${BUNDLE.price}`;

list.querySelectorAll(".compare").forEach((box, i) => {
  const p = PRESETS[i];
  const before = box.querySelector(".compare__before");
  const after = box.querySelector(".compare__after");

  // Load the before photo; the after layer uses the exported file when there is one.
  const img = new Image();
  img.onload = () => {
    before.style.backgroundImage = `url("photos/${p.photo}")`;
    after.style.backgroundImage = `url("photos/${p.afterPhoto || p.photo}")`;
    box.style.aspectRatio = `${img.naturalWidth} / ${img.naturalHeight}`;
  };
  img.onerror = () => box.classList.add("is-missing");
  img.src = `photos/${p.photo}`;

  // Pointer (mouse, pen, touch) and keyboard all move the same divider.
  const range = box.querySelector("input");
  const set = v => { box.style.setProperty("--pos", v + "%"); range.value = v; };
  range.addEventListener("input", () => set(range.value));

  let dragging = false;
  const fromPointer = e => {
    const r = box.getBoundingClientRect();
    set(Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100)));
  };
  box.addEventListener("pointerdown", e => {
    dragging = true;
    box.setPointerCapture(e.pointerId);
    fromPointer(e);
    e.preventDefault();
  });
  box.addEventListener("pointermove", e => { if (dragging) fromPointer(e); });
  const stop = () => (dragging = false);
  box.addEventListener("pointerup", stop);
  box.addEventListener("pointercancel", stop);
  box.addEventListener("lostpointercapture", stop);
});
