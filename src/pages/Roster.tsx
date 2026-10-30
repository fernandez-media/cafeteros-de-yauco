import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import ResponsiveImage from '../components/ResponsiveImage';
import { roster, staff, medical, fitness, generalManager, management, coOwner, dataVolley, equipment } from '../data/roster';

const Roster = () => {
  return (
    <div className="min-h-screen -mt-14">
      {/* Hero */}
      <div className="relative w-full h-[220px] lg:h-[420px] overflow-hidden">
        <ResponsiveImage
          name="dsc04710"
          alt="Cafeteros de Yauco"
          width={1920}
          height={600}
          sizes="100vw"
          pictureClassName="absolute inset-0 w-full h-full"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 40%, #000 100%)' }} />
        <Link
          to="/"
          className="absolute top-5 left-5 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-gold/30 flex items-center justify-center no-underline transition-all duration-200 hover:bg-gold/20 hover:border-gold/50 active:scale-[0.92]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </Link>
        <div className="absolute bottom-0 left-0 w-full px-5 lg:px-12 pb-6 lg:pb-12">
          <div className="max-w-[1200px] mx-auto text-center lg:text-left">
            <h1 className="font-display font-black text-5xl lg:text-6xl uppercase text-white leading-[0.95] m-0 tracking-tight">
              Roster
            </h1>
            <p className="text-white/50 text-xs lg:text-base mt-1.5 m-0 uppercase tracking-[0.12em]">Temporada 2026 LVSM</p>
          </div>
        </div>
      </div>

      <div className="px-4 lg:px-12 pb-16 pt-5 lg:pt-12 max-w-[1200px] mx-auto">
        {/* Jugadores */}
        <ScrollReveal variant="blur" distance={40}>
          <h2 className="font-display font-black text-xl lg:text-3xl uppercase text-white m-0 mb-4 tracking-tight">
            Jugadores
          </h2>
        </ScrollReveal>

        {/* Mobile: vertical list */}
        <div className="flex flex-col gap-2 lg:hidden">
          {roster.map((player, i) => (
            <ScrollReveal key={i} delay={i * 0.04} variant="left" distance={50}>
              <div
                className="flex items-center gap-3 rounded-xl px-3 py-2 transition-all duration-300"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.025)',
                  border: '1px solid rgba(255, 215, 0, 0.06)',
                }}
              >
                <div className="relative flex-shrink-0 w-[72px] h-[72px] rounded-full overflow-hidden bg-black">
                  {player.photo ? (
                    <img
                      src={player.photo}
                      alt={player.name}
                      width={72}
                      height={72}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                      style={player.photoPosition ? { objectPosition: player.photoPosition } : undefined}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-white/5">
                      <span className="font-display font-black text-gold/30 text-xl">{player.number}</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-display font-bold text-[15px] text-white uppercase m-0 leading-tight flex items-center gap-1.5">
                    {player.name}
                    {player.captain && (
                      <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded bg-gold/20 text-gold font-display font-bold text-[9px] leading-none uppercase tracking-wider">
                        C
                      </span>
                    )}
                  </p>
                  <p className="text-gold/60 text-[11px] mt-0.5 m-0 uppercase tracking-wider font-semibold">
                    {player.position}
                  </p>
                </div>
                <span className="font-display font-black text-gold/25 text-2xl leading-none flex-shrink-0 pr-1">
                  #{player.number}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Desktop: interactive grid */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6">
          {roster.map((player, i) => (
            <ScrollReveal key={i} delay={i * 0.06} variant="slideUp" distance={60}>
              <div
                className="group relative flex flex-col items-center text-center cursor-pointer transition-all duration-300 hover:-translate-y-1"
                tabIndex={0}
                role="article"
                aria-label={`${player.name}, ${player.position}`}
              >
                <div className="relative w-full aspect-square rounded-full overflow-hidden bg-black/50 border border-gold/10 transition-all duration-300 group-hover:border-gold/30">
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
                  <span
                    className="absolute top-2 right-4 font-display font-black text-4xl text-gold/15 leading-none"
                    aria-hidden="true"
                  >
                    #{player.number}
                  </span>
                  {player.captain && (
                    <span className="absolute top-2 left-4 inline-flex items-center justify-center px-2 py-1 rounded-full bg-gold/20 text-gold font-display font-bold text-[10px] leading-none uppercase tracking-wider backdrop-blur-sm">
                      C
                    </span>
                  )}
                </div>
                <div className="mt-3">
                  <p className="font-display font-bold text-base text-white uppercase m-0 leading-tight">
                    {player.name}
                  </p>
                  <p className="text-gold/60 text-xs mt-1 m-0 uppercase tracking-wider font-semibold">
                    {player.position}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Staff sections */}
        <div className="mt-8 lg:mt-16">
          <ScrollReveal variant="blur" distance={30}>
            <h2 className="font-display font-black text-xl lg:text-2xl uppercase text-white m-0 mb-4 tracking-tight">
              Staff
            </h2>
          </ScrollReveal>

          <div
            className="rounded-xl lg:rounded-2xl overflow-hidden"
            style={{ backgroundColor: 'rgba(255, 255, 255, 0.025)', border: '1px solid rgba(255, 215, 0, 0.06)' }}
          >
            {[
              { title: 'Gerente General', members: generalManager },
              { title: 'Apoderado', members: management },
              { title: 'Co-Apoderado', members: coOwner },
              { title: 'Cuerpo Técnico', members: staff },
              { title: 'Data Volley', members: dataVolley },
              { title: 'Cuerpo Médico', members: medical },
              { title: 'Preparador Físico', members: fitness },
              { title: 'Enc. de Propiedad', members: equipment },
            ].map((section, si, arr) => (
              <div
                key={si}
                className="flex items-baseline justify-between px-4 py-3 lg:px-6 lg:py-3.5"
                style={si < arr.length - 1 ? { borderBottom: '1px solid rgba(255, 255, 255, 0.05)' } : undefined}
              >
                <span className="font-display font-bold text-[13px] lg:text-sm uppercase text-white/40 tracking-wide flex-shrink-0">
                  {section.title}
                </span>
                <span className="font-display font-bold text-[14px] lg:text-base text-white uppercase text-right">
                  {section.members.map(m => m.name).join(', ')}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roster;
