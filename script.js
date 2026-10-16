// Typing roles, mobile nav, footer year. No dependencies.
const roles = [
  "Java Backend Developer",
  "Spring Boot Engineer",
  "Microservices Enthusiast",
  "AI Integration Explorer",
];
const el = document.getElementById("typed");
let ri = 0, ci = 0, deleting = false;
function tick() {
  const word = roles[ri];
  el.textContent = word.slice(0, ci);
  if (!deleting && ci < word.length) { ci++; setTimeout(tick, 70); }
  else if (!deleting) { deleting = true; setTimeout(tick, 1400); }
  else if (ci > 0) { ci--; setTimeout(tick, 35); }
  else { deleting = false; ri = (ri + 1) % roles.length; setTimeout(tick, 300); }
}
tick();

const burger = document.getElementById("burger");
const links = document.getElementById("navLinks");
burger.addEventListener("click", () => links.classList.toggle("open"));
links.querySelectorAll("a").forEach(a =>
  a.addEventListener("click", () => links.classList.remove("open"))
);

document.getElementById("year").textContent = new Date().getFullYear();
