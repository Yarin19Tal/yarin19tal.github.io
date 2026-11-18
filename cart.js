// ─────────────────────────────────────────────────────────────
//  THE BAG — shared by every page.
//  Needs presets-data.js and cameras-data.js loaded first.
//  The bag is saved in the visitor's browser, so it stays when they
//  move between pages. Prices always come from the data files.
//  Any link to "checkout.html?item=<id>" becomes an "add to bag" button.
// ─────────────────────────────────────────────────────────────
const Cart = (() => {
  const KEY = "yt-bag";
  const money = n => `${CURRENCY}${n}`;

  // Look up a product by id: presets, the bundle, or a camera.
  function find(id) {
    const p = typeof findProduct === "function" ? findProduct(id) : null;
    if (p) return { id: p.id, kind: "preset", name: T(p.name), price: p.price, was: p.was,
      sub: p.id === BUNDLE.id ? T("All {n} Capture One styles", { n: PRESETS.length }) : T("Capture One style"), photo: p.photo };
    const c = typeof cameras !== "undefined" ? cameras.find(c => c.id === id) : null;
    if (c && !c.sold) return { id: c.id, kind: "camera", name: c.name, price: c.price, sub: `DIGICAM · ${c.spec}`, cam: c };
    return null;
  }

  let ids = [];
  try { ids = JSON.parse(localStorage.getItem(KEY)) || []; } catch {}
  ids = [...new Set(ids)].filter(find);

  const listeners = [];
  const save = () => {
    localStorage.setItem(KEY, JSON.stringify(ids));
    render();
    listeners.forEach(f => f());
  };

  const items = () => ids.map(find).filter(Boolean);
  const has = id => ids.includes(id);
  const total = () => items().reduce((t, i) => t + i.price, 0);
  const hasBundle = () => has(BUNDLE.id);

  // Adds an item. Returns a short message about what happened.
  function add(id) {
    const it = find(id);
    if (!it) return;
    let note = "";
    if (it.kind === "preset" && id !== BUNDLE.id && hasBundle()) {
      note = T("{name} is already part of {set} in your bag.", { name: it.name, set: BUNDLE.name });
    } else if (!has(id)) {
      if (id === BUNDLE.id) {
        const before = ids.length;
        ids = ids.filter(x => !PRESETS.some(p => p.id === x));      // the set already includes them
        if (ids.length < before) note = T("Your single styles were swapped for {set}, which includes them.", { set: BUNDLE.name });
      }
      ids.push(id);
      save();
      bump();
    }
    open(note);
  }
  function remove(id) { ids = ids.filter(x => x !== id); save(); }
  function clear() { ids = []; save(); }
  function swapToBundle() {
    ids = ids.filter(x => !PRESETS.some(p => p.id === x));
    if (!has(BUNDLE.id)) ids.push(BUNDLE.id);
    save();
  }

  // Small picture for an item (preset photo or camera drawing).
  function thumb(it) {
    if (it.kind === "preset") return `<div class="bagthumb" style="background-image:url('photos/thumbs/${it.photo}')"></div>`;
    const c = it.cam;
    return `<div class="bagthumb bagthumb--cam" style="--tint:${c.tint}">${c.img ? `<img src="${c.img}" alt="">` : cameraSVG(c)}</div>`;
  }

  // ---------- Bag button in the top bar ----------
  let btn = document.querySelector(".bag");
  const end = document.querySelector(".topbar__side--end");
  if (!btn && end && !document.body.hasAttribute("data-no-bag")) {
    btn = document.createElement("button");
    btn.type = "button";
    btn.className = "bag";
    btn.innerHTML = `<span>${T("Bag")}</span> <span class="bag__count">0</span>`;
    end.appendChild(btn);
  }

  // ---------- Drawer ----------
  const drawer = document.createElement("div");
  drawer.className = "drawer";
  drawer.hidden = true;
  drawer.innerHTML = `
    <div class="drawer__panel" role="dialog" aria-modal="true" aria-labelledby="drawerTitle">
      <div class="drawer__head">
        <h2 id="drawerTitle">${T("Your bag")}</h2>
        <button class="drawer__close" type="button" aria-label="${T("Close bag")}">×</button>
      </div>
      <p class="drawer__msg" role="status" hidden></p>
      <p class="drawer__empty">${T("Your bag is empty.")}</p>
      <p class="drawer__links"><a href="presets.html">${T("Shop presets →")}</a> <a href="shop.html#shop">${T("Shop cameras →")}</a></p>
      <ul class="drawer__list"></ul>
      <div class="drawer__foot" hidden>
        <div class="drawer__total"><span>${T("Total")}</span><span class="drawer__sum"></span></div>
        <p class="drawer__note"></p>
        <a class="drawer__pay" href="checkout.html">${T("Checkout")}</a>
        <button class="drawer__keep" type="button">${T("Keep shopping")}</button>
      </div>
    </div>`;
  document.body.appendChild(drawer);
  const $ = s => drawer.querySelector(s);

  function render() {
    const its = items();
    const n = its.length;
    if (btn) {
      btn.querySelector(".bag__count").textContent = n;
      btn.setAttribute("aria-label", n === 1 ? T("Bag, 1 item") : T("Bag, {n} items", { n }));
    }
    $(".drawer__list").innerHTML = its.map(it => `
      <li class="bagitem">
        ${thumb(it)}
        <div class="bagitem__info"><strong>${it.name}</strong><span>${it.sub}</span>
          <button type="button" class="bagitem__remove" data-id="${it.id}">${T("Remove")}</button></div>
        <span class="bagitem__price">${money(it.price)}</span>
      </li>`).join("");
    $(".drawer__empty").hidden = n > 0;
    $(".drawer__links").hidden = n > 0;
    $(".drawer__foot").hidden = n === 0;
    $(".drawer__sum").textContent = money(total());
    const cams = its.some(i => i.kind === "camera"), files = its.some(i => i.kind === "preset");
    $(".drawer__note").textContent =
      T(cams && files ? "Presets are emailed to you; cameras ship after we confirm the details by email."
      : cams ? "Each camera is one of a kind. We confirm shipping with you by email."
      : "Capture One files, sent to your email after payment.");
  }

  let lastFocus = null;
  function open(note = "") {
    const m = $(".drawer__msg");
    m.textContent = note;
    m.hidden = !note;
    if (drawer.hidden) {
      lastFocus = document.activeElement;
      drawer.hidden = false;
      document.body.classList.add("bag-open");
    }
    $(".drawer__close").focus();
  }
  function close() {
    drawer.hidden = true;
    document.body.classList.remove("bag-open");
    lastFocus && lastFocus.focus();
  }
  function bump() {
    if (!btn) return;
    btn.classList.remove("bump"); void btn.offsetWidth; btn.classList.add("bump");
  }

  btn && btn.addEventListener("click", () => open());
  $(".drawer__close").addEventListener("click", close);
  $(".drawer__keep").addEventListener("click", close);
  drawer.addEventListener("click", e => { if (e.target === drawer) close(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !drawer.hidden) close(); });
  $(".drawer__list").addEventListener("click", e => {
    const r = e.target.closest(".bagitem__remove");
    if (r) remove(r.dataset.id);
  });

  // Any "checkout.html?item=<id>" link on the page adds to the bag instead.
  document.addEventListener("click", e => {
    const a = e.target.closest('a[href^="checkout.html?item="]');
    if (!a) return;
    e.preventDefault();
    add(new URL(a.href).searchParams.get("item"));
  });

  // Another tab changed the bag → stay in sync.
  addEventListener("storage", e => {
    if (e.key !== KEY) return;
    try { ids = (JSON.parse(e.newValue) || []).filter(find); } catch { ids = []; }
    render();
    listeners.forEach(f => f());
  });

  render();
  return { add, remove, clear, has, items, total, find, money, swapToBundle, open, close,
    onChange: f => listeners.push(f) };
})();
