## Goal
Hero nunca se ve negro en Safari/Android y carga rápido en redes lentas. Comprimir video, agregar versión WebM, detectar iOS, y pausar carga en conexiones lentas mostrando el poster.

## Steps

### 1. Comprimir hero.mp4 y generar hero.webm
- Re-encodear `public/media/hero.mp4` con `ffmpeg`:
  - H.264, CRF 28, preset slow, `-movflags +faststart`, sin audio, mismas dimensiones (720×1276) y duración (~5s loop).
  - Objetivo: 3.4 MB → ~400–600 KB.
- Generar `public/media/hero.webm` paralelo:
  - VP9, CRF 32, `-b:v 0`, `-deadline good`, sin audio, mismas dimensiones/duración.
  - Objetivo: ~250–450 KB. Chrome/Firefox/Android lo prefieren.
- Verificar con `ffprobe` que ambos tengan misma duración exacta para que el loop quede idéntico.

### 2. Preload cross-browser en `index.html`
- Mantener `<link rel="preload" as="image" ...>` del primer frame (paint inmediato).
- Reemplazar el preload MP4 actual por dos entradas:
  ```html
  <link rel="preload" as="video" href="/media/hero.webm" type="video/webm" />
  <link rel="preload" as="video" href="/media/hero.mp4" type="video/mp4" />
  ```
- El browser solo descarga el que coincide con su capability.

### 3. `<video>` en `src/pages/Index.tsx`
- Dos `<source>` hijos: WebM primero, MP4 segundo.
- Mantener `poster={heroFirstFrame.url}` y `backgroundImage` en el `<section>` (red de seguridad CSS).
- Mantener `autoPlay muted loop playsInline`.
- Detección al montar (useState + useEffect, una sola vez):
  ```ts
  const ua = navigator.userAgent;
  const isIOS = /iP(hone|ad|od)/.test(ua);
  // Network Information API (Chrome/Android, no Safari)
  const conn = (navigator as any).connection;
  const saveData = conn?.saveData === true;
  const slowNet = conn?.effectiveType && /^(slow-2g|2g|3g)$/.test(conn.effectiveType);
  const shouldDeferVideo = saveData || slowNet;
  const preload = isIOS ? "metadata" : (shouldDeferVideo ? "none" : "auto");
  ```
- Si `shouldDeferVideo === true`: NO renderizar los `<source>` (solo el poster + background queda visible). Opcional: render el video cuando el usuario haga tap/scroll, o simplemente dejar el poster — confirmar abajo.
- Si Safari iOS: `preload="metadata"` → permite paint inmediato del poster sin descargar el video completo; autoplay sigue funcionando cuando el video está en viewport.

### 4. Verificación
- `ffprobe` sobre los dos outputs → confirmar tamaño y duración.
- `bun run build` → confirmar verde.
- Inspección visual en preview (375×812 iOS y 390×844 Android-ish).

## Pregunta para confirmar
En conexiones lentas / Save-Data, ¿prefieres:
- **(A)** Mostrar solo el poster permanentemente (más data-friendly), o
- **(B)** Cargar el video diferido cuando el usuario interactúe (scroll/tap)?

Voy con **(A)** por defecto salvo que prefieras (B).

## No tocar
Layout, copy, overlays, otras secciones, lógica del Header/Footer.
