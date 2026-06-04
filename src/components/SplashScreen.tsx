import { useState, useEffect } from 'react';
import ResponsiveImage from './ResponsiveImage';

const SplashScreen = () => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHidden(true);
    }, 2200);
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
      <ResponsiveImage
        name="cafeteros-logo"
        alt="Cafeteros de Yauco"
        width={180}
        height={180}
        sizes="180px"
        loading="eager"
        fetchPriority="high"
        pictureClassName="splash-logo w-[180px] mb-10 inline-flex"
        className="w-[180px] h-auto"
        style={{ animation: 'splashPulse 1.6s ease-in-out infinite' }}
      />

      <div className="loader">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="circle">
            <div className="dot" />
            <div className="outline" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SplashScreen;
