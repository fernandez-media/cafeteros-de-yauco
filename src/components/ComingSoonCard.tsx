import { useState, useRef, useEffect, ReactNode, CSSProperties } from 'react';

interface Props {
  comingSoon?: boolean;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}

const ComingSoonCard = ({ comingSoon, className, style, children }: Props) => {
  const [active, setActive] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => () => { if (timer.current) window.clearTimeout(timer.current); }, []);

  const handleClick = () => {
    if (!comingSoon) return;
    setActive((prev) => {
      const next = !prev;
      if (timer.current) window.clearTimeout(timer.current);
      if (next) timer.current = window.setTimeout(() => setActive(false), 2500);
      return next;
    });
  };

  return (
    <div
      className={`relative overflow-hidden ${comingSoon ? 'cursor-pointer' : ''} ${className || ''}`.trim()}
      style={style}
      onClick={handleClick}
    >
      {comingSoon && (
        <span className="absolute top-2 md:top-3 right-2 md:right-3 z-10 bg-black/75 backdrop-blur-md text-[#F5C518] text-[9px] md:text-[10px] font-bold tracking-wider px-2 md:px-2.5 py-1 md:py-1.5 rounded-full border border-[#F5C518]/40 uppercase">
          Próximamente
        </span>
      )}

      {children}

      {active && (
        <div
          className="absolute inset-0 z-20 flex flex-col items-center justify-center p-4 md:p-6 text-center cursor-pointer"
          style={{
            background: 'rgba(0,0,0,0.88)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            borderRadius: 'inherit',
            animation: 'overlayFadeIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
          onClick={(e) => {
            e.stopPropagation();
            if (timer.current) window.clearTimeout(timer.current);
            setActive(false);
          }}
        >
          <svg
            width={44}
            height={44}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F5C518"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="md:!w-14 md:!h-14"
            style={{ animation: 'iconPulse 1.8s ease-in-out infinite' }}
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <h3 className="mt-3 md:mt-4 font-display font-black text-base md:text-lg uppercase tracking-wider text-[#F5C518] m-0">
            Próximamente
          </h3>
          <p className="mt-1.5 text-white/70 text-[11px] md:text-xs leading-snug max-w-[160px] md:max-w-[200px] m-0">
            Este producto estará disponible muy pronto. ¡Mantente atento!
          </p>
          <span className="mt-3 text-white/40 text-[9px] md:text-[10px] uppercase tracking-wider">
            Toca para cerrar
          </span>
        </div>
      )}
    </div>
  );
};

export default ComingSoonCard;
