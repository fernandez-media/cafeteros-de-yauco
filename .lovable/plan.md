## Problema

El contenedor del carrusel de Calendario en `src/pages/Index.tsx` usa `overflow-x-auto`. Por especificación CSS, cuando un eje es `auto`, el otro deja de ser `visible` y pasa a `auto` automáticamente, lo que produce el scroll vertical pequeño que ves dentro de la sección.

## Cambio

En `src/pages/Index.tsx`, en el contenedor de las cards del calendario (línea ~71):

- Añadir `overflow-y-hidden` a la clase, dejando: `flex gap-4 overflow-x-auto overflow-y-hidden scrollbar-hidden pb-2 items-stretch`.

Eso elimina el scroll vertical interno y conserva únicamente el scroll horizontal. El scroll general de la página no se ve afectado.
