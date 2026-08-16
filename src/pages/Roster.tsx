import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import ResponsiveImage from '../components/ResponsiveImage';
import { roster, staff, medical, fitness } from '../data/roster';

const Roster = () => {
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

      <div className="px-5 lg:px-12 pb-16 pt-8 lg:pt-12 max-w-[1200px] mx-auto">
        {/* Jugadores */}
        <ScrollReveal>
          <h2 className="font-display font-black text-2xl lg:text-3xl uppercase text-white m-0 mb-6 tracking-tight">
            Jugadores
          </h2>
        </ScrollReveal>

        {/* Mobile: vertical list */}
        <div className="flex flex-col gap-2.5 lg:hidden">
          {roster.map((player, i) => (
            <ScrollReveal key={i} delay={i * 0.04}>
              <div
                className="flex items-center gap-3 rounded-2xl px-3 py-2.5 transition-all duration-300"
                style={{
                  backgroundColor: '#111',
                  border: '1px solid rgba(255, 215, 0, 0.06)',
                }}
              >
                <div className="relative flex-shrink-0 w-[88px] h-[88px] rounded-full overflow-hidden bg-black">
                  {player.photo ? (
                    <img
                      src={player.photo}
                      alt={player.name}
                      width={88}
                      height={88}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                      style={player.photoPosition ? { objectPosition: player.photoPosition } : undefined}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-white/5">
                      <span className="font-display font-black text-gold/30 text-2xl">{player.number}</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-bold text-base text-white uppercase m-0 leading-tight flex items-center gap-1.5">
                    {player.name}
                    {player.captain && (
                      <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded bg-gold/20 text-gold font-display font-bold text-[8px] leading-none uppercase tracking-wider">
                        C
                      </span>
                    )}
                  </p>
                  <p className="text-gold/50 text-xs mt-0.5 m-0 uppercase tracking-wider font-semibold">
                    {player.position}
                  </p>
                </div>
                <span className="font-display font-black text-gold/15 text-3xl leading-none flex-shrink-0 pr-1">
                  #{player.number}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Desktop: interactive grid */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-4">
          {roster.map((player, i) => (
            <ScrollReveal key={i} delay={i * 0.04}>
              <div
                className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
                tabIndex={0}
                role="article"
                aria-label={`${player.name}, ${player.position}`}
                style={{
                  backgroundColor: '#111',
                  border: '1px solid rgba(255, 215, 0, 0.06)',
                }}
              >
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
                    className="absolute top-3 right-4 font-display font-black text-5xl text-gold/15 leading-none"
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

        {/* Staff sections */}
        <div className="mt-10 lg:mt-16">
          {[
            { title: 'Cuerpo Tecnico', members: staff },
            { title: 'Cuerpo Medico', members: medical },
            { title: 'Preparador Fisico', members: fitness },
          ].map((section, si) => (
            <div key={si} className={si > 0 ? 'mt-6' : ''}>
              <ScrollReveal>
                <h2 className="font-display font-black text-lg lg:text-2xl uppercase text-white m-0 mb-3 tracking-tight">
                  {section.title}
                </h2>
              </ScrollReveal>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 lg:grid-cols-4">
                {section.members.map((member, i) => (
                  <ScrollReveal key={i} delay={i * 0.04}>
                    <p className="font-display font-bold text-sm text-white/70 uppercase m-0 py-1">
                      {member.name}
                    </p>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roster;
