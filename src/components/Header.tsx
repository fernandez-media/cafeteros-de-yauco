import { useEffect, useRef } from 'react';

interface HeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

const Header = ({ onMenuToggle, isMenuOpen }: HeaderProps) => {
  const headerRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const header = headerRef.current;
      if (!header) return;

      if (currentScrollY > lastScrollY.current && currentScrollY > 60) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-[1000] h-14 flex items-center justify-between px-4 transition-transform duration-300"
      style={{
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      {/* Hamburger Button */}
      <button
        onClick={onMenuToggle}
        className="order-1 relative w-7 h-5 flex flex-col justify-between items-center bg-transparent border-none cursor-pointer z-[1001] p-0"
        aria-label="Toggle menu"
      >
        <span
          className="block w-full h-[2px] bg-white rounded-full transition-all duration-300 origin-center"
          style={{
            transform: isMenuOpen
              ? 'translateY(9px) rotate(45deg)'
              : 'none',
          }}
        />
        <span
          className="block w-full h-[2px] bg-white rounded-full transition-all duration-300"
          style={{
            opacity: isMenuOpen ? 0 : 1,
            transform: isMenuOpen ? 'scaleX(0)' : 'scaleX(1)',
          }}
        />
        <span
          className="block w-full h-[2px] bg-white rounded-full transition-all duration-300 origin-center"
          style={{
            transform: isMenuOpen
              ? 'translateY(-9px) rotate(-45deg)'
              : 'none',
          }}
        />
      </button>

      {/* Logo */}
      <img
        src="/assets/CafeterosLogo.png"
        alt="Cafeteros de Yauco"
        width="36"
        height="36"
        fetchPriority="high"
        decoding="async"
        className="order-2 ml-auto h-9 object-contain"
      />
    </header>
  );
};

export default Header;
