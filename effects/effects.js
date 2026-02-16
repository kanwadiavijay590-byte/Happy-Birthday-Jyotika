/* =========================
   FLOATING HEARTS
   ========================= */

function createHeart() {
  const heart = document.createElement("div");
  heart.className = "floating-heart";

  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 12 + Math.random() * 6 + "s";
  heart.style.opacity = 1.00 + Math.random() * 0.35; // 🔥 very solid

  document.body.appendChild(heart);

  setTimeout(() => heart.remove(), 18000);
}

// calm pace
setInterval(createHeart, 2400);

/* =========================
   FLOWER PETALS
   ========================= */

function createPetal() {
  const petal = document.createElement("div");
  petal.className = "flower-petal";

  petal.style.left = Math.random() * 100 + "vw";
  petal.style.animationDuration = 11 + Math.random() * 6 + "s";
  petal.style.setProperty("--drift", (Math.random() * 120 - 60) + "px");
  petal.style.opacity = 0.75 + Math.random() * 0.35;

  document.body.appendChild(petal);

  setTimeout(() => petal.remove(), 17000);
}

setInterval(createPetal, 1600);

/* =========================
   FIREWORKS (WELCOME ONLY)
   ========================= */

function launchFirework(x, y) {
  const colors = ["#ff5f9e", "#ff8fb8", "#ffc2d1", "#ffd166"];
  const particles = 20;

  for (let i = 0; i < particles; i++) {
    const particle = document.createElement("div");
    particle.className = "firework";

    const angle = Math.random() * Math.PI * 2;
    const distance = 90 + Math.random() * 90;

    particle.style.left = x + "px";
    particle.style.top = y + "px";
    particle.style.color =
      colors[Math.floor(Math.random() * colors.length)];

    particle.style.setProperty("--x", Math.cos(angle) * distance + "px");
    particle.style.setProperty("--y", Math.sin(angle) * distance + "px");

    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), 1400);
  }
}

function celebrateWelcome() {
  let bursts = 0;

  const interval = setInterval(() => {
    const x = window.innerWidth * (0.3 + Math.random() * 0.4);
    const y = window.innerHeight * (0.2 + Math.random() * 0.25);

    launchFirework(x, y);
    bursts++;

    if (bursts >= 5) clearInterval(interval);
  }, 420);
}