import { useRef, useEffect, useCallback, useState } from 'react';

const sliderImages = [
  { src: `${import.meta.env.BASE_URL}assets/slider/abel.webp`, alt: 'Cafeteros en acción' },
  { src: `${import.meta.env.BASE_URL}assets/slider/arnel.webp`, alt: 'Cafeteros celebración' },
  { src: `${import.meta.env.BASE_URL}assets/slider/diego.webp`, alt: 'Cafeteros equipo' },
  { src: `${import.meta.env.BASE_URL}assets/slider/ivan.webp`, alt: 'Cafeteros dirigencia' },
  { src: `${import.meta.env.BASE_URL}assets/slider/jessie.webp`, alt: 'Cafeteros victoria' },
  { src: `${import.meta.env.BASE_URL}assets/slider/kevin.webp`, alt: 'Cafeteros jugada' },
];

const allImages = [...sliderImages, ...sliderImages, ...sliderImages];

const ImageSlider = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const ITEM_WIDTH = isDesktop ? 340 : 220;
  const ITEM_HEIGHT = isDesktop ? 240 : 160;
  const ITEM_GAP = isDesktop ? 16 : 12;
  const ITEM_TOTAL = ITEM_WIDTH + ITEM_GAP;
  const SET_WIDTH = sliderImages.length * ITEM_TOTAL;

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
  const isGrabbing = useRef(false);

  const autoScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container || isDragging.current) {
      animationRef.current = requestAnimationFrame(autoScroll);
      return;
    }

    container.scrollLeft += 1;

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

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [autoScroll, SET_WIDTH]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    isGrabbing.current = true;
    startX.current = e.pageX;
    scrollStart.current = containerRef.current?.scrollLeft ?? 0;
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing';
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    e.preventDefault();
    const dx = e.pageX - startX.current;
    containerRef.current.scrollLeft = scrollStart.current - dx;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    isGrabbing.current = false;
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isDragging.current = true;
    startX.current = e.touches[0].pageX;
    scrollStart.current = containerRef.current?.scrollLeft ?? 0;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const dx = e.touches[0].pageX - startX.current;
    containerRef.current.scrollLeft = scrollStart.current - dx;
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
  };

  return (
    <div
      ref={containerRef}
      className="slider-container scrollbar-hidden w-full overflow-x-auto cursor-grab select-none"
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
          className="flex-shrink-0 rounded-[10px] overflow-hidden"
          style={{
            width: `${ITEM_WIDTH}px`,
            height: `${ITEM_HEIGHT}px`,
          }}
        >
          <img
            src={img.src}
            alt={img.alt}
            loading={index < sliderImages.length ? 'eager' : 'lazy'}
            draggable={false}
            className="w-full h-full object-cover pointer-events-none"
          />
        </div>
      ))}
    </div>
  );
};

export default ImageSlider;
