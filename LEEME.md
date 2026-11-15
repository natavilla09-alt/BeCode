# DiverX · web

Landing de DiverX (antes BeCode): **"Mentes creativas. Soluciones digitales."**
Hecha desde cero con la skill ruva-web-pro, a partir de las instrucciones de la carpeta `DiverX website`.

## Estructura

```
index.html            la página (cada sección entre comentarios INICIO / FIN)
css/estilos.css       estilos y tokens de la marca (arriba de todo, en :root)
js/main.js            movimiento, WhatsApp, menú, chat del agente IA
img/                  logo X en vector, ícono iPhone, imagen para compartir, cuadros del video
video/hero-laptop.mp4 video de la laptop para computadora (Higgsfield, Kling 3.0 Pro, 5 s, 1920x1080, 6.6 MB)
video/hero-laptop-movil.mp4 el mismo video para celular (720 px de ancho, 0.43 MB)
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
- **Firma:** el video de la laptop se abre dentro de un marco con esquinas rojas. El marco aparece desde una línea, el menú se despliega desde el centro, una luz roja barre el marco y el lema sube por renglones. La entrada no bloquea nada: el lema y los botones aparecen en 1.5 s y el respaldo los muestra a los 3 s.
- **Holograma vivo:** al terminar el video, la capa `.holo` (brillo que respira, parpadeo, líneas de escaneo, haz y chispas, en modo `screen`) sigue encendida sobre el último cuadro. Al bajar se apaga con `scrub` y fuera de pantalla se pausa.
- **Parche de la tapa:** el generador de video volvió a dibujar el logo de Apple en la tapa cerrada. `.marco__tapa` lo cubre con el gris de la tapa hasta el segundo 1.15, cuando empieza a abrirse.
- **Fondo de toda la página:** `img/fondo-edificio.jpg` (escritorio) y `img/fondo-edificio-movil.jpg` (celular), un edificio simétrico en luz roja generado en Higgsfield (GPT Image 2.6, 0.25 créditos, 15 nov 2026). Va fijo detrás de todo, oscurecido a la izquierda y abajo, y se desplaza más lento al bajar.
- **Elementos propios:** X pequeña que alterna blanco y negro sobre el rojo (menú y pie); anillos y diagonales de la X (fondo de la portada); matriz de luces que dibuja la X (tarjeta 06); cortes diagonales rojos; etiquetas numeradas 01 a 06.
- **Librerías:** GSAP 3.13.0 (ScrollTrigger, SplitText) desde cdnjs y Lenis 1.3.11 desde jsDelivr. Sin ellas, la página se ve completa y quieta.

## Qué editar fácil

- **WhatsApp:** `js/main.js`, constante `WA` (hoy `529381398816`). El mensaje de cada botón está en su atributo `data-wa` dentro de `index.html`.
- **Correo, Instagram y Facebook:** sección Contacto de `index.html`.
- **Fotos de los fundadores:** en la sección Equipo, cambia las iniciales por `<img src="img/daniel.jpg" alt="...">` (cuadradas, de unos 300 px).
- **Demos:** cambia cada `[DEMO REAL]` por una imagen `<img src="img/demo-1.jpg" alt="...">` y llena el giro y el nombre.
- **Colores y letras:** en `:root`, al inicio de `css/estilos.css`.
- Después de cambiar CSS o JS, sube el número de `?v=` en `index.html` (hoy `?v=3`) para que los navegadores no muestren la versión vieja.

## De dónde salió cada dato

| Dato | Fuente | Fecha |
|---|---|---|
| Textos de servicios, proceso, concepto y redes | `PAGINA WEB.md` y el documento de Word de la carpeta `DiverX website` | 15 nov 2026 |
| WhatsApp | Confirmado por César en el chat | 15 nov 2026 |
| Correo diverx.mexico@gmail.com | Dado por César en el chat | 15 nov 2026 |
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
- [ ] Dominio propio (hoy `becode-eight.vercel.app`). Al cambiarlo, actualiza `og:image` en `index.html`.
- [ ] El video de computadora sigue pesando 6.6 MB (el de celular ya es de 0.43 MB). Para bajarlo a unos 2 MB: `ffmpeg -i video/hero-laptop.mp4 -an -vf "scale=1280:-2" -c:v libx264 -crf 24 -preset slow -pix_fmt yuv420p -movflags +faststart video/hero-laptop-pc.mp4` y cambiar el `data-src` del video en `index.html`. ffmpeg quedó instalado en esta computadora.
- [ ] Higgsfield: queda 1 crédito. Otro video de 5 s cuesta 8.75 y una imagen 0.25.
- [ ] Si se genera otro video de la laptop, pedir de nuevo que no aparezca ningún logo en la tapa y quitar `.marco__tapa` si ya no hace falta.

## Cómo publicar

La carpeta está conectada a GitHub (`natavilla09-alt/BeCode`) y Vercel publica sola cada cambio que se sube a la rama `main`. `materiales/`, `branding/` y `direccion-de-arte.html` no se suben (están en `.gitignore`).

## Celular (≤ 700 px)

- **Video:** `js/main.js` elige `hero-laptop-movil.mp4` en celular y el grande en computadora (`<video data-src data-src-movil>`, sin `<source>`, porque los navegadores ignoran `media` en el video). Con ahorro de datos o con "Reducir movimiento" no se descarga video: se ve el último cuadro con el holograma vivo.
- **Portada:** contenido centrado en la pantalla, sin hueco abajo.
- **Servicios compactos:** dibujos a 96 px de alto y menos relleno. La página en celular bajó de 8,661 a unos 7,900 px.
- **Menú del celular:** pantalla completa con el botón "Cotizar por WhatsApp" y las redes (`.notch__extra`, solo se ve en el menú móvil).
- **Contacto:** WhatsApp y correo a todo el ancho; Instagram y Facebook lado a lado.
- **Toque:** pestañas de 44 px; los efectos de hover solo con mouse (`@media (hover:hover)`) y `:active` para el dedo; fondo con `100lvh` para que no salte en iPhone al esconderse la barra; zonas seguras (`env(safe-area-inset-*)`) en la barra y el botón fijo.
- **Chat del agente IA:** altura mínima de 440 px; con la conversación de paneles solares (la más larga) se cortaba con menos.
- **En horizontal (844 × 390):** no se rompe nada; los botones de la portada quedan debajo de la primera pantalla.

## Revisión hecha

`node ~/.claude/skills/ruva-web-pro/scripts/revisar-sitio.mjs http://localhost:5500/ revision` · 15 nov 2026: sin desborde lateral, sin contenido oculto, consola sin errores y todo carga, a 375x812 y 1440x900, con "Reducir movimiento" y sin JavaScript.
