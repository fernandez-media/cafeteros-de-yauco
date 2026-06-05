import { Link, useLocation } from 'react-router-dom';

interface DockItem {
  label: string;
  path: string;
  icon: (active: boolean) => JSX.Element;
}

const dockItems: DockItem[] = [
  {
    label: 'Inicio',
    path: '/',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#FFD700' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    label: 'Calendario',
    path: '/calendario',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#FFD700' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
  },
  {
    label: 'Roster',
    path: '/roster',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#FFD700' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    label: 'Boletos',
    path: '/boleteria',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#FFD700' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
        <path d="M13 5v2" />
        <path d="M13 17v2" />
        <path d="M13 11v2" />
      </svg>
    ),
  },
  {
    label: 'Merch',
    path: '/merch',
    icon: (active) => (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#FFD700' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
];

const DockBar = () => {
  const location = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[800] px-3 pb-2" style={{ paddingBottom: 'max(8px, env(safe-area-inset-bottom))' }}>
      <div
        className="flex justify-around items-center py-2 px-1 rounded-[22px]"
        style={{
          background: 'rgba(26, 26, 26, 0.92)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(255, 215, 0, 0.10)',
          boxShadow: '0 -4px 30px rgba(0, 0, 0, 0.4)',
        }}
      >
        {dockItems.map((item) => {
          const isActive =
            item.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.path);

          return (
            <Link
              key={item.path}
              to={item.path}
              aria-label={item.label}
              aria-current={isActive ? 'page' : undefined}
              className="flex flex-col items-center gap-[3px] px-2.5 py-1.5 rounded-[14px] no-underline transition-colors duration-200 min-w-11 min-h-11 justify-center"
              style={{
                backgroundColor: isActive ? 'rgba(255, 215, 0, 0.10)' : 'transparent',
              }}
            >
              <span className="text-white/50" aria-hidden="true">
                {item.icon(isActive)}
              </span>
              <span
                className="font-display text-[9px] font-semibold uppercase tracking-wider"
                style={{
                  color: isActive ? '#FFD700' : 'rgba(255, 255, 255, 0.35)',
                }}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default DockBar;
