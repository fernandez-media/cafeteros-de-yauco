import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import PageHero from '../components/PageHero';
import { videos } from '../data/videos';

const Partidos = () => {
  return (
    <div className="min-h-screen -mt-14">
      <PageHero title="Partidos" goldWord="Partidos" subtitle="Revive los juegos" />

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

      <div className="px-5 pb-10 flex flex-col gap-6">
        {videos.map((video, i) => {
          const embedUrl = video.startAt
            ? `https://www.youtube.com/embed/${video.id}?start=${video.startAt}`
            : `https://www.youtube.com/embed/${video.id}`;

          return (
            <ScrollReveal key={video.id} delay={i * 0.05}>
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  backgroundColor: '#1a1a1a',
                  border: '1px solid rgba(255, 215, 0, 0.08)',
                }}
              >
                <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                  <iframe
                    src={embedUrl}
                    title={video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full border-0"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-display font-bold text-sm text-white uppercase m-0">
                    {video.title}
                  </h3>
                  <p className="text-white/40 text-xs mt-1 m-0 flex items-center gap-1.5">
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    LVSM 2025-26
                  </p>
                </div>
              </div>
            </ScrollReveal>
          );
        })}
      </div>
    </div>
  );
};

export default Partidos;
