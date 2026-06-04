import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import PageHero from '../components/PageHero';
import { calendar } from '../data/calendar';

const Calendario = () => {
  return (
    <div className="min-h-screen -mt-14">
      <PageHero title="Calendario" goldWord="Calendario" subtitle="Proximos Juegos" />

      <div className="px-5 pt-4 pb-4">
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

      <div className="px-5 pb-10 flex flex-col gap-4">
        {calendar.map((game, i) => (
          <ScrollReveal key={i} delay={i * 0.03}>
            <div
              className="rounded-2xl p-5 border"
              style={{
                backgroundColor: '#1a1a1a',
                borderColor: 'rgba(255, 215, 0, 0.08)',
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-white/50 text-xs font-semibold uppercase tracking-wide">
                  {game.date} &middot; {game.time}
                </span>
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                  style={{
                    backgroundColor: game.isHome
                      ? 'rgba(255, 215, 0, 0.15)'
                      : 'rgba(255, 255, 255, 0.08)',
                    color: game.isHome ? '#FFD700' : 'rgba(255, 255, 255, 0.5)',
                  }}
                >
                  {game.isHome ? 'Local' : 'Visitante'}
                </span>
              </div>
              <div className="flex items-center gap-3 mb-3">
                <img
                  src="/assets/CafeterosLogo.png"
                  alt="Cafeteros"
                  width="36"
                  height="36"
                  loading="lazy"
                  decoding="async"
                  className="w-9 h-9 object-contain"
                />
                <span className="text-white/30 text-xs font-bold">VS</span>
                <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(255,255,255,0.4)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                </div>
              </div>
              <p className="text-white font-display font-bold text-base uppercase m-0">
                Cafeteros de Yauco vs {game.opponent}
              </p>
              <p className="text-white/40 text-xs mt-1 m-0 flex items-center gap-1 whitespace-nowrap">
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
                {game.location}
              </p>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
};

export default Calendario;
