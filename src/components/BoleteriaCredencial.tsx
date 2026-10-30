import { Ticket } from "lucide-react";

type Tier = {
  name: string;
  detail: string;
  price: string;
  vip?: boolean;
};

const TIERS: Tier[] = [
  { name: "Entrada general", detail: "Acceso al coliseo", price: "$9" },
  { name: "VIP", detail: "Asiento adentro de la cancha", price: "$20", vip: true },
];

interface BoleteriaCredencialProps {
  ctaHref?: string;
  onCtaClick?: () => void;
}

function CredencialCard({ ctaButton }: { ctaButton: React.ReactNode }) {
  return (
    <div
      className="credencial-swing"
      style={{ transformOrigin: "top center" }}
    >
      <div className="relative z-[1] mx-auto w-[94%] max-w-[420px] rounded-[16px] overflow-hidden bg-[#111111] shadow-[0_18px_40px_-10px_rgba(0,0,0,0.9)]">
        <div className="relative w-full h-[180px] overflow-hidden">
          <img
            src="/media/boleteria/fan-celebrando.webp"
            alt="Fan de Cafeteros celebrando en La Cuna del Voleibol"
            width={1200}
            height={800}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, #111111 0%, rgba(17,17,17,0.4) 50%, transparent 100%)' }}
          />
          <div className="absolute bottom-0 left-0 w-full px-[14px] pb-[10px]">
            <span className="font-['Bebas_Neue',_'Oswald',_Impact,_sans-serif] text-[22px] leading-none text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Boletos Temporada 2026
            </span>
          </div>
        </div>

        <div className="px-[14px] pb-[14px] pt-[8px]">
          <ul className="mb-[14px] list-none p-0 border-y border-white/10 text-left">
            {TIERS.map((tier) => (
              <li
                key={tier.name}
                className="flex items-center justify-between gap-[12px] border-b border-white/10 px-[6px] py-[12px] last:border-b-0"
              >
                <span className="font-['Barlow_Condensed',_'Arial_Narrow',_sans-serif] text-[18px] font-semibold leading-tight text-white">
                  {tier.name}
                  <span className="block font-['Barlow',_system-ui,_sans-serif] text-[13px] font-normal text-white/50">
                    {tier.detail}
                  </span>
                </span>
                <span
                  className={
                    "shrink-0 font-['Bebas_Neue',_'Oswald',_Impact,_sans-serif] text-[34px] leading-none " +
                    (tier.vip
                      ? "rounded-[6px] bg-[#F5CE3E] px-[8px] pt-[2px] text-[#111111]"
                      : "text-white")
                  }
                >
                  {tier.price}
                </span>
              </li>
            ))}
          </ul>

          <div>
            {ctaButton}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes credencial-pendulum {
          0%   { transform: rotate(-3deg) translateX(-2px); }
          25%  { transform: rotate(0deg)  translateX(0px); }
          50%  { transform: rotate(2.5deg) translateX(2px); }
          75%  { transform: rotate(0deg)  translateX(0px); }
          100% { transform: rotate(-3deg) translateX(-2px); }
        }
        .credencial-swing {
          animation: credencial-pendulum 4s cubic-bezier(0.45, 0, 0.55, 1) infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .credencial-swing { animation: none; }
        }
      `}</style>
    </div>
  );
}

export default function BoleteriaCredencial({
  ctaHref = "#",
  onCtaClick,
}: BoleteriaCredencialProps) {
  const external = ctaHref.startsWith("http");

  const ctaButton = (
    <a
      href={ctaHref}
      onClick={onCtaClick}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="relative flex w-full items-center justify-center gap-[10px] overflow-hidden rounded-[14px] px-[20px] py-[16px] font-['Barlow_Condensed',_'Arial_Narrow',_sans-serif] text-[20px] font-bold uppercase tracking-[1px] text-[#111111] no-underline shadow-[0_8px_24px_-8px_rgba(212,175,55,0.55)] transition-[transform,box-shadow] duration-150 ease-out before:absolute before:inset-0 before:-translate-x-[120%] before:bg-[linear-gradient(110deg,transparent_35%,rgba(255,255,255,0.55)_50%,transparent_65%)] before:transition-transform before:duration-700 before:content-[''] hover:-translate-y-[1px] hover:shadow-[0_12px_28px_-8px_rgba(212,175,55,0.7)] hover:before:translate-x-[120%] active:translate-y-[1px] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-white motion-reduce:transition-none motion-reduce:before:hidden"
      style={{ background: "linear-gradient(170deg, #E8C84A 0%, #D4AF37 40%, #C5982A 70%, #D4AF37 100%)" }}
    >
      <Ticket aria-hidden="true" className="relative h-[22px] w-[22px]" strokeWidth={2.2} />
      <span className="relative">Comprar boletos</span>
    </a>
  );

  return (
    <section aria-labelledby="boleteria-title">
      {/* Mobile: single column */}
      <div className="lg:hidden mx-auto w-full max-w-[560px] rounded-[24px] border border-[#2A2A2A] bg-[#121212] px-[16px] pb-[22px] pt-[24px] text-center">
        <div className="mb-[18px] text-left md:mb-[24px]">
          <h2
            id="boleteria-title"
            className="font-['Bebas_Neue',_'Oswald',_Impact,_sans-serif] text-[38px] font-normal leading-[0.95] tracking-[0.3px] text-white md:text-[48px]"
          >
            ¡No te pierdas ni un solo juego de los{" "}
            <span className="text-[#F5CE3E]">Cafeteros</span>!
          </h2>
        </div>

        <CredencialCard ctaButton={ctaButton} />
      </div>

      {/* Desktop: two columns */}
      <div className="hidden lg:flex items-center gap-[48px] mx-auto max-w-[1100px] rounded-[28px] border border-[#2A2A2A] bg-[#121212] px-[48px] py-[48px]">
        <div className="flex-1 text-left min-w-0">
          <div className="mb-[28px]">
            <h2
              className="font-['Bebas_Neue',_'Oswald',_Impact,_sans-serif] text-[52px] font-normal leading-[0.95] tracking-[0.3px] text-white"
              aria-hidden="true"
            >
              ¡No te pierdas ni un solo juego de los{" "}
              <span className="text-[#F5CE3E]">Cafeteros</span>!
            </h2>
          </div>
        </div>

        <div className="w-[380px] shrink-0">
          <CredencialCard ctaButton={ctaButton} />
        </div>
      </div>
    </section>
  );
}
