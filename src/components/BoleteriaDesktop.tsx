import { ReactNode, useMemo } from "react";
import laCunaCancha from "@/assets/la-cuna-cancha.jpg";

/* ── BOLETERÍA · DESKTOP (≥1024px) · CALENDARIO + CREDENCIAL ── */

export type HomeGame = {
  /** Fecha en formato YYYY-MM-DD */
  date: string;
  /** Nombre del rival, ej. "Adjuntas" */
  opponent: string;
  /** true solo para el juego inaugural de la temporada */
  isOpener?: boolean;
};

/** Respaldo: juegos en casa del calendario preliminar LVSM 2026.
 *  Úsalo solo si el proyecto no tiene ya una fuente de datos del calendario. */
export const FALLBACK_HOME_GAMES: HomeGame[] = [
  { date: "2026-10-23", opponent: "Adjuntas", isOpener: true },
  { date: "2026-10-25", opponent: "Lares" },
  { date: "2026-10-29", opponent: "Naranjito" },
  { date: "2026-11-08", opponent: "Corozal" },
  { date: "2026-11-19", opponent: "Adjuntas" },
  { date: "2026-11-21", opponent: "Carolina" },
  { date: "2026-11-29", opponent: "Lares" },
  { date: "2026-12-03", opponent: "Naranjito" },
];

const MAX_GAMES = 5;

function formatGameDate(date: string) {
  const [y, m, d] = date.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d, 12));
  const clean = (s: string) => s.replace(".", "").toUpperCase();
  const weekday = clean(new Intl.DateTimeFormat("es", { weekday: "short", timeZone: "UTC" }).format(dt));
  const month = clean(new Intl.DateTimeFormat("es", { month: "short", timeZone: "UTC" }).format(dt));
  return { weekday, day: `${d} ${month}` };
}

function todayInPR() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Puerto_Rico" }).format(new Date());
}

interface BoleteriaDesktopProps {
  /** La credencial existente (el pase crema con precios, botón y arte) */
  credential: ReactNode;
  /** Juegos en casa de la temporada regular */
  homeGames?: HomeGame[];
}

export default function BoleteriaDesktop({
  credential,
  homeGames = FALLBACK_HOME_GAMES,
}: BoleteriaDesktopProps) {
  const upcoming = useMemo(() => {
    const today = todayInPR();
    return [...homeGames]
      .filter((g) => g.date >= today)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, MAX_GAMES);
  }, [homeGames]);

  return (
    <section
      aria-labelledby="boleteria-title-desktop"
      className="relative ml-[calc(50%-50vw)] w-screen overflow-hidden bg-[#0B0B0B] px-[6vw] py-[88px]"
    >
      {/* Fondo: cancha de La Cuna, muy sutil */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center opacity-10 grayscale contrast-[1.1]"
        style={{ backgroundImage: `url(${laCunaCancha})` }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,#0B0B0B_20%,rgba(11,11,11,0.6)_60%,#0B0B0B_100%)]"
      />

      <div className="relative z-[1] mx-auto grid max-w-[1440px] grid-cols-[minmax(0,1fr)_400px] items-start gap-[6vw]">
        {/* ── Izquierda: título + próximos juegos ── */}
        <div className="flex flex-col self-stretch">
          <div className="border-l-[5px] border-[#F5CE3E] pl-[22px]">
            <h2
              id="boleteria-title-desktop"
              className="font-['Bebas_Neue',_'Oswald',_Impact,_sans-serif] text-[clamp(56px,5.2vw,84px)] font-normal leading-[0.92] text-white"
            >
              ¡No te pierdas ni un solo juego de los{" "}
              <span className="text-[#F5CE3E]">Cafeteros</span>!
            </h2>
          </div>

          {upcoming.length > 0 && (
            <div className="mt-[44px] flex-1 flex flex-col min-h-0">
              <div className="flex items-baseline justify-between border-b-2 border-white pb-[10px]">
                <span className="font-['Barlow_Condensed',_'Arial_Narrow',_sans-serif] text-[15px] font-bold uppercase tracking-[2.5px] text-white">
                  Próximos juegos en La Cuna
                </span>
                <span className="font-['Barlow_Condensed',_'Arial_Narrow',_sans-serif] text-[15px] font-semibold text-[#F5CE3E]">
                  {homeGames.length} juegos en casa · Espacios limitados
                </span>
              </div>

              <ul className="flex-1 overflow-y-auto">
                {upcoming.map((game) => {
                  const { weekday, day } = formatGameDate(game.date);
                  return (
                    <li
                      key={game.date}
                      className="grid grid-cols-[118px_1fr_auto] items-center gap-[22px] border-b border-[#262626] py-[16px] transition-[background-color,padding] duration-200 ease-out hover:bg-white/[0.03] hover:pl-[10px] motion-reduce:transition-none"
                    >
                      <div className="whitespace-nowrap font-['Bebas_Neue',_'Oswald',_Impact,_sans-serif] text-[38px] leading-[0.85] text-white">
                        <span className="block font-['Barlow_Condensed',_'Arial_Narrow',_sans-serif] text-[13px] font-bold tracking-[1.5px] text-[#A9A9A9]">
                          {weekday}
                        </span>
                        {day}
                      </div>
                      <div className="font-['Barlow_Condensed',_'Arial_Narrow',_sans-serif] text-[24px] font-semibold text-white">
                        vs {game.opponent}
                        <span className="ml-[10px] text-[16px] font-medium text-[#8C8C8C]">Yauco</span>
                      </div>
                      {game.isOpener ? (
                        <span className="rounded-full border border-[#F5CE3E] bg-[#F5CE3E] px-[12px] py-[5px] font-['Barlow_Condensed',_'Arial_Narrow',_sans-serif] text-[12.5px] font-bold uppercase tracking-[1.5px] text-[#111111]">
                          Apertura
                        </span>
                      ) : (
                        <span className="rounded-full border border-[#3A3A3A] px-[12px] py-[5px] font-['Barlow_Condensed',_'Arial_Narrow',_sans-serif] text-[12.5px] font-bold uppercase tracking-[1.5px] text-[#BDBDBD]">
                          En casa
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

        {/* ── Derecha: la credencial existente ── */}
        <div className="flex justify-center">{credential}</div>
      </div>
    </section>
  );
}
