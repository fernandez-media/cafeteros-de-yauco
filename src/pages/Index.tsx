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
import heroFirstFrame from '../assets/hero-first-frame.jpg.asset.json';

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
  const [ticketsOpen, setTicketsOpen] = useState(false);
  const rosterScrollRef = useRef<HTMLDivElement>(null);
  const scrollRoster = (dir: 1 | -1) => {
    const el = rosterScrollRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>('[data-roster-card]');
    const step = card ? card.offsetWidth + 16 : 280;
    el.scrollBy({ left: dir * step * 2, behavior: 'smooth' });
  };

  useEffect(() => {
    if (!ticketsOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setTicketsOpen(false); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [ticketsOpen]);


  // Cross-browser hero video loading strategy
  const [videoStrategy, setVideoStrategy] = useState<{ preload: 'auto' | 'metadata' | 'none'; loadSources: boolean }>(() => ({
    preload: 'auto',
    loadSources: true,
  }));

  useEffect(() => {
    if (typeof navigator === 'undefined') return;
    const ua = navigator.userAgent || '';
    const isIOS = /iP(hone|ad|od)/.test(ua) || (/Macintosh/.test(ua) && 'ontouchend' in document);
    const conn = (navigator as any).connection;
    const saveData = conn?.saveData === true;
    const slowNet = !!conn?.effectiveType && /^(slow-2g|2g|3g)$/.test(conn.effectiveType);
    const defer = saveData || slowNet;
    setVideoStrategy({
      preload: defer ? 'none' : isIOS ? 'metadata' : 'auto',
      loadSources: !defer,
    });
  }, []);

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
    <div className="min-h-screen lg:[&>section:not(:first-of-type)]:max-w-[1200px] lg:[&>section:not(:first-of-type)]:mx-auto lg:[&>section:not(:first-of-type)]:!px-12">
      {/* ===== HERO ===== */}
      <section
        className="relative overflow-hidden -mt-14 lg:-mt-0 h-[100dvh] min-h-[100dvh] lg:h-[100dvh] lg:min-h-[100dvh] lg:max-h-none"
        style={{
          backgroundColor: '#000000',
          backgroundImage: `url(${heroFirstFrame.url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      >
        <video
          key={videoStrategy.loadSources ? 'with-sources' : 'poster-only'}
          autoPlay
          muted
          loop
          playsInline
          preload={videoStrategy.preload}
          poster={heroFirstFrame.url}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center center', transform: 'scale(1.1)', transformOrigin: 'center center', backgroundColor: 'transparent' }}
        >
          {videoStrategy.loadSources && (
            <>
              <source src={`${import.meta.env.BASE_URL}media/hero.webm`} type="video/webm" />
              <source src={`${import.meta.env.BASE_URL}media/hero.mp4`} type="video/mp4" />
            </>
          )}
        </video>

        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.75) 85%, #111111 100%)',
          }}
        />

        {/* Desktop title overlay */}
        <div className="hidden lg:flex absolute inset-0 flex-col items-center justify-center px-8 text-center pointer-events-none">
          <h1
            className="hero-title font-display font-black uppercase text-white leading-[0.88] m-0"
            style={{
              fontSize: 'clamp(4rem, 10vw, 10rem)',
              letterSpacing: '0.02em',
              textShadow: '0 6px 40px rgba(0,0,0,0.55)',
            }}
          >
            <span className="block hero-word" style={{ animationDelay: '0.15s' }}>Cafeteros</span>
            <span className="block hero-word text-gold" style={{ animationDelay: '0.35s' }}>de Yauco</span>
          </h1>
        </div>

        <div className="absolute bottom-0 left-0 w-full px-5 flex flex-col items-center" style={{ paddingBottom: '120px' }}>
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
      <section className="py-6 lg:!max-w-none lg:!mx-0 lg:!px-0">
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

        {/* MOBILE: horizontal scroll (unchanged) */}
        <div ref={scrollRef} className="lg:hidden flex gap-4 overflow-x-auto overflow-y-hidden scrollbar-hidden py-8 px-5 items-stretch">
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
                      backgroundColor: game.isHome ? 'rgba(255, 215, 0, 0.15)' : 'rgba(255, 255, 255, 0.08)',
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
                        <ResponsiveImage name="cafeteros-logo" alt="Cafeteros de Yauco" width={64} height={64} sizes="64px" loading="eager" pictureClassName="w-16 h-16 inline-flex" className="w-16 h-16 object-contain" />
                        <p className="text-white font-bold text-[12px] uppercase leading-tight text-center mt-1 m-0 break-words">Cafeteros de Yauco</p>
                      </div>
                    );
                    const oppLower = game.opponent.toLowerCase();
                    const oppKey = oppLower.includes('caribes') ? 'caribes' : oppLower.includes('gigantes') ? 'gigantes' : oppLower.includes('mets') ? 'mets' : oppLower.includes('patriotas') ? 'patriotas' : oppLower.includes('plataneros') ? 'plataneros' : null;
                    const opponentBlock = (
                      <div key="opponent" className="flex flex-col items-center flex-1 min-w-0">
                        {oppKey ? (
                          <img src={teamLogo(oppKey)} alt={game.opponent} width="64" height="64" loading="eager" decoding="async" className="w-16 h-16 object-contain" />
                        ) : (
                          <div className="w-16 h-16 rounded-full bg-white/10" />
                        )}
                        <p className="text-white font-bold text-[12px] uppercase leading-tight text-center mt-1 m-0 break-words">{game.opponent}</p>
                      </div>
                    );
                    const blocks = game.isHome ? [opponentBlock, cafeterosBlock] : [cafeterosBlock, opponentBlock];
                    return (<>{blocks[0]}<span className="font-display font-bold text-base text-gold pt-6">VS</span>{blocks[1]}</>);
                  })()}
                </div>
                {(() => {
                  const parts = game.location.split(',').map((s) => s.trim());
                  const venue = parts[0];
                  const city = parts.slice(1).join(', ');
                  return (
                    <div className="mt-2 text-white/40 text-sm flex items-center gap-1.5 min-w-0">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
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

        {/* DESKTOP: Barça-style — 3 game cards + 1 "Next Games" image card */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-5 px-12 w-full max-w-[1200px] mx-auto">
          {calendar.slice(0, 3).map((game, i) => {
            const oppLower = game.opponent.toLowerCase();
            const oppKey = oppLower.includes('caribes') ? 'caribes' : oppLower.includes('gigantes') ? 'gigantes' : oppLower.includes('mets') ? 'mets' : oppLower.includes('patriotas') ? 'patriotas' : oppLower.includes('plataneros') ? 'plataneros' : null;
            const cafBlock = (
              <div className="flex flex-col items-center flex-1 min-w-0">
                <ResponsiveImage name="cafeteros-logo" alt="Cafeteros de Yauco" width={64} height={64} sizes="64px" loading="eager" pictureClassName="w-16 h-16 inline-flex" className="w-16 h-16 object-contain" />
                <p className="text-white/80 text-[11px] uppercase leading-tight text-center mt-2 m-0 tracking-wide">Cafeteros</p>
              </div>
            );
            const oppBlock = (
              <div className="flex flex-col items-center flex-1 min-w-0">
                {oppKey ? (
                  <img src={teamLogo(oppKey)} alt={game.opponent} width="64" height="64" loading="eager" decoding="async" className="w-16 h-16 object-contain" />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-white/10" />
                )}
                <p className="text-white/80 text-[11px] uppercase leading-tight text-center mt-2 m-0 tracking-wide">{game.opponent.split(' ')[0]}</p>
              </div>
            );
            const blocks = game.isHome ? [oppBlock, cafBlock] : [cafBlock, oppBlock];
            return (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div className="rounded-2xl overflow-hidden bg-[#1a1a1a] border border-white/5 flex flex-col h-full transition-transform duration-300 hover:-translate-y-1">
                  <div className="px-5 pt-6 pb-5" style={{ background: 'linear-gradient(180deg, #14142b 0%, #0f0f1e 100%)' }}>
                    <div className="flex items-center justify-center gap-4">
                      {blocks[0]}
                      <span className="font-display font-black text-2xl text-gold">VS</span>
                      {blocks[1]}
                    </div>
                  </div>
                  <div className="px-5 py-4 flex-1 flex flex-col">
                    <p className="font-display font-bold text-base text-white m-0">{game.date} · {game.time}</p>
                    <p className="text-white/50 text-xs mt-1 m-0 uppercase tracking-wide">LVSM · {game.isHome ? 'Local' : 'Visitante'}</p>
                    <p className="text-white/40 text-xs mt-1 m-0 line-clamp-1">{game.location}</p>
                    <Link to="/calendario" className="mt-auto pt-4 inline-flex items-center gap-1.5 text-gold text-xs font-bold uppercase tracking-wider no-underline hover:underline">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                      Detalles
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
          <ScrollReveal delay={0.15}>
            <Link to="/calendario" className="relative rounded-2xl overflow-hidden block h-full min-h-[260px] no-underline group">
              <ResponsiveImage
                name="dsc04989"
                alt="Próximos juegos"
                width={600}
                height={600}
                sizes="300px"
                pictureClassName="absolute inset-0 w-full h-full"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.2) 0%, rgba(0,0,0,0.85) 100%)' }} />
              <div className="absolute inset-0 flex flex-col justify-between p-5">
                <h3 className="font-display font-black text-white text-2xl uppercase leading-tight m-0" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.6)' }}>Próximos<br />Juegos</h3>
                <span className="inline-flex items-center gap-1.5 text-gold text-xs font-bold uppercase tracking-wider">
                  Ver Calendario
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                </span>
              </div>
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ===== BOLETERIA PREVIEW ===== */}
      <section className="px-5 pt-2 pb-10">
        <ScrollReveal>
          {/* Mobile: full CTA card */}
          <div className="lg:hidden relative rounded-2xl overflow-hidden border-2 border-gold transition-all duration-300 hover:border-gold/80 hover:shadow-[0_0_20px_rgba(255,215,0,0.3)]">
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
                background: 'linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%)',
              }}
            />
            <div className="relative z-10 p-5 sm:p-8 text-center">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-2 sm:mb-4">
                <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                <path d="M13 5v2" /><path d="M13 17v2" /><path d="M13 11v2" />
              </svg>
              <h3 className="font-display font-bold text-xl sm:text-2xl uppercase text-white mb-1 sm:mb-2 m-0">
                Consigue tus boletos
              </h3>
              <p className="text-white/50 text-xs sm:text-sm mb-4 sm:mb-6 m-0">
                Asegura tu asiento para los juegos<br />de los Cafeteros de Yauco.
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

          {/* Desktop: Barça-style wide premium banner */}
          <div className="hidden lg:block max-w-[1200px] mx-auto">
            <div
              className="relative overflow-hidden rounded-[28px] group"
              style={{
                background:
                  'linear-gradient(180deg, #0a1230 0%, #0d1a4a 55%, #0a1230 100%)',
                boxShadow:
                  '0 30px 80px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,215,0,0.12) inset',
                minHeight: 280,
              }}
            >
              {/* Faint crest / hero backdrop */}
              <ResponsiveImage
                name="hero"
                alt=""
                width={1920}
                height={800}
                sizes="1200px"
                ariaHidden
                pictureClassName="absolute inset-0 w-full h-full"
                className="w-full h-full object-cover"
                style={{ opacity: 0.28, filter: 'saturate(1.1)' }}
              />
              {/* Left fade so text is readable */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(90deg, rgba(8,14,40,0.96) 0%, rgba(8,14,40,0.85) 35%, rgba(8,14,40,0.35) 65%, rgba(8,14,40,0.1) 100%)',
                }}
              />
              {/* Gold vignette on top edge */}
              <div
                className="absolute inset-x-0 top-0 h-[2px]"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(255,215,0,0.6), transparent)' }}
              />

              {/* Player image on the right */}
              <img
                src="/__l5e/assets-v1/292465f5-69c7-44ad-a933-2bd3f36b21cb/kevin-rodriguez.png"
                alt=""
                aria-hidden="true"
                className="absolute right-0 bottom-0 h-[110%] w-auto object-contain object-bottom pointer-events-none select-none transition-transform duration-700 group-hover:scale-[1.03]"
                style={{
                  filter: 'drop-shadow(-20px 20px 40px rgba(0,0,0,0.5))',
                  maxWidth: '55%',
                }}
                draggable={false}
              />

              {/* Content */}
              <div className="relative z-10 px-10 py-12 lg:py-14 max-w-[620px]">
                <p className="text-gold/80 text-[11px] font-display font-bold uppercase tracking-[0.35em] m-0 mb-3">
                  Boletería Oficial
                </p>
                <h3
                  className="font-display font-black uppercase m-0 leading-[0.95]"
                  style={{
                    color: '#FFD700',
                    fontSize: 'clamp(2rem, 3.4vw, 3rem)',
                    textShadow: '0 4px 30px rgba(0,0,0,0.5)',
                  }}
                >
                  Vive cada juego <br />
                  <span className="text-white">en vivo</span>
                </h3>
                <p className="text-white/75 text-sm lg:text-base mt-4 mb-7 max-w-[420px] leading-relaxed m-0">
                  Asegura tu asiento para los próximos juegos de los Cafeteros
                  de Yauco. Boletos oficiales, acceso prioritario y la mejor
                  experiencia del voleibol superior.
                </p>
                <button
                  type="button"
                  onClick={() => setTicketsOpen(true)}
                  className="inline-flex items-center gap-2 px-7 py-3 bg-gold text-black font-display font-bold text-sm uppercase tracking-[0.14em] rounded-full transition-all duration-200 hover:scale-[1.04] hover:shadow-[0_10px_30px_rgba(255,215,0,0.35)]"
                >
                  Más Info
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ===== MERCH PREVIEW ===== */}
      <section className="px-5 py-10">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-bold text-2xl uppercase text-white m-0">
              Tienda Oficial Cafeteros
            </h2>
            <Link
              to="/merch"
              className="text-gold text-sm font-semibold no-underline hover:underline"
            >
              Ver todo
            </Link>
          </div>
        </ScrollReveal>

        {/* MOBILE: 2-col small cards (unchanged) */}
        <div className="grid grid-cols-2 gap-3 lg:hidden">
          {merch.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div className="rounded-2xl overflow-hidden bg-[#1a1a1a] border border-gold/10 transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:border-gold hover:shadow-[0_0_20px_rgba(255,215,0,0.25)] [transform:translateZ(0)] [-webkit-mask-image:-webkit-radial-gradient(white,black)] isolate">
                <div className="relative w-full h-[160px] flex items-center justify-center p-6 overflow-hidden" style={{ backgroundColor: item.bgColor }}>
                  <ResponsiveImage name={item.imageName} alt={item.name} width={400} height={400} sizes="45vw" className="max-w-full max-h-full object-contain" pictureClassName="max-w-full max-h-full flex items-center justify-center" />
                  <span className="absolute top-2 left-2 text-[9px] font-bold uppercase tracking-wider text-black bg-gold px-2 py-0.5 rounded-full">Nuevo</span>
                </div>
                <div className="p-3">
                  <p className="font-display font-bold text-sm text-white m-0 leading-tight">{item.name}</p>
                  <p className="text-gold font-bold text-sm mt-1 m-0">{item.price}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* DESKTOP: Barça-style — 3 big product tiles with SHOP NOW */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-5">
          {merch.slice(0, 3).map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div className="rounded-2xl overflow-hidden bg-white border border-white/5 flex flex-col h-full group transition-transform duration-300 hover:-translate-y-1">
                <div className="relative w-full h-[340px] flex items-center justify-center overflow-hidden" style={{ backgroundColor: item.bgColor }}>
                  <ResponsiveImage name={item.imageName} alt={item.name} width={600} height={600} sizes="380px" className="max-w-[80%] max-h-[80%] object-contain transition-transform duration-500 group-hover:scale-105" pictureClassName="w-full h-full flex items-center justify-center" />
                </div>
                <div className="px-6 py-5 flex flex-col flex-1 bg-[#f7f7f5]">
                  <h3 className="font-display font-black text-xl uppercase text-black m-0 tracking-tight">{item.name}</h3>
                  <p className="text-black/60 text-sm mt-2 m-0 leading-relaxed">Producto oficial de los Cafeteros de Yauco. Edición 2025–26.</p>
                  <div className="mt-4 pt-4 border-t border-black/10 flex items-center justify-between">
                    <span className="font-display font-bold text-base text-black">{item.price}</span>
                    <Link to="/merch" className="inline-flex items-center gap-1.5 text-black font-display font-bold text-xs uppercase tracking-wider no-underline group-hover:text-gold transition-colors">
                      Comprar
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
                    </Link>
                  </div>
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
      <section className="px-5 py-10 lg:py-16 lg:px-10">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-5 lg:mb-8 lg:max-w-[1400px] lg:mx-auto">
            <h2 className="font-display font-black text-2xl lg:text-4xl uppercase text-white m-0 tracking-tight">
              <span className="lg:hidden">Roster</span>
              <span className="hidden lg:inline">Roster Cafeteros</span>
            </h2>
            <div className="flex items-center gap-3">
              <Link
                to="/roster"
                className="text-gold text-sm font-semibold no-underline hover:underline lg:hidden"
              >
                Ver todo
              </Link>
              {/* Desktop arrow controls */}
              <div className="hidden lg:flex items-center gap-2">
                <Link
                  to="/roster"
                  className="mr-4 text-white/60 hover:text-gold text-xs font-display font-bold uppercase tracking-[0.2em] no-underline transition-colors"
                >
                  Ver Roster Completo
                </Link>
                <button
                  type="button"
                  onClick={() => scrollRoster(-1)}
                  aria-label="Anterior"
                  className="w-11 h-11 rounded-full border border-white/15 text-white/80 hover:text-gold hover:border-gold hover:bg-gold/5 transition-all duration-200 flex items-center justify-center"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                </button>
                <button
                  type="button"
                  onClick={() => scrollRoster(1)}
                  aria-label="Siguiente"
                  className="w-11 h-11 rounded-full border border-white/15 text-white/80 hover:text-gold hover:border-gold hover:bg-gold/5 transition-all duration-200 flex items-center justify-center"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* MOBILE: original list */}
        <div
          className="lg:hidden rounded-2xl overflow-hidden"
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
            className="lg:hidden block mt-4 w-full py-3.5 rounded-full text-center font-display font-bold text-sm uppercase tracking-wider text-gold no-underline transition-all duration-200 hover:bg-gold/10"
            style={{
              border: '1px solid rgba(255, 215, 0, 0.25)',
            }}
          >
            Ver Roster Completo
          </Link>
        </ScrollReveal>

        {/* DESKTOP: Barça-style horizontal player carousel */}
        <div className="hidden lg:block lg:max-w-[1400px] lg:mx-auto">
          <div
            ref={rosterScrollRef}
            className="flex gap-4 overflow-x-auto scrollbar-hidden snap-x snap-mandatory pb-2"
            style={{ scrollPaddingLeft: 0 }}
          >
            {roster.map((player, i) => (
              <Link
                key={i}
                to="/roster"
                data-roster-card
                className="group relative snap-start flex-shrink-0 w-[260px] h-[380px] rounded-2xl overflow-hidden no-underline"
                style={{
                  background:
                    'linear-gradient(180deg, #1e2a5e 0%, #0d1436 100%)',
                  boxShadow:
                    '0 20px 40px -20px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,215,0,0.08) inset',
                }}
              >
                {/* Big number backdrop */}
                <span
                  aria-hidden="true"
                  className="absolute top-4 right-4 font-display font-black leading-none pointer-events-none select-none transition-all duration-500 group-hover:scale-110 group-hover:text-gold/30"
                  style={{
                    fontSize: 96,
                    color: 'rgba(255,255,255,0.08)',
                  }}
                >
                  {player.number}
                </span>

                {/* Player photo */}
                {player.photo ? (
                  <img
                    src={player.photo}
                    alt={player.name}
                    className="absolute inset-x-0 bottom-0 w-full h-[85%] object-contain object-bottom pointer-events-none select-none transition-transform duration-500 group-hover:scale-[1.04]"
                    draggable={false}
                    loading="lazy"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-white/30 text-6xl font-display font-black">
                    {player.number}
                  </div>
                )}

                {/* Bottom gradient + info */}
                <div
                  className="absolute inset-x-0 bottom-0 p-5 pt-16"
                  style={{
                    background:
                      'linear-gradient(0deg, rgba(5,10,30,0.95) 0%, rgba(5,10,30,0.7) 55%, rgba(5,10,30,0) 100%)',
                  }}
                >
                  <p className="text-gold/80 text-[10px] font-display font-bold uppercase tracking-[0.25em] m-0 mb-1">
                    {player.position}
                  </p>
                  <p className="font-display font-black text-white uppercase text-lg leading-tight m-0 flex items-center gap-2">
                    {player.name}
                    {player.captain && (
                      <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded bg-gold/25 text-gold font-display font-bold text-[9px] leading-none uppercase tracking-wider">
                        C
                      </span>
                    )}
                  </p>
                </div>

                {/* Gold reveal on hover */}
                <div
                  className="absolute inset-x-0 bottom-0 h-[3px] bg-gold origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"
                />
              </Link>
            ))}
          </div>
        </div>
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

        {/* MOBILE: featured + side list (unchanged) */}
        <div className="flex flex-col lg:hidden">
          <ScrollReveal>
            <a
              href={featuredArticle.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => { e.preventDefault(); window.open(featuredArticle.url, '_blank', 'noopener,noreferrer'); }}
              className="block rounded-2xl overflow-hidden mb-4 no-underline"
              style={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255, 215, 0, 0.08)' }}
            >
              <div className="relative w-full h-[200px]">
                <img src={featuredArticle.image} alt={featuredArticle.title} width="800" height="400" loading="eager" decoding="async" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(26,26,26,1) 0%, transparent 60%)' }} />
              </div>
              <div className="px-4 pb-4 -mt-8 relative z-10">
                <span className="text-gold text-[10px] font-bold uppercase tracking-wider">{featuredArticle.source}</span>
                <h3 className="font-display font-bold text-base text-white mt-1 m-0 leading-tight">{featuredArticle.title}</h3>
                <p className="text-white/40 text-xs mt-2 m-0 line-clamp-2">{featuredArticle.excerpt}</p>
              </div>
            </a>
          </ScrollReveal>
          <div className="flex flex-col gap-3">
            {sideArticles.map((article, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => { e.preventDefault(); window.open(article.url, '_blank', 'noopener,noreferrer'); }}
                  className="flex gap-3 rounded-2xl p-3 no-underline"
                  style={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255, 215, 0, 0.08)' }}
                >
                  <div className="flex-shrink-0 w-[90px] h-[70px] rounded-xl overflow-hidden">
                    <img src={article.image} alt={article.title} width="90" height="70" loading="lazy" decoding="async" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-gold text-[10px] font-bold uppercase tracking-wider">{article.source}</span>
                    <h4 className="font-display font-bold text-sm text-white mt-0.5 m-0 leading-tight line-clamp-2">{article.title}</h4>
                    <p className="text-white/40 text-[11px] mt-1 m-0">{article.date}</p>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* DESKTOP: Barça-style 4-col news grid */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-5">
          {news.slice(0, 4).map((article, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => { e.preventDefault(); window.open(article.url, '_blank', 'noopener,noreferrer'); }}
                className="flex flex-col h-full rounded-xl overflow-hidden bg-[#1a1a1a] border border-white/5 no-underline group transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="relative w-full aspect-[16/10] overflow-hidden">
                  <img src={article.image} alt={article.title} loading="lazy" decoding="async" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="px-4 pt-4 pb-3 flex-1 flex flex-col">
                  <h3 className="font-display font-black text-white text-base leading-snug m-0 line-clamp-3">{article.title}</h3>
                </div>
                <div className="px-4 pb-4 pt-3 border-t border-white/5 flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 text-gold text-[10px] font-black uppercase tracking-wider">
                    <span className="inline-block w-2 h-2 bg-gold" />
                    {article.source}
                  </span>
                  <span className="inline-flex items-center gap-1 text-white/40 text-[10px] uppercase tracking-wide">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                    {article.date}
                  </span>
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

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
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

      {/* ===== TICKETS MODAL (desktop) ===== */}
      {ticketsOpen && (
        <div
          className="hidden lg:flex fixed inset-0 z-[1000] items-center justify-center p-6 animate-fade-in"
          style={{ background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(8px)' }}
          onClick={() => setTicketsOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Próximas fechas"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[520px] rounded-2xl overflow-hidden animate-scale-in"
            style={{
              background: 'linear-gradient(180deg, #1a1a1a 0%, #111111 100%)',
              border: '1px solid rgba(255,215,0,0.25)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
            }}
          >
            <button
              type="button"
              onClick={() => setTicketsOpen(false)}
              aria-label="Cerrar"
              className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="px-6 pt-6 pb-2">
              <p className="text-gold text-[11px] font-display font-bold uppercase tracking-[0.3em] m-0">Boletos</p>
              <h3 className="font-display font-black text-2xl uppercase text-white m-0 mt-1">Próximas fechas</h3>
              <p className="text-white/50 text-xs m-0 mt-1">Selecciona un juego y compra tu boleto oficial.</p>
            </div>
            <ul className="px-3 pt-3 pb-2 max-h-[340px] overflow-y-auto">
              {calendar.slice(0, 6).map((g, i) => (
                <li key={i} className="flex items-center justify-between gap-3 px-3 py-3 rounded-xl hover:bg-white/[0.04] transition-colors">
                  <div className="min-w-0">
                    <p className="font-display font-bold text-sm text-white uppercase m-0 truncate">vs {g.opponent}</p>
                    <p className="text-white/45 text-xs m-0 mt-0.5">{g.date} · {g.time} · {g.isHome ? 'Local' : 'Visitante'}</p>
                  </div>
                  <span
                    className="flex-shrink-0 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
                    style={{
                      backgroundColor: g.isHome ? 'rgba(255,215,0,0.15)' : 'rgba(255,255,255,0.08)',
                      color: g.isHome ? '#FFD700' : 'rgba(255,255,255,0.55)',
                    }}
                  >
                    {g.isHome ? 'Yauco' : 'Away'}
                  </span>
                </li>
              ))}
            </ul>
            <div className="px-6 py-4 border-t border-white/5 flex items-center justify-between gap-3">
              <p className="text-white/40 text-xs m-0">Powered by Printco Tickets</p>
              <a
                href="https://cafeterosdeyaucovollyball.printcotickets.com/browse"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold text-black font-display font-bold text-xs uppercase tracking-wider rounded-full no-underline transition-transform duration-200 hover:scale-105"
              >
                Comprar ahora
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>

  );
};

export default Index;
