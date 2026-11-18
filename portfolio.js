// ─────────────────────────────────────────────────────────────
//  YOUR PHOTOS
//  Full-size files live in photos/, small previews in photos/thumbs/.
//  The list below sets the order on the page — move lines to reorder.
//  `place` shows under each photo (leave "" to show nothing).
//  `series`: "fuji" | "ricoh" | "bw"  (used by the filter buttons)
//  The big opening photo is photos/hero.jpg.
// ─────────────────────────────────────────────────────────────
const HERO_CAPTION = "Italy · Fuji X100V";

const CAMERAS = { fuji: "Fuji X100V", ricoh: "Ricoh GR", bw: "Ricoh GR" };

const photos = [
  { file: "fuji-29.jpg", w: 1776, h: 1184, series: "fuji", place: "Naples, Italy" },
  { file: "fuji-07.jpg", w: 724, h: 1086, series: "fuji", place: "Ko Phangan, Thailand" },
  { file: "fuji-13.jpg", w: 1086, h: 724, series: "fuji", place: "Thailand" },
  { file: "ricoh-01.jpg", w: 1180, h: 665, series: "ricoh", place: "Israel" },
  { file: "fuji-34.jpg", w: 2000, h: 1333, series: "fuji", place: "" },
  { file: "fuji-24.jpg", w: 1776, h: 1184, series: "fuji", place: "Thailand" },
  { file: "fuji-28.jpg", w: 1184, h: 1776, series: "fuji", place: "Naples, Italy" },
  { file: "fuji-35.jpg", w: 1086, h: 724, series: "fuji", place: "" },
  { file: "fuji-03.jpg", w: 1086, h: 724, series: "fuji", place: "Italy" },
  { file: "ricoh-bw-02.jpg", w: 1325, h: 2000, series: "bw", place: "Israel" },
  { file: "fuji-27.jpg", w: 1776, h: 1184, series: "fuji", place: "Thailand" },
  { file: "fuji-15.jpg", w: 1086, h: 724, series: "fuji", place: "Italy" },
  { file: "fuji-33.jpg", w: 1184, h: 1776, series: "fuji", place: "Naples, Italy" },
  { file: "fuji-22.jpg", w: 1776, h: 1184, series: "fuji", place: "Thailand" },
  { file: "fuji-25.jpg", w: 1184, h: 1776, series: "fuji", place: "Thailand" },
  { file: "ricoh-03.jpg", w: 1180, h: 665, series: "ricoh", place: "Israel" },
  { file: "fuji-31.jpg", w: 1184, h: 1776, series: "fuji", place: "Naples, Italy" },
  { file: "fuji-17.jpg", w: 1086, h: 724, series: "fuji", place: "" },
  { file: "fuji-09.jpg", w: 724, h: 1086, series: "fuji", place: "Thailand" },
  { file: "fuji-04.jpg", w: 724, h: 1086, series: "fuji", place: "Italy" },
  { file: "fuji-30.jpg", w: 1776, h: 1184, series: "fuji", place: "Naples, Italy" },
  { file: "fuji-23.jpg", w: 1776, h: 1184, series: "fuji", place: "Thailand" },
  { file: "ricoh-02.jpg", w: 1182, h: 666, series: "ricoh", place: "Israel" },
  { file: "fuji-37.jpg", w: 1086, h: 724, series: "fuji", place: "Italy" },
  { file: "fuji-16.jpg", w: 724, h: 1086, series: "fuji", place: "Thailand" },
  { file: "fuji-38.jpg", w: 724, h: 1086, series: "fuji", place: "Italy" },
  { file: "fuji-32.jpg", w: 1184, h: 1776, series: "fuji", place: "Naples, Italy" },
  { file: "fuji-26.jpg", w: 1184, h: 1776, series: "fuji", place: "Thailand" },
  { file: "ricoh-bw-01.jpg", w: 2000, h: 1325, series: "bw", place: "Israel" },
  { file: "fuji-12.jpg", w: 1086, h: 724, series: "fuji", place: "Italy" },
  { file: "fuji-21.jpg", w: 1178, h: 785, series: "fuji", place: "Thailand" },
  { file: "fuji-10.jpg", w: 1086, h: 724, series: "fuji", place: "" },
  { file: "fuji-19.jpg", w: 1086, h: 724, series: "fuji", place: "Italy" },
  { file: "fuji-36.jpg", w: 1086, h: 724, series: "fuji", place: "Italy" },
  { file: "ricoh-04.jpg", w: 1180, h: 665, series: "ricoh", place: "Israel" },
  { file: "fuji-18.jpg", w: 724, h: 1086, series: "fuji", place: "Italy" },
  { file: "fuji-08.jpg", w: 1086, h: 724, series: "fuji", place: "" },
  { file: "fuji-20.jpg", w: 1086, h: 724, series: "fuji", place: "Italy" },
  { file: "ricoh-bw-03.jpg", w: 2000, h: 1325, series: "bw", place: "Israel" },
  { file: "fuji-06.jpg", w: 1086, h: 724, series: "fuji", place: "" },
  { file: "fuji-02.jpg", w: 724, h: 1086, series: "fuji", place: "Italy" },
  { file: "fuji-11.jpg", w: 724, h: 1086, series: "fuji", place: "Italy" },
  { file: "fuji-05.jpg", w: 724, h: 1086, series: "fuji", place: "Italy" },
  { file: "fuji-14.jpg", w: 1466, h: 977, series: "fuji", place: "Italy" },
  { file: "fuji-01.jpg", w: 724, h: 1086, series: "fuji", place: "Italy" },
];

// ---------- Hero ----------
const hero = document.querySelector(".hero__photo");
const heroImg = new Image();
heroImg.onload = () => (hero.style.backgroundImage = `url("${hero.dataset.src}")`);
heroImg.onerror = () => hero.classList.add("is-missing");
heroImg.src = hero.dataset.src;
document.getElementById("heroCaption").textContent = HERO_CAPTION;

// ---------- Gallery (masonry that keeps reading order left → right) ----------
const gallery = document.getElementById("gallery");
const countEl = document.getElementById("workCount");
const label = p => p.place || "Untitled";
let filter = "all";

const figures = photos.map((p, i) => {
  const fig = document.createElement("figure");
  fig.className = "shot";
  fig.tabIndex = 0;
  fig.dataset.i = i;
  fig.innerHTML = `
    <div class="shot__frame" style="aspect-ratio:${p.w} / ${p.h}">
      <img src="photos/thumbs/${p.file}" alt="${label(p)}, ${CAMERAS[p.series]}" loading="lazy" width="${p.w}" height="${p.h}">
    </div>
    <figcaption><span>${label(p)}</span><span>${CAMERAS[p.series]}${p.series === "bw" ? " · B&amp;W" : ""}</span></figcaption>`;
  return fig;
});

const visible = () => photos.map((p, i) => i).filter(i => filter === "all" || photos[i].series === filter);

function layout() {
  const w = gallery.clientWidth;
  const n = w > 1100 ? 3 : w > 640 ? 2 : 1;
  const cols = Array.from({ length: n }, () => {
    const c = document.createElement("div");
    c.className = "gallery__col";
    return { el: c, h: 0 };
  });
  for (const i of visible()) {
    const col = cols.reduce((a, b) => (b.h < a.h - 0.01 ? b : a)); // shortest column, leftmost on ties
    col.el.appendChild(figures[i]);
    col.h += photos[i].h / photos[i].w + 0.12; // + caption space
  }
  gallery.replaceChildren(...cols.map(c => c.el));
  const v = visible().length;
  countEl.textContent = `${v} photograph${v === 1 ? "" : "s"}`;
}

let lastCols = 0;
addEventListener("resize", () => {
  const w = gallery.clientWidth;
  const n = w > 1100 ? 3 : w > 640 ? 2 : 1;
  if (n !== lastCols) { lastCols = n; layout(); }
});
lastCols = gallery.clientWidth > 1100 ? 3 : gallery.clientWidth > 640 ? 2 : 1;
layout();

// Filters
document.querySelectorAll(".work__filters button").forEach(btn => {
  btn.addEventListener("click", () => {
    filter = btn.dataset.filter;
    document.querySelectorAll(".work__filters button").forEach(b => b.setAttribute("aria-pressed", b === btn));
    layout();
  });
});

// ---------- Lightbox (loads the full-size photo) ----------
const box = document.getElementById("lightbox");
const boxImg = document.getElementById("lightboxImg");
const boxCap = document.getElementById("lightboxCap");
let current = 0;
let lastFocus = null;

function open(i) {
  current = i;
  const p = photos[i];
  boxImg.src = `photos/thumbs/${p.file}`;          // instant
  const full = new Image();
  full.onload = () => { if (current === i) boxImg.src = full.src; };
  full.src = `photos/${p.file}`;                    // sharp
  boxImg.alt = `${label(p)}, ${CAMERAS[p.series]}`;
  boxCap.textContent = `${label(p)} · ${CAMERAS[p.series]}`;
  if (box.hidden) { lastFocus = document.activeElement; box.hidden = false; document.body.style.overflow = "hidden"; }
  box.querySelector(".lightbox__close").focus();
}
function close() {
  box.hidden = true; document.body.style.overflow = "";
  lastFocus && lastFocus.focus();
}
function step(d) {
  const list = visible();
  const k = list.indexOf(current);
  open(list[(k + d + list.length) % list.length]);
}

gallery.addEventListener("click", e => {
  const shot = e.target.closest(".shot");
  if (shot) open(+shot.dataset.i);
});
gallery.addEventListener("keydown", e => {
  const shot = e.target.closest(".shot");
  if (shot && e.key === "Enter") open(+shot.dataset.i);
});
box.querySelector(".lightbox__close").addEventListener("click", close);
box.querySelector(".lightbox__nav--prev").addEventListener("click", () => step(-1));
box.querySelector(".lightbox__nav--next").addEventListener("click", () => step(1));
box.addEventListener("click", e => { if (e.target === box) close(); });
document.addEventListener("keydown", e => {
  if (box.hidden) return;
  if (e.key === "Escape") close();
  if (e.key === "ArrowRight") step(1);
  if (e.key === "ArrowLeft") step(-1);
});

// ---------- Top bar turns solid after the hero ----------
const bar = document.querySelector(".topbar");
const onScroll = () => bar.classList.toggle("is-solid", scrollY > innerHeight - 80);
addEventListener("scroll", onScroll, { passive: true });
onScroll();
