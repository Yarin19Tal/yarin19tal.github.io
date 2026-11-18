// Contact form.
// Right now "Send" opens the visitor's email app with the message filled in,
// addressed to TO. To have messages sent straight from the page instead,
// set FORM_ENDPOINT to a form service URL (e.g. Formspree: https://formspree.io/f/xxxx).
const TO = "yarintal.digicam@gmail.com";
const FORM_ENDPOINT = "";

const form = document.getElementById("contactForm");
const err = document.getElementById("formError");
const done = document.getElementById("formDone");

form.addEventListener("submit", async e => {
  e.preventDefault();
  const fields = [...form.querySelectorAll("input, textarea")];
  let ok = true;
  fields.forEach(f => {
    const bad = !f.value.trim() || (f.type === "email" && !f.checkValidity());
    f.classList.toggle("is-invalid", bad);
    f.setAttribute("aria-invalid", bad);
    if (bad) ok = false;
  });
  err.hidden = ok;
  if (!ok) { fields.find(f => f.classList.contains("is-invalid")).focus(); return; }

  const d = Object.fromEntries(new FormData(form));
  const name = `${d.first.trim()} ${d.last.trim()}`;

  if (FORM_ENDPOINT) {
    const btn = form.querySelector(".cform__send");
    btn.disabled = true; btn.textContent = T("Sending…");
    try {
      const r = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!r.ok) throw new Error();
      form.reset();
      done.textContent = T("Thank you. Your message was sent, I'll get back to you soon.");
      done.hidden = false;
    } catch {
      err.textContent = T("Couldn't send right now. Please email {to} directly.", { to: TO });
      err.hidden = false;
    } finally {
      btn.disabled = false; btn.textContent = T("Send");
    }
    return;
  }

  const body = `${d.message.trim()}\n\n— ${name}\n${d.email.trim()}`;
  location.href = `mailto:${TO}?subject=${encodeURIComponent(d.subject.trim())}&body=${encodeURIComponent(body)}`;
  done.hidden = false;
});

// Clear the red border as soon as a field is fixed
form.addEventListener("input", e => {
  if (e.target.value.trim()) { e.target.classList.remove("is-invalid"); e.target.removeAttribute("aria-invalid"); }
});
