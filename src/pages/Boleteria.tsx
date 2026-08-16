import { useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import PageHero from '../components/PageHero';
import ResponsiveImage from '../components/ResponsiveImage';

const Boleteria = () => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="-mt-14" style={{ minHeight: 'calc(100vh - var(--dock-height) - 20px)' }}>
      <PageHero title="Boleteria" goldWord="Boleteria" subtitle="Asegura tu asiento" />

      <div className="px-5 pt-4 pb-4">
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

      <div className="px-5 lg:px-12 pb-8 lg:max-w-[960px] lg:mx-auto">
        <div className="flex flex-col lg:grid lg:grid-cols-[1.6fr_1fr] lg:gap-5">
          {/* Main CTA Card */}
          <ScrollReveal>
            <div
              className="relative rounded-2xl overflow-hidden mb-4 lg:mb-0 h-full"
              style={{
                backgroundColor: '#1a1a1a',
                border: '1px solid rgba(255, 215, 0, 0.15)',
              }}
            >
              <ResponsiveImage
                name="hero"
                alt=""
                width={1920}
                height={800}
                sizes="100vw"
                loading="eager"
                ariaHidden
                pictureClassName="absolute inset-0 w-full h-full"
                className="w-full h-full object-cover"
                style={{ opacity: 0.18 }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(26,26,26,0.95) 0%, rgba(26,26,26,0.8) 100%)',
                }}
              />
              <div className="relative z-10 p-6 lg:p-8 text-center">
                <svg
                  width="48" height="48"
                  viewBox="0 0 24 24" fill="none" stroke="#FFD700"
                  strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                  className="mx-auto mb-4"
                >
                  <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
                  <path d="M13 5v2" /><path d="M13 17v2" /><path d="M13 11v2" />
                </svg>
                <h3 className="font-display font-bold text-xl lg:text-2xl uppercase text-white mb-2 m-0">
                  Consigue tus boletos
                </h3>
                <p className="text-white/50 text-sm mb-5 m-0 max-w-xs mx-auto">
                  Asegura tu asiento para vivir la emocion del voleibol de los
                  Cafeteros de Yauco en vivo.
                </p>
                <button
                  type="button"
                  onClick={() => setShowPopup(true)}
                  className="inline-block px-8 py-3 bg-gold text-black font-display font-bold text-sm uppercase tracking-wider rounded-full no-underline transition-transform duration-200 hover:scale-105"
                >
                  Comprar Boletos
                </button>
              </div>
            </div>
          </ScrollReveal>

          {/* Info Card — Glassmorphism */}
          <ScrollReveal delay={0.1}>
            <div
              className="relative rounded-2xl overflow-hidden h-full"
              style={{
                background: 'linear-gradient(135deg, rgba(245,197,24,0.06) 0%, rgba(255,255,255,0.03) 50%, rgba(245,197,24,0.06) 100%)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '0.5px solid rgba(245,197,24,0.15)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)',
              }}
            >
              <div className="p-5 lg:p-6">
                <div className="flex items-center gap-2.5 mb-4">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,215,0,0.1)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="16" x2="12" y2="12" />
                      <line x1="12" y1="8" x2="12.01" y2="8" />
                    </svg>
                  </div>
                  <h4 className="font-display font-bold text-sm text-gold uppercase m-0 tracking-wider">
                    Informacion
                  </h4>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-3 rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,215,0,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <div>
                      <p className="text-white/70 text-xs font-semibold uppercase tracking-wider m-0 mb-0.5">Taquilla</p>
                      <p className="text-white/40 text-xs leading-relaxed m-0">Disponibles en el coliseo el dia del juego, sujeto a disponibilidad.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-xl p-3" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,215,0,0.5)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 mt-0.5">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                    <div>
                      <p className="text-white/70 text-xs font-semibold uppercase tracking-wider m-0 mb-0.5">En Linea</p>
                      <p className="text-white/40 text-xs leading-relaxed m-0">Proximamente a traves de la plataforma oficial de Printco Tickets.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center px-6"
          style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', animation: 'modalFadeIn 0.2s ease-out both' }}
        >
          <div
            className="relative w-full max-w-sm rounded-2xl p-6 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(30,30,30,0.95) 0%, rgba(20,20,20,0.98) 100%)',
              border: '1px solid rgba(255,215,0,0.15)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.5), 0 0 40px rgba(255,215,0,0.05)',
              animation: 'modalScaleIn 0.25s ease-out both',
            }}
          >
            <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'rgba(255,215,0,0.1)' }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <h3 className="font-display font-bold text-lg uppercase text-white m-0 mb-2">
              Proximamente
            </h3>
            <p className="text-white/50 text-sm leading-relaxed m-0 mb-5">
              La venta de boletos para la temporada 2026 estara disponible pronto. Mantente pendiente a nuestras redes sociales.
            </p>
            <button
              type="button"
              onClick={() => setShowPopup(false)}
              className="px-8 py-2.5 bg-gold text-black font-display font-bold text-sm uppercase tracking-wider rounded-full transition-transform duration-200 hover:scale-105"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Boleteria;
