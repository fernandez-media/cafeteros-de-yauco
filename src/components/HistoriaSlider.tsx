import { useRef, useEffect, useCallback, useState } from 'react';

const historiaImages = [
  { src: `${import.meta.env.BASE_URL}media/historia/historia1.webp`, alt: 'Historia de los Cafeteros - uniforme' },
  { src: `${import.meta.env.BASE_URL}media/historia/historia2.webp`, alt: 'Historia de los Cafeteros - equipo' },
  { src: `${import.meta.env.BASE_URL}media/historia/historia3.webp`, alt: 'Historia de los Cafeteros - jersey' },
  { src: `${import.meta.env.BASE_URL}media/historia/historia4.webp`, alt: 'Historia de los Cafeteros - documento histórico' },
  { src: `${import.meta.env.BASE_URL}media/historia/historia5.webp`, alt: 'Historia de los Cafeteros - foto histórica' },
  { src: `${import.meta.env.BASE_URL}media/historia/historia6.webp`, alt: 'Historia de los Cafeteros - foto clásica' },
];

const allImages = [...historiaImages, ...historiaImages, ...historiaImages];

const HistoriaSlider = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const ITEM_WIDTH = isDesktop ? 420 : 260;
  const ITEM_HEIGHT = isDesktop ? 300 : 180;
  const ITEM_GAP = isDesktop ? 16 : 10;
  const ITEM_TOTAL = ITEM_WIDTH + ITEM_GAP;
  const SET_WIDTH = historiaImages.length * ITEM_TOTAL;

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollStart = useRef(0);
  const isVisible = useRef(true);

  const autoScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container || isDragging.current || !isVisible.current) {
      animationRef.current = requestAnimationFrame(autoScroll);
      return;
    }

    container.scrollLeft += 0.7;

    if (container.scrollLeft >= SET_WIDTH * 2) {
      container.scrollLeft -= SET_WIDTH;
    }
    if (container.scrollLeft <= 0) {
      container.scrollLeft += SET_WIDTH;
    }

    animationRef.current = requestAnimationFrame(autoScroll);
  }, [SET_WIDTH]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.scrollLeft = SET_WIDTH;
    animationRef.current = requestAnimationFrame(autoScroll);

    const observer = new IntersectionObserver(
      ([entry]) => { isVisible.current = entry.isIntersecting; },
      { threshold: 0.1 }
    );
    observer.observe(container);

    return () => {
      cancelAnimationFrame(animationRef.current);
      observer.disconnect();
    };
  }, [autoScroll, SET_WIDTH]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX;
    scrollStart.current = containerRef.current?.scrollLeft ?? 0;
    if (containerRef.current) containerRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    e.preventDefault();
    containerRef.current.scrollLeft = scrollStart.current - (e.pageX - startX.current);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    if (containerRef.current) containerRef.current.style.cursor = 'grab';
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    startX.current = e.touches[0].pageX;
    scrollStart.current = containerRef.current?.scrollLeft ?? 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    containerRef.current.scrollLeft = scrollStart.current - (e.touches[0].pageX - startX.current);
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  return (
    <section className="py-10 lg:py-16">
      <div className="text-center mb-6 lg:mb-10 px-5">
        <h2 className="font-display font-black text-2xl lg:text-5xl uppercase text-white m-0" style={{ letterSpacing: '0.04em' }}>
          NUESTRA <span className="text-gold">HISTORIA</span>
        </h2>
      </div>
      <div
        ref={containerRef}
        role="region"
        aria-label="Galería histórica de los Cafeteros"
        className="scrollbar-hidden w-full overflow-x-auto cursor-grab select-none"
        style={{
          display: 'flex',
          gap: `${ITEM_GAP}px`,
          paddingLeft: '16px',
          paddingRight: '16px',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {allImages.map((img, index) => (
          <div
            key={index}
            className="flex-shrink-0 rounded-xl overflow-hidden border border-gold/10"
            style={{
              width: `${ITEM_WIDTH}px`,
              height: `${ITEM_HEIGHT}px`,
            }}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading={index < historiaImages.length ? 'eager' : 'lazy'}
              draggable={false}
              className="w-full h-full object-cover pointer-events-none"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default HistoriaSlider;
