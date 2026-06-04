import { useState, useEffect } from 'react';

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
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-black transition-all duration-500"
      style={{
        opacity: hidden ? 0 : 1,
        visibility: hidden ? 'hidden' : 'visible',
      }}
    >
      <img
        src="/assets/CafeterosLogo.png"
        alt="Cafeteros de Yauco"
        width="180"
        height="180"
        fetchPriority="high"
        decoding="async"
        className="splash-logo w-[180px] mb-10"
        style={{
          animation: 'splashPulse 1.6s ease-in-out infinite',
        }}
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
