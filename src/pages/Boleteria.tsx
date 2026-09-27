import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import ResponsiveImage from '../components/ResponsiveImage';

const BASE = import.meta.env.BASE_URL;

const Boleteria = () => {
  return (
    <div className="-mt-14" style={{ minHeight: 'calc(100vh - var(--dock-height) - 20px)' }}>
      {/* Hero */}
      <div className="relative w-full h-[280px] lg:h-[520px] overflow-hidden">
        <ResponsiveImage
          name="lacuna-fans"
          alt="Fanáticos en La Cuna del Voleibol"
          width={1440}
          height={1920}
          sizes="100vw"
          loading="eager"
          pictureClassName="absolute inset-0 w-full h-full"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 35%' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.7) 80%, #000 100%)',
          }}
        />
        <div className="absolute bottom-0 left-0 w-full px-5 lg:px-12 pb-8 lg:pb-14">
          <Link
            to="/"
            className="w-9 h-9 rounded-full flex items-center justify-center no-underline mb-4 lg:hidden transition-colors duration-200"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </Link>
          <div className="max-w-[1200px] mx-auto text-center">
            <h1 className="font-display font-black text-4xl lg:text-7xl uppercase text-white leading-[0.95] m-0 tracking-tight">
              <span className="text-gold">Boletería</span>
            </h1>
            <p className="text-white/50 text-sm lg:text-base mt-2 m-0 uppercase tracking-widest">
              Asegura tu asiento en La Cuna
            </p>
          </div>
        </div>
      </div>

      {/* Abonados — Main Section */}
      <div className="px-5 lg:px-12 pb-6 pt-4 lg:pt-8 max-w-[960px] mx-auto">
        <ScrollReveal>
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              backgroundColor: '#111',
              border: '1px solid rgba(255, 215, 0, 0.1)',
            }}
          >
            <div className="p-5 lg:p-8">
              {/* Title */}
              <h2 className="font-display font-black uppercase text-white text-center m-0 mb-1 leading-tight whitespace-nowrap" style={{ fontSize: 'clamp(14px, 4.2vw, 24px)' }}>
                ¡No te pierdas ni un solo juego de los <span className="text-gold">Cafeteros</span>!
              </h2>
              <p className="text-white/60 text-xs text-center m-0 mb-5 leading-relaxed">
                Ya están disponibles los abonos para la temporada regular 2026.<br />
                Hay espacios limitados. Consigue los tuyos antes que se acaben.
              </p>

              <div className="max-w-[280px] mx-auto">
                {/* CTA */}
                <a
                  href="https://cafeterosdeyaucovollyball.printcotickets.com/events/178163"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center py-2.5 mb-3 bg-gold text-black font-display font-bold text-xs uppercase tracking-wider rounded-lg no-underline animate-pulse-cta"
                >
                  Comprar Boletos
                </a>

                {/* Promo Image */}
                <div className="rounded-xl overflow-hidden">
                  <img src={`${BASE}media/boleteria/abonos-disponibles.webp`}
                    alt="Abonos Disponibles — Temporada 2026" width={1080} height={1440}
                    loading="lazy" decoding="async"
                    className="w-full h-auto" />
                </div>
              </div>

              <style>{`
                @keyframes pulse-cta {
                  0%, 100% { transform: scale(1); }
                  50% { transform: scale(1.04); }
                }
                .animate-pulse-cta {
                  animation: pulse-cta 2s ease-in-out infinite;
                }
                .animate-pulse-cta:active {
                  animation: none;
                  transform: scale(0.97);
                }
              `}</style>
            </div>
          </div>
        </ScrollReveal>
      </div>

    </div>
  );
};

export default Boleteria;
