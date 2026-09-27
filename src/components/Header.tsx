import { useLocation, useNavigate } from 'react-router-dom';

interface HeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

const Header = ({ onMenuToggle, isMenuOpen }: HeaderProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  return (
    <>
      {/* Back arrow – top-left, yellow, visible on subpages only */}
      {!isHome && !isMenuOpen && (
        <button
          onClick={() => navigate(-1)}
          className="fixed top-3 left-3 z-[1001] flex h-9 w-9 items-center justify-center rounded-full border-none bg-transparent cursor-pointer p-0"
          aria-label="Volver"
          style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.6))' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F5CE3E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      {/* Hamburger menu – top-right */}
      <button
        onClick={onMenuToggle}
        className="fixed top-2 right-2 w-11 h-11 flex lg:hidden flex-col justify-center items-center bg-transparent border-none cursor-pointer z-[1001] p-0"
        aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
        aria-expanded={isMenuOpen}
      >
      <span
        className="block w-6 h-[2px] bg-white rounded-full transition-all duration-300 origin-center"
        style={{
          transform: isMenuOpen ? 'translateY(4px) rotate(45deg)' : 'none',
          filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.6))',
        }}
      />
      <span
        className="block w-6 h-[2px] bg-white rounded-full transition-all duration-300 mt-[6px]"
        style={{
          opacity: isMenuOpen ? 0 : 1,
          transform: isMenuOpen ? 'scaleX(0)' : 'scaleX(1)',
          filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.6))',
        }}
      />
      <span
        className="block w-6 h-[2px] bg-white rounded-full transition-all duration-300 origin-center mt-[6px]"
        style={{
          transform: isMenuOpen ? 'translateY(-10px) rotate(-45deg)' : 'none',
          filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.6))',
        }}
      />
    </button>
    </>
  );
};

export default Header;
