// demo-site/scroll-reveal.js
//
// Animación de entrada al hacer scroll (idea 2, sesión aparte) —
// archivo separado de interactive-bg.js a propósito, cada uno hace UNA
// sola cosa. Usa IntersectionObserver (API nativa del navegador) en vez
// de un listener de scroll a mano — no hay que calcular posiciones ni
// correr código en cada pixel de scroll, el navegador avisa solo
// cuando un elemento entra en pantalla.
//
// Se dispara UNA SOLA VEZ por elemento (unobserve() apenas entra) —
// nunca se vuelve a ocultar si el visitante scrollea hacia arriba y
// abajo de nuevo.
//
// Detalle real de CSS, no cosmético: una animación con
// `animation-fill-mode: forwards` sigue "activa" (sosteniendo su valor
// final) AUN DESPUÉS de terminar, y en la cascada, una animación
// siempre gana por encima de una regla normal como `.node:hover` —
// significa que, sin limpiarla, el `transform` de la entrada se
// quedaría pisando PARA SIEMPRE el `transform` del hover de .node
// (styles.css), rompiendo justo lo que no debía tocar. Por eso, al
// terminar la animación (`animationend`), se sacan las clases
// `reveal-init`/`reveal-in` del todo — el elemento vuelve a depender
// 100% de sus reglas normales (incluido el hover), como si esta
// animación nunca hubiera existido.
//
// Si falla o no hay soporte (navegador muy viejo sin IntersectionObserver,
// o el visitante prefiere menos movimiento), NUNCA se agrega la clase
// que oculta el contenido — todo queda visible desde el principio, el
// único costo es no ver la animación de entrada.

(function () {
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }
  if (!("IntersectionObserver" in window)) {
    return;
  }

  var targets = document.querySelectorAll(".node, .stage-caption, .cta-wrap");
  if (targets.length === 0) return;

  targets.forEach(function (el) {
    el.classList.add("reveal-init");
  });

  function cleanupWhenDone(el) {
    el.addEventListener(
      "animationend",
      function () {
        el.classList.remove("reveal-init", "reveal-in");
      },
      { once: true }
    );
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        cleanupWhenDone(entry.target);
        entry.target.classList.add("reveal-in");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15 }
  );

  targets.forEach(function (el) {
    observer.observe(el);
  });
})();
