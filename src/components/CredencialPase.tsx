import { Ticket } from "lucide-react";
import abonosArt from "@/assets/abonos-ya-disponibles.png";

type Tier = {
  name: string;
  detail: string;
  price: string;
  vip?: boolean;
};

const TIERS: Tier[] = [
  { name: "Temporada regular", detail: "Todos los juegos en Yauco", price: "$75" },
  { name: "VIP en cancha", detail: "Asiento adentro de la cancha", price: "$150", vip: true },
];

interface CredencialPaseProps {
  ctaHref?: string;
  onCtaClick?: () => void;
}

export default function CredencialPase({
  ctaHref = "#",
  onCtaClick,
}: CredencialPaseProps) {
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
    <div className="relative z-[1] mx-auto w-full max-w-[420px] rounded-[16px] bg-[#F4F1E8] px-[12px] pb-[14px] pt-[14px] text-[#111111] shadow-[0_18px_40px_-10px_rgba(0,0,0,0.9)]">
      <div className="mx-[4px] mb-[8px]">
        <span className="font-['Bebas_Neue',_'Oswald',_Impact,_sans-serif] text-[24px] leading-none">
          Abonos de temporada regular 2026
        </span>
      </div>

      <ul className="mb-[12px] list-none p-0 border-y-2 border-[#111111] text-left">
        {TIERS.map((tier) => (
          <li
            key={tier.name}
            className="flex items-center justify-between gap-[12px] border-b border-[#D8D2C2] px-[4px] py-[9px] last:border-b-0"
          >
            <span className="font-['Barlow_Condensed',_'Arial_Narrow',_sans-serif] text-[17px] font-semibold leading-tight">
              {tier.name}
              <span className="block font-['Barlow',_system-ui,_sans-serif] text-[12.5px] font-normal text-[#666666]">
                {tier.detail}
              </span>
            </span>
            <span
              className={
                "shrink-0 font-['Bebas_Neue',_'Oswald',_Impact,_sans-serif] text-[34px] leading-none " +
                (tier.vip
                  ? "rounded-[6px] bg-[#111111] px-[8px] pt-[2px] text-[#F5CE3E]"
                  : "")
              }
            >
              {tier.price}
            </span>
          </li>
        ))}
      </ul>

      <div className="mb-[12px]">
        {ctaButton}
      </div>

      <img
        src={abonosArt}
        alt="Abonos ya disponibles: los Cafeteros celebran en la cancha de La Cuna"
        width={1080}
        height={1246}
        loading="lazy"
        className="block h-auto w-full rounded-[10px]"
      />
    </div>
  );
}
