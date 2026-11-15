# DiverX · web

Landing de DiverX (antes BeCode): **"Mentes creativas. Soluciones digitales."**
Hecha desde cero con la skill ruva-web-pro, a partir de las instrucciones de la carpeta `DiverX website`.

## Estructura

```
index.html            la página (cada sección entre comentarios INICIO / FIN)
css/estilos.css       estilos y tokens de la marca (arriba de todo, en :root)
js/main.js            movimiento, WhatsApp, menú, chat del agente IA
img/                  logo X en vector, ícono iPhone, imagen para compartir, cuadros del video
video/hero-laptop.mp4 video de la laptop (Higgsfield, Kling 3.0 Pro, 5 s, 1920x1080)
materiales/           logo, tipografía, referencias e instrucciones (no se publica)
direccion-de-arte.html hoja de muestra aprobada (no se publica)
```

Secciones, en orden: Portada (zonas 1 a 3), Servicios, Proceso, Demos, Equipo, Contacto y pie.

## Dirección de arte aprobada: "La X que se proyecta"

| Token | Valor | Papel |
|---|---|---|
| `--red` / `--cta` | `#C90031` | Rojo oficial del logo. Botones, brillos. Letra blanca: contraste 5.9:1 (AA) |
| `--red-hi` | `#E0003A` | Hover del botón (se aclara). Letra blanca: 5.0:1 |
| `--red-on-dark` | `#FF3355` | Texto chico rojo sobre negro: 5.7:1 |
| `--bg` | `#060606` | Fondo |
| `--surface` / `--surface-2` | `#0E0E10` / `#141417` | Tarjetas |
| `--ink` / `--muted` | `#F4F4F5` / `#9A9AA0` | Texto / texto secundario (7.6:1) |

- **Letras (Google Fonts):** Archivo Black (títulos y nombre), Manrope 500 a 700 (menú, botones, párrafos), IBM Plex Mono 400 y 500 (descripciones, cejas, números).
- **Forma:** radios de 4 y 8 px (esquinas filosas como la X). Los botones son cápsula, como en la web original.
- **Movimiento:** técnico y potente, sin rebotes. Entradas `power4.out` / `cubic-bezier(.22,1,.36,1)`, 1 s, 48 px, escalonado 0.06 s. Cortinas `power3.inOut`. Lenis con inercia 0.1.
- **Firma:** el video de la laptop se abre dentro de un marco con esquinas rojas. El marco aparece desde una línea, el menú se despliega desde el centro, una luz roja barre el marco y el lema sube por renglones. Se salta con "Saltar intro". Respaldo: a los 3 s todo está visible.
- **Elementos propios:** X pequeña que alterna blanco y negro sobre el rojo (menú y pie); anillos y diagonales de la X (fondo de la portada); matriz de luces que dibuja la X (tarjeta 06); cortes diagonales rojos; etiquetas numeradas 01 a 06.
- **Librerías:** GSAP 3.13.0 (ScrollTrigger, SplitText) desde cdnjs y Lenis 1.3.11 desde jsDelivr. Sin ellas, la página se ve completa y quieta.

## Qué editar fácil

- **WhatsApp:** `js/main.js`, constante `WA` (hoy `529381398816`). El mensaje de cada botón está en su atributo `data-wa` dentro de `index.html`.
- **Correo, Instagram y Facebook:** sección Contacto de `index.html`.
- **Fotos de los fundadores:** en la sección Equipo, cambia las iniciales por `<img src="img/daniel.jpg" alt="...">` (cuadradas, de unos 300 px).
- **Demos:** cambia cada `[DEMO REAL]` por una imagen `<img src="img/demo-1.jpg" alt="...">` y llena el giro y el nombre.
- **Colores y letras:** en `:root`, al inicio de `css/estilos.css`.
- Después de cambiar CSS o JS, sube el número de `?v=1` en `index.html` (por ejemplo `?v=2`) para que los navegadores no muestren la versión vieja.

## De dónde salió cada dato

| Dato | Fuente | Fecha |
|---|---|---|
| Textos de servicios, proceso, concepto y redes | `PAGINA WEB.md` y el documento de Word de la carpeta `DiverX website` | 15 nov 2026 |
| WhatsApp y correo | Confirmados por César en el chat | 15 nov 2026 |
| Rojo `#C90031` | Medido en `LOGO DIVERX.png` | 15 nov 2026 |
| Chat del agente IA | Web anterior de BeCode (ejemplos ilustrativos, no clientes reales) | — |

## Por validar (lo decidió Claude)

1. La letra del nombre es Archivo Black, una gratuita parecida a la de tu logotipo. Si tienes el archivo original, se cambia.
2. El logo X se redibujó como vector para alternar sus colores. Se ve igual que el PNG.
3. El botón principal dice "Cotizar mi proyecto" y abre WhatsApp. Se repite en portada, proceso, contacto y en la barra del celular ("Cotizar por WhatsApp").
4. Las descripciones cortas de cada servicio las escribió Claude.
5. Se habla de tú al cliente y DiverX habla en plural.
6. No se muestran precios: todo es "cotiza".
7. La sección de agentes de IA ya no es propia: su teléfono con chat vive en la tarjeta grande de Servicios.
8. En la foto inicial del video se tapó el logo de Apple de la tapa.
9. En celular el video se reproduce una vez y se queda en el último cuadro.
10. Barra fija de WhatsApp en celular, que se esconde al llegar a Contacto.
11. La web nueva reemplaza a la de BeCode en esta misma carpeta, que publica en Vercel.

## Pendientes (no publicar con marcadores amarillos sin decidirlo)

- [ ] `[DEMO REAL 1, 2 y 3]`: capturas o enlaces de trabajos reales, con giro y nombre.
- [ ] Fotos de Daniel y César (hoy se ven sus iniciales).
- [ ] El correo sigue siendo `BeCode.Startup@gmail.com`. Conviene uno con el nombre DiverX.
- [ ] Dominio propio (hoy `becode-eight.vercel.app`). Al cambiarlo, actualiza `og:image` en `index.html`.
- [ ] El video pesa 6.9 MB. Con una herramienta de compresión (HandBrake, gratis) puede bajar a unos 2 MB sin perder calidad visible.
- [ ] Higgsfield: quedan 1.25 créditos. Otro video de 5 s cuesta 8.75.

## Cómo publicar

La carpeta está conectada a GitHub (`natavilla09-alt/BeCode`) y Vercel publica sola cada cambio que se sube a la rama `main`. `materiales/`, `branding/` y `direccion-de-arte.html` no se suben (están en `.gitignore`).

## Revisión hecha

`node ~/.claude/skills/ruva-web-pro/scripts/revisar-sitio.mjs http://localhost:5500/ revision` · 15 nov 2026: sin desborde lateral, sin contenido oculto, consola sin errores y todo carga, a 375x812 y 1440x900, con "Reducir movimiento" y sin JavaScript.
