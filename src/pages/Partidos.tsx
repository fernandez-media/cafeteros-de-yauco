import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import PageHero from '../components/PageHero';
import ResponsiveImage from '../components/ResponsiveImage';
import { videos } from '../data/videos';
import { matches, type Match } from '../data/matches';

const BASE = import.meta.env.BASE_URL;
const teamLogo = (name: string) => `${BASE}media/logos/${name}.png`;

const statusLabel = (status: Match['status']) => {
  switch (status) {
    case 'finished':
      return 'Finalizado';
    case 'live':
      return 'En vivo';
    case 'upcoming':
    default:
      return 'Por jugarse';
  }
};

const featuredVideo = videos[0];

const Partidos = () => {
  return (
    <div className="min-h-screen -mt-14">
      <PageHero title="Partidos" goldWord="Partidos" subtitle="Revive y sigue cada juego" />

      <div className="px-5 lg:px-10 pt-4 pb-4 max-w-[1200px] lg:mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/50 text-sm no-underline hover:text-gold transition-colors duration-200"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Inicio
        </Link>
      </div>

      <div className="px-5 lg:px-10 pb-12 lg:pb-20 max-w-[1200px] lg:mx-auto">
        {/* Featured video — compact */}
        <ScrollReveal>
          <div className="mb-8 lg:mb-12">
            <p className="text-gold text-[10px] font-display font-bold uppercase tracking-[0.2em] m-0 mb-3">
              Video destacado
            </p>
            <div
              className="rounded-2xl overflow-hidden w-full lg:max-w-[720px]"
              style={{
                backgroundColor: '#1a1a1a',
                border: '1px solid rgba(255, 215, 0, 0.08)',
              }}
            >
              <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                <iframe
                  src={`https://www.youtube.com/embed/${featuredVideo.id}`}
                  title={featuredVideo.title}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>
              <div className="p-4 lg:p-5">
                <h3 className="font-display font-bold text-sm lg:text-base text-white uppercase m-0">
                  {featuredVideo.title}
                </h3>
                <p className="text-white/40 text-xs mt-1 m-0 flex items-center gap-1.5">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  LVSM 2025-26
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Match list header */}
        <ScrollReveal>
          <div className="flex items-center justify-between mb-5 lg:mb-7">
            <h2 className="font-display font-black text-2xl lg:text-3xl uppercase text-white m-0 tracking-tight">
              Todos los <span className="text-gold">Partidos</span>
            </h2>
            <span className="hidden lg:inline text-white/40 text-xs font-display font-bold uppercase tracking-[0.15em]">
              Temporada 2025-26
            </span>
          </div>
        </ScrollReveal>

        {/* Match list grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
          {matches.map((match, i) => {
            const isPlayable = !!match.videoId;
            const parts = match.location.split(',').map((s) => s.trim());
            const venue = parts[0];
            const city = parts.slice(1).join(', ') || 'Puerto Rico';

            return (
              <ScrollReveal key={match.id} delay={i * 0.05}>
                <div
                  className="group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
                  style={{
                    backgroundColor: '#1a1a1a',
                    border: '1px solid rgba(255, 215, 0, 0.08)',
                  }}
                >
                  {/* Top strip: date + status */}
                  <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
                    <div className="flex items-center gap-3">
                      <span className="font-display font-black text-lg text-white leading-none">
                        {match.date}
                      </span>
                      <span className="text-white/40 text-xs">{match.time}</span>
                    </div>
                    <span
                      className={`text-[10px] font-display font-bold uppercase tracking-[0.15em] px-2 py-1 rounded-full border ${
                        match.status === 'finished'
                          ? 'bg-white/10 text-white/70 border-white/10'
                          : match.status === 'live'
                          ? 'bg-red-500/20 text-red-400 border-red-500/30'
                          : 'bg-gold/10 text-gold border-gold/30'
                      }`}
                    >
                      {statusLabel(match.status)}
                    </span>
                  </div>

                  {/* Middle: matchup */}
                  <div className="px-4 py-5">
                    <div className="flex items-center justify-center gap-4 lg:gap-6">
                      {/* Cafeteros */}
                      <div className="flex flex-col items-center flex-1 min-w-0">
                        <ResponsiveImage
                          name="cafeteros-logo"
                          alt="Cafeteros de Yauco"
                          width={80}
                          height={80}
                          sizes="80px"
                          loading="lazy"
                          pictureClassName="w-16 h-16 lg:w-20 lg:h-20 inline-flex"
                          className="w-16 h-16 lg:w-20 lg:h-20 object-contain"
                        />
                        <p className="text-white/80 text-xs font-display font-bold uppercase leading-tight text-center mt-2 m-0">
                          Cafeteros
                        </p>
                      </div>

                      {/* VS / Result */}
                      <div className="flex flex-col items-center justify-center">
                        {match.status === 'finished' && match.result ? (
                          <span className="font-display font-black text-2xl lg:text-3xl text-gold leading-none">
                            {match.result}
                          </span>
                        ) : (
                          <span className="font-display font-black text-xl lg:text-2xl text-white/60 leading-none">
                            VS
                          </span>
                        )}
                      </div>

                      {/* Opponent */}
                      <div className="flex flex-col items-center flex-1 min-w-0">
                        {match.opponentKey ? (
                          <img
                            src={teamLogo(match.opponentKey)}
                            alt={match.opponent}
                            width={80}
                            height={80}
                            loading="lazy"
                            decoding="async"
                            className="w-16 h-16 lg:w-20 lg:h-20 object-contain"
                          />
                        ) : (
                          <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-full bg-white/10" />
                        )}
                        <p className="text-white/80 text-xs font-display font-bold uppercase leading-tight text-center mt-2 m-0">
                          {match.opponent.split(' ')[0]}
                        </p>
                      </div>
                    </div>

                    {/* Headline */}
                    <p className="text-center text-gold/80 text-[11px] font-display font-bold uppercase tracking-[0.2em] mt-3 m-0">
                      {match.headline}
                    </p>
                  </div>

                  {/* Bottom: location + CTA */}
                  <div className="px-4 pb-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-1.5 text-white/40 text-xs min-w-0">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="flex-shrink-0"
                        >
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span className="truncate">
                          {city} · {venue}
                        </span>
                      </div>

                      {isPlayable ? (
                        <a
                          href={`https://www.youtube.com/watch?v=${match.videoId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold text-black font-display font-bold text-[10px] uppercase tracking-wider no-underline transition-transform duration-200 hover:scale-105 flex-shrink-0"
                        >
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            stroke="none"
                          >
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                          Ver partido
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 text-white/50 font-display font-bold text-[10px] uppercase tracking-wider flex-shrink-0">
                          <svg
                            width="10"
                            height="10"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                          </svg>
                          Próximamente
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Gold hover accent */}
                  <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Partidos;
