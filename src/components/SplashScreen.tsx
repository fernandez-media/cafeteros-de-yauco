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
        className="splash-logo w-[180px] mb-10"
        style={{
          animation: 'splashPulse 1.6s ease-in-out infinite',
        }}
      />

      <div className="splash-loader flex items-center justify-center gap-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="relative flex items-center justify-center">
            <div
              className="circle"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <div
                className="dot absolute inset-0 rounded-full"
                style={{
                  backgroundColor: '#FFD700',
                  animation: 'dot-keys 0.8s ease-in-out infinite alternate',
                  animationDelay: `${i * 0.2}s`,
                }}
              />
              <div
                className="outline absolute inset-0 rounded-full"
                style={{
                  animation: 'outline-keys 0.8s ease-in-out infinite alternate',
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SplashScreen;
