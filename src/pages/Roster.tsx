import { useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import ResponsiveImage from '../components/ResponsiveImage';
import { roster, staff, medical, fitness } from '../data/roster';

const Roster = () => {
  const [activePlayer, setActivePlayer] = useState<number | null>(null);

  return (
    <div className="min-h-screen -mt-14">
      {/* Hero */}
      <div className="relative w-full h-[280px] lg:h-[420px] overflow-hidden">
        <ResponsiveImage
          name="dsc04710"
          alt="Cafeteros de Yauco"
          width={1920}
          height={600}
          sizes="100vw"
          pictureClassName="absolute inset-0 w-full h-full"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.5) 50%, #000 100%)' }} />
        <div className="absolute bottom-0 left-0 w-full px-5 lg:px-12 pb-8 lg:pb-12">
          <div className="max-w-[1200px] mx-auto">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/50 text-xs no-underline hover:text-gold transition-colors duration-200 mb-4"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
              Inicio
            </Link>
            <h1 className="font-display font-black text-4xl lg:text-6xl uppercase text-white leading-[0.95] m-0 tracking-tight">
              <span className="text-gold">Roster</span>
            </h1>
            <p className="text-white/50 text-sm lg:text-base mt-2 m-0 uppercase tracking-widest">Temporada 2026 LVSM</p>
          </div>
        </div>
      </div>

      {/* Players */}
      <div className="px-5 lg:px-12 pb-12 pt-8 lg:pt-12 max-w-[1200px] mx-auto">
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-8">
            <h2 className="font-display font-black text-2xl lg:text-3xl uppercase text-white m-0 tracking-tight">
              Jugadores
            </h2>
            <div className="flex-1 h-px bg-white/10" />
            <span className="text-white/30 text-xs font-semibold uppercase tracking-wider">
              {roster.length} jugadores
            </span>
          </div>
        </ScrollReveal>

        {/* Mobile: infinite loop slider */}
        <style>{`
          @keyframes rosterSlide {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
        <div className="lg:hidden overflow-hidden -mx-5">
          <div
            className="flex gap-3 w-max"
            style={{ animation: 'rosterSlide 35s linear infinite' }}
          >
            {[...roster, ...roster].map((player, i) => (
              <div
                key={i}
                className="relative rounded-2xl overflow-hidden flex-shrink-0"
                style={{
                  width: '160px',
                  backgroundColor: '#111',
                  border: '1px solid rgba(255, 215, 0, 0.06)',
                }}
              >
                <div className="relative w-full aspect-[3/4] overflow-hidden">
                  {player.photo ? (
                    <img
                      src={player.photo}
                      alt={player.name}
                      width={160}
                      height={213}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                      style={player.photoPosition ? { objectPosition: player.photoPosition } : undefined}
                    />
                  ) : (
                    <div className="w-full h-full bg-white/[0.03] flex items-center justify-center">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span
                    className="absolute top-2 right-3 font-display font-black text-3xl text-gold/20 leading-none"
                    aria-hidden="true"
                  >
                    {player.number}
                  </span>
                  {player.captain && (
                    <span className="absolute top-2 left-2 inline-flex items-center justify-center px-1.5 py-0.5 rounded bg-gold/20 text-gold font-display font-bold text-[8px] leading-none uppercase tracking-wider backdrop-blur-sm">
                      C
                    </span>
                  )}
                </div>
                <div className="p-2.5">
                  <p className="font-display font-bold text-[11px] text-white uppercase m-0 leading-tight truncate">
                    {player.name}
                  </p>
                  <p className="text-gold/50 text-[9px] mt-0.5 m-0 uppercase tracking-wider font-semibold">
                    {player.position}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: interactive grid */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-4">
          {roster.map((player, i) => (
            <ScrollReveal key={i} delay={i * 0.04}>
              <div
                className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300"
                tabIndex={0}
                role="article"
                aria-label={`${player.name}, ${player.position}`}
                style={{
                  backgroundColor: activePlayer === i ? '#1a1a00' : '#111',
                  border: activePlayer === i ? '1px solid rgba(255, 215, 0, 0.3)' : '1px solid rgba(255, 215, 0, 0.06)',
                  boxShadow: activePlayer === i ? '0 20px 60px rgba(255, 215, 0, 0.1)' : 'none',
                }}
                onMouseEnter={() => setActivePlayer(i)}
                onMouseLeave={() => setActivePlayer(null)}
                onFocus={() => setActivePlayer(i)}
                onBlur={() => setActivePlayer(null)}
              >
                {/* Photo */}
                <div className="relative w-full aspect-square overflow-hidden bg-black/50">
                  {player.photo ? (
                    <img
                      src={player.photo}
                      alt={player.name}
                      width={400}
                      height={400}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      style={player.photoPosition ? { objectPosition: player.photoPosition } : undefined}
                    />
                  ) : (
                    <div className="w-full h-full bg-white/[0.03] flex items-center justify-center">
                      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <span
                    className="absolute top-3 right-4 font-display font-black text-5xl leading-none transition-all duration-300"
                    style={{
                      color: activePlayer === i ? 'rgba(255, 215, 0, 0.5)' : 'rgba(255, 215, 0, 0.15)',
                    }}
                    aria-hidden="true"
                  >
                    {player.number}
                  </span>
                  {player.captain && (
                    <span className="absolute top-3 left-3 inline-flex items-center justify-center px-2 py-1 rounded bg-gold/20 text-gold font-display font-bold text-[10px] leading-none uppercase tracking-wider backdrop-blur-sm">
                      Capitan
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className="font-display font-bold text-base text-white uppercase m-0 leading-tight">
                    {player.name}
                  </p>
                  <p className="text-gold/60 text-xs mt-1.5 m-0 uppercase tracking-wider font-semibold">
                    {player.position}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Staff sections */}
      <div className="px-5 lg:px-12 pb-16 max-w-[1200px] mx-auto">
        {/* Cuerpo Tecnico */}
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="font-display font-black text-xl lg:text-2xl uppercase text-white m-0 tracking-tight">
              Cuerpo Tecnico
            </h2>
            <div className="flex-1 h-px bg-white/10" />
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
          {staff.map((member, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div
                className="rounded-xl p-5 text-center transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  backgroundColor: '#111',
                  border: '1px solid rgba(255, 215, 0, 0.06)',
                }}
              >
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,215,0,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <p className="font-display font-bold text-sm text-white uppercase m-0 leading-tight">
                  {member.name}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Cuerpo Medico */}
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="font-display font-black text-xl lg:text-2xl uppercase text-white m-0 tracking-tight">
              Cuerpo Medico
            </h2>
            <div className="flex-1 h-px bg-white/10" />
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-12">
          {medical.map((member, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div
                className="rounded-xl p-5 text-center transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  backgroundColor: '#111',
                  border: '1px solid rgba(255, 215, 0, 0.06)',
                }}
              >
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,215,0,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </div>
                <p className="font-display font-bold text-sm text-white uppercase m-0 leading-tight">
                  {member.name}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Preparador Fisico */}
        <ScrollReveal>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="font-display font-black text-xl lg:text-2xl uppercase text-white m-0 tracking-tight">
              Preparador Fisico
            </h2>
            <div className="flex-1 h-px bg-white/10" />
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {fitness.map((member, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div
                className="rounded-xl p-5 text-center transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  backgroundColor: '#111',
                  border: '1px solid rgba(255, 215, 0, 0.06)',
                }}
              >
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(255,215,0,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                    <line x1="6" y1="1" x2="6" y2="4" />
                    <line x1="10" y1="1" x2="10" y2="4" />
                    <line x1="14" y1="1" x2="14" y2="4" />
                  </svg>
                </div>
                <p className="font-display font-bold text-sm text-white uppercase m-0 leading-tight">
                  {member.name}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roster;
