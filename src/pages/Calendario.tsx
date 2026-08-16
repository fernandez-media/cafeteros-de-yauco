import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import ResponsiveImage from '../components/ResponsiveImage';
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
  const months = groupByMonth(calendar);

  return (
    <div className="min-h-screen -mt-14">
      {/* Hero */}
      <div className="relative w-full h-[280px] lg:h-[520px] overflow-hidden">
        <ResponsiveImage
          name="dsc04629"
          alt="Cafeteros de Yauco"
          width={1920}
          height={800}
          sizes="100vw"
          pictureClassName="absolute inset-0 w-full h-full"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 30%' }}
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.7) 80%, #000 100%)' }} />
        <div className="absolute bottom-0 left-0 w-full px-5 lg:px-12 pb-8 lg:pb-14">
          <div className="max-w-[1200px] mx-auto lg:text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/50 text-xs no-underline hover:text-gold transition-colors duration-200 mb-4 lg:hidden"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
              Inicio
            </Link>
            <h1 className="font-display font-black text-4xl lg:text-7xl uppercase text-white leading-[0.95] m-0 tracking-tight">
              <span className="text-gold">Calendario</span>
            </h1>
            <p className="text-white/50 text-sm lg:text-base mt-2 m-0 uppercase tracking-widest">Temporada 2026 LVSM</p>
          </div>
        </div>
      </div>

      {/* Games by month */}
      <div className="px-5 lg:px-12 pb-16 pt-8 lg:pt-12 max-w-[1200px] mx-auto">
        {months.map((group, gi) => (
          <div key={group.month} className={gi > 0 ? 'mt-12 lg:mt-16' : ''}>
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-6">
                <h2 className="font-display font-black text-2xl lg:text-3xl uppercase text-white m-0 tracking-tight">
                  {group.month}
                </h2>
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-white/30 text-xs font-semibold uppercase tracking-wider">
                  {group.games.length} {group.games.length === 1 ? 'juego' : 'juegos'}
                </span>
              </div>
            </ScrollReveal>

            <div className="flex flex-col gap-3">
              {group.games.map((game, i) => {
                const oppKey = getOppKey(game.opponent);
                const day = game.date.split(' ')[1];
                const weekday = getDayOfWeek(group.month, parseInt(day));
                return (
                  <ScrollReveal key={`${gi}-${i}`} delay={i * 0.04}>
                    <div
                      className="group rounded-2xl overflow-hidden transition-all duration-300 lg:hover:-translate-y-0.5"
                      style={{
                        backgroundColor: '#111',
                        border: '1px solid rgba(255, 215, 0, 0.06)',
                      }}
                    >
                      {/* Mobile layout */}
                      <div className="lg:hidden p-5">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2 text-gold">
                            <span className="font-display font-bold text-base leading-none">{weekday}, {day} de {group.month}</span>
                            <span className="opacity-40">·</span>
                            <span className="text-sm font-semibold">{game.time}</span>
                          </div>
                          <span
                            className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                            style={{
                              backgroundColor: game.isHome ? 'rgba(255, 215, 0, 0.12)' : 'rgba(255, 255, 255, 0.06)',
                              color: game.isHome ? '#FFD700' : 'rgba(255, 255, 255, 0.4)',
                            }}
                          >
                            {game.isHome ? 'Local' : 'Visitante'}
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          {oppKey ? (
                            <img src={teamLogo(oppKey)} alt={game.opponent} width="80" height="80" loading="lazy" decoding="async" className="w-20 h-20 object-contain flex-shrink-0" />
                          ) : (
                            <div className="w-20 h-20 rounded-full bg-white/10 flex-shrink-0" />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-display font-bold text-base uppercase m-0 truncate">
                              vs. {game.opponent}
                            </p>
                            <p className="text-white/40 text-sm mt-1 m-0 truncate">
                              {game.location}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Desktop layout */}
                      <div className="hidden lg:flex items-center px-6 py-5 gap-6">
                        {/* Date - full name */}
                        <div className="w-64 flex-shrink-0 text-gold">
                          <p className="font-display font-black text-lg leading-tight m-0">{weekday}, {day} de {group.month}</p>
                        </div>

                        <div className="w-px h-14 bg-white/10 flex-shrink-0" />

                        {/* Time */}
                        <div className="w-24 flex-shrink-0 text-center">
                          <p className="text-gold text-base font-semibold m-0">{game.time}</p>
                        </div>

                        <div className="w-px h-12 bg-white/10 flex-shrink-0" />

                        {/* Teams - home team on right, visitor on left */}
                        <div className="flex items-center gap-4 flex-1 min-w-0">
                          {game.isHome ? (
                            <>
                              <div className="flex items-center gap-3 flex-1 min-w-0 justify-end">
                                <span className="text-white font-display font-bold text-base uppercase truncate">{game.opponent}</span>
                                {oppKey ? (
                                  <img src={teamLogo(oppKey)} alt={game.opponent} width="60" height="60" loading="lazy" decoding="async" className="w-[60px] h-[60px] object-contain flex-shrink-0" />
                                ) : (
                                  <div className="w-[60px] h-[60px] rounded-full bg-white/10 flex-shrink-0" />
                                )}
                              </div>
                              <span className="font-display font-bold text-gold text-base px-3">VS</span>
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <ResponsiveImage
                                  name="cafeteros-logo"
                                  alt="Cafeteros de Yauco"
                                  width={60}
                                  height={60}
                                  sizes="60px"
                                  loading="lazy"
                                  pictureClassName="w-[60px] h-[60px] inline-flex flex-shrink-0"
                                  className="w-[60px] h-[60px] object-contain"
                                />
                                <span className="text-white font-display font-bold text-base uppercase">Cafeteros</span>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="flex items-center gap-3 flex-1 min-w-0 justify-end">
                                <span className="text-white font-display font-bold text-base uppercase">Cafeteros</span>
                                <ResponsiveImage
                                  name="cafeteros-logo"
                                  alt="Cafeteros de Yauco"
                                  width={60}
                                  height={60}
                                  sizes="60px"
                                  loading="lazy"
                                  pictureClassName="w-[60px] h-[60px] inline-flex flex-shrink-0"
                                  className="w-[60px] h-[60px] object-contain"
                                />
                              </div>
                              <span className="font-display font-bold text-gold text-base px-3">VS</span>
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                {oppKey ? (
                                  <img src={teamLogo(oppKey)} alt={game.opponent} width="60" height="60" loading="lazy" decoding="async" className="w-[60px] h-[60px] object-contain flex-shrink-0" />
                                ) : (
                                  <div className="w-[60px] h-[60px] rounded-full bg-white/10 flex-shrink-0" />
                                )}
                                <span className="text-white font-display font-bold text-base uppercase truncate">{game.opponent}</span>
                              </div>
                            </>
                          )}
                        </div>

                        <div className="w-px h-12 bg-white/10 flex-shrink-0" />

                        {/* Location */}
                        <div className="w-72 flex-shrink-0">
                          <p className="text-white/40 text-sm m-0 flex items-center gap-2">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                              <circle cx="12" cy="10" r="3" />
                            </svg>
                            <span className="truncate">{game.location}</span>
                          </p>
                        </div>

                        {/* Badge */}
                        <span
                          className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full flex-shrink-0"
                          style={{
                            backgroundColor: game.isHome ? 'rgba(255, 215, 0, 0.12)' : 'rgba(255, 255, 255, 0.06)',
                            color: game.isHome ? '#FFD700' : 'rgba(255, 255, 255, 0.4)',
                          }}
                        >
                          {game.isHome ? 'Local' : 'Visitante'}
                        </span>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendario;
