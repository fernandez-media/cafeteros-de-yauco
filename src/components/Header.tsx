interface HeaderProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

const Header = ({ onMenuToggle, isMenuOpen }: HeaderProps) => {
  return (
    <button
      onClick={onMenuToggle}
      className="fixed top-4 left-4 w-7 h-5 flex lg:hidden flex-col justify-between items-center bg-transparent border-none cursor-pointer z-[1001] p-0"
      aria-label="Toggle menu"
    >
      <span
        className="block w-full h-[2px] bg-white rounded-full transition-all duration-300 origin-center"
        style={{
          transform: isMenuOpen ? 'translateY(9px) rotate(45deg)' : 'none',
          filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.6))',
        }}
      />
      <span
        className="block w-full h-[2px] bg-white rounded-full transition-all duration-300"
        style={{
          opacity: isMenuOpen ? 0 : 1,
          transform: isMenuOpen ? 'scaleX(0)' : 'scaleX(1)',
          filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.6))',
        }}
      />
      <span
        className="block w-full h-[2px] bg-white rounded-full transition-all duration-300 origin-center"
        style={{
          transform: isMenuOpen ? 'translateY(-9px) rotate(-45deg)' : 'none',
          filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.6))',
        }}
      />
    </button>
  );
};

export default Header;
