// Original animation layer: preloader, cursor, canvas net, reveals,
// typing, counters, magnetic buttons, tilt, progress. No dependencies.

// preloader: fake progress until window load, then curtain up
const loader = document.getElementById("loader");
const loadPct = document.getElementById("loadPct");
let pct = 0;
const fake = setInterval(() => {
  pct = Math.min(pct + Math.ceil(Math.random() * 14), 92);
  loadPct.textContent = pct + "%";
}, 120);
window.addEventListener("load", () => {
  clearInterval(fake);
  loadPct.textContent = "100%";
  setTimeout(() => loader.classList.add("done"), 250);
  setTimeout(() => loader.remove(), 1100);
});
setTimeout(() => { loader.classList.add("done"); setTimeout(() => loader.remove(), 1100); }, 4000); // failsafe

// custom cursor dot + trailing glow
const dot = document.getElementById("cDot");
const glow = document.getElementById("cGlow");
let mx = -100, my = -100, gx = -100, gy = -100;
addEventListener("mousemove", (e) => {
  mx = e.clientX; my = e.clientY;
  dot.style.left = mx + "px"; dot.style.top = my + "px";
});
(function follow() {
  gx += (mx - gx) * 0.08; gy += (my - gy) * 0.08;
  glow.style.left = gx + "px"; glow.style.top = gy + "px";
  requestAnimationFrame(follow);
})();

// canvas particle net background
const cv = document.getElementById("bgNet");
const ctx = cv.getContext("2d");
let W, H, pts = [];
function sizeCanvas() {
  W = cv.width = innerWidth; H = cv.height = innerHeight;
  const n = Math.min(90, Math.floor(W * H / 22000));
  pts = Array.from({ length: n }, () => ({
    x: Math.random() * W, y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
  }));
}
sizeCanvas();
addEventListener("resize", sizeCanvas);
(function draw() {
  ctx.clearRect(0, 0, W, H);
  for (const p of pts) {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0 || p.x > W) p.vx *= -1;
    if (p.y < 0 || p.y > H) p.vy *= -1;
    ctx.fillStyle = "rgba(0,200,255,.7)";
    ctx.fillRect(p.x, p.y, 2, 2);
  }
  for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
    const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y, d = Math.hypot(dx, dy);
    if (d < 130) {
      ctx.strokeStyle = `rgba(167,139,250,${(1 - d / 130) * 0.25})`;
      ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
    }
  }
  // link particles near the mouse
  for (const p of pts) {
    const d = Math.hypot(p.x - mx, p.y - my);
    if (d < 160) {
      ctx.strokeStyle = `rgba(0,200,255,${(1 - d / 160) * 0.5})`;
      ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mx, my); ctx.stroke();
    }
  }
  requestAnimationFrame(draw);
})();

// scroll reveals with stagger
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    const d = parseInt(e.target.dataset.delay || "0", 10);
    setTimeout(() => e.target.classList.add("in"), d);
    io.unobserve(e.target);
  }
}, { threshold: 0.12 });
document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));

// typing roles
const roles = ["Java Backend Developer", "Spring Boot Engineer", "Microservices Enthusiast", "AI Integration Explorer"];
const typedEl = document.getElementById("typed");
let ri = 0, ci = 0, del = false;
(function tick() {
  const w = roles[ri];
  typedEl.textContent = w.slice(0, ci);
  if (!del && ci < w.length) { ci++; setTimeout(tick, 70); }
  else if (!del) { del = true; setTimeout(tick, 1400); }
  else if (ci > 0) { ci--; setTimeout(tick, 35); }
  else { del = false; ri = (ri + 1) % roles.length; setTimeout(tick, 300); }
})();

// animated counters
const cio = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    const b = e.target, target = parseInt(b.dataset.count, 10);
    const t0 = performance.now();
    (function step(t) {
      const k = Math.min((t - t0) / 900, 1);
      b.textContent = Math.round(target * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(step);
    })(t0);
    cio.unobserve(b);
  }
}, { threshold: 0.6 });
document.querySelectorAll("[data-count]").forEach((b) => cio.observe(b));

// magnetic buttons
document.querySelectorAll(".magnetic").forEach((el) => {
  el.addEventListener("mousemove", (e) => {
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.25}px)`;
  });
  el.addEventListener("mouseleave", () => { el.style.transform = ""; });
});

// 3D tilt on project cards
document.querySelectorAll(".tilt").forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const r = card.getBoundingClientRect();
    const rx = ((e.clientY - r.top) / r.height - 0.5) * -8;
    const ry = ((e.clientX - r.left) / r.width - 0.5) * 8;
    card.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  });
  card.addEventListener("mouseleave", () => { card.style.transform = ""; });
});

// nav shadow, progress bar, back-to-top, marquee dup, misc
const nav = document.querySelector(".nav");
const prog = document.getElementById("progress");
const toTop = document.getElementById("toTop");
addEventListener("scroll", () => {
  const y = scrollY;
  nav.classList.toggle("scrolled", y > 30);
  const h = document.documentElement.scrollHeight - innerHeight;
  prog.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
  toTop.classList.toggle("show", y > 600);
}, { passive: true });
toTop.addEventListener("click", () => scrollTo({ top: 0, behavior: "smooth" }));

const track = document.getElementById("marqueeTrack");
track.innerHTML += track.innerHTML; // seamless loop

const burger = document.getElementById("burger");
const links = document.getElementById("navLinks");
burger.addEventListener("click", () => links.classList.toggle("open"));
links.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => links.classList.remove("open"))
);
document.getElementById("year").textContent = new Date().getFullYear();
