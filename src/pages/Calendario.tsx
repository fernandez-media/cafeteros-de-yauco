import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import PageHero from '../components/PageHero';
import ResponsiveImage from '../components/ResponsiveImage';
import { calendar } from '../data/calendar';

const BASE = import.meta.env.BASE_URL;
const teamLogo = (name: string) => `${BASE}media/logos/${name}.png`;

const Calendario = () => {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const compute = () => {
      const center = window.innerHeight / 2;
      let best = 0;
      let bestDist = Infinity;
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.top + r.height / 2 - center);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      setActiveIndex(best);
    };
    compute();
    window.addEventListener('scroll', compute, { passive: true });
    window.addEventListener('resize', compute);
    return () => {
      window.removeEventListener('scroll', compute);
      window.removeEventListener('resize', compute);
    };
  }, []);

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
        {calendar.map((game, i) => {
          const isActive = i === activeIndex;
          return (
          <ScrollReveal key={i} delay={i * 0.03}>
            <div
              ref={(el) => { cardRefs.current[i] = el; }}
              className="rounded-2xl p-5 border transition-[border-color,box-shadow] duration-300"
              style={{
                backgroundColor: '#1a1a1a',
                borderColor: isActive ? 'rgba(255, 215, 0, 0.8)' : 'rgba(255, 215, 0, 0.08)',
                boxShadow: isActive ? '0 0 24px rgba(255, 215, 0, 0.45)' : 'none',
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
              <div className="flex items-start justify-center gap-3 mb-3">
                {(() => {
                  const cafeterosBlock = (
                    <div key="cafeteros" className="flex flex-col items-center flex-1 min-w-0">
                      <ResponsiveImage
                        name="cafeteros-logo"
                        alt="Cafeteros de Yauco"
                        width={56}
                        height={56}
                        sizes="56px"
                        loading="eager"
                        pictureClassName="w-14 h-14 inline-flex"
                        className="w-14 h-14 object-contain"
                      />
                      <p className="text-white font-bold text-[11px] uppercase leading-tight text-center mt-1 m-0 break-words">
                        Cafeteros de Yauco
                      </p>
                    </div>
                  );
                  const opp = game.opponent.toLowerCase();
                  const opponentBlock = (
                    <div key="opponent" className="flex flex-col items-center flex-1 min-w-0">
                      {opp.includes('caribes') ? (
                        <img src={teamLogo('caribes')} alt="Caribes de San Sebastián" width="56" height="56" loading="eager" decoding="async" className="w-14 h-14 object-contain" />
                      ) : opp.includes('gigantes') ? (
                        <img src={teamLogo('gigantes')} alt="Gigantes de Carolina" width="56" height="56" loading="eager" decoding="async" className="w-14 h-14 object-contain" />
                      ) : opp.includes('mets') ? (
                        <img src={teamLogo('mets')} alt="Guaynabo Mets" width="56" height="56" loading="eager" decoding="async" className="w-14 h-14 object-contain" />
                      ) : opp.includes('patriotas') ? (
                        <img src={teamLogo('patriotas')} alt="Patriotas de Lares" width="56" height="56" loading="eager" decoding="async" className="w-14 h-14 object-contain" />
                      ) : opp.includes('plataneros') ? (
                        <img src={teamLogo('plataneros')} alt="Plataneros de Corozal" width="56" height="56" loading="eager" decoding="async" className="w-14 h-14 object-contain" />
                      ) : (
                        <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center">
                          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="2" y1="12" x2="22" y2="12" />
                            <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                          </svg>
                        </div>
                      )}
                      <p className="text-white font-bold text-[11px] uppercase leading-tight text-center mt-1 m-0 break-words">
                        {game.opponent}
                      </p>
                    </div>
                  );
                  const blocks = game.isHome ? [opponentBlock, cafeterosBlock] : [cafeterosBlock, opponentBlock];
                  return (
                    <>
                      {blocks[0]}
                      <span className="font-display font-bold text-base text-gold pt-5">VS</span>
                      {blocks[1]}
                    </>
                  );
                })()}
              </div>
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
          );
        })}

      </div>
    </div>
  );
};

export default Calendario;
