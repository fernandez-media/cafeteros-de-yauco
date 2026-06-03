const Footer = () => {
  return (
    <footer
      className="w-full"
      style={{
        background: 'linear-gradient(to bottom, #111111, #0a0a0a)',
      }}
    >
      {/* Main Section */}
      <div className="py-12 flex flex-col items-center px-6">
        {/* Logo */}
        <img
          src="/assets/CafeterosLogo.png"
          alt="Cafeteros de Yauco"
          className="h-14 mb-4 object-contain"
        />

        {/* Description */}
        <p className="text-sm text-white/45 max-w-xs text-center leading-relaxed mb-8">
          Equipo de voleibol profesional compitiendo en la Liga de Voleibol
          Superior Masculina de Puerto Rico. Representando a la Ciudad del Cafe
          con orgullo.
        </p>

        {/* Social Icons */}
        <div className="flex items-center gap-4">
          {/* Facebook */}
          <a
            href="https://www.facebook.com/CafeterosVoli/?locale=es_LA"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full flex items-center justify-center border border-white/15 text-white/50 transition-all duration-300 hover:border-gold hover:text-gold hover:-translate-y-[3px]"
            aria-label="Facebook"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/cafeterosdeyaucovolley/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full flex items-center justify-center border border-white/15 text-white/50 transition-all duration-300 hover:border-gold hover:text-gold hover:-translate-y-[3px]"
            aria-label="Instagram"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>

          {/* YouTube */}
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 rounded-full flex items-center justify-center border border-white/15 text-white/50 transition-all duration-300 hover:border-gold hover:text-gold hover:-translate-y-[3px]"
            aria-label="YouTube"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" />
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
            </svg>
          </a>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/[0.06] py-5 pb-[100px] text-center">
        <p className="text-xs text-white/25 m-0">
          &copy; 2025 Cafeteros de Yauco. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
