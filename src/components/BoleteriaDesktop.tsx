import { useMemo } from "react";
import { Ticket } from "lucide-react";
import laCunaCancha from "@/assets/la-cuna-cancha.jpg";

/* ── BOLETERÍA · DESKTOP (≥1024px) · CALENDARIO + CTA ── */

export type HomeGame = {
  date: string;
  opponent: string;
  isOpener?: boolean;
};

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
  ctaHref: string;
  homeGames?: HomeGame[];
}

export default function BoleteriaDesktop({
  ctaHref,
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
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center opacity-10 grayscale contrast-[1.1]"
        style={{ backgroundImage: `url(${laCunaCancha})` }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,#0B0B0B_20%,rgba(11,11,11,0.6)_60%,#0B0B0B_100%)]"
      />

      <div className="relative z-[1] mx-auto max-w-[1440px]">
        <div className="flex flex-col">
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
            <div className="mt-[44px]">
              <div className="flex items-baseline justify-between border-b-2 border-white pb-[10px]">
                <span className="font-['Barlow_Condensed',_'Arial_Narrow',_sans-serif] text-[15px] font-bold uppercase tracking-[2.5px] text-white">
                  Próximos juegos en La Cuna
                </span>
                <span className="font-['Barlow_Condensed',_'Arial_Narrow',_sans-serif] text-[15px] font-semibold text-[#F5CE3E]">
                  {homeGames.length} juegos en casa · Espacios limitados
                </span>
              </div>

              <ul className="max-w-[900px]">
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

          {/* ── CTA Button ── */}
          <div className="mt-[48px]">
            <a
              href={ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="boleteria-cta-desktop group relative inline-flex items-center gap-[14px] overflow-hidden rounded-[16px] px-[40px] py-[22px] font-['Barlow_Condensed',_'Arial_Narrow',_sans-serif] text-[26px] font-bold uppercase tracking-[2px] text-[#111111] no-underline shadow-[0_12px_40px_-8px_rgba(212,175,55,0.5)] transition-[transform,box-shadow] duration-200 ease-out hover:-translate-y-[2px] hover:shadow-[0_18px_50px_-8px_rgba(212,175,55,0.7)] active:translate-y-[1px] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-white motion-reduce:transition-none"
              style={{ background: "linear-gradient(170deg, #E8C84A 0%, #D4AF37 40%, #C5982A 70%, #D4AF37 100%)" }}
            >
              <span className="boleteria-cta-shimmer absolute inset-0 -translate-x-[120%] bg-[linear-gradient(110deg,transparent_35%,rgba(255,255,255,0.55)_50%,transparent_65%)]" />
              <Ticket aria-hidden="true" className="relative h-[28px] w-[28px] transition-transform duration-200 group-hover:scale-110" strokeWidth={2.2} />
              <span className="relative">Comprar Boletos</span>
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes boleteria-shimmer {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(120%); }
        }
        .boleteria-cta-desktop:hover .boleteria-cta-shimmer {
          animation: boleteria-shimmer 0.7s ease-out;
        }
        .boleteria-cta-desktop {
          animation: boleteria-pulse 3s ease-in-out infinite;
        }
        @keyframes boleteria-pulse {
          0%, 100% { box-shadow: 0 12px 40px -8px rgba(212,175,55,0.5); }
          50% { box-shadow: 0 12px 50px -4px rgba(212,175,55,0.7); }
        }
        @media (prefers-reduced-motion: reduce) {
          .boleteria-cta-desktop { animation: none; }
          .boleteria-cta-desktop:hover .boleteria-cta-shimmer { animation: none; }
        }
      `}</style>
    </section>
  );
}
