import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import PageHero from '../components/PageHero';
import ResponsiveImage from '../components/ResponsiveImage';
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

      <div className="px-5 pb-10">
        <div className="grid grid-cols-2 gap-3">
          {merch.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid rgba(255, 215, 0, 0.08)',
                }}
              >
                <div
                  className="relative w-full h-[180px] flex items-center justify-center p-6"
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
      </div>
    </div>
  );
};

export default Merch;
