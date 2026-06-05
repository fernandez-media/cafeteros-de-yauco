## Cambios

### 1. Eliminar la barra/dock transparente superior (Header)
En `src/components/Header.tsx`:
- Quitar el `<header>` con fondo translúcido y blur. El elemento `<header>` ya no aplicará `background`, `backdropFilter`, ni el ancho completo (`left-0 right-0`).
- Dejar únicamente el botón hamburguesa flotando como elemento `fixed` en la esquina superior izquierda (`fixed top-3 left-4 z-[1001]`), sin contenedor de fondo.
- Eliminar el efecto de scroll que cambia el background/blur del header (ya no es necesario). Se mantiene únicamente, si se desea, el comportamiento de ocultar al hacer scroll hacia abajo aplicado directamente al botón — o se elimina por simplicidad y el hamburger queda siempre visible.

Resultado: no hay barra horizontal arriba; solo se ve el icono de hamburguesa blanco flotando sobre el video del hero.

### 2. Subir los chevrons dorados del hero
En `src/pages/Index.tsx` (línea 74), aumentar el `paddingBottom` del contenedor de los chevrons de `80px` a aproximadamente `130px` para que queden más separados del dock inferior de navegación.

### Sin cambios
- Video, logo, colores, animaciones, menú lateral, contenido del resto de la página.
