// Checkout: shows the order for ?item=<id> and hands off to the payment provider's secure page.

const id = new URLSearchParams(location.search).get("item");
const item = findProduct(id);

if (!item) {
  document.getElementById("checkout").hidden = true;
  document.getElementById("missing").hidden = false;
} else {
  const money = n => `${CURRENCY}${n}`;
  const isBundle = item.id === BUNDLE.id;

  document.title = `Checkout · ${item.name} — Yarin Tal`;
  document.getElementById("orderThumb").style.backgroundImage = `url("photos/thumbs/${item.photo}")`;
  document.getElementById("orderName").textContent = isBundle ? item.name : `${item.name} — Capture One style`;
  document.getElementById("orderMood").textContent = item.mood;
  document.getElementById("orderDesc").textContent = item.desc;
  document.getElementById("orderPrice").innerHTML = isBundle && item.was
    ? `<s>${money(item.was)}</s> ${money(item.price)}` : money(item.price);
  document.getElementById("subtotal").textContent = money(item.price);
  document.getElementById("total").textContent = money(item.price);
  document.getElementById("fileCount").textContent = isBundle ? `s ×${PRESETS.length}` : "";

  // Single preset → offer the bundle
  if (!isBundle) {
    const up = document.getElementById("upsell");
    up.hidden = false;
    up.innerHTML = `<span>Get all ${PRESETS.length} styles for ${money(BUNDLE.price)} instead</span><span>Switch →</span>`;
  }

  const pay = document.getElementById("payBtn");
  const terms = document.getElementById("terms");

  if (PAYPAL.clientId) {
    setupPayPal(item, terms, money);
  } else if (PAYPAL.merchantId) {
    setupPayPalClassic(item, terms);
  } else if (item.checkoutUrl) {
    // Payments connected: the button goes to the provider's secure payment page.
    pay.href = item.checkoutUrl;
    const sync = () => pay.setAttribute("aria-disabled", !terms.checked);
    terms.addEventListener("change", sync);
    sync();
    pay.addEventListener("click", e => {
      if (!terms.checked) {
        e.preventDefault();
        terms.focus();
        terms.closest("label").classList.add("shake");
        setTimeout(() => terms.closest("label").classList.remove("shake"), 400);
      }
    });
  } else {
    // Not connected yet: be honest and offer email instead.
    pay.hidden = true;
    document.getElementById("payNote").hidden = true;
    document.querySelector(".pay__terms").hidden = true;
    document.querySelector(".pay__methods").hidden = true;
    const subject = `${item.name} (${money(item.price)})`;
    document.getElementById("payOffline").hidden = false;
    document.getElementById("mailBtn").href =
      `mailto:${EMAIL}?subject=${encodeURIComponent("Buying: " + subject)}&body=${encodeURIComponent("Hi Yarin, I'd like to buy " + subject + ".")}`;
  }
}

// ---------- PayPal ----------
// Renders PayPal's buttons (PayPal, and card where PayPal offers it).
// The payment happens in PayPal's own secure window; nothing touches this site.
function setupPayPal(item, terms, money) {
  const box = document.getElementById("paypalBox");
  const msg = document.getElementById("paypalMsg");
  document.getElementById("payBtn").hidden = true;
  document.getElementById("payNote").textContent =
    "Pay with PayPal or a card in PayPal's secure window. Your files are sent to your PayPal email within a few hours.";
  const dl = [...document.querySelectorAll(".included li")].find(li => /Download link/.test(li.textContent));
  if (dl) dl.textContent = "Files sent to your PayPal email";
  document.querySelector(".pay__methods").textContent = "PayPal · Credit / debit card";
  box.hidden = false;

  const shake = () => {
    const label = terms.closest("label");
    label.classList.add("shake");
    setTimeout(() => label.classList.remove("shake"), 400);
    terms.focus();
  };

  const s = document.createElement("script");
  s.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(PAYPAL.clientId)}&currency=${PAYPAL.currency}&intent=capture&components=buttons&locale=en_US`;
  s.onerror = () => { msg.textContent = "PayPal couldn't load. Refresh the page, or email me to buy."; };
  s.onload = () => {
    paypal.Buttons({
      style: { layout: "vertical", color: "black", shape: "rect", label: "pay", height: 48 },

      // Buttons stay locked until the terms box is ticked.
      onInit: (data, actions) => {
        terms.checked ? actions.enable() : actions.disable();
        terms.addEventListener("change", () => (terms.checked ? actions.enable() : actions.disable()));
      },
      onClick: () => { if (!terms.checked) shake(); },

      createOrder: (data, actions) => actions.order.create({
        purchase_units: [{
          reference_id: item.id,
          custom_id: item.id,
          description: `${item.name} — Capture One style${item.id === BUNDLE.id ? "s" : ""} (Yarin Tal)`,
          amount: { currency_code: PAYPAL.currency, value: item.price.toFixed(2) },
        }],
        application_context: { shipping_preference: "NO_SHIPPING", brand_name: "Yarin Tal" },
      }),

      onApprove: (data, actions) => actions.order.capture().then(order => {
        const q = new URLSearchParams({ item: item.id, paid: "paypal", ref: order.id });
        location.href = `thanks.html?${q}`;
      }),

      onCancel: () => { msg.textContent = "Payment cancelled. You haven't been charged."; },
      onError: () => { msg.textContent = `Something went wrong with PayPal. You haven't been charged. Try again, or email ${EMAIL}.`; },
    }).render("#paypalButtons");
  };
  document.head.appendChild(s);
}

// ---------- PayPal (Merchant ID only) ----------
// Sends the buyer to PayPal's own checkout page with the price filled in,
// then PayPal brings them back to thanks.html.
function setupPayPalClassic(item, terms) {
  const pay = document.getElementById("payBtn");
  pay.textContent = "Pay with PayPal";
  pay.href = "#";
  document.getElementById("payNote").textContent =
    "You'll pay on PayPal's secure page, with a PayPal account or a card. Your files are sent to your PayPal email within a few hours.";
  document.querySelector(".pay__methods").textContent = "PayPal · Credit / debit card";
  const dl = [...document.querySelectorAll(".included li")].find(li => /Download link/.test(li.textContent));
  if (dl) dl.textContent = "Files sent to your PayPal email";

  const here = location.href.replace(/[^/]*$/, "");   // folder of this page
  const fields = {
    cmd: "_xclick",
    business: PAYPAL.merchantId,
    item_name: `${item.name} — Capture One style${item.id === BUNDLE.id ? "s" : ""} (Yarin Tal)`,
    item_number: item.id,
    amount: item.price.toFixed(2),
    currency_code: PAYPAL.currency,
    no_shipping: "1",
    no_note: "1",
    charset: "utf-8",
    return: `${here}thanks.html?item=${item.id}&paid=paypal`,
    cancel_return: location.href,
  };

  const sync = () => pay.setAttribute("aria-disabled", !terms.checked);
  terms.addEventListener("change", sync);
  sync();

  pay.addEventListener("click", e => {
    e.preventDefault();
    if (!terms.checked) {
      const label = terms.closest("label");
      label.classList.add("shake");
      setTimeout(() => label.classList.remove("shake"), 400);
      terms.focus();
      return;
    }
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
