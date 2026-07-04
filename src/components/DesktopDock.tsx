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
        top: scrolled ? 18 : 28,
        padding: scrolled ? '10px 16px' : '12px 20px',
        background: scrolled ? 'rgba(10,10,10,0.9)' : 'rgba(17,17,17,0.6)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 215, 0, 0.25)',
        boxShadow: scrolled
          ? '0 14px 50px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,215,0,0.06) inset'
          : '0 8px 34px rgba(0,0,0,0.4)',
      }}
    >
      <NavLink to="/" className="flex items-center pl-2 pr-2 py-1 no-underline">
        <ResponsiveImage
          name="cafeteros-logo"
          alt="Cafeteros de Yauco"
          width={40}
          height={40}
          sizes="40px"
          pictureClassName="w-10 h-10 inline-flex"
          className="w-10 h-10 object-contain"
        />
      </NavLink>

      <span className="w-px h-7 bg-gold/25" aria-hidden="true" />


      <ul className="flex items-center gap-1 pr-1">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                `relative inline-flex items-center px-5 py-2.5 rounded-full text-[14px] font-display font-semibold uppercase tracking-[0.16em] no-underline transition-all duration-200 ${
                  isActive
                    ? 'bg-gold/15 text-gold shadow-[inset_0_0_0_1px_rgba(255,215,0,0.35)]'
                    : 'text-white/70 hover:text-white hover:bg-white/[0.06] hover:-translate-y-[1px]'
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
