import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import PageHero from '../components/PageHero';
import PlayerAvatar from '../components/PlayerAvatar';
import { roster, staff } from '../data/roster';

const Roster = () => {
  return (
    <div className="min-h-screen -mt-14">
      <PageHero
        title="Roster"
        goldWord="Roster"
      />

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
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            backgroundColor: '#1a1a1a',
            border: '1px solid rgba(255, 215, 0, 0.08)',
          }}
        >
          {roster.map((player, i) => (
            <ScrollReveal key={i} delay={i * 0.03}>
              <div
                className="flex items-center gap-4 px-5 py-4"
                style={{
                  borderBottom:
                    i < roster.length - 1
                      ? '1px solid rgba(255, 255, 255, 0.06)'
                      : 'none',
                }}
              >
                <span className="w-8 text-center font-display font-bold text-lg text-gold/60">
                  {player.number}
                </span>
                <PlayerAvatar photo={player.photo} name={player.name} size={40} />
                <div className="flex-1 min-w-0">
                  <p className="font-display font-bold text-sm text-white uppercase m-0">
                    {player.name}
                  </p>
                  <p className="text-white/40 text-xs mt-0.5 m-0">
                    {player.position}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Cuerpo Técnico */}
      <div className="px-5 pb-10">
        <ScrollReveal>
          <h2 className="font-display font-bold text-xl text-white mb-4">
            Cuerpo Técnico
          </h2>
        </ScrollReveal>
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            backgroundColor: '#1a1a1a',
            border: '1px solid rgba(255, 215, 0, 0.08)',
          }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4">
            {staff.map((member, i) => (
              <ScrollReveal key={i} delay={i * 0.05}>
                <div
                  className="flex flex-col items-center text-center gap-3 px-4 py-6"
                  style={{
                    borderRight:
                      i < staff.length - 1
                        ? '1px solid rgba(255, 255, 255, 0.06)'
                        : 'none',
                    borderBottom:
                      i < staff.length - 2
                        ? '1px solid rgba(255, 255, 255, 0.06)'
                        : 'none',
                  }}
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="rgba(255,255,255,0.4)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <p className="font-display font-bold text-sm text-white uppercase leading-tight">
                    {member.name}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roster;
