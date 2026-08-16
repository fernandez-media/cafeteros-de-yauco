interface HeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

const Header = ({ onMenuToggle, isMenuOpen }: HeaderProps) => {
  return (
    <button
      onClick={onMenuToggle}
      className="fixed top-2 left-2 w-11 h-11 flex lg:hidden flex-col justify-center items-center bg-transparent border-none cursor-pointer z-[1001] p-0"
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
  );
};

export default Header;
