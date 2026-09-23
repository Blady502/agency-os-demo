# Human-OS — página pública

Página pública de **Human-OS** (la empresa), servida con GitHub Pages en
https://www.human-os.com.gt. Presenta los servicios de la empresa y su
primer producto, **AgencyOS**.

Este repo es una **copia pública, aislada**, del contenido que vive en
`demo-site/` dentro del repo principal (privado) de Human-OS —
separado a propósito para poder usar GitHub Pages sin necesidad de un
plan de pago (Pages en un repo privado de una cuenta personal requiere
GitHub Pro). Si editás el contenido, hacelo también en el repo
principal (o al revés) — no hay sincronización automática entre los
dos.

## Archivos

- `index.html` — la página completa: HTML, CSS y JS en un solo archivo,
  sin build, sin framework, sin dependencias (solo las fuentes de
  Google Fonts).
- `logo-A-human-os.svg` — hoja de logo (versión oscura y clara, con
  tamaños de referencia). La página no la carga; el logo va inline en
  `index.html`.
- `CNAME` — dominio de GitHub Pages (`www.human-os.com.gt`). **No
  borrar ni editar**: sin él se rompe el dominio.

## Qué es (y qué NO es)

- **100% estático, sin backend**: no llama a ninguna API. Las cifras del
  panel de AgencyOS son **de ejemplo** (la página lo dice).
- Animaciones (fondo interactivo, mapa de servicios que se arma al
  hacer scroll, entradas al hacer scroll) en JS propio, sin librerías.
  Todas respetan `prefers-reduced-motion`.
- El botón de contacto abre WhatsApp. El número y el texto del mensaje
  están al inicio del `<script>` en `index.html` (`WHATSAPP_NUMBER`,
  `WHATSAPP_TEXT`).

## Ver en local

Sin build ni servidor — abrí `index.html` directo en el navegador, o
serví la carpeta con cualquier servidor estático simple, ej.:

```bash
npx serve .
```

## Editar el contenido

- Los servicios del mapa interactivo viven en el arreglo `SERVICES`
  dentro del `<script>` de `index.html`.
- El resto del texto está directo en el HTML de cada sección.
