# Plan: Forzar nueva pestaña en todas las tarjetas de noticias

Las tres ubicaciones de tarjetas de noticias ya usan `target="_blank"` + `rel="noopener noreferrer"`, pero algunos contextos (PWA standalone en iOS, webviews dentro de apps, ciertos navegadores móviles) ignoran `target="_blank"` y abren el enlace en la misma vista. Vamos a reforzarlo con un handler explícito.

## Cambios

**Archivos:** `src/pages/Index.tsx` y `src/pages/Noticias.tsx`

Para cada uno de los 3 enlaces de noticia (featured + 2 side en Index, lista completa en Noticias):

1. Mantener `href`, `target="_blank"`, `rel="noopener noreferrer"` (para accesibilidad, SEO y middle-click).
2. Añadir un `onClick` que:
   - Llama a `e.preventDefault()`.
   - Ejecuta `window.open(article.url, '_blank', 'noopener,noreferrer')`.
   - Esto se ejecuta dentro del gesto de clic del usuario, lo que evita el bloqueo de popups y fuerza una pestaña/ventana nueva en navegadores que ignoran `target="_blank"` en `<a>`.

No se toca ningún estilo, layout, dato, imagen, ni la navegación interna (las `<Link>` de react-router como "Ver todo" siguen igual). Los videos no se modifican.

## Notas técnicas

- Se usa el mismo patrón en los 3 sitios: handler inline pequeño `onClick={(e) => { e.preventDefault(); window.open(article.url, '_blank', 'noopener,noreferrer'); }}` (y `featuredArticle.url` para el destacado).
- Sin dependencias nuevas.
