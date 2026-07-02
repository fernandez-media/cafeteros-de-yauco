import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import ResponsiveImage from './ResponsiveImage';

const navItems = [
  { label: 'Inicio', path: '/', end: true },
  { label: 'Calendario', path: '/calendario' },
  { label: 'Roster', path: '/roster' },
  { label: 'Boletos', path: '/boleteria' },
  { label: 'Merch', path: '/merch' },
];

const DesktopDock = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      aria-label="Navegación principal"
      className="hidden lg:flex fixed left-1/2 -translate-x-1/2 z-[900] items-center gap-2 rounded-full transition-all duration-300"
      style={{
        top: scrolled ? 14 : 24,
        padding: scrolled ? '6px 10px' : '8px 14px',
        background: scrolled ? 'rgba(10,10,10,0.85)' : 'rgba(17,17,17,0.55)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 215, 0, 0.18)',
        boxShadow: scrolled
          ? '0 10px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,215,0,0.05) inset'
          : '0 6px 30px rgba(0,0,0,0.35)',
      }}
    >
      <NavLink to="/" className="flex items-center gap-2 pl-2 pr-3 py-1 no-underline">
        <ResponsiveImage
          name="cafeteros-logo"
          alt="Cafeteros de Yauco"
          width={32}
          height={32}
          sizes="32px"
          pictureClassName="w-8 h-8 inline-flex"
          className="w-8 h-8 object-contain"
        />
        <span className="font-display font-bold text-[11px] uppercase tracking-[0.15em] text-white/90 leading-none whitespace-nowrap">
          Cafeteros
        </span>
      </NavLink>

      <span className="w-px h-6 bg-gold/25" aria-hidden="true" />

      <ul className="flex items-center gap-1 pr-1">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `relative inline-flex items-center px-4 py-2 rounded-full text-[12px] font-display font-semibold uppercase tracking-[0.14em] no-underline transition-all duration-200 ${
                  isActive
                    ? 'bg-gold/15 text-gold shadow-[inset_0_0_0_1px_rgba(255,215,0,0.35)]'
                    : 'text-white/65 hover:text-white hover:bg-white/[0.06] hover:-translate-y-[1px]'
                }`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default DesktopDock;
