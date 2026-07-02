import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import PageHero from '../components/PageHero';
import ResponsiveImage from '../components/ResponsiveImage';

const Boleteria = () => {
  return (
    <div className="min-h-screen -mt-14">
      <PageHero title="Boleteria" goldWord="Boleteria" subtitle="Asegura tu asiento" />

      <div className="px-5 pt-4 pb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/50 text-sm no-underline hover:text-gold transition-colors duration-200"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Inicio
        </Link>
      </div>

      <div className="px-5 lg:px-12 pb-10 lg:max-w-[960px] lg:mx-auto">
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
                  background:
                    'linear-gradient(135deg, rgba(26,26,26,0.95) 0%, rgba(26,26,26,0.8) 100%)',
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
                <a
                  href="https://cafeterosdeyaucovollyball.printcotickets.com/browse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 bg-gold text-black font-display font-bold text-sm uppercase tracking-wider rounded-full no-underline transition-transform duration-200 hover:scale-105"
                >
                  Comprar Boletos
                </a>
              </div>
            </div>
          </ScrollReveal>

          {/* Info Card */}
          <ScrollReveal delay={0.1}>
            <div
              className="rounded-2xl p-5 h-full"
              style={{
                backgroundColor: '#1a1a1a',
                border: '1px solid rgba(255, 215, 0, 0.08)',
              }}
            >
              <div className="flex items-start gap-3">
                <svg
                  width="20" height="20"
                  viewBox="0 0 24 24" fill="none" stroke="#FFD700"
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                  className="flex-shrink-0 mt-0.5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                <div>
                  <h4 className="font-display font-bold text-sm text-white uppercase m-0 mb-1">
                    Informacion
                  </h4>
                  <p className="text-white/50 text-xs leading-relaxed m-0">
                    Los boletos estan disponibles a traves de la plataforma oficial
                    de Printco Tickets. Puedes comprar tus boletos en linea o en la
                    taquilla del coliseo el dia del juego, sujeto a disponibilidad.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
};

export default Boleteria;
