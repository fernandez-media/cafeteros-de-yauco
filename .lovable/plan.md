## Problema

En la sección Merch del Index, la "Taza de Cafeteros" y la t-shirt "El Código del Café" se ven pegadas al borde del área blanca (la taza toca el fondo, la tee llega al borde inferior), mientras que "La Cuna" y "Windbreaker" tienen whitespace alrededor del producto.

La causa no es desbordamiento real del contenedor (ya está `overflow-hidden` + `object-contain`), sino que esas dos imágenes fuente **no traen margen interno**: ocupan todo su lienzo. Al renderizarse a 160px de alto con `p-4`, llegan al borde y parecen "sobresalir" visualmente comparadas con las otras dos, que sí traen aire propio.

## Solución

Aumentar el padding del contenedor de imagen de `p-4` a `p-6` en la grilla de merch para dar más aire a las imágenes apretadas, sin afectar las que ya tenían whitespace (siguen viéndose bien, solo un poco más pequeñas y centradas).

### Cambio

En `src/pages/Index.tsx` (línea ~518), cambiar:

```tsx
className="relative w-full h-[160px] flex items-center justify-center p-4"
```

por:

```tsx
className="relative w-full h-[160px] flex items-center justify-center p-6"
```

Aplicar el mismo cambio en `src/pages/Merch.tsx` (línea ~46, `h-[180px] ... p-4` → `p-6`) para mantener consistencia en la página completa de Merch.

### Alcance

- Solo edición visual/presentacional.
- Dos archivos: `src/pages/Index.tsx` y `src/pages/Merch.tsx`.
- No se modifican datos, lógica ni assets.
