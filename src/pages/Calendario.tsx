import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import { calendar } from '../data/calendar';

const BASE = import.meta.env.BASE_URL;
const teamLogo = (name: string) => `${BASE}media/logos/${name}.webp`;

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

  const nextOppKey = nextGame ? getOppKey(nextGame.opponent) : null;
  const nextDaysUntil = nextGame ? getDaysUntil(nextGame.date) : 0;
  const nextMonth = nextGame ? nextGame.date.split(' ')[0] : '';
  const nextDay = nextGame ? nextGame.date.split(' ')[1] : '';
  const nextWeekday = nextMonth && nextDay ? getDayOfWeek(nextMonth, parseInt(nextDay)) : '';

  return (
    <div className="min-h-screen -mt-14">
      {/* Hero — clean graphic, no image */}
      <div className="relative w-full overflow-hidden bg-black">
        <div className="pt-24 pb-14 lg:pt-32 lg:pb-20 px-5 lg:px-12 max-w-[1200px] mx-auto relative">
          {/* Watermark */}
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

          {/* Progress bar */}
          <div className="flex gap-1 mb-5 relative z-10">
            {Array.from({ length: totalGames }).map((_, i) => (
              <div
                key={i}
                className="h-[3px] rounded-full flex-1 max-w-5"
                style={{ backgroundColor: i < gamesPlayed ? '#FFD700' : 'rgba(255, 215, 0, 0.08)' }}
              />
            ))}
          </div>

          <h1 className="font-display font-black text-5xl lg:text-7xl uppercase text-white leading-[0.95] m-0 tracking-tight relative z-10">
            Calendario
          </h1>
          <p className="text-white/30 text-sm mt-2 m-0 uppercase tracking-[0.15em] relative z-10">
            {totalGames} Juegos · Oct–Dic 2026
          </p>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto">
        {/* Next Game */}
        {nextGame && (
          <div className="px-5 lg:px-12 pt-8 lg:pt-10">
            <ScrollReveal variant="blur" distance={30}>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2 m-0" style={{ color: 'rgba(255, 215, 0, 0.5)' }}>
                Próximo partido
              </p>
              <div
                className="rounded-2xl p-4 lg:p-5 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,215,0,0.07), rgba(255,215,0,0.02))',
                  border: '1px solid rgba(255, 215, 0, 0.12)',
                }}
              >
                <div className="absolute top-0 right-0 bottom-0 w-1/3 pointer-events-none" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.03))' }} />
                <div className="flex items-center gap-4 lg:gap-5 relative z-10">
                  {nextOppKey ? (
                    <img
                      src={teamLogo(nextOppKey)}
                      alt={nextGame.opponent}
                      width="64"
                      height="64"
                      loading="eager"
                      className="w-16 h-16 lg:w-[72px] lg:h-[72px] object-contain flex-shrink-0"
                    />
                  ) : (
                    <div className="w-16 h-16 lg:w-[72px] lg:h-[72px] rounded-full bg-white/10 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-display font-bold text-base lg:text-lg text-white uppercase m-0 truncate">
                      vs {nextGame.opponent}
                    </p>
                    <p className="text-white/35 text-xs lg:text-sm mt-1 m-0 truncate">
                      {nextWeekday}, {nextDay} de {nextMonth} · {nextGame.isHome ? 'Local' : 'Visitante'}
                    </p>
                    <p className="text-white/20 text-[11px] mt-0.5 m-0 truncate flex items-center gap-1.5">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                      {nextGame.location}
                    </p>
                  </div>
                  <div className="flex-shrink-0 text-center pl-2">
                    <p className="font-display font-black text-2xl lg:text-3xl text-gold m-0 leading-none">
                      {nextDaysUntil}
                    </p>
                    <p className="text-white/25 text-[8px] lg:text-[9px] uppercase tracking-[0.12em] mt-1 m-0">
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
                className="px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider transition-all duration-200 border-0 cursor-pointer"
                style={{
                  backgroundColor: filter === f ? 'rgba(255, 215, 0, 0.15)' : 'rgba(255, 255, 255, 0.04)',
                  color: filter === f ? '#FFD700' : 'rgba(255, 255, 255, 0.3)',
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Games by month */}
        {months.map((group, gi) => (
          <div key={group.month} className="px-5 lg:px-12 pt-8">
            <ScrollReveal variant="blur" distance={30}>
              <div className="flex items-center gap-4 mb-4">
                <h2 className="font-display font-black text-xl lg:text-2xl uppercase text-white m-0 tracking-tight">
                  {group.month === 'TBD' ? 'Por confirmar' : group.month}
                </h2>
                <div className="flex-1 h-px" style={{ backgroundColor: 'rgba(255, 255, 255, 0.06)' }} />
                <span className="text-[10px] font-semibold uppercase tracking-wider text-white/20">
                  {group.games.length} {group.games.length === 1 ? 'juego' : 'juegos'}
                </span>
              </div>
            </ScrollReveal>

            <div className="flex flex-col gap-2.5">
              {group.games.map((game, i) => {
                const oppKey = getOppKey(game.opponent);
                const isTBD = game.date === 'TBD';
                const day = isTBD ? '' : game.date.split(' ')[1];
                const weekday = isTBD ? '' : getDayOfWeek(group.month, parseInt(day));

                return (
                  <ScrollReveal key={`${gi}-${i}`} delay={i * 0.06} variant="left" distance={50}>
                    <div
                      className="flex items-center gap-3 lg:gap-4 rounded-xl p-3 lg:p-4 transition-all duration-300 lg:hover:-translate-y-0.5"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.02)',
                        border: '0.5px solid rgba(255, 215, 0, 0.06)',
                      }}
                    >
                      {/* Opponent logo */}
                      {oppKey ? (
                        <img
                          src={teamLogo(oppKey)}
                          alt={game.opponent}
                          width="52"
                          height="52"
                          loading="lazy"
                          decoding="async"
                          className="w-[52px] h-[52px] lg:w-14 lg:h-14 object-contain flex-shrink-0"
                        />
                      ) : (
                        <div className="w-[52px] h-[52px] lg:w-14 lg:h-14 rounded-full bg-white/10 flex-shrink-0" />
                      )}

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-display font-bold text-sm lg:text-base text-white uppercase m-0 truncate">
                          vs {game.opponent}
                        </p>
                        <p className="text-white/30 text-xs mt-0.5 m-0 truncate">
                          {isTBD ? 'Fecha por anunciar' : `${weekday}, ${day} de ${group.month}`}
                          {!isTBD && <span className="text-white/15"> · </span>}
                          {!isTBD && (game.isHome ? 'Local' : 'Visitante')}
                        </p>
                        <p className="text-white/20 text-[11px] mt-0.5 m-0 truncate flex items-center gap-1">
                          <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 opacity-60"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                          {game.location}
                        </p>
                      </div>

                      {/* Score or badge */}
                      <div className="flex-shrink-0 text-right">
                        {game.result ? (
                          <span className="flex items-center gap-1.5">
                            <span className={`font-display font-black text-base lg:text-lg ${game.result === 'W' ? 'text-gold' : 'text-red-500'}`}>
                              {game.result}
                            </span>
                            <span className="text-white/50 font-semibold text-sm">
                              {game.score}
                            </span>
                          </span>
                        ) : (
                          <span
                            className="text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full inline-block"
                            style={{
                              backgroundColor: game.isHome ? 'rgba(255, 215, 0, 0.1)' : 'rgba(255, 255, 255, 0.04)',
                              color: game.isHome ? 'rgba(255, 215, 0, 0.5)' : 'rgba(255, 255, 255, 0.25)',
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
          </div>
        ))}

        <div className="h-20" />
      </div>
    </div>
  );
};

export default Calendario;
