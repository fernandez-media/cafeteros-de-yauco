import { useState } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import ResponsiveImage from '../components/ResponsiveImage';
import { merch } from '../data/merch';

const SIZES = ['S', 'M', 'L', 'XL', '2XL'] as const;
const WA_NUMBER = '19393981361';

const Merch = () => {
  const [selected, setSelected] = useState<Record<string, string>>({});

  const handleSize = (itemId: string, size: string) => {
    setSelected((prev) => ({ ...prev, [itemId]: prev[itemId] === size ? '' : size }));
  };

  const buildWhatsAppUrl = (name: string, size: string) => {
    const msg = encodeURIComponent(`¡Saludos! Deseo la camisa ${name} en size ${size} ☕`);
    return `https://wa.me/${WA_NUMBER}?text=${msg}`;
  };

  return (
    <div className="relative min-h-screen -mt-14">
      <ResponsiveImage
        name="merch-hero"
        alt=""
        width={1920}
        height={600}
        sizes="100vw"
        ariaHidden
        pictureClassName="fixed inset-0 w-full h-full"
        className="w-full h-full object-cover"
      />

      <div className="fixed inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.7) 40%, rgba(0,0,0,0.85) 100%)' }} />

      <div className="relative z-10">
        <div className="h-[200px] lg:h-[320px] flex flex-col justify-end relative">
          <Link
            to="/"
            className="absolute top-5 left-5 z-10 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 backdrop-blur-sm border border-white/15 text-white text-sm font-display font-bold no-underline transition-all duration-200 hover:bg-gold/20 hover:border-gold/40 hover:text-gold active:scale-[0.96]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
            Inicio
          </Link>
          <div className="text-center px-5 pb-6">
            <h1 className="font-display font-black text-4xl lg:text-5xl uppercase text-white leading-tight m-0">
              <span className="text-gold">Merch</span> Oficial
            </h1>
          </div>
        </div>

        <div className="px-5 lg:px-12 pb-2 w-full max-w-[1200px] mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
            {merch.map((item, i) => {
              const sizeChosen = selected[item.id];
              return (
                <ScrollReveal key={item.id} delay={i * 0.05}>
                  <div
                    className="rounded-2xl overflow-hidden [transform:translateZ(0)] [-webkit-mask-image:-webkit-radial-gradient(white,black)] isolate"
                    style={{
                      backgroundColor: 'rgba(26,26,26,0.85)',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255, 215, 0, 0.08)',
                    }}
                  >
                    <div
                      className={`relative w-full h-[180px] lg:h-[240px] flex items-center justify-center overflow-hidden ${
                        item.id === 'crop-top-blanca' || item.id === 'crop-top-negra'
                          ? 'p-0'
                          : item.id === 'tshirt-blanca'
                            ? 'p-6 lg:p-8'
                            : 'p-1 lg:p-2'
                      }`}
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
                        pictureClassName={
                          item.id === 'crop-top-blanca' || item.id === 'crop-top-negra'
                            ? 'w-full h-full'
                            : undefined
                        }
                        className={
                          item.id === 'crop-top-blanca' || item.id === 'crop-top-negra'
                            ? 'w-full h-full object-cover scale-[1.35]'
                            : 'max-w-full max-h-full object-contain'
                        }
                      />
                    </div>

                    <div className="p-3">
                      <p className="font-display font-bold text-sm text-white m-0 leading-tight">
                        {item.name}
                      </p>
                      <p className="text-gold font-bold text-sm mt-1 m-0">{item.price}</p>

                      <div className="flex gap-1 mt-3">
                        {SIZES.map((sz) => (
                          <button
                            key={sz}
                            onClick={() => handleSize(item.id, sz)}
                            className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border transition-all duration-150 ${
                              sizeChosen === sz
                                ? 'bg-gold text-black border-gold'
                                : 'bg-transparent text-white/60 border-white/15 hover:border-white/40 hover:text-white'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>

                      {sizeChosen && (
                        <a
                          href={buildWhatsAppUrl(item.name, sizeChosen)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 mt-3 py-2.5 rounded-full font-display font-bold text-xs uppercase tracking-wider no-underline transition-transform duration-200 hover:scale-[1.02] active:scale-[0.96]"
                          style={{
                            background: '#25D366',
                            color: '#fff',
                            boxShadow: '0 0 16px rgba(37,211,102,0.3)',
                            animation: 'overlayFadeIn 0.25s ease-out',
                          }}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                          </svg>
                          Ordenar
                        </a>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Merch;
