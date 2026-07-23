## Reemplazar texto largo por logos en la lista de /partidos

En cada fila de la página `/partidos`, sustituir la línea de texto `vs. Caribes de San Sebastián` (que se corta en móvil) por un mini-matchup visual con logos:

**Formato nuevo por fila:**
`[logo Cafeteros de Yauco] YC  vs.  [logo rival] SAN SEBASTIÁN`

- Logo Cafeteros: usar `src/assets/cafeteros-logo` (ya existe como variante optimizada).
- Logo rival: usar `src/assets/caribes-logo.png.asset.json` para partidos vs. Caribes, y `src/assets/plataneros-logo.png.asset.json` para partidos vs. Plataneros (semifinales).
- Los logos van en círculos de ~28px (móvil) / 32px (desktop) con anillo dorado sutil, igual al estilo del resto del sitio.
- Los códigos cortos (`YC`, `SAN SEBASTIÁN`, `COROZAL`) ya están en `equipoLocalCorto` / `equipoVisitanteCorto` en `partidosData` — se reutilizan como etiqueta al lado de cada logo.
- El `vs.` queda en gris tenue (`text-white/40`) entre ambos bloques.
- Mantener truncate/flex-wrap para que nunca se corte en pantallas pequeñas.

**Cambios de código:**
- `src/pages/Partidos.tsx`: agregar un pequeño helper `TeamLogo` (importa los assets JSON de Caribes/Plataneros y el logo Cafeteros), y reemplazar el `<p>` con `vs. {equipoVisitante}` por el nuevo bloque flex con dos logos + labels cortos.

Nada más cambia (tabs, thumbnails, modal, animaciones y estilos permanecen iguales).
