const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

// ===== Menú móvil =====
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

navToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
});

navLinks.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  })
);

// ===== Aparición al hacer scroll =====
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ===== Hero: parallax con scroll y cursor + barra de progreso =====
const hero = document.getElementById("hero");
const heroInner = document.getElementById("heroInner");
const scrollCue = document.getElementById("scrollCue");
const floaters = [...document.querySelectorAll(".floater")];
const progress = document.getElementById("progress");

let mouseX = 0, mouseY = 0, curX = 0, curY = 0;

if (canHover && !reduceMotion) {
  hero.addEventListener("pointermove", (e) => {
    const r = hero.getBoundingClientRect();
    mouseX = (e.clientX - r.left) / r.width - 0.5;
    mouseY = (e.clientY - r.top) / r.height - 0.5;
  });
  hero.addEventListener("pointerleave", () => { mouseX = 0; mouseY = 0; });
}

function frame() {
  const sy = window.scrollY;
  const docH = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.transform = `scaleX(${docH > 0 ? sy / docH : 0})`;

  if (!reduceMotion) {
    const h = hero.offsetHeight;
    if (sy < h * 1.2) {
      curX += (mouseX - curX) * 0.08;
      curY += (mouseY - curY) * 0.08;
      const p = Math.min(sy / h, 1);

      floaters.forEach((f) => {
        const d = parseFloat(f.dataset.depth) || 0.5;
        const x = curX * d * 70;
        const y = curY * d * 70 - sy * d * 0.6;
        f.style.transform = `translate3d(${x}px, ${y}px, 0) rotate(${sy * d * 0.06}deg)`;
      });

      heroInner.style.transform = `translate3d(0, ${sy * 0.35}px, 0) scale(${1 - p * 0.08})`;
      heroInner.style.opacity = String(Math.max(0, 1 - p * 1.3));
      scrollCue.style.opacity = String(Math.max(0, 1 - sy / 160));
    }
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);

// ===== Hover interactivo en tarjetas (luz que sigue al cursor + inclinación) =====
if (canHover && !reduceMotion) {
  document.querySelectorAll(".interactive").forEach((el) => {
    el.addEventListener("pointermove", (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
      el.style.setProperty("--rx", `${(y / r.height - 0.5) * -6}deg`);
      el.style.setProperty("--ry", `${(x / r.width - 0.5) * 6}deg`);
    });
    el.addEventListener("pointerleave", () => {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    });
  });
}

// ===== Demo de chat del agente IA =====
const chats = {
  constructora: {
    name: "Asistente · Constructora",
    messages: [
      { from: "in", text: "Hola, necesito cotizar una barda de 30 metros lineales.", time: "02:14" },
      { from: "out", text: "¡Hola! Con gusto te ayudo. ¿Sería de block o concreto, y de qué altura?", time: "02:14" },
      { from: "in", text: "Block, de 2.5 m de alto.", time: "02:15" },
      { from: "out", text: "Perfecto. Te comparto un estimado preliminar con material y mano de obra. ¿Te agendo una visita técnica sin costo esta semana?", time: "02:15" },
    ],
  },
  solar: {
    name: "Asistente · Energía Solar",
    messages: [
      { from: "in", text: "¿Cuánto cuesta instalar paneles solares en mi casa?", time: "23:40" },
      { from: "out", text: "¡Hola! Para darte un precio exacto, ¿cuánto pagas aproximadamente de luz al bimestre?", time: "23:40" },
      { from: "in", text: "Unos $2,800.", time: "23:41" },
      { from: "out", text: "Con ese consumo te recomendamos un sistema de 6 paneles. Te envío la cotización y opciones de financiamiento. ¿A qué correo?", time: "23:41" },
    ],
  },
  clinica: {
    name: "Asistente · Clínica",
    messages: [
      { from: "in", text: "Hola, ¿tienen cita para limpieza dental mañana?", time: "06:05" },
      { from: "out", text: "¡Buen día! Mañana tenemos disponible a las 10:30 y a las 16:00. ¿Cuál prefieres?", time: "06:05" },
      { from: "in", text: "16:00, por favor.", time: "06:06" },
      { from: "out", text: "Listo ✅ Tu cita quedó confirmada mañana a las 16:00. Te enviaré un recordatorio 2 horas antes.", time: "06:06" },
    ],
  },
};

const chatBody = document.getElementById("chatBody");
const chatName = document.getElementById("chatName");
const tabs = document.querySelectorAll(".tab");
let chatTimers = [];
let chatStarted = false;

function clearChat() {
  chatTimers.forEach(clearTimeout);
  chatTimers = [];
  chatBody.innerHTML = "";
}

function addMessage({ from, text, time }) {
  const msg = document.createElement("div");
  msg.className = `msg msg--${from}`;
  msg.textContent = text;
  const t = document.createElement("time");
  t.textContent = time;
  msg.appendChild(t);
  chatBody.appendChild(msg);
}

function showTyping() {
  const typing = document.createElement("div");
  typing.className = "typing";
  typing.setAttribute("aria-label", "Escribiendo");
  typing.innerHTML = "<span></span><span></span><span></span>";
  chatBody.appendChild(typing);
  return typing;
}

function playChat(key) {
  chatStarted = true;
  clearChat();
  const chat = chats[key];
  chatName.textContent = chat.name;

  if (reduceMotion) {
    chat.messages.forEach(addMessage);
    return;
  }

  let delay = 300;
  chat.messages.forEach((m) => {
    if (m.from === "out") {
      let typing;
      chatTimers.push(setTimeout(() => (typing = showTyping()), delay));
      delay += 900;
      chatTimers.push(setTimeout(() => { typing && typing.remove(); addMessage(m); }, delay));
    } else {
      chatTimers.push(setTimeout(() => addMessage(m), delay));
    }
    delay += 700;
  });
}

tabs.forEach((tab) =>
  tab.addEventListener("click", () => {
    tabs.forEach((t) => {
      t.classList.toggle("is-active", t === tab);
      t.setAttribute("aria-selected", String(t === tab));
    });
    playChat(tab.dataset.chat);
  })
);

// Inicia la demo cuando la sección es visible
new IntersectionObserver(
  (entries, obs) => {
    if (entries[0].isIntersecting) {
      if (!chatStarted) playChat("constructora");
      obs.disconnect();
    }
  },
  { threshold: 0.4 }
).observe(document.querySelector(".phone"));

// ===== Año del footer =====
document.getElementById("year").textContent = new Date().getFullYear();
