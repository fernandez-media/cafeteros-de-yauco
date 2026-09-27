import ScrollReveal from '../components/ScrollReveal';
import ResponsiveImage from '../components/ResponsiveImage';
import BoleteriaCredencial from '../components/BoleteriaCredencial';
import BoleteriaDesktop from '../components/BoleteriaDesktop';
import CredencialPase from '../components/CredencialPase';
import CafeterosChant from '../components/CafeterosChant';
import type { HomeGame } from '../components/BoleteriaDesktop';

const CTA_HREF = "https://cafeterosdeyaucovollyball.printcotickets.com/events/178163";

const HOME_GAMES: HomeGame[] = [
  { date: "2026-10-23", opponent: "Lares", isOpener: true },
  { date: "2026-10-30", opponent: "Naranjito" },
  { date: "2026-11-06", opponent: "Carolina" },
  { date: "2026-11-08", opponent: "Corozal" },
  { date: "2026-11-19", opponent: "Adjuntas" },
  { date: "2026-11-25", opponent: "Lares" },
  { date: "2026-12-04", opponent: "Naranjito" },
];

const Boleteria = () => {
  return (
    <div className="-mt-14" style={{ minHeight: 'calc(100vh - var(--dock-height) - 20px)' }}>
      {/* ─── Mobile Hero (unchanged) ─── */}
      <div className="lg:hidden relative w-full h-[280px] overflow-hidden">
        <ResponsiveImage
          name="lacuna-fans"
          alt="Fanáticos en La Cuna del Voleibol"
          width={1440}
          height={1920}
          sizes="100vw"
          loading="eager"
          pictureClassName="absolute inset-0 w-full h-full"
          className="w-full h-full object-cover"
          style={{ objectPosition: 'center 35%' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.7) 80%, #000 100%)',
          }}
        />
        <div className="absolute bottom-0 left-0 w-full px-5 pb-8">
          <div className="max-w-[1200px] mx-auto text-center">
            <h1 className="font-display font-black text-5xl uppercase text-white leading-[0.95] m-0 tracking-tight">
              <span className="text-gold">Boletería</span>
            </h1>
            <p className="text-white/50 text-xs mt-2 m-0 uppercase tracking-widest">
              Asegura tu asiento en La Cuna del Voleibol
            </p>
          </div>
        </div>
      </div>

      {/* ─── Desktop Hero (editorial bento) ─── */}
      <div className="hidden lg:block relative w-full bg-black overflow-hidden">
        <div
          className="absolute -top-[200px] -left-[100px] w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(245,206,62,0.06) 0%, transparent 70%)' }}
        />

        <div className="relative max-w-[1360px] mx-auto px-12 pt-[230px] pb-16">
          <div className="flex items-start gap-16">
            <div className="w-[40%] shrink-0">
              <h1 className="font-['Bebas_Neue',_'Oswald',_Impact,_sans-serif] text-[72px] leading-[0.90] tracking-[0.5px] text-white m-0">
                Vive la experiencia en{' '}
                <span className="text-[#F5CE3E]">La Cuna</span>{' '}
                del Voleibol
              </h1>

              <p className="font-['Barlow',_system-ui,_sans-serif] text-[17px] leading-[1.6] text-white/40 mt-8 max-w-[360px] m-0">
                Asegura tu asiento para la temporada regular 2026 y ayuda a los Cafeteros a volver a hacer historia.
              </p>

              <div className="hidden lg:block">
                <CafeterosChant />
              </div>
            </div>

            <div className="flex-1 grid grid-cols-[1fr_1.15fr] grid-rows-[1.25fr_1fr] gap-3 h-[500px]">
              <div className="rounded-[16px] overflow-hidden relative group">
                <img
                  src="/media/boleteria/fan-celebrando.webp"
                  alt="Fan de Cafeteros celebrando en La Cuna"
                  width={1200}
                  height={800}
                  loading="eager"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 rounded-[16px]" style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)' }} />
              </div>

              <div className="rounded-[16px] overflow-hidden relative group">
                <ResponsiveImage
                  name="dsc04989"
                  alt="Bandera de La Cuna ondeando"
                  sizes="(min-width:1024px) 40vw, 100vw"
                  loading="eager"
                  pictureClassName="w-full h-full"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 rounded-[16px]" style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)' }} />
              </div>

              <div className="rounded-[16px] overflow-hidden relative group">
                <ResponsiveImage
                  name="dsc04710"
                  alt="Vista panorámica de La Cuna del Voleibol"
                  sizes="(min-width:1024px) 35vw, 100vw"
                  loading="eager"
                  pictureClassName="w-full h-full"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 rounded-[16px]" style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)' }} />
              </div>

              <div className="rounded-[16px] overflow-hidden relative group">
                <ResponsiveImage
                  name="lacuna-fans"
                  alt="Fanáticos en las gradas de La Cuna"
                  sizes="(min-width:1024px) 40vw, 100vw"
                  loading="eager"
                  pictureClassName="w-full h-full"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  style={{ objectPosition: 'center 60%' }}
                />
                <div className="absolute inset-0 rounded-[16px]" style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)' }} />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black to-transparent pointer-events-none" />
      </div>

      {/* ─── Mobile: Credencial de Temporada ─── */}
      <div className="lg:hidden px-5 pb-4 pt-4">
        <ScrollReveal>
          <BoleteriaCredencial ctaHref={CTA_HREF} />
        </ScrollReveal>
      </div>

      {/* ─── Desktop: Calendario + Credencial ─── */}
      <div className="hidden lg:block">
        <BoleteriaDesktop
          homeGames={HOME_GAMES}
          credential={<CredencialPase ctaHref={CTA_HREF} />}
        />
      </div>
    </div>
  );
};

export default Boleteria;
