import { useMemo } from "react";
import { Ticket } from "lucide-react";
import laCunaCancha from "@/assets/la-cuna-cancha.jpg";

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

const BASE = import.meta.env.BASE_URL;
const teamLogo = (name: string) => `${BASE}media/logos/${name}.webp`;
const cafeterosLogo = `${BASE}assets/opt/cafeteros-logo-192.webp`;

const OPP_LOGO: Record<string, string> = {
  Lares: "patriotas",
  Naranjito: "naranjito",
  Carolina: "gigantes",
  Corozal: "plataneros",
  Adjuntas: "adjuntas",
  Caribes: "caribes",
  Mets: "mets",
};

const OPP_FULL: Record<string, string> = {
  Lares: "Patriotas de Lares",
  Naranjito: "Changos de Naranjito",
  Carolina: "Gigantes de Carolina",
  Corozal: "Plataneros de Corozal",
  Adjuntas: "Gigantes de Adjuntas",
};

function formatGameDate(date: string) {
  const [y, m, d] = date.split("-").map(Number);
  const dt = new Date(Date.UTC(y, m - 1, d, 12));
  const DAYS = ["DOM", "LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"];
  const MONTHS = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
  return {
    weekday: DAYS[dt.getUTCDay()],
    day: d,
    month: MONTHS[m - 1],
  };
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
      .sort((a, b) => a.date.localeCompare(b.date));
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

      <div className="relative z-[1] mx-auto max-w-[1400px]">
        <div className="flex flex-col">
          <div>
            <h2
              id="boleteria-title-desktop"
              className="font-['Bebas_Neue',_'Oswald',_Impact,_sans-serif] text-[clamp(56px,5.2vw,84px)] font-normal leading-[0.92] text-white"
            >
              ¡No te pierdas ni un solo juego de los{" "}
              <span className="text-[#F5CE3E]">Cafeteros</span>!
            </h2>
          </div>

          {upcoming.length > 0 && (
            <div className="mt-[48px]">
              <div className="flex items-baseline justify-between border-b-2 border-white/20 pb-[12px] mb-2">
                <span className="font-['Barlow_Condensed',_'Arial_Narrow',_sans-serif] text-[16px] font-bold uppercase tracking-[2.5px] text-white">
                  Próximos juegos en La Cuna
                </span>
                <span className="font-['Barlow_Condensed',_'Arial_Narrow',_sans-serif] text-[15px] font-semibold text-[#F5CE3E]">
                  {homeGames.length} juegos en casa · Espacios limitados
                </span>
              </div>

              <ul className="list-none p-0 m-0">
                {upcoming.map((game, i) => {
                  const { weekday, day, month } = formatGameDate(game.date);
                  const logoKey = OPP_LOGO[game.opponent];
                  const fullName = OPP_FULL[game.opponent] || game.opponent;
                  const isFirst = i === 0;

                  return (
                    <li
                      key={game.date}
                      className="grid grid-cols-[180px_1fr_160px] items-center gap-8 py-6 px-6 -mx-6 rounded-xl transition-colors duration-200 hover:bg-white/[0.04]"
                      style={{
                        borderBottom: i < upcoming.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                        ...(isFirst ? {
                          border: '1px solid rgba(245,206,62,0.2)',
                          backgroundColor: 'rgba(245,206,62,0.04)',
                        } : {}),
                        ...(i % 2 === 1 && !isFirst ? { backgroundColor: 'rgba(255,255,255,0.015)' } : {}),
                      }}
                    >
                      {/* Date */}
                      <div>
                        <p className="font-display font-bold text-lg uppercase text-white tracking-wide m-0 leading-tight">
                          {weekday} {day} {month}
                        </p>
                        <p className="text-[#F5CE3E]/70 text-sm mt-1 m-0">
                          7:00 PM
                        </p>
                        {isFirst && (
                          <span
                            className="inline-block mt-2 px-3 py-1 rounded text-[11px] font-bold uppercase tracking-wider"
                            style={{ backgroundColor: 'rgba(245,206,62,0.15)', color: '#F5CE3E' }}
                          >
                            Próximo
                          </span>
                        )}
                      </div>

                      {/* Matchup */}
                      <div>
                        <div className="flex items-center justify-center gap-5">
                          <div className="flex items-center gap-3 flex-1 justify-end">
                            <span className="font-display font-bold text-[17px] text-white uppercase tracking-tight text-right">
                              Cafeteros de Yauco
                            </span>
                            <img
                              src={cafeterosLogo}
                              alt="Cafeteros de Yauco"
                              width={56}
                              height={56}
                              className="w-14 h-14 object-contain flex-shrink-0"
                            />
                          </div>
                          <span className="font-display font-bold text-[#F5CE3E] text-xl flex-shrink-0 px-1">
                            vs.
                          </span>
                          <div className="flex items-center gap-3 flex-1">
                            {logoKey ? (
                              <img
                                src={teamLogo(logoKey)}
                                alt={fullName}
                                width={56}
                                height={56}
                                loading="lazy"
                                className="w-14 h-14 object-contain flex-shrink-0"
                              />
                            ) : (
                              <div className="w-14 h-14 rounded-full bg-white/10 flex-shrink-0" />
                            )}
                            <span className="font-display font-bold text-[17px] text-white uppercase tracking-tight">
                              {fullName}
                            </span>
                          </div>
                        </div>
                        <p className="text-white/40 text-[13px] mt-2 m-0 text-center flex items-center justify-center gap-1.5">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                          </svg>
                          Coliseo Raúl Pipote Oliveras, Yauco
                        </p>
                      </div>

                      {/* Badge */}
                      <div className="text-right">
                        {game.isOpener ? (
                          <span className="rounded-full bg-[#F5CE3E] px-5 py-2 font-['Barlow_Condensed',_'Arial_Narrow',_sans-serif] text-[12px] font-bold uppercase tracking-[1.5px] text-[#111111]">
                            Apertura
                          </span>
                        ) : isFirst ? (
                          <span className="rounded-full bg-[#F5CE3E]/15 px-5 py-2 font-['Barlow_Condensed',_'Arial_Narrow',_sans-serif] text-[12px] font-bold uppercase tracking-[1.5px] text-[#F5CE3E]">
                            Próximo
                          </span>
                        ) : (
                          <span className="rounded-full border border-white/15 px-5 py-2 font-['Barlow_Condensed',_'Arial_Narrow',_sans-serif] text-[12px] font-bold uppercase tracking-[1.5px] text-white/50">
                            En casa
                          </span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* CTA */}
          <div className="mt-[56px]">
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
