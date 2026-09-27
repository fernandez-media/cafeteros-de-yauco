import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import ResponsiveImage from '../components/ResponsiveImage';
import BoleteriaCredencial from '../components/BoleteriaCredencial';

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
            <h1 className="font-display font-black text-5xl lg:text-8xl uppercase text-white leading-[0.95] m-0 tracking-tight">
              <span className="text-gold">Boletería</span>
            </h1>
            <p className="text-white/50 text-xs lg:text-sm mt-2 m-0 uppercase tracking-widest">
              Asegura tu asiento en La Cuna del Voleibol
            </p>
          </div>
        </div>
      </div>

      {/* Credencial de Temporada */}
      <div className="px-5 lg:px-12 pb-4 lg:pb-16 pt-4 lg:pt-6">
        <ScrollReveal>
          <BoleteriaCredencial ctaHref="https://cafeterosdeyaucovollyball.printcotickets.com/events/178163" />
        </ScrollReveal>
      </div>

    </div>
  );
};

export default Boleteria;
