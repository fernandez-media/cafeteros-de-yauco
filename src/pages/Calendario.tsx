import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import { calendar } from '../data/calendar';
import laCunaCancha from '../assets/la-cuna-cancha.jpg';

const BASE = import.meta.env.BASE_URL;
const teamLogo = (name: string) => `${BASE}media/logos/${name}.webp`;
const cafeterosLogo = `${BASE}assets/opt/cafeteros-logo-192.webp`;

const getOppKey = (opponent: string) => {
  const opp = opponent.toLowerCase();
  if (opp.includes('caribes')) return 'caribes';
  if (opp.includes('carolina')) return 'gigantes';
  if (opp.includes('mets')) return 'mets';
  if (opp.includes('patriotas')) return 'patriotas';
  if (opp.includes('plataneros')) return 'plataneros';
  if (opp.includes('naranjito')) return 'naranjito';
  if (opp.includes('adjuntas')) return 'adjuntas';
  return null;
};

const MONTH_NUM: Record<string, number> = {
  Enero: 0, Febrero: 1, Marzo: 2, Abril: 3, Mayo: 4, Junio: 5,
  Julio: 6, Agosto: 7, Septiembre: 8, Octubre: 9, Noviembre: 10, Diciembre: 11,
};
const DAYS_ES = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

const getDayOfWeek = (month: string, day: number) => {
  const d = new Date(2026, MONTH_NUM[month] ?? 0, day);
  return DAYS_ES[d.getDay()];
};

const getDaysUntil = (dateStr: string) => {
  const [month, day] = dateStr.split(' ');
  const gameDate = new Date(2026, MONTH_NUM[month] ?? 0, parseInt(day));
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.max(0, Math.ceil((gameDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
};

type Filter = 'todos' | 'local' | 'visitante';

const groupByMonth = (games: typeof calendar) => {
  const groups: { month: string; games: typeof calendar }[] = [];
  games.forEach((game) => {
    const month = game.date.split(' ')[0];
    const last = groups[groups.length - 1];
    if (last && last.month === month) {
      last.games.push(game);
    } else {
      groups.push({ month, games: [game] });
    }
  });
  return groups;
};

const Calendario = () => {
  const [filter, setFilter] = useState<Filter>('todos');

  const filteredGames = useMemo(() => {
    if (filter === 'todos') return calendar;
    if (filter === 'local') return calendar.filter(g => g.isHome);
    return calendar.filter(g => !g.isHome);
  }, [filter]);

  const months = groupByMonth(filteredGames);
  const nextGame = calendar.find(g => !g.result);
  const gamesPlayed = calendar.filter(g => g.result).length;
  const totalGames = calendar.length;

  const wins = calendar.filter(g => g.result === 'W').length;
  const losses = calendar.filter(g => g.result === 'L').length;

  const nextOppKey = nextGame ? getOppKey(nextGame.opponent) : null;
  const nextDaysUntil = nextGame ? getDaysUntil(nextGame.date) : 0;
  const nextMonth = nextGame ? nextGame.date.split(' ')[0] : '';
  const nextDay = nextGame ? nextGame.date.split(' ')[1] : '';
  const nextWeekday = nextMonth && nextDay ? getDayOfWeek(nextMonth, parseInt(nextDay)) : '';

  return (
    <div className="min-h-screen -mt-14">
      {/* Hero */}
      <div className="relative w-full overflow-hidden bg-black">
        {/* Hero background image (both mobile + desktop) */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center opacity-30 lg:opacity-25 grayscale-[0.5] contrast-[1.1]"
          style={{ backgroundImage: `url(${laCunaCancha})` }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.35) 50%, #000 100%)' }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 hidden lg:block"
          style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.6) 20%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.6) 80%)' }}
        />

        <div className="pt-28 pb-16 lg:pt-44 lg:pb-24 px-5 lg:px-12 max-w-[1400px] mx-auto relative">
          <span
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-display font-black text-[72px] lg:text-[160px] uppercase leading-none whitespace-nowrap tracking-tight pointer-events-none select-none"
            style={{ color: 'rgba(255, 215, 0, 0.03)' }}
            aria-hidden="true"
          >
            CAFETEROS
          </span>

          <Link
            to="/"
            className="absolute top-5 left-5 z-10 w-10 h-10 rounded-full bg-white/5 border border-gold/20 flex items-center justify-center no-underline transition-all duration-200 hover:bg-gold/20 hover:border-gold/40 active:scale-[0.92]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
          </Link>

          <div className="text-center relative z-10">
            <h1 className="font-display font-black text-5xl lg:text-8xl uppercase text-white leading-[0.95] m-0 tracking-tight">
              Calendario
            </h1>
            <p className="text-white/40 text-xs lg:text-sm mt-2 m-0 uppercase tracking-[0.12em]">
              Octubre a Diciembre 2026
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto">
        {/* Next Game */}
        {nextGame && (
          <div className="px-5 lg:px-12 pt-8 lg:pt-10">
            <ScrollReveal variant="blur" distance={30}>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] mb-2.5 m-0" style={{ color: 'rgba(255, 215, 0, 0.6)' }}>
                Próximo partido
              </p>
              <div
                className="rounded-2xl p-4 lg:p-6 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,215,0,0.07), rgba(255,215,0,0.02))',
                  border: '1px solid rgba(255, 215, 0, 0.15)',
                }}
              >
                <div className="absolute top-0 right-0 bottom-0 w-1/3 pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.03))' }} />
                <div className="flex items-center gap-4 lg:gap-6 relative z-10">
                  {nextOppKey ? (
                    <img
                      src={teamLogo(nextOppKey)}
                      alt={nextGame.opponent}
                      width="68"
                      height="68"
                      loading="eager"
                      className="w-[68px] h-[68px] lg:w-20 lg:h-20 object-contain flex-shrink-0"
                    />
                  ) : (
                    <div className="w-[68px] h-[68px] lg:w-20 lg:h-20 rounded-full bg-white/10 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-bold text-[17px] lg:text-xl text-white uppercase m-0 truncate">
                      vs {nextGame.opponent}
                    </p>
                    <p className="text-white/45 text-[13px] lg:text-sm mt-1 m-0 truncate">
                      {nextWeekday}, {nextDay} de {nextMonth}
                    </p>
                    <p className="text-white/30 text-[12px] lg:text-xs mt-0.5 m-0 truncate flex items-center gap-1.5">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                      {nextGame.location}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-center pl-2">
                    <p className="font-display font-black text-3xl lg:text-4xl text-gold m-0 leading-none">
                      {nextDaysUntil}
                    </p>
                    <p className="text-white/30 text-[9px] lg:text-[10px] uppercase tracking-[0.12em] mt-1 m-0">
                      {nextDaysUntil === 1 ? 'Día' : 'Días'}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="px-5 lg:px-12 pt-8">
          <div className="flex gap-2">
            {(['todos', 'local', 'visitante'] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className="px-5 py-2 rounded-full text-[12px] font-bold uppercase tracking-wider transition-all duration-200 border-0 cursor-pointer"
                style={{
                  backgroundColor: filter === f ? 'rgba(255, 215, 0, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                  color: filter === f ? '#FFD700' : 'rgba(255, 255, 255, 0.4)',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Games by month */}
        {months.map((group, gi) => (
          <div
            key={group.month}
            className={`pt-8 lg:pt-10 pb-3 lg:pb-0 ${gi % 2 === 1 ? 'mx-[-20px] px-[40px] lg:mx-0 lg:px-12' : 'px-5 lg:px-12'}`}
            style={gi % 2 === 1 ? {
              backgroundColor: 'rgba(255, 215, 0, 0.025)',
              borderTop: '1px solid rgba(255, 215, 0, 0.06)',
              borderBottom: '1px solid rgba(255, 215, 0, 0.06)',
            } : undefined}
          >
            {/* Gold divider between months on desktop */}
            {gi > 0 && (
              <div
                className="hidden lg:block h-[3px] rounded-full mb-10"
                style={{ background: 'linear-gradient(90deg, #FFD700, rgba(255,215,0,0.05))' }}
              />
            )}

            <ScrollReveal variant="blur" distance={30}>
              <div className="flex items-center gap-4 mb-4 lg:mb-6">
                <h2 className="font-display font-black text-2xl lg:text-4xl uppercase text-white m-0 tracking-tight">
                  {group.month === 'TBD' ? 'Por confirmar' : (
                    <>
                      <span className="lg:hidden">{group.month}</span>
                      <span className="hidden lg:inline">{group.month} 2026</span>
                    </>
                  )}
                </h2>
                <div className="flex-1 h-px lg:hidden" style={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }} />
                <span className="text-[11px] font-semibold uppercase tracking-wider text-white/30 lg:hidden">
                  {group.games.length} {group.games.length === 1 ? 'juego' : 'juegos'}
                </span>
              </div>
            </ScrollReveal>

            {/* ─── Mobile: compact cards ─── */}
            <div className="flex flex-col gap-3 lg:hidden">
              {group.games.map((game, i) => {
                const oppKey = getOppKey(game.opponent);
                const isTBD = game.date === 'TBD';
                const day = isTBD ? '' : game.date.split(' ')[1];
                const weekday = isTBD ? '' : getDayOfWeek(group.month, parseInt(day));
                const isPast = !!game.result;

                return (
                  <ScrollReveal key={`m-${gi}-${i}`} delay={i * 0.06} variant="left" distance={50}>
                    <div
                      className="flex items-center gap-3.5 rounded-2xl p-3.5 transition-all duration-300"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.025)',
                        border: '1px solid rgba(255, 215, 0, 0.08)',
                        opacity: isPast ? 0.55 : 1,
                      }}
                    >
                      {oppKey ? (
                        <img
                          src={teamLogo(oppKey)}
                          alt={game.opponent}
                          width="64"
                          height="64"
                          loading="lazy"
                          decoding="async"
                          className="w-16 h-16 object-contain flex-shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-white/10 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-display font-bold text-[16px] text-white uppercase m-0 truncate">
                          vs {game.opponent}
                        </p>
                        <p className="text-white/50 text-[13px] mt-0.5 m-0 truncate">
                          {isTBD ? 'Fecha por anunciar' : `${weekday}, ${day} de ${group.month}`}
                        </p>
                        <p className="text-white/30 text-[12px] mt-0.5 m-0 truncate flex items-center gap-1.5">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 opacity-70"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                          {game.location}
                        </p>
                      </div>
                      <div className="flex-shrink-0 text-right">
                        {game.result ? (
                          <span className="flex items-center gap-2">
                            <span className={`font-display font-black text-lg ${game.result === 'W' ? 'text-gold' : 'text-red-500'}`}>
                              {game.result}
                            </span>
                            <span className="text-white/60 font-semibold text-[15px]">
                              {game.score}
                            </span>
                          </span>
                        ) : (
                          <span
                            className="text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full inline-block"
                            style={{
                              backgroundColor: game.isHome ? 'rgba(255, 215, 0, 0.12)' : 'rgba(255, 255, 255, 0.05)',
                              color: game.isHome ? 'rgba(255, 215, 0, 0.6)' : 'rgba(255, 255, 255, 0.35)',
                            }}
                          >
                            {game.isHome ? 'Local' : 'Visitante'}
                          </span>
                        )}
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>

            {/* ─── Desktop: FC Barcelona–style rows ─── */}
            <div className="hidden lg:block">
              {group.games.map((game, i) => {
                const oppKey = getOppKey(game.opponent);
                const isTBD = game.date === 'TBD';
                const day = isTBD ? '' : game.date.split(' ')[1];
                const weekday = isTBD ? '' : getDayOfWeek(group.month, parseInt(day));
                const isNext = game === nextGame;
                const isPast = !!game.result;

                return (
                  <ScrollReveal key={`d-${gi}-${i}`} delay={i * 0.06} variant="left" distance={40}>
                    <div style={isPast ? { opacity: 0.5 } : undefined}>
                      <div
                        className={`grid grid-cols-[180px_1fr_160px] items-center gap-8 py-6 rounded-xl px-6 -mx-6 transition-colors duration-200 hover:bg-white/[0.03] ${isNext ? '' : ''}`}
                        style={{
                          borderBottom: i < group.games.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                          ...(isNext ? {
                            border: '1px solid rgba(255,215,0,0.2)',
                            backgroundColor: 'rgba(255,215,0,0.04)',
                          } : {}),
                          ...(i % 2 === 1 && !isNext ? { backgroundColor: 'rgba(255,255,255,0.015)' } : {}),
                        }}
                      >
                        {/* Date */}
                        <div>
                          <p className="font-display font-bold text-lg uppercase text-white tracking-wide m-0 leading-tight">
                            {isTBD ? 'TBD' : `${weekday?.substring(0, 3)} ${day} ${group.month.substring(0, 3)}`}
                          </p>
                          <p className="text-gold/70 text-sm mt-1 m-0">
                            {game.time || '7:00 PM'}
                          </p>
                          {isNext && (
                            <span
                              className="inline-block mt-2 px-3 py-1 rounded text-[11px] font-bold uppercase tracking-wider"
                              style={{ backgroundColor: 'rgba(255,215,0,0.15)', color: '#FFD700' }}
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
                                width="56"
                                height="56"
                                className="w-14 h-14 object-contain flex-shrink-0"
                              />
                            </div>
                            <span className="font-display font-bold text-gold text-xl flex-shrink-0 px-1">
                              vs.
                            </span>
                            <div className="flex items-center gap-3 flex-1">
                              {oppKey ? (
                                <img
                                  src={teamLogo(oppKey)}
                                  alt={game.opponent}
                                  width="56"
                                  height="56"
                                  loading="lazy"
                                  decoding="async"
                                  className="w-14 h-14 object-contain flex-shrink-0"
                                />
                              ) : (
                                <div className="w-14 h-14 rounded-full bg-white/10 flex-shrink-0" />
                              )}
                              <span className="font-display font-bold text-[17px] text-white uppercase tracking-tight">
                                {game.opponent}
                              </span>
                            </div>
                          </div>
                          <p className="text-white/40 text-[13px] mt-2 m-0 text-center flex items-center justify-center gap-1.5">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                              <circle cx="12" cy="10" r="3" />
                            </svg>
                            {game.location}
                          </p>
                        </div>

                        {/* Score or badge */}
                        <div className="text-right">
                          {game.result ? (
                            <div className="flex items-center justify-end gap-2">
                              <span className={`font-display font-black text-2xl ${game.result === 'W' ? 'text-gold' : 'text-red-500'}`}>
                                {game.result}
                              </span>
                              <span className="text-white/60 font-semibold text-lg">
                                {game.score}
                              </span>
                            </div>
                          ) : (
                            <span
                              className="text-[12px] font-bold uppercase tracking-wider px-4 py-2 rounded-full inline-block"
                              style={{
                                backgroundColor: game.isHome ? 'rgba(255, 215, 0, 0.15)' : 'rgba(255, 255, 255, 0.06)',
                                color: game.isHome ? 'rgba(255, 215, 0, 0.8)' : 'rgba(255, 255, 255, 0.5)',
                              }}
                            >
                              {game.isHome ? 'Local' : 'Visitante'}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        ))}

        <div className="h-20" />
      </div>
    </div>
  );
};

export default Calendario;
