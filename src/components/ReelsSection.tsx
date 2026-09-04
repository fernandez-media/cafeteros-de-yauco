import { useRef, useEffect, useState } from 'react';

type SocialIcon = 'instagram' | 'facebook';

interface ReelItem {
  videoSrc: string;
  instagramUrl: string;
  icon: SocialIcon;
}

const reels: ReelItem[] = [
  {
    videoSrc: `${import.meta.env.BASE_URL}assets/reels/reel1.mp4`,
    instagramUrl: 'https://www.instagram.com/cafeterosdeyaucovolley/',
    icon: 'instagram',
  },
  {
    videoSrc: `${import.meta.env.BASE_URL}assets/reels/reel2.mp4`,
    instagramUrl: 'https://www.facebook.com/CafeterosVoli/',
    icon: 'facebook',
  },
  {
    videoSrc: `${import.meta.env.BASE_URL}assets/reels/reel3.mp4`,
    instagramUrl: 'https://www.facebook.com/CafeterosVoli/',
    icon: 'facebook',
  },
  {
    videoSrc: `${import.meta.env.BASE_URL}assets/reels/reel4.mp4`,
    instagramUrl: 'https://www.instagram.com/cafeterosdeyaucovolley/',
    icon: 'instagram',
  },
];

const IgIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="url(#ig-grad)">
    <defs>
      <linearGradient id="ig-grad" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#FFDC80" />
        <stop offset="25%" stopColor="#F77737" />
        <stop offset="50%" stopColor="#E1306C" />
        <stop offset="75%" stopColor="#C13584" />
        <stop offset="100%" stopColor="#833AB4" />
      </linearGradient>
    </defs>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const FbIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#1877F2">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

function ReelCard({ reel, index, activeIndex, onActivate }: { reel: ReelItem; index: number; activeIndex: number | null; onActivate: (i: number) => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const glowActive = activeIndex === index;

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isVisible) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isVisible]);

  const glowColor = reel.icon === 'instagram' ? 'rgba(225,48,108,0.6)' : 'rgba(24,119,242,0.6)';

  const handleClick = () => {
    if (!glowActive) {
      onActivate(index);
    } else {
      window.open(reel.instagramUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      ref={cardRef}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => { if (e.key === 'Enter') handleClick(); }}
      aria-label={`Ver reel en ${reel.icon === 'instagram' ? 'Instagram' : 'Facebook'}`}
      className="relative rounded-2xl overflow-hidden aspect-[9/16] group bg-[#1a1a1a] border border-gold/10 block cursor-pointer"
      style={{
        boxShadow: glowActive ? `0 0 20px ${glowColor}, 0 0 40px ${glowColor}` : 'none',
        transition: 'box-shadow 0.4s ease',
      }}
    >
      <video
        ref={videoRef}
        src={reel.videoSrc}
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute top-2.5 left-2.5 lg:top-4 lg:left-4 z-10 flex items-center justify-center w-7 h-7 lg:w-9 lg:h-9 rounded-full bg-black/50 backdrop-blur-sm">
        {reel.icon === 'instagram' ? <IgIcon /> : <FbIcon />}
      </div>

      {glowActive && (
        <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-center py-3 bg-gradient-to-t from-black/70 to-transparent">
          <span className="text-white text-xs font-display font-bold uppercase tracking-wider flex items-center gap-1.5">
            {reel.icon === 'instagram' ? 'Ver en Instagram' : 'Ver en Facebook'}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </span>
        </div>
      )}
    </div>
  );
}

const ReelsSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="py-10 lg:py-16">
      <div className="text-center mb-6 lg:mb-10 px-5">
        <h2
          className="font-display font-black text-2xl lg:text-5xl uppercase text-white m-0"
          style={{ letterSpacing: '0.04em' }}
        >
          REDES <span className="text-gold">SOCIALES</span>
        </h2>
      </div>

      <div className="grid grid-cols-2 gap-3 px-5 lg:grid-cols-4 lg:gap-6 lg:max-w-[1400px] lg:mx-auto lg:px-10">
        {reels.map((reel, i) => (
          <ReelCard key={i} reel={reel} index={i} activeIndex={activeIndex} onActivate={setActiveIndex} />
        ))}
      </div>

    </section>
  );
};

export default ReelsSection;
