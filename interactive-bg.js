// demo-site/interactive-bg.js
//
// Fondo interactivo (spotlight + parallax) — la ÚNICA pieza de JS de
// todo demo-site/, y aun así deliberadamente mínima: sin dependencias.
//
// Dos capas independientes, actualizadas en el MISMO frame:
//   1. La del hero (.hero-bg) — posición relativa al propio hero,
//      contenida ahí (overflow:hidden + transform, ver styles.css).
//   2. La de toda la página (.page-bg) — posición relativa al
//      VIEWPORT (es una capa `position:fixed`), sesión aparte pedida
//      después de ver la primera versión.
//
// Principio de siempre: el mousemove SOLO guarda la posición; el
// trabajo real (fijar las variables CSS que animan el gradiente/las
// manchas) pasa UNA vez por frame dentro de requestAnimationFrame — así
// nunca se hacen decenas de escrituras al DOM por segundo. El
// movimiento en sí lo hace el navegador (CSS transform/gradient,
// acelerado por GPU) — este script nunca anima nada directamente.

(function () {
  var hero = document.querySelector(".hero");
  var root = document.documentElement;

  // Respeto real a "reducir movimiento" — nunca se engancha ningún
  // listener, todo queda con los valores por defecto ya definidos en
  // styles.css (quieto, pero se sigue viendo bien).
  if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  var latestX = null;
  var latestY = null;
  var frameQueued = false;

  function applyFrame() {
    frameQueued = false;
    if (latestX === null) return;

    // ── Capa de toda la página: relativa al VIEWPORT (coincide 1:1
    // con .page-bg, que es position:fixed) ──
    var pageRelX = Math.min(1, Math.max(0, latestX / window.innerWidth));
    var pageRelY = Math.min(1, Math.max(0, latestY / window.innerHeight));
    root.style.setProperty("--page-spot-x", (pageRelX * 100).toFixed(2) + "%");
    root.style.setProperty("--page-spot-y", (pageRelY * 100).toFixed(2) + "%");
    root.style.setProperty("--page-tilt-x", ((pageRelX - 0.5) * 2).toFixed(3));
    root.style.setProperty("--page-tilt-y", ((pageRelY - 0.5) * 2).toFixed(3));

    // ── Capa del hero: relativa al propio hero (para que el spotlight
    // quede exacto bajo el cursor mientras estás sobre él) — si el
    // cursor está fuera del hero (más abajo en la página), queda
    // recortada al borde más cercano en vez de saltar. ──
    if (hero) {
      var rect = hero.getBoundingClientRect();
      var heroRelX = Math.min(1, Math.max(0, (latestX - rect.left) / rect.width));
      var heroRelY = Math.min(1, Math.max(0, (latestY - rect.top) / rect.height));
      hero.style.setProperty("--spot-x", (heroRelX * 100).toFixed(2) + "%");
      hero.style.setProperty("--spot-y", (heroRelY * 100).toFixed(2) + "%");
      hero.style.setProperty("--tilt-x", ((heroRelX - 0.5) * 2).toFixed(3));
      hero.style.setProperty("--tilt-y", ((heroRelY - 0.5) * 2).toFixed(3));
    }
  }

  // Un solo listener, en TODA la página (no solo en el hero) — hace
  // falta para que la capa nueva de .page-bg reaccione en cualquier
  // parte, incluida la zona de los nodos.
  window.addEventListener(
    "mousemove",
    function (event) {
      latestX = event.clientX;
      latestY = event.clientY;
      if (!frameQueued) {
        frameQueued = true;
        requestAnimationFrame(applyFrame);
      }
    },
    { passive: true }
  );

  // Cuando el cursor sale de la VENTANA del navegador por completo
  // (no solo del hero — ej. se va a otra app), vuelve suave a la
  // posición por defecto de ambas capas, en vez de quedar "pegado" en
  // el último punto. `relatedTarget === null` es la forma estándar de
  // detectar que el mouse salió del documento, no solo de un elemento.
  document.addEventListener("mouseout", function (event) {
    if (event.relatedTarget !== null) return;
    latestX = null;
    latestY = null;
    root.style.removeProperty("--page-spot-x");
    root.style.removeProperty("--page-spot-y");
    root.style.removeProperty("--page-tilt-x");
    root.style.removeProperty("--page-tilt-y");
    if (hero) {
      hero.style.removeProperty("--spot-x");
      hero.style.removeProperty("--spot-y");
      hero.style.removeProperty("--tilt-x");
      hero.style.removeProperty("--tilt-y");
    }
  });
})();
