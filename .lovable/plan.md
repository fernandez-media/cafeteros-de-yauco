## Problema

En la sección "Merch" del Index, la imagen de la "Taza de Cafeteros" se ve recortada/desbordada del contenedor blanco de 160px de alto. La causa es que `ResponsiveImage` envuelve el `<img>` en un `<picture>` sin estilos. El `className="max-w-full max-h-full object-contain"` se aplica al `<img>`, pero su padre directo es el `<picture>` (inline, sin altura definida), por lo que `max-h-full` no limita realmente la altura al contenedor de 160px. La imagen termina renderizándose a su tamaño intrínseco (~1:1, 400×400), desbordando el área blanca.

## Solución

Propagar la restricción de tamaño al elemento `<picture>` usando la prop `pictureClassName` que ya existe en `ResponsiveImage`, en la grilla de merch de `src/pages/Index.tsx`.

### Cambio

En `src/pages/Index.tsx` (línea ~521), añadir a `<ResponsiveImage>`:

```tsx
pictureClassName="max-w-full max-h-full flex items-center justify-center"
```

Esto hace que el `<picture>` respete el alto/ancho del contenedor (`h-[160px]` con padding) y, combinado con `object-contain` en el `<img>`, la taza se ajustará completamente dentro del área blanca sin desbordar.

### Alcance

- Solo edición visual/presentacional.
- Un solo archivo: `src/pages/Index.tsx`.
- No se modifican datos, lógica ni otras secciones.
