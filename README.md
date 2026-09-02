# Agency OS — demo

Página de demo visual para ventas — pensada para mostrarle a un
cliente potencial, en una demo comercial, cómo un negocio nuevo se
convierte en un agente de WhatsApp funcionando.

Este repo es una **copia pública, aislada**, del contenido que vive en
`demo-site/` dentro del repo principal (privado) de Agency OS —
separado a propósito para poder usar GitHub Pages sin necesidad de un
plan de pago (Pages en un repo privado de una cuenta personal requiere
GitHub Pro). Si editás el contenido, hacelo también en el repo
principal (o al revés) — no hay sincronización automática entre los
dos.

## Qué es (y qué NO es)

- **100% estático**: `index.html` + `styles.css` + `interactive-bg.js` +
  `scroll-reveal.js`, sin build, sin framework, sin dependencias.
- **Sin backend**: no llama a ninguna API real. Todo el contenido (el
  análisis de Agency Brain, los módulos activados, las credenciales) es
  **de ejemplo, fijo en el HTML** — costo **$0** cada vez que se
  muestra, sin importar cuántas veces.
- El efecto de "el nodo bajo el mouse se expande, los demás bajan
  opacidad" es CSS puro (`:hover`/`:focus` + selectores de hermanos).
- **Única excepción a "sin JS"**: `interactive-bg.js` (fondo
  interactivo: spotlight + manchas de color que reaccionan al mouse,
  en el hero y en toda la página) y `scroll-reveal.js` (animación de
  entrada al hacer scroll, vía `IntersectionObserver`, una sola vez por
  elemento). Ninguno usa dependencias externas. Ambos respetan
  `prefers-reduced-motion` y no rompen nada en dispositivos táctiles.
- **Botón de llamada a la acción con destino PLACEHOLDER** — `.cta` en
  `index.html` apunta a `#contacto`, marcado con un comentario `TODO`
  en el código (nunca texto visible en la página). Reemplazalo por tu
  email o WhatsApp real antes de mostrarle esto a cualquier prospecto.

## Ver en local

Sin build ni servidor — abrí `index.html` directo en el navegador, o
serví la carpeta con cualquier servidor estático simple, ej.:

```bash
npx serve .
```

## Editar el contenido

Los 5 nodos del flujo viven directo en `index.html` (`<div class="node">`) —
cambiar el texto ahí no requiere tocar `styles.css` ni ningún otro
archivo.
