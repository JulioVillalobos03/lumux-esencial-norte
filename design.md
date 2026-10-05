# Dirección visual — Norte

Arquitectura editorial: piedra, vacíos amplios, fotografía y planos. Norte presenta un estudio de arquitectura e interiorismo ficticio. Su ritmo se organiza en capítulos verticales; las obras se leen como páginas de un cuaderno y el pabellón se recorre desde el terreno hasta la luz.

La ampliación a ocho secciones responde a la petición del usuario de diferenciar las tres plantillas y superar la antigua composición de cinco bloques. El recorrido es: inicio, estudio, proyectos, recorrido, materia, territorio, bitácora y contacto. No se comparten composición, geometrías ni contenido con los otros proyectos.

La paleta de piedra y verde, Syne para títulos y Manrope para lectura, se conserva en `tokens.css` y `src/content/theme.json`. Todos los colores y las fuentes de la interfaz referencian esos tokens. Los encabezados son rectos, sin cursivas.

## Composición

- Portada fotográfica con título amplio, orientación y pie editorial.
- Manifiesto con plano de patio y trayectoria solar en SVG.
- Dos obras verticales: fotografía dominante, margen numerado y pie de proyecto.
- Pabellón Three.js a pantalla completa con techo abierto, carpintería, patio, vegetación, suelo y órbita solar. Una sección de 260 alturas de pantalla contiene un escenario sticky de una pantalla.
- Materia con tres muestras SVG y botones que actualizan la maqueta.
- Territorio con fotografía independiente y curvas de nivel trazadas al avanzar.
- Bitácora con apuntes y diagramas espaciales.
- Solicitud de proyecto presentada como una hoja de trabajo.

## Movimiento y adaptación

Lenis y GSAP sincronizan desplazamiento, cortes fotográficos, planos trazados y el recorrido de la cámara. Móvil, tablet y escritorio usan la misma duración y las mismas fases del pabellón. La cámara aumenta su distancia en vertical para encuadrar todo el modelo, y la composición de textos y controles cambia según el espacio disponible. No se elimina Three.js ni el recorrido por el ancho del dispositivo.

Movimiento reducido conserva la ilustración, el contenido y los controles de materiales. WebGL fallido o ahorro de datos conservan la ilustración estática. La pausa detiene el render y las animaciones. No se bloquea el desplazamiento táctil.

## Contenido honesto

Marca, proyectos e imágenes conceptuales. No hay testimonios, métricas ni obras reales inventadas. El formulario revisa datos en el navegador y explica que la demostración no envía ni guarda información.
