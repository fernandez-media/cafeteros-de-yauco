import { useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';

const SplashScreen = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHidden(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Cargando Cafeteros de Yauco"
      aria-hidden={hidden}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black transition-all duration-500"
      style={{
        opacity: hidden ? 0 : 1,
        visibility: hidden ? 'hidden' : 'visible',
      }}
    >
      {/* Futuristic ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(255,215,0,0.15) 0%, rgba(255,215,0,0.05) 30%, transparent 65%)',
        }}
      />
      {/* Scan grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,215,0,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,215,0,0.6) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse at center, black 30%, transparent 75%)',
        }}
      />

      {/* Trophy icon */}
      <div className="relative flex items-center justify-center mb-12">
        <Trophy
          size={120}
          strokeWidth={1.2}
          className="relative"
          style={{
            color: 'var(--gold)',
            animation: 'trophyFloat 2.4s ease-in-out infinite',
            filter:
              'drop-shadow(0 0 24px rgba(255,215,0,0.55)) drop-shadow(0 0 60px rgba(255,215,0,0.25))',
          }}
        />
      </div>

      {/* Futuristic loading bar */}
      <div className="relative z-10 flex flex-col items-center gap-3">
        <div
          className="relative overflow-hidden rounded-full"
          style={{
            width: 240,
            height: 4,
            background: 'rgba(255,215,0,0.12)',
            boxShadow:
              'inset 0 0 0 1px rgba(255,215,0,0.25), 0 0 18px rgba(255,215,0,0.15)',
          }}
        >
          <div
            className="absolute top-0 left-0 h-full rounded-full"
            style={{
              width: '40%',
              background:
                'linear-gradient(90deg, transparent, var(--gold), #fff7c2, var(--gold), transparent)',
              boxShadow: '0 0 16px var(--gold), 0 0 32px rgba(255,215,0,0.6)',
              animation: 'loadingSlide 1.4s cubic-bezier(0.65,0,0.35,1) infinite',
            }}
          />
        </div>
        <div
          className="text-[10px] tracking-[0.5em] uppercase"
          style={{
            color: 'var(--gold)',
            fontFamily: 'var(--font-display)',
            textShadow: '0 0 12px rgba(255,215,0,0.6)',
          }}
        >
          Loading
        </div>
      </div>

      <style>{`
        @keyframes trophyFloat {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-8px) scale(1.02); }
        }
        @keyframes trophyRingSpin {
          to { transform: rotate(360deg); }
        }
        @keyframes loadingSlide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(350%); }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
