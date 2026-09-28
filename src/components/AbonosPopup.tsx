import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import abonosArt from "@/assets/abonos-ya-disponibles.png";

const STORAGE_KEY = "cafeteros-abonos-popup-seen";

export default function AbonosPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch { /* private browsing */ }

    const timer = setTimeout(() => setVisible(true), 1200);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setVisible(false);
    try { sessionStorage.setItem(STORAGE_KEY, "1"); } catch { /* noop */ }
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center px-5"
      onClick={dismiss}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[6px]" />

      {/* Popup card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="abonos-popup-enter relative w-full max-w-[300px] overflow-hidden rounded-[16px] border border-white/15 text-center"
        style={{
          background: "linear-gradient(145deg, rgba(30,30,30,0.85) 0%, rgba(15,15,15,0.92) 100%)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          boxShadow: "0 0 60px rgba(245,206,62,0.15), 0 24px 48px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
        }}
      >
        {/* Close button */}
        <button
          onClick={dismiss}
          className="absolute right-[12px] top-[12px] z-10 flex h-[32px] w-[32px] items-center justify-center rounded-full border border-white/10 bg-black/40 text-white/60 backdrop-blur-sm transition-colors hover:bg-white/10 hover:text-white"
          aria-label="Cerrar"
        >
          <X size={16} strokeWidth={2.5} />
        </button>

        {/* Gold accent line */}
        <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-[#F5CE3E] to-transparent" />

        {/* Content */}
        <div className="px-[16px] pt-[22px] pb-[6px]">
          <p className="font-['Bebas_Neue',_'Oswald',_Impact,_sans-serif] text-[21px] leading-[1.05] tracking-[0.3px] text-white">
            Ya puedes conseguir tus abonos para toda la{" "}
            <span className="text-[#F5CE3E]">temporada regular</span>
          </p>
        </div>

        {/* Image */}
        <div className="px-[12px] pb-[12px]">
          <img
            src={abonosArt}
            alt="Abonos ya disponibles"
            width={1080}
            height={1246}
            className="block h-auto w-full rounded-[10px]"
          />
        </div>

        {/* CTA */}
        <div className="px-[12px] pb-[16px]">
          <Link
            to="/boleteria"
            onClick={dismiss}
            className="relative flex w-full items-center justify-center gap-[8px] overflow-hidden rounded-[10px] px-[14px] py-[12px] font-['Barlow_Condensed',_'Arial_Narrow',_sans-serif] text-[16px] font-bold uppercase tracking-[1px] text-[#111111] no-underline shadow-[0_8px_24px_-8px_rgba(212,175,55,0.5)] transition-transform duration-150 ease-out active:scale-[0.97]"
            style={{ background: "linear-gradient(170deg, #E8C84A 0%, #D4AF37 40%, #C5982A 70%, #D4AF37 100%)" }}
          >
            Ver boletos
          </Link>
        </div>
      </div>

      <style>{`
        @keyframes abonos-popup-in {
          from { opacity: 0; transform: scale(0.92) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .abonos-popup-enter {
          animation: abonos-popup-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        @media (prefers-reduced-motion: reduce) {
          .abonos-popup-enter { animation: none; }
        }
      `}</style>
    </div>
  );
}
