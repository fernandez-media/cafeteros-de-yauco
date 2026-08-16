import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import PageHero from '../components/PageHero';
import ResponsiveImage from '../components/ResponsiveImage';
import ComingSoonCard from '../components/ComingSoonCard';
import { merch } from '../data/merch';

const Merch = () => {
  return (
    <div className="min-h-screen -mt-14">
      <PageHero title="Merch" goldWord="Merch" subtitle="Tienda Oficial" />

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

      <div className="px-5 lg:px-12 pb-6 w-full max-w-[1200px] mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
          {merch.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <ComingSoonCard
                comingSoon={item.comingSoon}
                className="rounded-2xl [transform:translateZ(0)] [-webkit-mask-image:-webkit-radial-gradient(white,black)] isolate"
                style={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid rgba(255, 215, 0, 0.08)',
                }}
              >
                <div
                  className="relative w-full h-[180px] flex items-center justify-center p-6 overflow-hidden"
                  style={{ backgroundColor: item.bgColor }}
                >
                  <ResponsiveImage
                    name={item.imageName}
                    alt={item.name}
                    width={400}
                    height={400}
                    sizes="(max-width: 640px) 45vw, 320px"
                    loading={i === 0 ? 'eager' : 'lazy'}
                    fetchPriority={i === 0 ? 'high' : undefined}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                <div className="p-3">
                  <p className="font-display font-bold text-sm text-white m-0 leading-tight">
                    {item.name}
                  </p>
                  <p className="text-gold font-bold text-sm mt-1 m-0">
                    {item.price}
                  </p>
                </div>
              </ComingSoonCard>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.2}>
          <a
            href="https://wa.me/17875478122?text=Hola%2C%20me%20interesa%20informaci%C3%B3n%20sobre%20el%20merch%20de%20Cafeteros"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 mt-5 py-3 rounded-full font-display font-bold text-sm uppercase tracking-wider no-underline transition-transform duration-200 hover:scale-[1.02]"
            style={{
              background: '#25D366',
              color: '#fff',
              boxShadow: '0 0 20px rgba(37,211,102,0.3), 0 0 40px rgba(37,211,102,0.1)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Mas Informacion
          </a>
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Merch;
