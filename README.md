# arquitectura-norte

Arquitectura editorial con ocho capítulos, obras verticales, planos SVG y un pabellón Three.js a pantalla completa. La cámara, las capas constructivas y el sol recorren la misma secuencia en escritorio, tablet y móvil.

Proyecto independiente de Lumux Esencial. Se puede copiar esta carpeta a otro lugar, instalar sus dependencias y editarla sin necesitar las demás plantillas. No importa archivos del directorio padre.

## Arranque

Requiere Node.js 22.12 o superior.

```sh
npm ci
npm run dev
```

```sh
npm test
npm run build
npm run preview
```

La salida estática está en `dist/`. El puerto de vista previa aparece en `package.json`. Cada proyecto tiene su propio manifiesto, lockfile, configuración Astro, fuentes, imágenes, contenido y estilos.

## Edición

- `src/content/site.es.json`: marca, SEO, textos, navegación, contacto, imágenes y secciones.
- `src/content/experience.json`: manifiesto, recorrido espacial, materiales, territorio y bitácora.
- `src/content/theme.json`: paleta y tipografías.
- `tokens.css`: escalas de espacio, tamaño, movimiento y valores predeterminados.
- `src/styles/site.css`: composición exclusiva de esta identidad.
- `public/images/`: imágenes locales.

`src/content/motion.json` permite ajustar la inercia de Lenis (`lerp`), el avance de rueda (`wheelMultiplier`), la duración de los recorridos en alturas de pantalla (`heroScroll`, `featureScroll`) y la profundidad (`parallax`). Los valores se validan con límites para conservar la navegación.

`npm run validate` valida el contenido con Zod y comprueba los recursos. Se pueden ocultar las secciones opcionales conservando inicio y contacto; al hacerlo, elimina sus enlaces de navegación. La composición mantiene el orden del archivo `src/pages/index.astro`. La plantilla actual tiene ocho secciones; el contrato admite hasta nueve. La ampliación sustituye el límite inicial de cinco secciones por solicitud del usuario.

## Movimiento

Lenis suaviza la rueda y se sincroniza con GSAP y ScrollTrigger. El desplazamiento táctil sigue siendo nativo. Los mismos cortes de las fotografías, trazos solares y curvas de nivel avanzan con el scroll en todos los anchos.

`recorrido` contiene un escenario sticky de una pantalla dentro de una sección de 260 alturas de pantalla. Three.js muestra una maqueta completa con terreno, muros, carpintería, cubierta abierta, patio, árbol y órbita solar. El scroll separa las capas y mueve cámara y luz; los controles ofrecen volumen fijo y despiece fijo. Los botones de `materia` cambian el acabado del pabellón. La cámara adapta su distancia al formato vertical sin retirar estos efectos.

La escena carga al acercarse y detiene su render fuera de pantalla o con la pestaña oculta. La pausa detiene movimiento y render. Movimiento reducido, ahorro de datos o WebGL no disponible muestran una ilustración estática. El movimiento reducido acorta el escenario al tamaño de una pantalla.

- `src/scripts/motion.ts`: coreografía exclusiva de Norte.
- `src/scripts/scene.ts`: geometría, luz, acabados y cámara del pabellón.
- `src/scripts/scroll-engine.ts` y `scene-runtime.ts`: integración local de Lenis/GSAP y ciclo de vida de WebGL.
- `src/components/Blueprint.astro` y `Contours.astro`: gráficos SVG originales.

## Demostración

Marca, proyectos y contenidos ficticios. El formulario valida localmente y comunica que no envía ni almacena información. Para una implementación comercial, reemplaza los datos y conecta un proveedor de envío con su consentimiento y política correspondientes. No se presenta como trabajo real de un cliente.

Consulta `docs/ASSETS.md` para procedencia visual. Las licencias de las fuentes están en `public/licenses/`. Esta plantilla no promete exclusividad; modelos o animaciones a medida se cotizan aparte según el brief de Lumux Esencial.
