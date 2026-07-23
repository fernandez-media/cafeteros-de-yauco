import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero';
import caribesLogo from '../assets/caribes-logo.png.asset.json';
import plataneroLogo from '../assets/plataneros-logo.png.asset.json';

const cafeterosLogoUrl = `${import.meta.env.BASE_URL}assets/opt/cafeteros-logo-192.webp`;

const teamLogoMap: Record<string, string> = {
  caribes: caribesLogo.url,
  plataneros: plataneroLogo.url,
};

const TeamLogo = ({ logoKey, name }: { logoKey: string | null; name: string }) => {
  const src = logoKey ? teamLogoMap[logoKey] : cafeterosLogoUrl;
  return (
    <div
      className="rounded-full overflow-hidden bg-white/5 flex-shrink-0 w-7 h-7 lg:w-8 lg:h-8"
      style={{ boxShadow: '0 0 0 1.5px rgba(245,197,24,0.5)' }}
    >
      <img src={src} alt={name} className="w-full h-full object-cover" loading="lazy" decoding="async" />
    </div>
  );
};




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
    id: 'final-5', numero: 'Juego 5', serie: 'final', serieLabel: 'Serie Final',
    equipoLocal: 'Cafeteros de Yauco', equipoLocalCorto: 'YAUCO', equipoLocalLogoKey: null,
    equipoVisitante: 'Caribes de San Sebastián', equipoVisitanteCorto: 'SAN SEBASTIÁN', equipoVisitanteLogoKey: 'caribes',
    resultado: '2-3', ganador: 'visitante', fecha: '22 de enero, 2026',
    youtubeId: 'RxmvKjlE6uk', esCampeonato: true, contexto: 'CAMPEONATO',
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
    { key: 'final' as const, label: 'Serie Final', count: 5 },
    { key: 'semifinal' as const, label: 'Semifinal', count: 5 },
  ];

  return (
    <div className="min-h-screen -mt-14 bg-[#0a0a0a]">
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
                {/* Shimmer effect al hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#F5C518]/8 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                </div>

                {/* THUMBNAIL (más pequeño) */}
                <div className="relative flex-shrink-0 w-[100px] h-[56px] lg:w-[120px] lg:h-[68px] rounded-xl overflow-hidden bg-[#0a0a0a]">
                  {isPlaceholder ? (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="#F5C518" opacity="0.4">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  ) : (
                    <>
                      <img
                        src={`https://img.youtube.com/vi/${partido.youtubeId}/mqdefault.jpg`}
                        alt={`${partido.numero}`}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        width={120}
                        height={68}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 lg:w-9 lg:h-9 rounded-full bg-[#F5C518] flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="#000000">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      {partido.esCampeonato && (
                        <div className="absolute top-1 left-1 bg-[#F5C518] text-black text-[8px] font-black px-1 py-0.5 rounded uppercase tracking-wider flex items-center gap-0.5">
                          🏆
                        </div>
                      )}
                    </>
                  )}
                </div>

                {/* INFO CENTRAL */}
                <div className="flex-1 min-w-0 relative z-10">
                  {/* Serie + número + contexto */}
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    <span className="text-[#F5C518] text-[10px] lg:text-[11px] font-black uppercase tracking-widest">
                      {partido.numero}
                    </span>
                    <span className="text-white/20 text-[10px]">·</span>
                    <span className="text-white/50 text-[10px] lg:text-[11px] uppercase tracking-wider">
                      {partido.serieLabel}
                    </span>
                    {partido.contexto && (
                      <>
                        <span className="text-white/20 text-[10px]">·</span>
                        <span className="text-[#F5C518] text-[9px] lg:text-[10px] font-bold uppercase tracking-wider bg-[#F5C518]/10 px-1.5 py-0.5 rounded">
                          {partido.contexto}
                        </span>
                      </>
                    )}
                  </div>

                  {/* Nombres completos (protagonista) */}
                  <div className="flex items-center gap-2 lg:gap-2.5 min-w-0">
                    <TeamLogo logoKey={partido.equipoLocalLogoKey} name={partido.equipoLocal} />
                    <span className="text-white text-xs lg:text-sm font-bold tracking-wide group-hover:text-[#F5C518] transition-colors duration-300">
                      {partido.equipoLocalCorto}
                    </span>
                    <span className="text-white/40 text-[11px] lg:text-xs font-normal px-0.5">vs.</span>
                    <TeamLogo logoKey={partido.equipoVisitanteLogoKey} name={partido.equipoVisitante} />
                    <span className="text-white text-xs lg:text-sm font-bold tracking-wide truncate group-hover:text-[#F5C518] transition-colors duration-300">
                      {partido.equipoVisitanteCorto}
                    </span>
                  </div>


                  {/* Fecha */}
                  <p className="text-white/40 text-[10px] lg:text-[11px] mt-1.5">
                    {partido.fecha}
                  </p>
                </div>

                {/* CHEVRON DERECHA */}
                <div className="hidden md:flex flex-shrink-0 items-center gap-2 opacity-60 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-[#F5C518] text-xs font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                    Ver partido
                  </span>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F5C518" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
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
