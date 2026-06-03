# Arreglar el splash screen inicial

## Contexto

El splash screen (logo de Cafeteros de Yauco + animación de carga) aparece al entrar a la página principal durante 2.2s. Actualmente el logo se muestra, pero la animación de puntos/círculos dorados abajo no se ve correctamente.

## Causa raíz

En `src/components/SplashScreen.tsx`, el contenedor de la animación usa la clase `splash-loader`, pero todo el CSS en `src/index.css` (líneas 53–106) está definido bajo el selector `.loader …`. Como las clases no calzan:

- Los `.circle` no reciben ancho (20px), alto, borde dorado, ni la variable `--color`.
- Los `.dot` y `.outline` no reciben tamaño ni posicionamiento.
- La variable `--color` (que mapea a `--gold`) queda indefinida, así que el outline animado no tiene color.

Además, los `delay` repetidos vía inline `style` chocan con los `:nth-child` del CSS, duplicando la cadencia.

## Cambios propuestos

**`src/data/calendar.ts`** — ya verificado, no contiene Iguanas ni Changos. No requiere cambios.

**`src/components/SplashScreen.tsx`**

1. Renombrar el contenedor de `splash-loader` a `loader` para que el CSS existente aplique.
2. Eliminar los estilos inline redundantes (`animation`, `animationDelay`, `backgroundColor`, `inset-0`) en `.dot` y `.outline`, ya que el CSS global ya los define correctamente (color, tamaño, posición, delays por `:nth-child`).
3. Mantener solo la estructura JSX: `<div class="loader">` con cinco `<div class="circle">`, cada uno conteniendo `<div class="dot">` y `<div class="outline">`.
4. Conservar el logo y su animación `splashPulse` (esa sí funciona porque usa keyframe global).

## Resultado esperado

Al entrar a `/`, se ve el logo pulsando y debajo los cinco círculos dorados con la animación correcta de dot/outline en cascada, por 2.2s, antes de desvanecerse.
