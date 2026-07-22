import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import ResponsiveImage from '../components/ResponsiveImage';

const BASE = import.meta.env.BASE_URL;
const teamLogo = (name: string) => `${BASE}media/logos/${name}.png`;

type Partido = {
  id: string;
  numero: string;
  serie: 'final' | 'semifinal';
  serieLabel: string;
  equipoLocal: string;
  equipoLocalCorto: string;
  equipoLocalLogoKey: string | null;
  equipoVisitante: string;
  equipoVisitanteCorto: string;
  equipoVisitanteLogoKey: string | null;
  resultado: string;
  ganador: 'local' | 'visitante';
  fecha: string;
  youtubeId: string;
  esCampeonato: boolean;
  contexto?: string;
};

const partidosData: Partido[] = [
  {
    id: 'final-6', numero: 'Juego 6', serie: 'final', serieLabel: 'Serie Final',
    equipoLocal: 'Cafeteros de Yauco', equipoLocalCorto: 'YAUCO', equipoLocalLogoKey: null,
    equipoVisitante: 'Caribes de San Sebastián', equipoVisitanteCorto: 'SAN SEBASTIÁN', equipoVisitanteLogoKey: 'caribes',
    resultado: '3-2', ganador: 'local', fecha: '24 de enero, 2026',
    youtubeId: 'PLACEHOLDER_JUEGO_6', esCampeonato: true, contexto: 'CAMPEONATO',
  },
  {
    id: 'final-5', numero: 'Juego 5', serie: 'final', serieLabel: 'Serie Final',
    equipoLocal: 'Cafeteros de Yauco', equipoLocalCorto: 'YAUCO', equipoLocalLogoKey: null,
    equipoVisitante: 'Caribes de San Sebastián', equipoVisitanteCorto: 'SAN SEBASTIÁN', equipoVisitanteLogoKey: 'caribes',
    resultado: '2-3', ganador: 'visitante', fecha: '22 de enero, 2026',
    youtubeId: 'RxmvKjlE6uk', esCampeonato: false,
  },
  {
    id: 'final-4', numero: 'Juego 4', serie: 'final', serieLabel: 'Serie Final',
    equipoLocal: 'Cafeteros de Yauco', equipoLocalCorto: 'YAUCO', equipoLocalLogoKey: null,
    equipoVisitante: 'Caribes de San Sebastián', equipoVisitanteCorto: 'SAN SEBASTIÁN', equipoVisitanteLogoKey: 'caribes',
    resultado: '3-1', ganador: 'local', fecha: '20 de enero, 2026',
    youtubeId: 'DmSWs9uJIH8', esCampeonato: false,
  },
  {
    id: 'final-3', numero: 'Juego 3', serie: 'final', serieLabel: 'Serie Final',
    equipoLocal: 'Cafeteros de Yauco', equipoLocalCorto: 'YAUCO', equipoLocalLogoKey: null,
    equipoVisitante: 'Caribes de San Sebastián', equipoVisitanteCorto: 'SAN SEBASTIÁN', equipoVisitanteLogoKey: 'caribes',
    resultado: '3-1', ganador: 'local', fecha: '18 de enero, 2026',
    youtubeId: 'UDEYHpwK2LE', esCampeonato: false,
  },
  {
    id: 'final-2', numero: 'Juego 2', serie: 'final', serieLabel: 'Serie Final',
    equipoLocal: 'Cafeteros de Yauco', equipoLocalCorto: 'YAUCO', equipoLocalLogoKey: null,
    equipoVisitante: 'Caribes de San Sebastián', equipoVisitanteCorto: 'SAN SEBASTIÁN', equipoVisitanteLogoKey: 'caribes',
    resultado: '3-0', ganador: 'local', fecha: '16 de enero, 2026',
    youtubeId: 'UxgrXXt3q9g', esCampeonato: false,
  },
  {
    id: 'final-1', numero: 'Juego 1', serie: 'final', serieLabel: 'Serie Final',
    equipoLocal: 'Cafeteros de Yauco', equipoLocalCorto: 'YAUCO', equipoLocalLogoKey: null,
    equipoVisitante: 'Caribes de San Sebastián', equipoVisitanteCorto: 'SAN SEBASTIÁN', equipoVisitanteLogoKey: 'caribes',
    resultado: '2-3', ganador: 'visitante', fecha: '14 de enero, 2026',
    youtubeId: 'toVNnFBDUlE', esCampeonato: false,
  },
  {
    id: 'semi-5', numero: 'Juego 5', serie: 'semifinal', serieLabel: 'Semifinal',
    equipoLocal: 'Cafeteros de Yauco', equipoLocalCorto: 'YAUCO', equipoLocalLogoKey: null,
    equipoVisitante: 'Plataneros de Corozal', equipoVisitanteCorto: 'COROZAL', equipoVisitanteLogoKey: 'plataneros',
    resultado: '3-1', ganador: 'local', fecha: '10 de enero, 2026',
    youtubeId: 'PLACEHOLDER_SEMI_5', esCampeonato: false, contexto: 'AVANZAN A LA FINAL',
  },
  {
    id: 'semi-4', numero: 'Juego 4', serie: 'semifinal', serieLabel: 'Semifinal',
    equipoLocal: 'Cafeteros de Yauco', equipoLocalCorto: 'YAUCO', equipoLocalLogoKey: null,
    equipoVisitante: 'Plataneros de Corozal', equipoVisitanteCorto: 'COROZAL', equipoVisitanteLogoKey: 'plataneros',
    resultado: '3-1', ganador: 'local', fecha: '8 de enero, 2026',
    youtubeId: 'PLACEHOLDER_SEMI_4', esCampeonato: false,
  },
  {
    id: 'semi-3', numero: 'Juego 3', serie: 'semifinal', serieLabel: 'Semifinal',
    equipoLocal: 'Cafeteros de Yauco', equipoLocalCorto: 'YAUCO', equipoLocalLogoKey: null,
    equipoVisitante: 'Plataneros de Corozal', equipoVisitanteCorto: 'COROZAL', equipoVisitanteLogoKey: 'plataneros',
    resultado: '3-2', ganador: 'local', fecha: '6 de enero, 2026',
    youtubeId: 'PLACEHOLDER_SEMI_3', esCampeonato: false,
  },
  {
    id: 'semi-2', numero: 'Juego 2', serie: 'semifinal', serieLabel: 'Semifinal',
    equipoLocal: 'Cafeteros de Yauco', equipoLocalCorto: 'YAUCO', equipoLocalLogoKey: null,
    equipoVisitante: 'Plataneros de Corozal', equipoVisitanteCorto: 'COROZAL', equipoVisitanteLogoKey: 'plataneros',
    resultado: '3-0', ganador: 'local', fecha: '4 de enero, 2026',
    youtubeId: 'PLACEHOLDER_SEMI_2', esCampeonato: false,
  },
  {
    id: 'semi-1', numero: 'Juego 1', serie: 'semifinal', serieLabel: 'Semifinal',
    equipoLocal: 'Cafeteros de Yauco', equipoLocalCorto: 'YAUCO', equipoLocalLogoKey: null,
    equipoVisitante: 'Plataneros de Corozal', equipoVisitanteCorto: 'COROZAL', equipoVisitanteLogoKey: 'plataneros',
    resultado: '3-0', ganador: 'local', fecha: '2 de enero, 2026',
    youtubeId: 'PLACEHOLDER_SEMI_1', esCampeonato: false,
  },
];

const TeamLogo = ({ logoKey, alt, size = 32 }: { logoKey: string | null; alt: string; size?: number }) => {
  if (!logoKey) {
    return (
      <ResponsiveImage
        name="cafeteros-logo"
        alt={alt}
        width={size}
        height={size}
        sizes={`${size}px`}
        loading="lazy"
        pictureClassName="inline-flex"
        className="object-contain"
      />
    );
  }
  return (
    <img
      src={teamLogo(logoKey)}
      alt={alt}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      className="object-contain"
      style={{ width: size, height: size }}
    />
  );
};

const Partidos = () => {
  const [activeTab, setActiveTab] = useState<'final' | 'semifinal'>('final');
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

  const partidosFiltrados = partidosData.filter((p) => p.serie === activeTab);

  const tabs = [
    { key: 'final' as const, label: 'Serie Final', count: 6 },
    { key: 'semifinal' as const, label: 'Semifinal', count: 5 },
  ];

  return (
    <div className="min-h-screen -mt-14 bg-black">
      <PageHero title="Partidos" goldWord="Partidos" subtitle="Revive y sigue cada juego" />

      <div className="px-5 lg:px-10 pt-4 pb-4 max-w-[1200px] lg:mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/50 text-sm no-underline hover:text-gold transition-colors duration-200"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Inicio
        </Link>
      </div>

      {/* TABS */}
      <div className="px-5 lg:px-10 max-w-[1200px] lg:mx-auto mb-6 lg:mb-8">
        <div className="flex items-center justify-center gap-2 lg:gap-3">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-5 lg:px-6 py-2.5 lg:py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                  isActive
                    ? 'bg-[#F5C518] text-black shadow-lg shadow-[#F5C518]/20'
                    : 'bg-[#1a1a1a] text-[#999999] hover:text-white hover:bg-[#252525] border border-[#2a2a2a]'
                }`}
              >
                {tab.label}
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-black/20 text-black' : 'bg-[#0a0a0a] text-[#666]'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* LISTA */}
      <div className="px-5 lg:px-10 pb-12 lg:pb-20 max-w-[1000px] lg:mx-auto">
        <div className="flex flex-col gap-3">
          {partidosFiltrados.map((partido, index) => {
            const isPlaceholder = partido.youtubeId.startsWith('PLACEHOLDER');
            return (
              <button
                key={partido.id}
                type="button"
                onClick={() => openVideoModal(partido.youtubeId)}
                disabled={isPlaceholder}
                style={{ animation: `fadeInUp 0.4s ease-out ${index * 0.06}s both` }}
                className={`group relative w-full flex items-center gap-3 lg:gap-5 bg-[#111111] rounded-2xl p-3 lg:p-4 border border-[#222222] transition-all duration-300 overflow-hidden text-left ${
                  isPlaceholder
                    ? 'opacity-70 cursor-not-allowed'
                    : 'hover:bg-[#161616] hover:border-[#F5C518]/60 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_rgba(245,197,24,0.15)] cursor-pointer'
                }`}
              >
                {/* Shimmer */}
                {!isPlaceholder && (
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-[#F5C518]/10 to-transparent animate-shimmer" />
                  </div>
                )}

                {/* THUMBNAIL */}
                <div className="relative flex-shrink-0 rounded-xl overflow-hidden bg-[#0a0a0a] border border-[#222]" style={{ width: 110, height: 62 }}>
                  <div className="lg:hidden absolute inset-0" />
                  {isPlaceholder ? (
                    <div className="w-full h-full flex items-center justify-center text-[#444]">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                  ) : (
                    <>
                      <img
                        src={`https://img.youtube.com/vi/${partido.youtubeId}/mqdefault.jpg`}
                        alt={`${partido.numero} — ${partido.serieLabel}`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-[#F5C518] flex items-center justify-center shadow-lg">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-black translate-x-[1px]">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        </div>
                      </div>
                      {partido.esCampeonato && (
                        <div className="absolute top-1 left-1 text-[10px] leading-none px-1.5 py-0.5 rounded bg-[#F5C518] text-black font-bold">
                          🏆
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* CENTER INFO */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-[10px] lg:text-[11px] uppercase tracking-wider mb-1.5">
                    <span className="text-white font-bold">{partido.numero}</span>
                    <span className="text-[#444]">·</span>
                    <span className="text-[#999]">{partido.serieLabel}</span>
                    {partido.contexto && (
                      <>
                        <span className="text-[#444]">·</span>
                        <span className="text-[#F5C518] font-bold">{partido.contexto}</span>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-2 lg:gap-3">
                    {/* Local */}
                    <div className="flex items-center gap-1.5 lg:gap-2 min-w-0">
                      <TeamLogo logoKey={partido.equipoLocalLogoKey} alt={partido.equipoLocal} size={28} />
                      <span
                        className={`text-xs lg:text-sm font-bold truncate ${
                          partido.ganador === 'local' ? 'text-white' : 'text-[#777]'
                        }`}
                      >
                        {partido.equipoLocalCorto}
                      </span>
                    </div>

                    {/* Score */}
                    <div className="px-2 lg:px-3 py-1 rounded-md bg-[#0a0a0a] border border-[#222] flex-shrink-0">
                      <span className="font-mono font-bold text-sm lg:text-base text-white tabular-nums">
                        {partido.resultado}
                      </span>
                    </div>

                    {/* Visitante */}
                    <div className="flex items-center gap-1.5 lg:gap-2 min-w-0">
                      <span
                        className={`text-xs lg:text-sm font-bold truncate ${
                          partido.ganador === 'visitante' ? 'text-white' : 'text-[#777]'
                        }`}
                      >
                        {partido.equipoVisitanteCorto}
                      </span>
                      <TeamLogo logoKey={partido.equipoVisitanteLogoKey} alt={partido.equipoVisitante} size={28} />
                    </div>
                  </div>

                  <div className="text-[10px] lg:text-[11px] text-[#666] mt-1.5">{partido.fecha}</div>
                </div>

                {/* RIGHT CHEVRON */}
                <div className="hidden md:flex items-center gap-2 flex-shrink-0 text-[#666] group-hover:text-[#F5C518] transition-colors">
                  <span className="text-xs font-semibold uppercase tracking-wider">
                    {isPlaceholder ? 'Próximamente' : 'Ver partido'}
                  </span>
                  {!isPlaceholder && (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-300 group-hover:translate-x-1">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* MODAL */}
      {videoModalId && (
        <div
          onClick={closeVideoModal}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md px-3 md:px-6"
          style={{ animation: 'modalFadeIn 0.25s ease-out both' }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl"
            style={{ animation: 'modalScaleIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) both' }}
          >
            <button
              type="button"
              onClick={closeVideoModal}
              aria-label="Cerrar video"
              className="absolute -top-12 right-2 md:-top-14 md:right-0 w-10 h-10 rounded-full bg-white/10 hover:bg-gold hover:text-black text-white flex items-center justify-center transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
            <div className="relative w-full rounded-2xl overflow-hidden bg-black ring-1 ring-gold/30 shadow-[0_0_60px_rgba(255,215,0,0.15)]" style={{ paddingTop: '56.25%' }}>
              <iframe
                src={`https://www.youtube.com/embed/${videoModalId}?autoplay=1`}
                title="Video del partido"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Partidos;
