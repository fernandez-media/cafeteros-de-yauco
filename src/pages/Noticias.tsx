import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import PageHero from '../components/PageHero';
import { news } from '../data/news';

const Noticias = () => {
  return (
    <div className="min-h-screen -mt-14">
      <PageHero title="Noticias" goldWord="Noticias" subtitle="Prensa y articulos" />

      <div className="px-5 pt-4 pb-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-white/50 text-sm no-underline hover:text-gold transition-colors duration-200"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
          Inicio
        </Link>
      </div>

      <div className="px-5 pb-10 flex flex-col gap-4">
        {news.map((article, i) => (
          <ScrollReveal key={i} delay={i * 0.05}>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl overflow-hidden no-underline"
              style={{
                backgroundColor: '#1a1a1a',
                border: '1px solid rgba(255, 215, 0, 0.08)',
              }}
            >
              <div className="relative w-full h-[200px]">
                <img
                  src={article.image}
                  alt={article.title}
                  width="800"
                  height="400"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      'linear-gradient(to top, rgba(26,26,26,1) 0%, transparent 60%)',
                  }}
                />
              </div>
              <div className="px-4 pb-4 -mt-8 relative z-10">
                <span className="text-gold text-[10px] font-bold uppercase tracking-wider">
                  {article.source}
                </span>
                <h3 className="font-display font-bold text-base text-white mt-1 m-0 leading-tight">
                  {article.title}
                </h3>
                <p className="text-white/50 text-sm mt-2 m-0 leading-relaxed">
                  {article.excerpt}
                </p>
                <div className="flex items-center gap-2 mt-3">
                  <span className="text-white/30 text-xs">{article.date}</span>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </div>
              </div>
            </a>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
};

export default Noticias;
