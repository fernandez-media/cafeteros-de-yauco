import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import PageHero from '../components/PageHero';
import ResponsiveImage from '../components/ResponsiveImage';

const Nosotros = () => {
  return (
    <div className="min-h-screen -mt-14">
      <PageHero title="Sobre Nosotros" goldWord="Sobre" subtitle="Cafeteros de Yauco" />

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

      <div className="px-5 pb-10">
        {/* About Text Card */}
        <ScrollReveal>
          <div
            className="rounded-2xl p-5 mb-6"
            style={{
              backgroundColor: '#1a1a1a',
              border: '1px solid rgba(255, 215, 0, 0.08)',
            }}
          >
            <h3 className="font-display font-bold text-lg text-gold uppercase mb-3 m-0">
              Nuestra Historia
            </h3>
            <p className="text-white/70 text-sm leading-relaxed m-0 mb-4">
              Los Cafeteros de Yauco son un equipo de voleibol profesional que
              compite en la Liga de Voleibol Superior Masculina de Puerto Rico.
              Representando a la Ciudad del Cafe, el equipo encarna la pasion, la
              tradicion y el orgullo de todo un pueblo.
            </p>
            <p className="text-white/70 text-sm leading-relaxed m-0 mb-4">
              Fundados con la mision de llevar el voleibol de primer nivel a
              Yauco, los Cafeteros han construido una base de fanaticos leales
              que llenan el coliseo en cada juego. La energia de la aficion y el
              compromiso de los jugadores han convertido a este equipo en uno de
              los mas queridos de la liga.
            </p>
            <p className="text-white/70 text-sm leading-relaxed m-0">
              En enero de 2026, los Cafeteros hicieron historia al ganar su
              primer campeonato de la LVSM en 55 años, derrotando a los Caribes
              de San Sebastian en una emocionante serie final a cinco juegos. Un
              logro que quedo grabado en el corazon de todo Yauco y de Puerto
              Rico.
            </p>
          </div>
        </ScrollReveal>

        {/* Photo Gallery 2x2 */}
        <div className="grid grid-cols-2 gap-3">
          {(['dsc01912', 'dsc04629', 'dsc04710', 'dsc04989'] as const).map((name, i) => (
            <ScrollReveal key={name} delay={i * 0.05}>
              <div className="rounded-2xl overflow-hidden aspect-square">
                <ResponsiveImage
                  name={name}
                  alt={`Cafeteros de Yauco ${i + 1}`}
                  width={600}
                  height={600}
                  sizes="(max-width: 640px) 45vw, 320px"
                  pictureClassName="block w-full h-full"
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Nosotros;
