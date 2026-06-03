## Aumentar textos en tarjetas de calendario (preview)

### Problema
Los textos en las tarjetas del calendario preview quedaron muy pequeños (`text-sm` para nombres de equipos, `text-xs` para "vs" y fecha) y hay mucho espacio vacío dentro de la tarjeta de `h-[280px]`.

### Cambios propuestos
1. **Nombres de equipos**: `text-sm` → `text-lg` (18px), mantener `font-bold uppercase`
2. **"vs" central**: `text-xs` → `text-sm` (14px), mantener `text-white/40`
3. **Fecha y hora**: `text-xs` → `text-sm` (14px)
4. **Badge Local/Visitante**: `text-[10px]` → `text-xs` (12px)
5. **Texto de ubicación**: `text-xs` → `text-sm` (14px)
6. **Altura de tarjeta**: Reducir de `h-[280px]` a `h-[260px]` para que el contenido más grande llene mejor el espacio sin dejar exceso vacío

### Archivo a modificar
- `src/pages/Index.tsx` (líneas ~76-160 aprox, sección del preview de calendario)

No se afecta la lógica ni los datos — solo estilos visuales.