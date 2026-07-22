import ResponsiveImage from './ResponsiveImage';

const Footer = () => {
  return (
    <footer
      className="w-full"
      style={{
        background: 'linear-gradient(to bottom, #111111, #0a0a0a)',
      }}
    >
      {/* Main Section */}
      <div className="pt-5 pb-4 sm:pt-6 sm:pb-5 flex flex-col items-center px-4 sm:px-6 lg:max-w-[1200px] lg:mx-auto">
        {/* Logo */}
        <ResponsiveImage
          name="cafeteros-logo"
          alt="Cafeteros de Yauco"
          width={48}
          height={48}
          sizes="48px"
          pictureClassName="h-12 w-12 mb-2 sm:mb-3 inline-flex"
          className="h-12 w-12 object-contain"
        />

        {/* Social Icons */}
        <div className="flex items-center gap-4 sm:gap-5">
          <a
            href="https://www.facebook.com/CafeterosVoli/?locale=es_LA"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full flex items-center justify-center border border-white/15 text-white/50 transition-all duration-300 hover:border-gold hover:text-gold hover:-translate-y-[3px]"
            aria-label="Facebook"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>

          <a
            href="https://www.instagram.com/cafeterosdeyaucovolley/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-11 h-11 rounded-full flex items-center justify-center border border-white/15 text-white/50 transition-all duration-300 hover:border-gold hover:text-gold hover:-translate-y-[3px]"
            aria-label="Instagram"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>

          <span
            className="w-11 h-11 rounded-full flex items-center justify-center border border-white/10 text-white/20"
            aria-hidden="true"
            title="YouTube (próximamente)"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" />
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
            </svg>
          </span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.06] mt-2 sm:mt-3 pt-2 sm:pt-3 pb-[100px] lg:pb-6 text-center">
        <p className="text-xs text-white/25 m-0">
          &copy; 2025 Cafeteros de Yauco. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
