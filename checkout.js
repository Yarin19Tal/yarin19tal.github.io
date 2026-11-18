// Checkout: shows everything in the bag (cart.js) and sends it to PayPal as one order.
// Old links like checkout.html?item=<id> still work: the item is added to the bag first.

const money = Cart.money;
const params = new URLSearchParams(location.search);
if (params.get("item") && Cart.find(params.get("item"))) {
  const id = params.get("item");
  if (!Cart.has(id)) { Cart.add(id); Cart.close(); }
  history.replaceState(null, "", "checkout.html");
}

// "Keep shopping" goes back to where the buyer came from.
document.getElementById("backLink").addEventListener("click", e => {
  e.preventDefault();
  if (document.referrer && new URL(document.referrer).origin === location.origin) history.back();
  else location.href = "presets.html";
});

const terms = document.getElementById("terms");
const pay = document.getElementById("payBtn");

function render() {
  const items = Cart.items();
  document.getElementById("checkout").hidden = items.length === 0;
  document.getElementById("missing").hidden = items.length > 0;
  if (!items.length) return;

  const cams = items.filter(i => i.kind === "camera");
  const files = items.filter(i => i.kind === "preset");

  document.getElementById("orderList").innerHTML = items.map(it => `
    <li class="order__item">
      ${it.kind === "preset"
        ? `<div class="order__thumb" style="background-image:url('photos/thumbs/${it.photo}')"></div>`
        : `<div class="order__thumb order__thumb--cam" style="--tint:${it.cam.tint}">${it.cam.img ? `<img src="${it.cam.img}" alt="">` : cameraSVG(it.cam)}</div>`}
      <div>
        <p class="order__name">${it.name}</p>
        <p class="order__mood">${it.sub}</p>
        <button type="button" class="order__remove" data-id="${it.id}">Remove</button>
      </div>
      <p class="order__price">${it.was ? `<s>${money(it.was)}</s> ` : ""}${money(it.price)}</p>
    </li>`).join("");

  // Two or more single styles → offer the full set
  const singles = files.filter(i => i.id !== BUNDLE.id);
  const up = document.getElementById("upsell");
  up.hidden = singles.length < 2;
  up.innerHTML = `<span>Get all ${PRESETS.length} styles for ${money(BUNDLE.price)} instead</span><span>Switch →</span>`;

  const inc = [];
  if (files.length) inc.push("Capture One style files (.costyle)", "Sent to your PayPal email within a few hours", "Free updates to the styles you buy", "Install guide");
  if (cams.length) inc.push(`${cams.length === 1 ? "A tested camera" : `${cams.length} tested cameras`}, cleaned and ready to shoot`, "Shipping confirmed with you by email");
  document.getElementById("included").innerHTML = inc.map(t => `<li>${t}</li>`).join("");

  document.getElementById("subtotal").textContent = money(Cart.total());
  document.getElementById("total").textContent = money(Cart.total());
  document.getElementById("shipRow").hidden = cams.length === 0;

  document.getElementById("termsText").textContent =
    files.length && cams.length ? "I understand presets are digital files for Capture One, and camera shipping is confirmed by email."
    : files.length ? "I understand these are digital files for Capture One, sent by email."
    : "I understand each camera is a used, one-of-a-kind item and shipping is confirmed by email.";
  document.getElementById("payNote").textContent =
    "You'll pay on PayPal's secure page, with a PayPal account or a card." +
    (files.length ? " Your preset files are sent to your PayPal email within a few hours." : "") +
    (cams.length ? " PayPal will ask for your shipping address." : "");
  document.title = `Checkout (${items.length}) — Yarin Tal`;
}

document.getElementById("orderList").addEventListener("click", e => {
  const r = e.target.closest(".order__remove");
  if (r) Cart.remove(r.dataset.id);
});
document.getElementById("upsell").addEventListener("click", () => Cart.swapToBundle());
Cart.onChange(render);
render();

// What goes to PayPal, and where they come back to.
function order() {
  const items = Cart.items();
  const cams = items.some(i => i.kind === "camera"), files = items.some(i => i.kind === "preset");
  return { items, cams, files, kind: cams && files ? "mixed" : cams ? "cameras" : "presets" };
}
const lineName = it => it.kind === "camera" ? `DIGICAM — ${it.name}`
  : `${it.name} — Capture One style${it.id === BUNDLE.id ? "s" : ""}`;

function shake() {
  const label = terms.closest("label");
  label.classList.add("shake");
  setTimeout(() => label.classList.remove("shake"), 400);
  terms.focus();
}

if (PAYPAL.clientId) setupPayPal();
else if (PAYPAL.merchantId) setupPayPalClassic();
else {
  // Not connected: offer email instead.
  pay.hidden = true;
  document.querySelector(".pay__terms").hidden = true;
  document.getElementById("payNote").hidden = true;
  document.getElementById("payOffline").hidden = false;
  document.getElementById("mailBtn").addEventListener("click", e => {
    const list = Cart.items().map(i => `- ${i.name} (${money(i.price)})`).join("\n");
    e.currentTarget.href = `mailto:${EMAIL}?subject=${encodeURIComponent("Order")}&body=${encodeURIComponent(`Hi Yarin, I'd like to order:\n${list}\nTotal: ${money(Cart.total())}`)}`;
  });
}

// ---------- PayPal (Merchant ID only) ----------
// Sends the whole bag to PayPal's own checkout page, then PayPal brings the buyer back to thanks.html.
function setupPayPalClassic() {
  const sync = () => pay.setAttribute("aria-disabled", !terms.checked);
  terms.addEventListener("change", sync);
  sync();

  pay.addEventListener("click", e => {
    e.preventDefault();
    if (!terms.checked) return shake();
    const o = order();
    if (!o.items.length) return;
    const here = location.href.replace(/[^/]*$/, "");
    const fields = {
      cmd: "_cart", upload: "1",
      business: PAYPAL.merchantId,
      currency_code: PAYPAL.currency,
      no_shipping: o.cams ? "2" : "1",     // 2 = ask for an address, 1 = don't
      no_note: "1",
      charset: "utf-8",
      return: `${here}thanks.html?paid=paypal&order=${o.kind}`,
      cancel_return: location.href,
    };
    o.items.forEach((it, k) => {
      fields[`item_name_${k + 1}`] = lineName(it);
      fields[`item_number_${k + 1}`] = it.id;
      fields[`amount_${k + 1}`] = it.price.toFixed(2);
      fields[`quantity_${k + 1}`] = "1";
    });
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "https://www.paypal.com/cgi-bin/webscr";
    for (const [k, v] of Object.entries(fields)) {
      const input = document.createElement("input");
      input.type = "hidden"; input.name = k; input.value = v;
      form.appendChild(input);
    }
    document.body.appendChild(form);
    form.submit();
  });
}

// ---------- PayPal buttons inside the page (needs PAYPAL.clientId) ----------
function setupPayPal() {
  const box = document.getElementById("paypalBox");
  const msg = document.getElementById("paypalMsg");
  pay.hidden = true;
  box.hidden = false;

  const s = document.createElement("script");
  s.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(PAYPAL.clientId)}&currency=${PAYPAL.currency}&intent=capture&components=buttons&locale=en_US`;
  s.onerror = () => { msg.textContent = "PayPal couldn't load. Refresh the page, or email me to order."; };
  s.onload = () => {
    paypal.Buttons({
      style: { layout: "vertical", color: "black", shape: "rect", label: "pay", height: 48 },
      onInit: (data, actions) => {
        terms.checked ? actions.enable() : actions.disable();
        terms.addEventListener("change", () => (terms.checked ? actions.enable() : actions.disable()));
      },
      onClick: () => { if (!terms.checked) shake(); },
      createOrder: (data, actions) => {
        const o = order();
        const value = o.items.reduce((t, i) => t + i.price, 0).toFixed(2);
        return actions.order.create({
          purchase_units: [{
            description: "Yarin Tal / DIGICAM order",
            amount: { currency_code: PAYPAL.currency, value,
              breakdown: { item_total: { currency_code: PAYPAL.currency, value } } },
            items: o.items.map(it => ({
              name: lineName(it).slice(0, 127), sku: it.id, quantity: "1",
              category: it.kind === "camera" ? "PHYSICAL_GOODS" : "DIGITAL_GOODS",
              unit_amount: { currency_code: PAYPAL.currency, value: it.price.toFixed(2) },
            })),
          }],
          application_context: { shipping_preference: o.cams ? "GET_FROM_FILE" : "NO_SHIPPING", brand_name: "Yarin Tal" },
        });
      },
      onApprove: (data, actions) => actions.order.capture().then(res => {
        const q = new URLSearchParams({ paid: "paypal", order: order().kind, ref: res.id });
        location.href = `thanks.html?${q}`;
      }),
      onCancel: () => { msg.textContent = "Payment cancelled. You haven't been charged."; },
      onError: () => { msg.textContent = `Something went wrong with PayPal. You haven't been charged. Try again, or email ${EMAIL}.`; },
    }).render("#paypalButtons");
  };
  document.head.appendChild(s);
}
