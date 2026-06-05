import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import ImageSlider from '../components/ImageSlider';
import ResponsiveImage from '../components/ResponsiveImage';
import PlayerAvatar from '../components/PlayerAvatar';
import { calendar } from '../data/calendar';
import { news } from '../data/news';
import { roster } from '../data/roster';
import { merch } from '../data/merch';

const BASE = import.meta.env.BASE_URL;
const teamLogo = (name: string) => `${BASE}media/logos/${name}.png`;


const Index = () => {
  const previewGames = calendar.slice(0, 5);
  const previewRoster = roster.slice(0, 7);
  const featuredArticle = news[0];
  const sideArticles = news.slice(1, 3);

  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const computeActive = () => {
      const cRect = container.getBoundingClientRect();
      const center = cRect.left + cRect.width / 2;
      let best = 0;
      let bestDist = Infinity;
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - center);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      setActiveIndex(best);
    };
    computeActive();
    container.addEventListener('scroll', computeActive, { passive: true });
    window.addEventListener('resize', computeActive);
    return () => {
      container.removeEventListener('scroll', computeActive);
      window.removeEventListener('resize', computeActive);
    };
  }, [previewGames.length]);


  return (
    <div className="min-h-screen">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden -mt-14" style={{ height: '100dvh', minHeight: '100dvh' }}>
        <video
          src={`${import.meta.env.BASE_URL}media/hero.mp4`}
          poster={`${import.meta.env.BASE_URL}assets/opt/hero-1920.webp`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center 30%' }}
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.5) 50%, #111111 100%)',
          }}
        />
        <div className="absolute bottom-0 left-0 w-full px-5 flex flex-col items-center" style={{ paddingBottom: '130px' }}>
          <div className="mt-4 flex flex-col items-center" aria-hidden="true">
            {[
              { size: 22, opacity: 1, delay: '0s' },
              { size: 19, opacity: 0.5, delay: '0.2s' },
              { size: 16, opacity: 0.2, delay: '0.4s' },
            ].map((c, i) => (
              <svg
                key={i}
                width={c.size}
                height={c.size}
                viewBox="0 0 24 24"
                fill="none"
                stroke="#C8A84B"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  opacity: c.opacity,
                  animation: 'cascade 1.6s ease-in-out infinite',
                  animationDelay: c.delay,
                  marginTop: i === 0 ? 0 : -4,
                }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            ))}
          </div>
        </div>
      </section>

      {/* ===== IMAGE SLIDER ===== */}
      <section className="py-6">
        <ImageSlider />
      </section>

      {/* ===== CALENDARIO PREVIEW ===== */}
      <section className="py-10 overflow-visible">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-5 px-5">
            <h2 className="font-display font-bold text-2xl uppercase text-white m-0">
              Calendario
            </h2>
            <Link
              to="/calendario"
              className="text-gold text-sm font-semibold no-underline hover:underline"
            >
              Ver todo
            </Link>
          </div>
        </ScrollReveal>
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto overflow-y-hidden scrollbar-hidden py-8 px-5 items-stretch">
          {previewGames.map((game, i) => {
            const isActive = i === activeIndex;
            return (
            <ScrollReveal key={i} delay={i * 0.05} className="flex-shrink-0">
              <div
                ref={(el) => { cardRefs.current[i] = el; }}
                className="flex flex-col w-[260px] rounded-2xl p-5 border box-border transition-[border-color,box-shadow] duration-300"
                style={{
                  backgroundColor: '#1a1a1a',
                  borderColor: isActive ? 'rgba(255, 215, 0, 0.8)' : 'rgba(255, 255, 255, 0.06)',
                  boxShadow: isActive ? '0 0 24px rgba(255, 215, 0, 0.45)' : 'none',
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-white/50 text-sm font-semibold uppercase tracking-wide">
                    {game.date} &middot; {game.time}
                  </span>
                  <span
                    className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full whitespace-nowrap"
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
                          width={64}
                          height={64}
                          sizes="64px"
                          loading="eager"
                          pictureClassName="w-16 h-16 inline-flex"
                          className="w-16 h-16 object-contain"
                        />
                        <p className="text-white font-bold text-[12px] uppercase leading-tight text-center mt-1 m-0 break-words">
                          Cafeteros de Yauco
                        </p>
                      </div>
                    );
                    const opponentBlock = (
                      <div key="opponent" className="flex flex-col items-center flex-1 min-w-0">
                        {game.opponent.toLowerCase().includes('caribes') ? (
                          <img src={teamLogo('caribes')} alt="Caribes de San Sebastián" width="64" height="64" loading="eager" decoding="async" className="w-16 h-16 object-contain" />
                        ) : game.opponent.toLowerCase().includes('gigantes') ? (
                          <img src={teamLogo('gigantes')} alt="Gigantes de Carolina" width="64" height="64" loading="eager" decoding="async" className="w-16 h-16 object-contain" />
                        ) : game.opponent.toLowerCase().includes('mets') ? (
                          <img src={teamLogo('mets')} alt="Guaynabo Mets" width="64" height="64" loading="eager" decoding="async" className="w-16 h-16 object-contain" />
                        ) : game.opponent.toLowerCase().includes('patriotas') ? (
                          <img src={teamLogo('patriotas')} alt="Patriotas de Lares" width="64" height="64" loading="eager" decoding="async" className="w-16 h-16 object-contain" />
                        ) : game.opponent.toLowerCase().includes('plataneros') ? (
                          <img src={teamLogo('plataneros')} alt="Plataneros de Corozal" width="64" height="64" loading="eager" decoding="async" className="w-16 h-16 object-contain" />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <circle cx="12" cy="12" r="10" />
                              <line x1="2" y1="12" x2="22" y2="12" />
                              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            </svg>
                          </div>
                        )}
                        <p className="text-white font-bold text-[12px] uppercase leading-tight text-center mt-1 m-0 break-words">
                          {game.opponent}
                        </p>
                      </div>
                    );
                    const blocks = game.isHome ? [opponentBlock, cafeterosBlock] : [cafeterosBlock, opponentBlock];
                    return (
                      <>
                        {blocks[0]}
                        <span className="font-display font-bold text-base text-gold pt-6">VS</span>
                        {blocks[1]}
                      </>
                    );
                  })()}
                </div>

                {(() => {
                  const parts = game.location.split(',').map((s) => s.trim());
                  const venue = parts[0];
                  const city = parts.slice(1).join(', ');
                  return (
                    <div className="mt-2 text-white/40 text-sm flex items-center gap-1.5 min-w-0">
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
                      <div className="flex flex-col text-left leading-tight min-w-0">
                        <span>{city}</span>
                        {venue && <span className="text-white/25">{venue}</span>}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </ScrollReveal>
            );
          })}
        </div>
      </section>

      {/* ===== BOLETERIA PREVIEW ===== */}
      <section className="px-5 pt-2 pb-10">
        <ScrollReveal>
          <div className="relative rounded-2xl overflow-hidden border-2 border-gold transition-all duration-300 hover:border-gold/80 hover:shadow-[0_0_20px_rgba(255,215,0,0.3)] focus-within:border-gold/80 focus-within:shadow-[0_0_20px_rgba(255,215,0,0.3)]">
            <ResponsiveImage
              name="hero"
              alt=""
              width={1920}
              height={1080}
              sizes="100vw"
              ariaHidden
              pictureClassName="absolute inset-0 w-full h-full"
              className="w-full h-full object-cover"
              style={{ opacity: 0.35 }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%)',
              }}
            />
            <div className="relative z-10 p-5 sm:p-8 text-center">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#FFD700"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mx-auto mb-2 sm:mb-4"
              >
                <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                <path d="M13 5v2" />
                <path d="M13 17v2" />
                <path d="M13 11v2" />
              </svg>
              <h3 className="font-display font-bold text-xl sm:text-2xl uppercase text-white mb-1 sm:mb-2 m-0">
                Consigue tus boletos
              </h3>
              <p className="text-white/50 text-xs sm:text-sm mb-4 sm:mb-6 m-0">
                Asegura tu asiento para los juegos
                <br />
                de los Cafeteros de Yauco.
              </p>
              <a
                href="https://cafeterosdeyaucovollyball.printcotickets.com/browse"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 sm:px-7 py-2.5 sm:py-3 bg-gold text-black font-display font-bold text-xs sm:text-sm uppercase tracking-wider rounded-full no-underline transition-transform duration-200 hover:scale-105"
              >
                Comprar Boletos
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ===== MERCH PREVIEW ===== */}
      <section className="px-5 py-10">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-bold text-2xl uppercase text-white m-0">
              Merch
            </h2>
            <Link
              to="/merch"
              className="text-gold text-sm font-semibold no-underline hover:underline"
            >
              Ver todo
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-3">
          {merch.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div
                className="rounded-2xl overflow-hidden bg-[#1a1a1a] border border-gold/10 transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:border-gold hover:shadow-[0_0_20px_rgba(255,215,0,0.25)] [transform:translateZ(0)] [-webkit-mask-image:-webkit-radial-gradient(white,black)] isolate"
              >
                <div
                  className="relative w-full h-[160px] flex items-center justify-center p-6 overflow-hidden"
                  style={{ backgroundColor: item.bgColor }}
                >
                  <ResponsiveImage
                    name={item.imageName}
                    alt={item.name}
                    width={400}
                    height={400}
                    sizes="(max-width: 640px) 45vw, 320px"
                    className="max-w-full max-h-full object-contain"
                    pictureClassName="max-w-full max-h-full flex items-center justify-center"
                  />
                  <span className="absolute top-2 left-2 text-[9px] font-bold uppercase tracking-wider text-black bg-gold px-2 py-0.5 rounded-full">
                    Nuevo
                  </span>
                </div>
                <div className="p-3">
                  <p className="font-display font-bold text-sm text-white m-0 leading-tight">
                    {item.name}
                  </p>
                  <p className="text-gold font-bold text-sm mt-1 m-0">
                    {item.price}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ===== PARTIDOS PREVIEW ===== */}
      <section className="px-5 py-10">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-bold text-2xl uppercase text-white m-0">
              Partidos
            </h2>
            <Link
              to="/partidos"
              className="text-gold text-sm font-semibold no-underline hover:underline"
            >
              Ver todo
            </Link>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="relative w-full rounded-2xl overflow-hidden" style={{ paddingTop: '56.25%' }}>
            <iframe
              src="https://www.youtube.com/embed/UDEYHpwK2LE"
              title="Serie Final LVSM Juego #3: Caribes vs. Cafeteros"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full border-0 rounded-2xl"
            />
          </div>
        </ScrollReveal>
      </section>

      {/* ===== ROSTER PREVIEW ===== */}
      <section className="px-5 py-10">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-bold text-2xl uppercase text-white m-0">
              Roster
            </h2>
            <Link
              to="/roster"
              className="text-gold text-sm font-semibold no-underline hover:underline"
            >
              Ver todo
            </Link>
          </div>
        </ScrollReveal>

        <div
          className="rounded-2xl overflow-hidden"
          style={{
            backgroundColor: '#1a1a1a',
            border: '1px solid rgba(255, 215, 0, 0.08)',
          }}
        >
          {previewRoster.map((player, i) => (
            <ScrollReveal key={i} delay={i * 0.04}>
              <div
                className="flex items-center gap-4 px-5 py-4"
                style={{
                  borderBottom:
                    i < previewRoster.length - 1
                      ? '1px solid rgba(255, 255, 255, 0.06)'
                      : 'none',
                }}
              >
                <span className="w-8 text-center font-display font-bold text-lg text-gold/60">
                  {player.number}
                </span>
                <PlayerAvatar photo={player.photo} name={player.name} size={40} />
                <div className="flex-1 min-w-0">
                  <p className="font-display font-bold text-sm text-white uppercase m-0 flex items-center gap-1.5">
                    {player.name}
                    {player.captain && (
                      <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded bg-yellow-400/20 text-yellow-400 font-display font-bold text-[9px] leading-none uppercase tracking-wider">
                        capitán
                      </span>
                    )}
                  </p>
                  <p className="text-white/40 text-xs mt-0.5 m-0">
                    {player.position}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal>
          <Link
            to="/roster"
            className="block mt-4 w-full py-3.5 rounded-full text-center font-display font-bold text-sm uppercase tracking-wider text-gold no-underline transition-all duration-200 hover:bg-gold/10"
            style={{
              border: '1px solid rgba(255, 215, 0, 0.25)',
            }}
          >
            Ver Roster Completo
          </Link>
        </ScrollReveal>
      </section>

      {/* ===== NOTICIAS PREVIEW ===== */}
      <section className="px-5 py-10">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-bold text-2xl uppercase text-white m-0">
              Noticias
            </h2>
            <Link
              to="/noticias"
              className="text-gold text-sm font-semibold no-underline hover:underline"
            >
              Ver todo
            </Link>
          </div>
        </ScrollReveal>

        {/* Featured Article */}
        <ScrollReveal>
          <a
            href={featuredArticle.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => { e.preventDefault(); window.open(featuredArticle.url, '_blank', 'noopener,noreferrer'); }}
            className="block rounded-2xl overflow-hidden mb-4 no-underline"
            style={{
              backgroundColor: '#1a1a1a',
              border: '1px solid rgba(255, 215, 0, 0.08)',
            }}
          >
            <div className="relative w-full h-[200px]">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                width="800"
                height="400"
                loading="eager"
                decoding="async"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to top, rgba(26,26,26,1) 0%, transparent 60%)',
                }}
              />
            </div>
            <div className="px-4 pb-4 -mt-8 relative z-10">
              <span className="text-gold text-[10px] font-bold uppercase tracking-wider">
                {featuredArticle.source}
              </span>
              <h3 className="font-display font-bold text-base text-white mt-1 m-0 leading-tight">
                {featuredArticle.title}
              </h3>
              <p className="text-white/40 text-xs mt-2 m-0 line-clamp-2">
                {featuredArticle.excerpt}
              </p>
            </div>
          </a>
        </ScrollReveal>

        {/* Side Articles */}
        <div className="flex flex-col gap-3">
          {sideArticles.map((article, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => { e.preventDefault(); window.open(article.url, '_blank', 'noopener,noreferrer'); }}
                className="flex gap-3 rounded-2xl p-3 no-underline"
                style={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid rgba(255, 215, 0, 0.08)',
                }}
              >
                <div className="flex-shrink-0 w-[90px] h-[70px] rounded-xl overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    width="90"
                    height="70"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-gold text-[10px] font-bold uppercase tracking-wider">
                    {article.source}
                  </span>
                  <h4 className="font-display font-bold text-sm text-white mt-0.5 m-0 leading-tight line-clamp-2">
                    {article.title}
                  </h4>
                  <p className="text-white/40 text-[11px] mt-1 m-0">{article.date}</p>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ===== SOBRE NOSOTROS PREVIEW ===== */}
      <section className="px-5 py-10">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-bold text-2xl uppercase text-white m-0">
              Sobre Nosotros
            </h2>
            <Link
              to="/nosotros"
              className="text-gold text-sm font-semibold no-underline hover:underline"
            >
              Mas
            </Link>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div
            className="rounded-2xl p-5 mb-4"
            style={{
              backgroundColor: '#1a1a1a',
              border: '1px solid rgba(255, 215, 0, 0.08)',
            }}
          >
            <p className="text-white/70 text-sm leading-relaxed m-0">
               Los Cafeteros de Yauco son un equipo de voleibol profesional que
              compite en la Liga de Voleibol Superior Masculina de Puerto Rico.
              Representando a la Ciudad del Cafe, el equipo encarna la pasion, la
              tradicion y el orgullo de todo un pueblo. En 2026, los Cafeteros
              hicieron historia al ganar su primer campeonato en 55 años.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 gap-3">
          {(['dsc01912', 'dsc04629', 'dsc04710', 'dsc04989'] as const).map((name, i) => (
            <ScrollReveal key={name} delay={i * 0.05}>
              <div className="rounded-2xl overflow-hidden aspect-square">
                <ResponsiveImage
                  name={name}
                  alt={`Cafeteros gallery ${i + 1}`}
                  width={600}
                  height={600}
                  sizes="(max-width: 640px) 45vw, 320px"
                  pictureClassName="block w-full h-full"
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
