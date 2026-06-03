import { useRef, useEffect, useCallback } from 'react';

const images = [
  '/assets/DSC01912.png',
  '/assets/DSC04629.png',
  '/assets/DSC04710.png',
  '/assets/DSC04989.png',
  '/assets/HeroSection.JPG',
];

// Triple the images for seamless infinite loop
const allImages = [...images, ...images, ...images];

const ITEM_WIDTH = 220;
const ITEM_GAP = 12;
const ITEM_TOTAL = ITEM_WIDTH + ITEM_GAP;
const SET_WIDTH = images.length * ITEM_TOTAL;

const ImageSlider = () => {
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

    // Loop logic: jump back when we've scrolled past 2 sets
    if (container.scrollLeft >= SET_WIDTH * 2) {
      container.scrollLeft -= SET_WIDTH;
    }
    // Jump forward if we scroll before the first set boundary
    if (container.scrollLeft <= 0) {
      container.scrollLeft += SET_WIDTH;
    }

    animationRef.current = requestAnimationFrame(autoScroll);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Start at the second set so we can scroll in both directions
    container.scrollLeft = SET_WIDTH;

    animationRef.current = requestAnimationFrame(autoScroll);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [autoScroll]);

  // Mouse drag handlers
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

  // Touch drag handlers
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
      className="slider-container w-full overflow-x-auto cursor-grab select-none"
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
      {allImages.map((src, index) => (
        <div
          key={index}
          className="flex-shrink-0 rounded-[10px] overflow-hidden"
          style={{
            width: `${ITEM_WIDTH}px`,
            height: '160px',
          }}
        >
          <img
            src={src}
            alt={`Cafeteros gallery ${(index % images.length) + 1}`}
            className="w-full h-full object-cover pointer-events-none"
            draggable={false}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageSlider;
