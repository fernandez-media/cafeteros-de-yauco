import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Player } from '../data/roster';
import ScrollReveal from '../components/ScrollReveal';
import ImageSlider from '../components/ImageSlider';
import ResponsiveImage from '../components/ResponsiveImage';
import ComingSoonCard from '../components/ComingSoonCard';
import ReelsSection from '../components/ReelsSection';
import { calendar } from '../data/calendar';
import { news } from '../data/news';
import { roster } from '../data/roster';
import { merch } from '../data/merch';
import heroFirstFrame from '../assets/hero-first-frame.jpg.asset.json';

const BASE = import.meta.env.BASE_URL;
const teamLogo = (name: string) => `${BASE}media/logos/${name}.webp`;


const MobileRosterCarousel = ({ players }: { players: Player[] }) => {
  const doubled = [...players, ...players];

  return (
    <div className="lg:hidden relative overflow-hidden">
      <style>{`
        @keyframes mobileRosterScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .mobile-roster-marquee {
          animation: mobileRosterScroll 30s linear infinite;
        }
      `}</style>
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 z-10" style={{ background: 'linear-gradient(to right, #000000, transparent)' }} />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 z-10" style={{ background: 'linear-gradient(to left, #000000, transparent)' }} />
      <div className="mobile-roster-marquee flex gap-4 pb-4 w-max">
        {doubled.map((player, i) => (
          <Link
            key={i}
            to="/roster"
            className="flex-shrink-0 w-[180px] rounded-xl overflow-hidden no-underline"
            style={{
              background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
              border: '1px solid rgba(255,215,0,0.08)',
            }}
          >
            <div className="relative w-full aspect-[3/4] overflow-hidden bg-white/5">
              {player.photo ? (
                <img
                  src={player.photo}
                  alt={player.name}
                  className="w-full h-full object-cover"
                  style={player.photoPosition ? { objectPosition: player.photoPosition } : undefined}
                  draggable={false}
                  loading="eager"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/20 text-5xl font-display font-black">
                  {player.number}
                </div>
              )}
              <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center 40%, transparent 30%, rgba(0,0,0,0.85) 75%)' }} />
              <span className="absolute top-2 right-2 font-display font-black text-gold/20 text-xl leading-none select-none">
                #{player.number}
              </span>
            </div>
            <div className="px-3 py-2.5">
              <p className="font-display font-black text-white uppercase text-xs leading-tight m-0 flex items-center gap-1">
                {player.name}
                {player.captain && (
                  <span className="inline-flex items-center justify-center px-1 py-0.5 rounded bg-gold/20 text-gold font-display font-bold text-[8px] leading-none uppercase tracking-wider">
                    C
                  </span>
                )}
              </p>
              <p className="text-gold/60 text-[10px] font-display font-semibold uppercase tracking-[0.12em] m-0 mt-0.5">
                {player.position}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

const Index = () => {
  const previewGames = calendar.slice(0, 5);
  const featuredArticle = news[0];
  const sideArticles = news.slice(1, 3);

  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [ticketsOpen, setTicketsOpen] = useState(false);


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

  // ===== PARTIDOS: modal state =====
  const partidosDestacados = [
    { id: 'juego-5', numero: 'Juego 5', serie: 'Serie Final', resultado: '2-3', fecha: '22 de enero, 2026', youtubeId: 'RxmvKjlE6uk', esCampeonato: true },
    { id: 'juego-4', numero: 'Juego 4', serie: 'Serie Final', resultado: '3-1', fecha: '20 de enero, 2026', youtubeId: 'DmSWs9uJIH8', esCampeonato: false },
    { id: 'juego-3', numero: 'Juego 3', serie: 'Serie Final', resultado: '3-1', fecha: '18 de enero, 2026', youtubeId: 'UDEYHpwK2LE', esCampeonato: false },
    { id: 'juego-2', numero: 'Juego 2', serie: 'Serie Final', resultado: '3-0', fecha: '16 de enero, 2026', youtubeId: 'UxgrXXt3q9g', esCampeonato: false },
  ];
  const [videoModalId, setVideoModalId] = useState<string | null>(null);
  const openVideoModal = (youtubeId: string) => {
    if (youtubeId.startsWith('PLACEHOLDER')) return;
    setVideoModalId(youtubeId);
  };
  const closeVideoModal = () => setVideoModalId(null);
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') closeVideoModal(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);
  useEffect(() => {
    if (videoModalId) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [videoModalId]);


  // Parallax scroll effect
  const heroTextRef = useRef<HTMLDivElement>(null);
  const heroVideoContainerRef = useRef<HTMLVideoElement>(null);


  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) return;
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    if (!isDesktop) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;
        const vh = window.innerHeight;

        if (heroTextRef.current && scrollY < vh) {
          heroTextRef.current.style.transform = `translateY(${scrollY * 0.3}px)`;
          heroTextRef.current.style.opacity = `${1 - scrollY / (vh * 0.8)}`;
        }

        if (heroVideoContainerRef.current && scrollY < vh) {
          heroVideoContainerRef.current.style.transform = `translateY(${scrollY * 0.15}px) scale(${1 + scrollY * 0.0003})`;
        }

        document.querySelectorAll<HTMLElement>('[data-parallax]').forEach(el => {
          const rect = el.getBoundingClientRect();
          const speed = parseFloat(el.dataset.parallax || '0.1');
          if (rect.top < vh && rect.bottom > 0) {
            const progress = (vh - rect.top) / (vh + rect.height);
            el.style.transform = `translateY(${(progress - 0.5) * speed * -100}px)`;
          }
        });

        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Cross-browser hero video loading strategy
  const heroVideoRef = useRef<HTMLVideoElement>(null);
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
    const v = heroVideoRef.current;
    if (!v) return;
    const tryPlay = () => { v.play().catch(() => {}); };
    const onVisible = () => { if (!document.hidden) tryPlay(); };
    const onPause = () => { if (!document.hidden) setTimeout(tryPlay, 100); };
    tryPlay();
    v.addEventListener('loadeddata', tryPlay);
    v.addEventListener('pause', onPause);
    document.addEventListener('visibilitychange', onVisible);
    return () => {
      v.removeEventListener('loadeddata', tryPlay);
      v.removeEventListener('pause', onPause);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [videoStrategy.loadSources]);

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
    <div className="min-h-screen lg:[&>section:not(:first-of-type)]:max-w-[1200px] lg:[&>section:not(:first-of-type)]:mx-auto lg:[&>section:not(:first-of-type)]:!px-12" style={{ backgroundColor: '#000000' }}>
      {/* ===== HERO ===== */}
      {/* MOBILE HERO */}
      <section
        className="lg:hidden relative overflow-hidden -mt-14 h-[100dvh] min-h-[100dvh]"
        style={{
          backgroundColor: '#000000',
          backgroundImage: `url(${heroFirstFrame.url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
        }}
      >
        <video
          ref={heroVideoRef}
          key={videoStrategy.loadSources ? 'with-sources' : 'poster-only'}
          autoPlay
          muted
          loop
          playsInline
          preload={videoStrategy.preload}
          poster={heroFirstFrame.url}
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ objectPosition: 'center center', transform: 'scale(1.1)', transformOrigin: 'center center', backgroundColor: 'transparent' }}
        >
          {videoStrategy.loadSources && (
            <>
              <source src={`${import.meta.env.BASE_URL}media/hero-movil.webm`} type="video/webm" />
              <source src={`${import.meta.env.BASE_URL}media/hero-movil.mp4`} type="video/mp4" />
            </>
          )}
        </video>
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.45) 45%, rgba(0,0,0,0.75) 85%, #000000 100%)',
          }}
        />
        <div className="absolute bottom-0 left-0 w-full px-5 flex flex-col items-center" style={{ paddingBottom: '120px' }}>
          <div className="mt-8 flex flex-col items-center" aria-hidden="true">
            {[
              { size: 22, opacity: 1, delay: '0s' },
              { size: 19, opacity: 0.5, delay: '0.2s' },
              { size: 16, opacity: 0.2, delay: '0.4s' },
            ].map((c, i) => (
              <svg key={i} width={c.size} height={c.size} viewBox="0 0 24 24" fill="none" stroke="#C8A84B" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: c.opacity, animation: 'cascade 1.6s ease-in-out infinite', animationDelay: c.delay, marginTop: i === 0 ? 0 : -4 }}>
                <polyline points="6 9 12 15 18 9" />
              </svg>
            ))}
          </div>
        </div>
      </section>

      {/* DESKTOP HERO — full-bleed video background */}
      <section className="hidden lg:flex relative overflow-hidden h-[100dvh] min-h-[100dvh] items-center !max-w-none !mx-0 !px-0" style={{ backgroundColor: '#000000' }}>
        <video
          ref={heroVideoContainerRef}
          autoPlay
          muted
          loop
          playsInline
          preload={videoStrategy.preload}
          aria-hidden="true"
          className="absolute inset-x-0 top-0 bottom-0 w-full object-cover will-change-transform"
          style={{ objectPosition: 'center 20%', transform: 'scale(0.92)', transformOrigin: 'center top' }}
        >
          {videoStrategy.loadSources && (
            <>
              <source src={`${import.meta.env.BASE_URL}media/hero-desktop.webm`} type="video/webm" />
              <source src={`${import.meta.env.BASE_URL}media/hero-desktop.mp4`} type="video/mp4" />
            </>
          )}
        </video>
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.15) 70%, transparent 100%)' }} />
        <div className="absolute inset-x-0 bottom-0 h-32" style={{ background: 'linear-gradient(to top, #000000 0%, transparent 100%)' }} />
        <div ref={heroTextRef} className="relative z-10 w-full pl-[7vw] pr-12 will-change-transform">
          <div className="max-w-[700px]">
            <h1 className="m-0 leading-[0.9]" style={{ fontFamily: "'Chakra Petch', sans-serif" }}>
              <span
                className="block text-white font-bold uppercase hero-word"
                style={{ fontSize: 'clamp(4rem, 7.5vw, 8rem)', letterSpacing: '-0.03em', animationDelay: '0.15s' }}
              >
                Cafeteros
              </span>
              <span
                className="block font-bold uppercase hero-word"
                style={{ fontSize: 'clamp(4rem, 7.5vw, 8rem)', letterSpacing: '-0.03em', color: '#FFD700', animationDelay: '0.35s' }}
              >
                de Yauco
              </span>
            </h1>
            <p
              className="text-white/50 mt-4 m-0 font-medium leading-relaxed"
              style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '1.1rem' }}
            >
              Tu fuente oficial para todo sobre los Cafeteros de Yauco.<br />
              Calendario, boletos, noticias y más. Toda la temporada en un solo lugar.
            </p>
            <Link
              to="/calendario"
              className="inline-flex items-center gap-3 mt-8 px-7 py-3.5 rounded-full font-bold text-sm uppercase tracking-wider no-underline transition-all duration-300 hover:-translate-y-0.5"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                background: 'linear-gradient(135deg, #FFD700 0%, #C8A84B 100%)',
                color: '#000',
                boxShadow: '0 4px 20px rgba(255,215,0,0.3)',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Calendario
            </Link>
          </div>
        </div>
      </section>

      {/* ===== IMAGE SLIDER ===== */}
      <section className="py-6 lg:!max-w-none lg:!mx-0 lg:!px-0" data-parallax="0.08">
        <ImageSlider />
      </section>


      {/* ===== CALENDARIO PREVIEW ===== */}
      <section className="py-10 lg:py-12 overflow-visible lg:!max-w-none lg:!mx-0 lg:!px-0">
        {/* MOBILE header */}
        <ScrollReveal>
          <div className="flex items-center justify-between mb-5 px-5 lg:hidden">
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

        {/* DESKTOP header */}
        <ScrollReveal>
          <div className="hidden lg:flex items-end justify-between mb-12 px-10 2xl:px-16 max-w-[1760px] mx-auto">
            <div className="flex items-end gap-10">
              <h2 className="font-display font-black text-5xl uppercase text-white m-0 tracking-tight leading-none">
                Calendario
              </h2>
            </div>
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
                    const oppKey = oppLower.includes('caribes') ? 'caribes' : oppLower.includes('carolina') ? 'gigantes' : oppLower.includes('mets') ? 'mets' : oppLower.includes('patriotas') ? 'patriotas' : oppLower.includes('plataneros') ? 'plataneros' : oppLower.includes('naranjito') ? 'naranjito' : oppLower.includes('adjuntas') ? 'adjuntas' : null;
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

        {/* DESKTOP: Glassmorphism game cards + "Próximos Partidos" image card */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-5 px-10 2xl:px-16 w-full max-w-[1760px] mx-auto">
          {calendar.slice(0, 3).map((game, i) => {
            const oppLower = game.opponent.toLowerCase();
            const oppKey = oppLower.includes('caribes') ? 'caribes' : oppLower.includes('carolina') ? 'gigantes' : oppLower.includes('mets') ? 'mets' : oppLower.includes('patriotas') ? 'patriotas' : oppLower.includes('plataneros') ? 'plataneros' : oppLower.includes('naranjito') ? 'naranjito' : oppLower.includes('adjuntas') ? 'adjuntas' : null;
            const cafBlock = (
              <div className="flex flex-col items-center flex-1 min-w-0">
                <ResponsiveImage name="cafeteros-logo" alt="Cafeteros de Yauco" width={128} height={128} sizes="128px" loading="eager" pictureClassName="w-32 h-32 inline-flex" className="w-32 h-32 object-contain drop-shadow-[0_6px_16px_rgba(0,0,0,0.5)]" />
                <p className="text-white text-sm font-display font-bold uppercase leading-tight text-center mt-3 m-0 tracking-wide">Cafeteros de Yauco</p>
              </div>
            );
            const oppBlock = (
              <div className="flex flex-col items-center flex-1 min-w-0">
                {oppKey ? (
                  <img src={teamLogo(oppKey)} alt={game.opponent} width="128" height="128" loading="eager" decoding="async" className="w-32 h-32 object-contain drop-shadow-[0_6px_16px_rgba(0,0,0,0.5)]" />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-white/10" />
                )}
                <p className="text-white text-sm font-display font-bold uppercase leading-tight text-center mt-3 m-0 tracking-wide">{game.opponent}</p>
              </div>
            );
            const blocks = game.isHome ? [oppBlock, cafBlock] : [cafBlock, oppBlock];
            return (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div
                  className="rounded-3xl overflow-hidden flex flex-col h-full transition-all duration-300 hover:-translate-y-1 group"
                  style={{
                    background: game.isHome
                      ? 'linear-gradient(180deg, rgba(255,215,0,0.08) 0%, rgba(255,215,0,0.03) 100%)'
                      : 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: game.isHome ? '1px solid rgba(255,215,0,0.2)' : '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                  }}
                >
                  {/* Top VS block */}
                  <div className="relative px-6 pt-8 pb-8 min-h-[260px] flex flex-col justify-center overflow-hidden">
                    {i === 0 && (
                      <span className="absolute top-4 left-4 text-[10px] font-display font-bold uppercase tracking-[0.2em] text-gold/90 bg-gold/10 px-2.5 py-1 rounded-full border border-gold/30">
                        Próximo
                      </span>
                    )}
                    <div className="flex items-center justify-center gap-6">
                      {blocks[0]}
                      <span className="font-display font-black text-5xl text-white/90 leading-none">VS</span>
                      {blocks[1]}
                    </div>
                  </div>
                  {/* Bottom info block */}
                  <div
                    className="px-6 py-5 flex-1 flex flex-col"
                    style={{
                      borderTop: game.isHome ? '1px solid rgba(255,215,0,0.1)' : '1px solid rgba(255,255,255,0.06)',
                    }}
                  >
                    <p className="font-display font-black text-white text-xl leading-tight m-0">
                      {game.date} · {game.time}
                    </p>
                    <p className="text-white/50 text-[15px] mt-2 m-0">
                      LVSM · Juego {i + 1} · {game.isHome ? 'Local' : 'Visitante'}
                    </p>
                    <p className="text-white/30 text-xs mt-1 m-0 line-clamp-1">
                      {game.location}
                    </p>
                    <Link
                      to="/calendario"
                      className="mt-4 inline-flex items-center gap-2 text-gold font-display font-bold text-xs uppercase tracking-[0.2em] no-underline group-hover:text-white transition-colors"
                    >
                      <span className="w-4 h-4 rounded-full bg-gold flex items-center justify-center">
                        <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                      </span>
                      Más Información
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
          <ScrollReveal delay={0.15}>
            <Link
              to="/calendario"
              className="relative rounded-3xl overflow-hidden block h-full min-h-[420px] no-underline group"
              style={{ boxShadow: '0 8px 32px rgba(0,0,0,0.3)' }}
            >
              <ResponsiveImage
                name="dsc04710"
                alt="Próximos Partidos"
                width={800}
                height={800}
                sizes="360px"
                pictureClassName="absolute inset-0 w-full h-full"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.4) 55%, rgba(0,0,0,0.9) 100%)',
                }}
              />
              <div className="absolute inset-0 flex flex-col justify-between p-6">
                <h3
                  className="font-display font-black text-white text-4xl uppercase leading-none m-0"
                  style={{ textShadow: '0 4px 20px rgba(0,0,0,0.6)' }}
                >
                  Próximos
                  <br />
                  Partidos
                </h3>
                <span className="inline-flex items-center gap-2 text-white font-display font-bold text-xs uppercase tracking-[0.2em] underline underline-offset-4 decoration-gold/70 group-hover:text-gold transition-colors">
                  Ver el Calendario
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
              <button
                type="button"
                onClick={() => setTicketsOpen(true)}
                className="inline-block px-6 sm:px-7 py-2.5 sm:py-3 bg-gold text-black font-display font-bold text-xs sm:text-sm uppercase tracking-wider rounded-full transition-transform duration-200 hover:scale-105"
              >
                Comprar Boletos
              </button>
            </div>
          </div>

          {/* Desktop: large open layout — floating text + image */}
          <div className="hidden lg:flex max-w-[1400px] mx-auto items-center gap-16 py-10">
            {/* Left: floating text, no card */}
            <div className="flex-1">
              <p className="text-gold/60 text-[11px] font-display font-bold uppercase tracking-[0.35em] m-0 mb-4">
                Boletería Oficial
              </p>
              <h3
                className="font-display font-black uppercase m-0 leading-[0.9]"
                style={{
                  fontSize: 'clamp(3rem, 5vw, 4.5rem)',
                  letterSpacing: '-0.02em',
                }}
              >
                <span className="text-gold block">Consigue tus</span>
                <span className="text-white block">boletos</span>
              </h3>
              <p className="text-white/50 text-base mt-6 mb-10 max-w-[460px] leading-relaxed m-0">
                Asegura tu asiento para los próximos juegos de los Cafeteros
                de Yauco. Boletos oficiales, acceso prioritario y la mejor
                experiencia del voleibol superior.
              </p>
              <button
                type="button"
                onClick={() => setTicketsOpen(true)}
                className="inline-flex items-center gap-3 px-9 py-4 bg-gold text-black font-display font-bold text-base uppercase tracking-[0.14em] rounded-full transition-all duration-200 hover:scale-[1.04] hover:shadow-[0_10px_30px_rgba(255,215,0,0.35)]"
              >
                Comprar Boletos
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

            {/* Right: image */}
            <div className="flex-1 relative">
              <div className="rounded-[24px] overflow-hidden" style={{ boxShadow: '0 30px 80px -20px rgba(0,0,0,0.6)' }}>
                <ResponsiveImage
                  name="hero"
                  alt="Cafeteros de Yauco en acción"
                  width={800}
                  height={600}
                  sizes="600px"
                  pictureClassName="w-full"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* ===== REELS / REDES SOCIALES ===== */}
      <ScrollReveal>
        <ReelsSection />
      </ScrollReveal>

      {/* ===== MERCH PREVIEW ===== */}
      <section className="px-5 py-10">
        <ScrollReveal>
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-display font-bold text-2xl uppercase text-white m-0">
              TIENDA OFICIAL
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
              <ComingSoonCard comingSoon={item.comingSoon} className="rounded-2xl bg-[#1a1a1a] border border-gold/10 transition-all duration-200 hover:-translate-y-1 hover:scale-[1.02] hover:border-gold hover:shadow-[0_0_20px_rgba(255,215,0,0.25)] [transform:translateZ(0)] [-webkit-mask-image:-webkit-radial-gradient(white,black)] isolate">
                <div className="relative w-full h-[160px] flex items-center justify-center p-6 overflow-hidden" style={{ backgroundColor: item.bgColor }}>
                  <ResponsiveImage name={item.imageName} alt={item.name} width={400} height={400} sizes="45vw" className="max-w-full max-h-full object-contain" pictureClassName="max-w-full max-h-full flex items-center justify-center" />
                  
                </div>
                <div className="p-3">
                  <p className="font-display font-bold text-sm text-white m-0 leading-tight">{item.name}</p>
                  <p className="text-gold font-bold text-sm mt-1 m-0">{item.price}</p>
                </div>
              </ComingSoonCard>
            </ScrollReveal>
          ))}
        </div>

        {/* DESKTOP: Barça-style — 3 big product tiles with SHOP NOW */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-5">
          {merch.slice(0, 3).map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <ComingSoonCard comingSoon={item.comingSoon} className="rounded-2xl bg-white border border-white/5 flex flex-col h-full group transition-transform duration-300 hover:-translate-y-1">
                <div className="relative w-full h-[340px] flex items-center justify-center overflow-hidden" style={{ backgroundColor: item.bgColor }}>
                  <ResponsiveImage name={item.imageName} alt={item.name} width={600} height={600} sizes="380px" className="max-w-[80%] max-h-[80%] object-contain transition-transform duration-500 group-hover:scale-105" pictureClassName="w-full h-full flex items-center justify-center" />
                </div>
                <div className="px-6 py-5 flex flex-col flex-1 bg-[#f7f7f5]">
                  <h3 className="font-display font-black text-xl uppercase text-black m-0 tracking-tight">{item.name}</h3>
                  <p className="text-black/60 text-sm mt-2 m-0 leading-relaxed">Producto oficial de los Cafeteros de Yauco. Edición 2025–26.</p>
                  <div className="mt-4 pt-4 border-t border-black/10 flex items-center justify-between">
                    <span className="font-display font-bold text-base text-black">{item.price}</span>
                    <span className="inline-flex items-center gap-1.5 text-black font-display font-bold text-xs uppercase tracking-wider group-hover:text-gold transition-colors">
                      Comprar
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="7" y1="17" x2="17" y2="7" /><polyline points="7 7 17 7 17 17" /></svg>
                    </span>
                  </div>
                </div>
              </ComingSoonCard>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ===== PARTIDOS PREVIEW ===== */}
      <section className="w-full px-5 lg:px-8 py-10 lg:py-16 lg:!max-w-none lg:!mx-0">
        <ScrollReveal>
          <div className="flex flex-col items-center mb-6 lg:mb-12">
            <h2 className="font-display font-black text-3xl lg:text-6xl uppercase text-white m-0 tracking-tight text-center">Partidos</h2>
            <p className="text-white/40 text-xs lg:text-sm mt-2 uppercase tracking-widest text-center">Revive la serie final</p>
          </div>
        </ScrollReveal>

        {/* MOBILE: compact horizontal cards */}
        <div className="flex flex-col gap-2.5 lg:hidden">
          {partidosDestacados.map((partido, index) => {
            const isPlaceholder = partido.youtubeId.startsWith('PLACEHOLDER');
            return (
              <ScrollReveal key={partido.id} delay={index * 0.06}>
                <button
                  type="button"
                  onClick={() => openVideoModal(partido.youtubeId)}
                  disabled={isPlaceholder}
                  className="group relative w-full flex items-center gap-3 rounded-2xl overflow-hidden text-left disabled:cursor-not-allowed transition-all duration-300 p-2.5"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                  }}
                >
                  <div className="relative flex-shrink-0 w-[120px] h-[72px] rounded-xl overflow-hidden bg-[#0a0a0a]">
                    {isPlaceholder ? (
                      <div className="w-full h-full flex items-center justify-center text-white/30 text-[10px] uppercase tracking-wider font-bold">
                        Próximo
                      </div>
                    ) : (
                      <>
                        <img
                          src={`https://img.youtube.com/vi/${partido.youtubeId}/mqdefault.jpg`}
                          alt={`${partido.numero} thumbnail`}
                          loading="lazy"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-gold/90 flex items-center justify-center shadow-[0_0_12px_rgba(255,215,0,0.4)]">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="black" className="ml-0.5">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </>
                    )}
                    {partido.esCampeonato && (
                      <span className="absolute top-1.5 left-1.5 text-[8px] font-display font-bold uppercase tracking-wider text-gold bg-black/70 px-1.5 py-0.5 rounded-full">
                        Campeonato
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-gold font-black">
                      <span>{partido.numero}</span>
                      <span className="text-white/20">·</span>
                      <span className="text-white/40 font-semibold">{partido.serie}</span>
                    </div>
                    <p className="text-sm font-bold text-white mt-1 m-0">
                      Yauco vs. San Sebastián
                    </p>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,215,0,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </ScrollReveal>
            );
          })}
          <Link to="/partidos" className="roster-glass-btn block mt-4 mx-0 py-3.5 rounded-full text-center text-gold/90 text-sm font-display font-bold uppercase tracking-widest no-underline">
            Ver Todos los Partidos
          </Link>
        </div>

        {/* DESKTOP: 4-col grid */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6">
          {partidosDestacados.map((partido, index) => {
            const isPlaceholder = partido.youtubeId.startsWith('PLACEHOLDER');
            return (
              <ScrollReveal key={partido.id} delay={index * 0.08}>
                <button
                  type="button"
                  onClick={() => openVideoModal(partido.youtubeId)}
                  disabled={isPlaceholder}
                  className="group relative w-full rounded-2xl overflow-hidden text-left disabled:cursor-not-allowed transition-all duration-300 hover:-translate-y-1"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
                  }}
                >
                  <div className="relative w-full aspect-video overflow-hidden">
                    {isPlaceholder ? (
                      <div className="w-full h-full flex items-center justify-center bg-[#0a0a0a] text-white/30 text-xs uppercase tracking-wider font-bold">
                        Próximo
                      </div>
                    ) : (
                      <>
                        <img
                          src={`https://img.youtube.com/vi/${partido.youtubeId}/hqdefault.jpg`}
                          alt={`${partido.numero} thumbnail`}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                          <div className="w-12 h-12 rounded-full bg-gold/90 flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.4)] group-hover:shadow-[0_0_30px_rgba(255,215,0,0.6)] transition-shadow">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="black" className="ml-0.5">
                              <path d="M8 5v14l11-7z" />
                            </svg>
                          </div>
                        </div>
                      </>
                    )}
                    {partido.esCampeonato && (
                      <span className="absolute top-3 left-3 text-[10px] font-display font-bold uppercase tracking-[0.15em] text-gold bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-gold/30">
                        Campeonato
                      </span>
                    )}
                  </div>
                  <div className="p-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-gold font-bold">
                      <span>{partido.numero}</span>
                      <span className="text-white/20">·</span>
                      <span className="text-white/50">{partido.serie}</span>
                    </div>
                    <p className="text-sm font-bold text-white mt-1 m-0">
                      Yauco vs. San Sebastián
                    </p>
                    <p className="text-xs text-white/40 mt-1 m-0">
                      {partido.fecha}
                    </p>
                  </div>
                </button>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Modal */}
        {videoModalId && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md px-3 md:px-6"
            style={{ animation: 'modalFadeIn 0.25s ease-out both' }}
            role="dialog"
            aria-modal="true"
            aria-label="Video del partido"
            onKeyDown={(e) => { if (e.key === 'Escape') closeVideoModal(); }}
          >
            <button
              type="button"
              onClick={closeVideoModal}
              aria-label="Cerrar video"
              className="absolute inset-0 w-full h-full cursor-default"
              tabIndex={-1}
            />
            <div
              className="relative w-full max-w-5xl z-10"
              style={{ animation: 'modalScaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) both' }}
            >
              <button
                type="button"
                onClick={closeVideoModal}
                aria-label="Cerrar video"
                autoFocus
                className="absolute -top-12 right-2 md:-top-14 md:right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-gold hover:text-black text-white flex items-center justify-center transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <div className="relative w-full rounded-2xl overflow-hidden bg-black ring-1 ring-gold/30 shadow-[0_0_60px_rgba(255,215,0,0.15)]" style={{ paddingTop: '56.25%' }}>
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${videoModalId}?autoplay=1`}
                  title="Video del partido"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>
            </div>
          </div>
        )}
      </section>


      {/* ===== ROSTER PREVIEW ===== */}
      <section className="py-10 lg:py-16 !max-w-none !mx-0 lg:!px-0">
        <ScrollReveal>
          <div className="text-center mb-6 lg:mb-10 lg:max-w-[1200px] lg:mx-auto lg:px-12">
            <h2 className="font-display font-black uppercase text-white m-0 tracking-tight lg:hidden" style={{ fontSize: 'clamp(2.2rem, 8vw, 3rem)', letterSpacing: '-0.02em' }}>
              Roster
            </h2>
            <h2 className="hidden lg:block font-display font-black uppercase text-white m-0" style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', letterSpacing: '-0.02em' }}>
              Roster
            </h2>
          </div>
        </ScrollReveal>

        {/* MOBILE: Auto-scrolling roster with center glow */}
        <MobileRosterCarousel players={roster} />

        <ScrollReveal>
          <Link
            to="/roster"
            className="lg:hidden roster-glass-btn block mt-6 mx-5 py-2.5 rounded-full text-center font-display font-bold text-xs uppercase tracking-wider text-gold no-underline"
          >
            Ver Roster Completo
          </Link>
        </ScrollReveal>

        {/* DESKTOP: Auto-scrolling roster loop */}
        <div className="hidden lg:block lg:mt-8">
          <style>{`
            @keyframes rosterScroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .roster-marquee {
              animation: rosterScroll 40s linear infinite;
            }
            .roster-marquee:hover {
              animation-play-state: paused;
            }
          `}</style>
          <div className="relative overflow-hidden">
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 z-10" style={{ background: 'linear-gradient(to right, #000000, transparent)' }} />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 z-10" style={{ background: 'linear-gradient(to left, #000000, transparent)' }} />
            <div className="roster-marquee flex gap-5 pb-4 w-max">
              {[...roster, ...roster].map((player, i) => (
                <Link
                  key={i}
                  to="/roster"
                  className="group relative flex-shrink-0 w-[220px] rounded-2xl overflow-hidden no-underline transition-transform duration-300 hover:-translate-y-1"
                  style={{
                    background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                    border: '1px solid rgba(255,215,0,0.08)',
                  }}
                >
                  <div className="relative w-full aspect-[3/4] overflow-hidden bg-white/5">
                    {player.photo ? (
                      <img
                        src={player.photo}
                        alt={player.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        style={player.photoPosition ? { objectPosition: player.photoPosition } : undefined}
                        draggable={false}
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-white/20 text-6xl font-display font-black">
                        {player.number}
                      </div>
                    )}
                    <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at center 40%, transparent 30%, rgba(0,0,0,0.85) 75%)' }} />
                    <div className="absolute inset-x-0 bottom-0 h-24" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }} />
                    <span className="absolute top-3 right-3 font-display font-black text-gold/20 text-3xl leading-none select-none">
                      #{player.number}
                    </span>
                  </div>
                  <div className="px-4 py-3">
                    <p className="font-display font-black text-white uppercase text-sm leading-tight m-0 flex items-center gap-1.5">
                      {player.name}
                      {player.captain && (
                        <span className="inline-flex items-center justify-center px-1.5 py-0.5 rounded bg-gold/20 text-gold font-display font-bold text-[9px] leading-none uppercase tracking-wider">
                          C
                        </span>
                      )}
                    </p>
                    <p className="text-gold/60 text-[11px] font-display font-semibold uppercase tracking-[0.15em] m-0 mt-1">
                      {player.position}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="text-center mt-6">
            <Link
              to="/roster"
              className="inline-flex items-center gap-2 text-gold text-sm font-display font-bold uppercase tracking-wider no-underline hover:text-white transition-colors duration-200"
            >
              Ver Roster Completo
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== NOTICIAS PREVIEW ===== */}
      <section className="px-5 lg:px-8 py-10 lg:py-20 lg:!max-w-none lg:!mx-0">
        {/* Section header */}
        <ScrollReveal>
          <div className="flex items-center justify-between mb-5 lg:hidden">
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
          <div className="hidden lg:block text-center mb-12">
            <h2 className="font-display font-black uppercase text-white m-0" style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', letterSpacing: '-0.02em' }}>
              Noticias
            </h2>
            <p className="text-white/40 text-sm mt-3 m-0 uppercase tracking-[0.3em] font-display">
              Cobertura de prensa
            </p>
          </div>
        </ScrollReveal>

        {/* MOBILE: featured + compact list */}
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
                <span className="flex items-center gap-2 text-gold text-[10px] font-bold uppercase tracking-wider">
                  {featuredArticle.source}
                </span>
                <h3 className="font-display font-normal lg:font-bold text-base text-white mt-1 m-0 leading-tight">Los Campeones del Voleibol Superior Masculino<br />nos visitan en El Primer Round</h3>
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
                    <span className="flex items-center gap-2 text-gold text-[10px] font-bold uppercase tracking-wider">
                      {article.source}
                    </span>
                    <h4 className="font-display font-normal text-sm text-white mt-0.5 m-0 leading-tight line-clamp-2">{article.title}</h4>
                    <p className="text-white/40 text-[11px] mt-1 m-0">{article.date}</p>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* DESKTOP: 4-col grid */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-6">
          {news.slice(0, 4).map((article, i) => (
            <ScrollReveal key={i} delay={i * 0.08}>
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => { e.preventDefault(); window.open(article.url, '_blank', 'noopener,noreferrer'); }}
                className="group relative flex flex-col rounded-2xl overflow-hidden no-underline h-full transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: 'linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div className="relative w-full aspect-[16/9] overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' }} />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <span className="inline-flex items-center gap-2 text-gold text-[11px] font-black uppercase tracking-[0.2em] mb-3">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold" />
                    {article.source}
                  </span>
                  <h4 className="font-display font-normal text-white text-xl leading-relaxed m-0 line-clamp-3">
                    {article.title}
                  </h4>
                  <span className="mt-auto pt-4 inline-flex items-center gap-1.5 text-white/30 text-[11px] uppercase tracking-wide">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                    {article.date}
                  </span>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ===== SOBRE NOSOTROS PREVIEW ===== */}
      <section className="py-10 lg:py-24 overflow-hidden">
        {/* MOBILE */}
        <div className="lg:hidden px-5">
          <ScrollReveal>
            <div className="relative rounded-3xl overflow-hidden" style={{ border: '1px solid rgba(255, 215, 0, 0.1)' }}>
              <div className="relative aspect-[4/3]">
                <ResponsiveImage
                  name="dsc04710"
                  alt="Cafeteros de Yauco"
                  width={800}
                  height={600}
                  sizes="90vw"
                  pictureClassName="block w-full h-full"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, #111 0%, rgba(17,17,17,0.7) 40%, transparent 70%)' }} />
              </div>
              <div className="relative px-5 pb-6 -mt-20 z-10">
                <p className="text-gold text-[10px] font-display font-bold uppercase tracking-[0.35em] m-0 mb-2">Sobre Nosotros</p>
                <h2 className="font-display font-black uppercase text-white text-2xl leading-[0.95] m-0 mb-3">
                  Cafeteros <span className="text-gold">de Yauco</span>
                </h2>
                <p className="text-white/70 text-sm leading-relaxed m-0 mb-5">
                  Un equipo de voleibol profesional que representa a la Ciudad del Café en la LVSM. En 2026, hicieron historia al ganar su primer campeonato en 55 años.
                </p>
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { value: '55', label: 'Años de espera' },
                    { value: '1971', label: 'Último título' },
                    { value: '2026', label: 'Campeones' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center py-3 rounded-xl" style={{ backgroundColor: 'rgba(255, 215, 0, 0.06)', border: '1px solid rgba(255, 215, 0, 0.1)' }}>
                      <p className="font-display font-black text-gold text-lg m-0 leading-none">{stat.value}</p>
                      <p className="text-white/40 text-[9px] uppercase tracking-wider mt-1 m-0">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* DESKTOP */}
        <div className="hidden lg:block max-w-[1200px] mx-auto px-10">
          <div className="relative grid grid-cols-12 gap-0 items-stretch rounded-[2rem] overflow-hidden" style={{ border: '1px solid rgba(255, 215, 0, 0.08)', minHeight: '520px' }}>
            <ScrollReveal className="col-span-6 relative">
              <div className="absolute inset-0">
                <ResponsiveImage
                  name="dsc04710"
                  alt="Cafeteros de Yauco"
                  width={800}
                  height={1000}
                  sizes="600px"
                  pictureClassName="block w-full h-full"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, transparent 50%, #111 100%)' }} />
              </div>
            </ScrollReveal>

            <div className="col-span-6 relative z-10 flex flex-col justify-center py-14 px-12" style={{ backgroundColor: '#111' }}>
              <ScrollReveal>
                <p className="text-gold text-[11px] font-display font-bold uppercase tracking-[0.35em] m-0 mb-4">Sobre Nosotros</p>
                <h2 className="font-display font-black uppercase text-white text-4xl xl:text-5xl leading-[0.95] tracking-tight m-0 mb-6">
                  Cafeteros <br />
                  <span className="text-gold">de Yauco</span>
                </h2>
                <p className="text-white/80 text-base leading-relaxed m-0 mb-4">
                  Un equipo de voleibol profesional que representa a la Ciudad del Café en la Liga de Voleibol Superior Masculina de Puerto Rico. Pasión, tradición y orgullo de todo un pueblo.
                </p>
                <p className="text-white/55 text-sm leading-relaxed m-0 mb-8">
                  En enero de 2026, los Cafeteros hicieron historia al ganar su primer campeonato de la LVSM en 55 años, un logro grabado en el corazón de Yauco y de todo Puerto Rico.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.1}>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { value: '55', label: 'Años de espera' },
                    { value: '1971', label: 'Último título' },
                    { value: '2026', label: 'Campeones' },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center py-4 rounded-xl transition-colors duration-300 hover:border-gold/30 cursor-default" style={{ backgroundColor: 'rgba(255, 215, 0, 0.04)', border: '1px solid rgba(255, 215, 0, 0.1)' }}>
                      <p className="font-display font-black text-gold text-2xl m-0 leading-none">{stat.value}</p>
                      <p className="text-white/40 text-[10px] uppercase tracking-wider mt-1.5 m-0">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

            </div>
          </div>
        </div>
      </section>


      {/* ===== TICKETS POPUP — Coming Soon ===== */}
      {ticketsOpen && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center p-6"
          style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(10px)', animation: 'modalFadeIn 0.2s ease' }}
          onClick={() => setTicketsOpen(false)}
          onKeyDown={(e) => { if (e.key === 'Escape') setTicketsOpen(false); }}
          role="dialog"
          aria-modal="true"
          aria-label="Boletos proximamente"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[560px] rounded-2xl overflow-hidden text-center"
            style={{
              background: 'linear-gradient(180deg, #1a1a1a 0%, #111111 100%)',
              border: '1px solid rgba(255,215,0,0.2)',
              boxShadow: '0 30px 80px rgba(0,0,0,0.6)',
              animation: 'modalScaleIn 0.3s ease',
            }}
          >
            <button
              type="button"
              onClick={() => setTicketsOpen(false)}
              aria-label="Cerrar"
              className="absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors z-10"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="px-10 pt-14 pb-12">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mx-auto mb-6">
                <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                <path d="M13 5v2" /><path d="M13 17v2" /><path d="M13 11v2" />
              </svg>
              <h3 className="font-display font-black text-3xl lg:text-4xl uppercase text-white m-0">
                Proximamente
              </h3>
              <p className="text-white/50 text-base mt-4 m-0 leading-relaxed max-w-[400px] mx-auto">
                Pronto el calendario de la temporada estara disponible y podras separar tus fechas para los juegos de los Cafeteros de Yauco.
              </p>
              <button
                type="button"
                onClick={() => setTicketsOpen(false)}
                className="mt-8 inline-flex items-center gap-2 px-9 py-3.5 bg-gold text-black font-display font-bold text-base uppercase tracking-wider rounded-full transition-transform duration-200 hover:scale-105"
              >
                Entendido
              </button>
            </div>
          </div>
        </div>
      )}
    </div>

  );
};

export default Index;
