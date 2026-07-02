# Rediseño Desktop — Cafeteros de Yauco

Objetivo: elevar la versión desktop (≥1024px) a nivel de sitio profesional deportivo, manteniendo intacta la versión móvil (todos los cambios bajo `lg:`).

## 1. Navegación: Dock flotante superior

- Ocultar `DesktopSidebar` en desktop (o eliminar su render).
- Quitar `lg:pl-[220px]` de `Layout.tsx` — contenido a ancho completo.
- Crear `src/components/DesktopDock.tsx`: dock flotante fijo, centrado horizontalmente arriba (`top: 24px`, `left: 50%`, `translateX(-50%)`), sólo visible `hidden lg:flex`, `z-[900]`.
  - Contenido: logo pequeño de Cafeteros a la izquierda, separador vertical dorado, y los 5 links (Inicio, Calendario, Roster, Boletos, Merch) en fila.
  - Estilo: glassmorphism (`backdrop-blur-xl`, `bg-[rgba(17,17,17,0.7)]`, borde `rgba(255,215,0,0.15)`, `rounded-full`, sombra suave dorada).
  - Estado activo: pill dorada `bg-gold/15 text-gold`. Hover: underline animado y ligero `translateY(-1px)`.
  - Al hacer scroll >80px: reducir padding y aumentar opacidad de fondo (efecto "shrink on scroll" con listener liviano).

## 2. Hero fullscreen inmersivo (Index)

- Hero desktop: `lg:h-[100dvh] lg:max-h-none` (ocupa toda la primera vista).
- Añadir overlay tipográfico central: `<h1>CAFETEROS DE YAUCO</h1>` con `font-display font-black`, `lg:text-[9rem]` con `letter-spacing`, color blanco con `text-stroke` sutil dorado y `drop-shadow`. Subtítulo pequeño en dorado: "LVSM 2025–26".
- Animación entrada: fade + scale up (0.94 → 1) con `cubic-bezier(0.16,1,0.3,1)` 1.2s. Letras animadas en cascada (stagger por palabra usando spans + delay CSS).
- Parallax suave: el video de fondo se traslada verticalmente ligero en scroll (transform via requestAnimationFrame; solo desktop, `prefers-reduced-motion` respetado).
- Indicador "scroll" abajo centrado con las flechas cascada existentes + texto "SCROLL".
- Móvil sin cambios.

## 3. Calendario alineado

- **Home preview** (`Index.tsx`): en desktop cambiar el carrusel horizontal por una fila estática de 3 tarjetas centradas y del mismo alto (`lg:grid-cols-3 items-stretch`). Ocultar la lógica de `activeIndex` en desktop (aplicar el highlight sólo si `window.innerWidth < 1024`).
- **Página `/calendario`**: ya usa `lg:grid-cols-3`. Ajustar tarjetas para altura uniforme (`h-full`, `flex-col`), padding consistente, y alineación de fecha/badge/logos/ubicación en las mismas líneas base. Añadir hover: `lg:hover:-translate-y-1 lg:hover:border-gold/40 lg:hover:shadow-[0_10px_40px_rgba(255,215,0,0.15)]`.
- Añadir encabezado de sección en desktop con contador de próximos juegos y filtro visual Local/Visitante (chips, sólo UI, sin lógica nueva compleja — filtro por state local sobre el array).

## 4. Boletos más discreto

- **Home preview**: reducir la tarjeta CTA a un banner compacto de 2 columnas en desktop (`lg:grid-cols-[1fr_auto] lg:max-w-[900px] lg:mx-auto lg:py-6`): texto+icono a la izquierda, botón a la derecha. Sin imagen de fondo hero — reemplazar por gradiente dorado sutil (`from-[#1a1500] to-[#1a1a1a]`), borde dorado fino. Altura ~120px.
- **Página `/boleteria`**: en desktop, contener a `lg:max-w-[760px] lg:mx-auto`, reducir padding del CTA card (`lg:p-10`), y mostrar la card de "Informacion" en columna al lado (`lg:grid-cols-[1.5fr_1fr]`).

## 5. Otras secciones (desktop only)

- **ImageSlider**: `lg:max-w-[1200px] lg:mx-auto`, aumentar altura visual y suavizar la máscara.
- **Roster preview (Index)**: pasar de lista vertical a `lg:grid-cols-3` con tarjeta por jugador (avatar grande, número dorado esquina, nombre + posición). Full page `/roster` ya en 2 cols → subir a `lg:grid-cols-3` con tarjeta rediseñada (imagen dominante, overlay con nombre en la parte inferior, número dorado grande en esquina superior).
- **Merch**: mantener `lg:grid-cols-4`, agregar hover con zoom sobre la imagen (`group-hover:scale-105`) y overlay dorado al pasar.
- **News (Index)**: mantener `lg:grid-cols-[2fr_1fr]` editorial; aumentar tipografía del artículo destacado en desktop (`lg:text-4xl`).
- **Footer**: contenedor `lg:max-w-[1200px] lg:mx-auto lg:grid-cols-3`.

## 6. Interactividad y animación (desktop)

- Enriquecer `ScrollReveal` con variante `fade-up-lg` con más desplazamiento (60px) sólo en `lg`.
- Cursor: en botones y tarjetas clave, micro-interacciones con `transition-transform duration-300 ease-out`.
- Añadir `prefers-reduced-motion` guard global en `index.css` para desactivar parallax y cascadas.
- Sin dependencias nuevas — todo con Tailwind + CSS + refs existentes.

## 7. Guardarraíles

- Cero cambios visuales <1024px (todo con prefijo `lg:` o condicionado por `window.innerWidth`).
- Mantener paleta actual (`#111111`, `#1a1a1a`, `#FFD700`) y tipografías Barlow.
- Ocultar `DockBar` móvil en `lg` (ya lo está) y `Header` hamburguesa en `lg` (ya lo está).
- No tocar YouTube embeds, datos, ni lógica de negocio.

## Archivos a editar/crear

Crear:
- `src/components/DesktopDock.tsx`

Editar:
- `src/components/Layout.tsx` (quitar sidebar/padding-left, montar DesktopDock)
- `src/components/DesktopSidebar.tsx` (dejar de renderizar o eliminar del layout)
- `src/pages/Index.tsx` (hero fullscreen + título central, calendario alineado, boletos compacto, roster grid, etc.)
- `src/pages/Calendario.tsx` (uniformidad y hover)
- `src/pages/Boleteria.tsx` (contenedor angosto, 2 columnas)
- `src/pages/Roster.tsx` (grid 3 columnas con tarjeta rediseñada)
- `src/pages/Merch.tsx` (hover mejorado)
- `src/components/Footer.tsx` (grid desktop)
- `src/index.css` (utilidades desktop: parallax off en reduced-motion, keyframes de hero title, glass dock)

¿Procedo con esta dirección?
