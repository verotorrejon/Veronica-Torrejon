# Portafolio profesional de Verónica Torrejón

Sitio estático, responsivo y preparado para GitHub Pages. Presenta la trayectoria, proyectos, formación, impacto social e intereses de Verónica desde una perspectiva profesional, humana y verificable.

## Qué cambió en esta versión

- Regresó el logo original `VT.`.
- Nueva paleta marfil, cherry, café profundo y rosa, sin verdes ni degradados.
- Nueva narrativa fotográfica: cada imagen tiene una función y un contexto.
- Animaciones de aparición, ampliación y parallax sutil al hacer scroll.
- Casos profesionales organizados por desafío, contribución y resultado.
- Recomienda Mujeres incorporado como proyecto propio en desarrollo.
- Social Runs y experiencia como runner incorporados como iniciativa de comunidad.
- Sección “Mi forma de trabajar” para mostrar proceso, no solo resultados.
- Navegación, filtros, menú móvil, indicador de avance y botón para copiar email.
- Respeto por la preferencia del sistema “reducir movimiento”.

## Archivos para publicar

```text
index.html
style.css
script.js
README.md
assets/
  favicon.svg
images/
  01-retrato-veronica.svg
  02-canal-kiosko.svg
  03-renovacion-tecnologica.svg
  04-malta-experiencia.svg
  05-recomienda-mujeres.svg
  06-social-runs.svg
  07-impacto-comunidad.svg
  08-running-media-maraton.svg
  README.md
```

## Actualizar el sitio en GitHub

1. Ingresa al repositorio `Veronica-Torrejon`.
2. Conserva una copia de la versión publicada por seguridad.
3. Reemplaza en la raíz `index.html`, `style.css`, `script.js` y `README.md`.
4. Reemplaza las carpetas `assets` e `images`, manteniendo exactamente sus nombres.
5. Espera la publicación de GitHub Pages y prueba el sitio en computador y celular.

## Incorporar las fotografías reales

Los SVG incluidos son marcadores visuales terminados: permiten publicar y probar el diseño sin inventar fotografías. Para reemplazarlos:

1. Selecciona y optimiza cada imagen según `images/README.md`.
2. Sube el archivo WebP o JPG a la carpeta `images`.
3. En `index.html`, cambia solamente el valor de `src` correspondiente.
4. Actualiza el texto `alt` para describir lo que realmente aparece en la foto.

Ejemplo:

```html
<img src="images/01-retrato-veronica.webp"
     alt="Verónica Torrejón en un retrato profesional con luz natural">
```

No es necesario modificar el CSS ni JavaScript.

## Criterios de contenido

La información publicada se limitó a antecedentes entregados o previamente presentes en el CV. No se agregaron porcentajes, fechas, nombres de carreras, cantidades de asistentes ni impactos no confirmados.

Antes de publicar fotografías:

- obtener autorización de las personas identificables;
- evitar pantallas, reportes, credenciales o información interna de empresas;
- no mostrar datos de clientes;
- no usar fotografías de niños, niñas o comunidades sin consentimiento adecuado;
- revisar derechos de autor cuando la imagen provenga de un evento.

## Enlaces configurados

- LinkedIn: `https://www.linkedin.com/in/veronicatorrejonm/`
- Instagram: `https://www.instagram.com/verotorrejon/`
- Recomienda Mujeres: `https://verotorrejon.github.io/recomienda-mujeres/index.html`
- Email: `veronicatorrejonm@gmail.com`

## Prueba local

Se puede abrir `index.html` directamente. Para una prueba más fiel:

```bash
python -m http.server 8000
```

Luego abre `http://localhost:8000`.

## Checklist antes de publicar

- [ ] Reemplazar los marcadores por fotografías reales cuando estén seleccionadas.
- [ ] Confirmar que todas las personas visibles autorizaron la publicación.
- [ ] Revisar que ningún fondo muestre información confidencial.
- [ ] Confirmar el texto alternativo de cada fotografía.
- [ ] Probar filtros, navegación, email y enlaces externos.
- [ ] Verificar el sitio en móvil y escritorio después del despliegue.
