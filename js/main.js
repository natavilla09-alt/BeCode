/* =========================================================
   DiverX · main.js
   Orden: ayudantes y tokens, Lenis, lo que funciona siempre,
   efectos de mouse, estados iniciales, scroll y arranque.
   ========================================================= */
(() => {
  'use strict';

  // ---------- 1. Ayudantes, banderas y tokens de movimiento ----------
  const d = document;
  const html = d.documentElement;
  const $ = (s, c = d) => c.querySelector(s);
  const $$ = (s, c = d) => [...c.querySelectorAll(s)];
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const SAVE_DATA = !!(navigator.connection && navigator.connection.saveData); // modo ahorro de datos
  const MOVIL = matchMedia('(max-width: 700px)').matches;
  const hasGSAP = typeof window.gsap !== 'undefined' && typeof window.ScrollTrigger !== 'undefined';
  const safe = (fn) => { try { fn(); } catch (e) { console.warn('[diverx]', e); } };

  // Ficha de movimiento aprobada: técnico y potente, sin rebotes
  const M = { ease: 'power4.out', easeIO: 'power3.inOut', dur: 1, stagger: 0.06, dist: 48, lerp: 0.1 };

  const WA = '529381398816'; // WhatsApp de DiverX: +52 938 139 8816

  if (!hasGSAP) html.classList.remove('js');
  else {
    gsap.registerPlugin(ScrollTrigger);
    if (window.SplitText) gsap.registerPlugin(SplitText);
    ScrollTrigger.config({ ignoreMobileResize: true });
  }

  // ---------- 2. Lenis (scroll suave) ----------
  let lenis = null;
  safe(() => {
    if (hasGSAP && !RM && window.Lenis && M.lerp) {
      lenis = new Lenis({ lerp: M.lerp, smoothWheel: true });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((t) => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    }
  });

  // ---------- 3. Lo que funciona siempre ----------

  // Enlaces de WhatsApp con su mensaje según el botón
  safe(() => {
    $$('[data-wa]').forEach((a) => { a.href = `https://wa.me/${WA}?text=${encodeURIComponent(a.dataset.wa)}`; });
  });

  // Año del pie
  safe(() => { $('#anio').textContent = new Date().getFullYear(); });

  // Menú del celular
  const notch = $('#notch');
  const menuBtn = $('#menuBtn');
  const closeMenu = () => {
    notch.classList.remove('is-open');
    menuBtn.setAttribute('aria-expanded', 'false');
    $('.menu-btn__txt', menuBtn).textContent = 'Menú';
    lenis && lenis.start();
  };
  safe(() => {
    menuBtn.addEventListener('click', () => {
      const open = !notch.classList.contains('is-open');
      notch.classList.toggle('is-open', open);
      menuBtn.setAttribute('aria-expanded', String(open));
      $('.menu-btn__txt', menuBtn).textContent = open ? 'Cerrar' : 'Menú';
      lenis && (open ? lenis.stop() : lenis.start());
    });
    d.addEventListener('keydown', (e) => { if (e.key === 'Escape' && notch.classList.contains('is-open')) closeMenu(); });
    // Los enlaces de WhatsApp y redes del menú también lo cierran
    $$('.notch__extra a').forEach((a) => a.addEventListener('click', closeMenu));
  });

  // Anclas suaves
  safe(() => {
    const scrollToEl = (el) => {
      if (lenis) lenis.scrollTo(el, { offset: -10, duration: 1.4 });
      else el.scrollIntoView({ behavior: RM ? 'auto' : 'smooth' });
    };
    d.addEventListener('click', (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const hash = a.getAttribute('href');
      const el = hash.length > 1 ? d.getElementById(hash.slice(1)) : null;
      if (!el) return;
      e.preventDefault();
      if (notch.classList.contains('is-open')) closeMenu();
      scrollToEl(el);
      history.replaceState(null, '', hash);
    });
  });

  // Matriz de luces que dibuja la X
  safe(() => {
    $$('[data-matriz]').forEach((m) => {
      for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) {
        const s = d.createElement('span');
        s.dataset.x = String(r === c || r + c === 8);
        m.appendChild(s);
      }
      // Sin animación, la X se ve encendida desde el inicio
      if (!hasGSAP || RM) $$('span[data-x="true"]', m).forEach((s) => s.classList.add('on'));
    });
  });

  // Barra fija del celular: aparece al pasar la portada y se esconde en contacto
  safe(() => {
    const bar = $('.cta-movil');
    const startEl = $('[data-cta-start]');
    const endEl = $('#contacto');
    if (!bar || !startEl || !('IntersectionObserver' in window)) return;
    let past = false, atEnd = false;
    const update = () => {
      const on = past && !atEnd;
      bar.classList.toggle('is-visible', on);
      bar.setAttribute('aria-hidden', String(!on));
      $$('a', bar).forEach((el) => { el.tabIndex = on ? 0 : -1; });
    };
    new IntersectionObserver(([e]) => { past = !e.isIntersecting && e.boundingClientRect.top < 0; update(); }).observe(startEl);
    new IntersectionObserver(([e]) => { atEnd = e.isIntersecting; update(); }, { threshold: 0.15 }).observe(endEl);
    update();
  });

  // Chat del agente de IA (se conserva de la web original)
  safe(() => {
    const chats = {
      constructora: { name: 'Asistente · Constructora', messages: [
        { from: 'in', text: 'Hola, necesito cotizar una barda de 30 metros lineales.', time: '02:14' },
        { from: 'out', text: '¡Hola! Con gusto te ayudo. ¿Sería de block o concreto, y de qué altura?', time: '02:14' },
        { from: 'in', text: 'Block, de 2.5 m de alto.', time: '02:15' },
        { from: 'out', text: 'Perfecto. Te comparto un estimado preliminar con material y mano de obra. ¿Te agendo una visita técnica sin costo esta semana?', time: '02:15' },
      ] },
      solar: { name: 'Asistente · Energía solar', messages: [
        { from: 'in', text: '¿Cuánto cuesta instalar paneles solares en mi casa?', time: '23:40' },
        { from: 'out', text: '¡Hola! Para darte un precio exacto, ¿cuánto pagas aproximadamente de luz al bimestre?', time: '23:40' },
        { from: 'in', text: 'Unos $2,800.', time: '23:41' },
        { from: 'out', text: 'Con ese consumo te recomendamos un sistema de 6 paneles. Te envío la cotización y opciones de financiamiento. ¿A qué correo?', time: '23:41' },
      ] },
      clinica: { name: 'Asistente · Clínica', messages: [
        { from: 'in', text: 'Hola, ¿tienen cita para limpieza dental mañana?', time: '06:05' },
        { from: 'out', text: '¡Buen día! Mañana tenemos disponible a las 10:30 y a las 16:00. ¿Cuál prefieres?', time: '06:05' },
        { from: 'in', text: '16:00, por favor.', time: '06:06' },
        { from: 'out', text: 'Listo. Tu cita quedó confirmada mañana a las 16:00. Te enviaré un recordatorio 2 horas antes.', time: '06:06' },
      ] },
    };
    const body = $('#chatBody');
    const name = $('#chatName');
    const tabs = $$('.tab');
    let timers = [];
    let started = false;
    const add = ({ from, text, time }) => {
      const m = d.createElement('div');
      m.className = `msg msg--${from}`;
      m.textContent = text;
      const t = d.createElement('time');
      t.textContent = time;
      m.appendChild(t);
      body.appendChild(m);
    };
    const play = (key) => {
      started = true;
      timers.forEach(clearTimeout); timers = [];
      body.innerHTML = '';
      const chat = chats[key];
      name.textContent = chat.name;
      if (RM) { chat.messages.forEach(add); return; }
      let delay = 300;
      chat.messages.forEach((m) => {
        if (m.from === 'out') {
          let typing;
          timers.push(setTimeout(() => {
            typing = d.createElement('div');
            typing.className = 'escribiendo';
            typing.setAttribute('aria-label', 'Escribiendo');
            typing.innerHTML = '<span></span><span></span><span></span>';
            body.appendChild(typing);
          }, delay));
          delay += 900;
          timers.push(setTimeout(() => { typing && typing.remove(); add(m); }, delay));
        } else timers.push(setTimeout(() => add(m), delay));
        delay += 700;
      });
    };
    tabs.forEach((tab) => tab.addEventListener('click', () => {
      tabs.forEach((t) => { t.classList.toggle('is-active', t === tab); t.setAttribute('aria-selected', String(t === tab)); });
      play(tab.dataset.chat);
    }));
    // Sin observador o sin movimiento, el chat se muestra completo
    if (!('IntersectionObserver' in window)) { play('constructora'); return; }
    new IntersectionObserver(([e], obs) => {
      if (e.isIntersecting) { if (!started) play('constructora'); obs.disconnect(); }
    }, { threshold: 0.35 }).observe($('.telefono'));
  });

  // Video de la portada
  const video = $('#laptop');
  const marco = $('#marco');
  const showEnd = () => marco.classList.add('is-end');
  // Con menos movimiento o ahorro de datos no se descarga el video: se ve el último cuadro con el holograma vivo
  const canVideo = !RM && !SAVE_DATA;
  safe(() => {
    video.addEventListener('ended', showEnd);
    video.addEventListener('error', showEnd);
    if (canVideo) { video.src = MOVIL ? video.dataset.srcMovil : video.dataset.src; video.load(); }
    else showEnd();
  });

  // Parche sobre la tapa cerrada: se quita cuando la tapa empieza a abrirse (1.15 s)
  safe(() => {
    const tapa = $('#tapa');
    const check = () => tapa.classList.toggle('is-off', video.currentTime >= 1.15);
    if ('requestVideoFrameCallback' in video) {
      const loop = () => { check(); video.requestVideoFrameCallback(loop); };
      video.requestVideoFrameCallback(loop);
    } else video.addEventListener('timeupdate', check);
    video.addEventListener('seeked', check);
  });

  if (!hasGSAP) { safe(() => { if (canVideo) video.play().catch(showEnd); }); return; }

  // ---------- 4. Efectos de mouse (solo con mouse de verdad) ----------
  if (FINE) safe(() => {
    $$('.tarjeta').forEach((el) => el.addEventListener('pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    }));
  });

  // Menos movimiento: todo visible y quieto, sin intro
  if (RM) {
    showEnd();
    gsap.set('[data-in]', { opacity: 1 });
    $$('.paso').forEach((p) => p.classList.add('is-on'));
    return;
  }

  // ---------- 5 y 6. Efectos de scroll ----------

  // Títulos por líneas que suben desde una ranura
  safe(() => {
    if (!window.SplitText) return;
    $$('[data-split]').forEach((el) => {
      SplitText.create(el, {
        type: 'lines', mask: 'lines', linesClass: 'linea-split', autoSplit: true,
        onSplit: (self) => gsap.from(self.lines, {
          yPercent: 110, duration: M.dur, ease: M.ease, stagger: 0.1,
          scrollTrigger: { trigger: el, start: 'top 85%', once: true },
        }),
      });
    });
  });

  // Revelado general: sube y aparece
  safe(() => {
    $$('[data-reveal]').forEach((el) => {
      gsap.from(el, {
        y: M.dist, opacity: 0, duration: M.dur, ease: M.ease,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });
  });

  // Servicios: la matriz enciende su X al entrar
  safe(() => {
    $$('[data-matriz]').forEach((m) => {
      const on = $$('span[data-x="true"]', m);
      ScrollTrigger.create({
        trigger: m, start: 'top 85%', once: true,
        onEnter: () => on.forEach((s, i) => setTimeout(() => s.classList.add('on'), i * 45)),
      });
    });
  });

  // Proceso: la línea de luz se dibuja con el scroll y enciende cada nodo
  safe(() => {
    const luz = $('#lineaLuz');
    const pasos = $$('.paso');
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1061px)', () => {
      gsap.fromTo(luz, { scaleX: 0 }, {
        scaleX: 1, ease: 'none',
        scrollTrigger: { trigger: '#linea', start: 'top 75%', end: 'bottom 55%', scrub: true },
      });
    });
    mm.add('(max-width: 700px)', () => {
      gsap.fromTo(luz, { scaleY: 0 }, {
        scaleY: 1, ease: 'none',
        scrollTrigger: { trigger: '#linea', start: 'top 70%', end: 'bottom 60%', scrub: true },
      });
    });
    pasos.forEach((p) => ScrollTrigger.create({
      trigger: p, start: 'top 70%',
      onEnter: () => p.classList.add('is-on'),
      onLeaveBack: () => p.classList.remove('is-on'),
    }));
  });

  // Portada: el edificio se desplaza más lento que la página
  safe(() => {
    gsap.to('.hero__foto img', {
      yPercent: -5, ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true },
    });
  });

  // Holograma: sigue vivo arriba y se apaga al deslizar la página
  safe(() => {
    const holo = $('.holo');
    gsap.timeline({ scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true } })
      .to('#holoCapa', { opacity: 0, ease: 'none' }, 0)
      .to('#marco', { y: -40, ease: 'none' }, 0);
    // Fuera de pantalla las animaciones se pausan (ahorra batería)
    ScrollTrigger.create({
      trigger: '#hero', start: 'top top', end: 'bottom top',
      onLeave: () => holo.classList.add('holo--pausa'),
      onEnterBack: () => holo.classList.remove('holo--pausa'),
    });
  });

  // Demos: cada marco se abre como cortina
  safe(() => {
    $$('.demo__pantalla').forEach((el) => {
      gsap.fromTo(el, { clipPath: 'inset(0 0 100% 0)' }, {
        clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: M.easeIO,
        scrollTrigger: { trigger: el, start: 'top 85%', once: true },
      });
    });
  });

  // ---------- 7. Arranque: la firma en la portada ----------
  let tl = null;
  const intro = () => safe(() => {
    if (canVideo) { marco.classList.remove('is-end'); video.play().catch(showEnd); }
    tl = gsap.timeline({ defaults: { ease: M.ease, duration: M.dur } });
    tl.fromTo('#marco', { opacity: 0, scale: 0.94, clipPath: 'inset(48% 0 48% 0 round 8px)' },
                        { opacity: 1, scale: 1, clipPath: 'inset(0% 0 0% 0 round 8px)', duration: 1.2, ease: M.easeIO }, 0)
      .fromTo('.marca', { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.8 }, 0.15)
      .fromTo('.notch, .menu-btn', { opacity: 0, clipPath: 'inset(0 45% 0 45% round 999px)' },
                                   { opacity: 1, clipPath: 'inset(0 0% 0 0% round 999px)', duration: 1.1, ease: M.easeIO,
                                     clearProps: 'clipPath' }, 0.25)
      .fromTo('.marco__barrido', { xPercent: -120 }, { xPercent: 120, duration: 1.4, ease: 'power2.inOut' }, 0.9);
    const lema = $('.lema');
    gsap.set(lema, { opacity: 1 });
    tl.fromTo($$('span', lema), { yPercent: 110, clipPath: 'inset(0 0 100% 0)' },
                                { yPercent: 0, clipPath: 'inset(0 0 0% 0)', stagger: 0.12 }, 1.0)
      .fromTo('.acciones', { opacity: 0, y: 20 }, { opacity: 1, y: 0 }, 1.5);
  });

  // Respaldo: a los 3 s todo está visible aunque algo falle
  setTimeout(() => gsap.set('[data-in]', { opacity: 1 }), 3000);

  intro();
  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
