import { useRef, useEffect, useState } from 'react';

interface ReelItem {
  videoSrc: string;
  instagramUrl: string;
  label: string;
}

const reels: ReelItem[] = [
  {
    videoSrc: `${import.meta.env.BASE_URL}assets/reels/reel1.mp4`,
    instagramUrl: 'https://www.instagram.com/reel/DYxDw1mIQay/',
    label: 'Reel 1',
  },
  {
    videoSrc: `${import.meta.env.BASE_URL}assets/reels/reel2.mp4`,
    instagramUrl: 'https://www.instagram.com/reel/DT6TP1kkgQN/',
    label: 'Reel 2',
  },
  {
    videoSrc: `${import.meta.env.BASE_URL}assets/reels/reel3.mp4`,
    instagramUrl: '',
    label: 'Reel 3',
  },
  {
    videoSrc: `${import.meta.env.BASE_URL}assets/reels/reel4.mp4`,
    instagramUrl: '',
    label: 'Reel 4',
  },
];

const InstagramIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

function ReelCard({ reel }: { reel: ReelItem }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

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

  return (
    <div
      ref={cardRef}
      className="relative rounded-2xl overflow-hidden aspect-[9/16] group bg-[#1a1a1a] border border-gold/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setTimeout(() => setIsHovered(false), 2000)}
    >
      <video
        ref={videoRef}
        src={reel.videoSrc}
        muted
        loop
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div
        className="absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300"
        style={{ opacity: isHovered ? 1 : 0 }}
      >
        <a
          href={reel.instagramUrl || '#'}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 transition-transform duration-200 hover:scale-110"
          onClick={(e) => {
            if (!reel.instagramUrl) e.preventDefault();
          }}
        >
          <InstagramIcon />
        </a>
      </div>
    </div>
  );
}

const ReelsSection = () => {
  return (
    <section className="py-10 lg:py-16">
      <div className="text-center mb-6 lg:mb-10 px-5">
        <p
          className="text-gold/70 text-[11px] font-display font-bold uppercase tracking-[0.3em] m-0 mb-2"
        >
          // Nuestras Redes
        </p>
        <h2
          className="font-display font-black text-2xl lg:text-4xl uppercase text-white m-0 mb-2"
          style={{ letterSpacing: '0.04em' }}
        >
          CAFETEROSYAUCO
        </h2>
        <p className="text-white/40 text-sm lg:text-base m-0">
          Short form. Full impact.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 px-5 lg:grid-cols-4 lg:gap-5 lg:max-w-[1200px] lg:mx-auto">
        {reels.map((reel, i) => (
          <ReelCard key={i} reel={reel} />
        ))}
      </div>

      <div className="text-center mt-5 lg:mt-8">
        <a
          href="https://www.instagram.com/cafeterosyauco/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-gold text-sm font-display font-bold uppercase tracking-wider no-underline hover:text-white transition-colors duration-200"
        >
          Ver mas en Instagram
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default ReelsSection;
