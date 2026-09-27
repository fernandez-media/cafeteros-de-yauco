import { useEffect, useRef, useState } from "react";
import { Hand } from "lucide-react";

/* ── HERO BOLETOS · GRITO "¡CA-FE-TE-ROS!" ── */

const SYLLABLES = ["CA", "FE", "TE", "ROS"];
const LINES = ["¡Eso! Otra vez.", "¡Más duro!", "¡Así suena La Cuna!"];
const INITIAL_MSG = "Toca cuatro veces para completar el grito.";
const TOTAL_ROUNDS = 3;

export default function CafeterosChant() {
  const [lit, setLit] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [msg, setMsg] = useState(INITIAL_MSG);

  const stepRef = useRef(0);
  const roundsRef = useRef(0);
  const idleRef = useRef<number>();
  const resetRef = useRef<number>();
  const sylRefs = useRef<(HTMLSpanElement | null)[]>([]);

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduceMotion) return;
    const timers = SYLLABLES.map((_, k) =>
      window.setTimeout(() => setLit(k + 1), 500 + k * 280)
    );
    timers.push(window.setTimeout(() => setLit(0), 2200));
    return () => {
      timers.forEach(clearTimeout);
      window.clearTimeout(idleRef.current);
      window.clearTimeout(resetRef.current);
    };
  }, [reduceMotion]);

  const handleTap = () => {
    window.clearTimeout(idleRef.current);
    const next = stepRef.current + 1;
    setLit(next);

    if (next === SYLLABLES.length) {
      stepRef.current = 0;

      if (!reduceMotion) {
        sylRefs.current.forEach((el, k) => {
          const rot = k % 2 === 0 ? -1.5 : 1.5;
          el?.animate(
            [
              { transform: `translateY(-4px) rotate(${rot}deg) scale(1)` },
              { transform: `translateY(-4px) rotate(${rot}deg) scale(1.12)` },
              { transform: `translateY(-4px) rotate(${rot}deg) scale(1)` },
            ],
            { duration: 500, easing: "ease" }
          );
        });
      }

      const r = Math.min(roundsRef.current + 1, TOTAL_ROUNDS);
      roundsRef.current = r;
      setRounds(r);
      setMsg(LINES[r - 1]);

      if (r === TOTAL_ROUNDS) {
        window.clearTimeout(resetRef.current);
        resetRef.current = window.setTimeout(() => {
          roundsRef.current = 0;
          setRounds(0);
        }, 4000);
      }
    } else {
      stepRef.current = next;
    }

    idleRef.current = window.setTimeout(() => {
      stepRef.current = 0;
      setLit(0);
    }, 2500);
  };

  const isHot = rounds === TOTAL_ROUNDS && msg === LINES[TOTAL_ROUNDS - 1];

  return (
    <div className="mt-[44px] max-w-[560px]">
      <span className="font-['Barlow_Condensed',_'Arial_Narrow',_sans-serif] text-[13.5px] font-bold uppercase tracking-[2.5px] text-[#8F8F8F]">
        Dale el grito
      </span>

      <div aria-hidden="true" className="mt-[18px] flex gap-[10px]">
        {SYLLABLES.map((s, k) => {
          const on = k < lit;
          return (
            <span
              key={s}
              ref={(el) => (sylRefs.current[k] = el)}
              className={
                "flex-1 rounded-[14px] border pb-[12px] pt-[16px] text-center font-['Bebas_Neue',_'Oswald',_Impact,_sans-serif] text-[62px] leading-none transition-[color,background-color,transform,border-color] duration-150 motion-reduce:transition-none " +
                (on
                  ? "-translate-y-[4px] border-[#F5CE3E] bg-[#F5CE3E] text-[#111111] " +
                    (k % 2 === 0 ? "-rotate-[1.5deg]" : "rotate-[1.5deg]")
                  : "border-[#262626] bg-[#0C0C0C] text-[#3A3A3A]")
              }
            >
              {s}
            </span>
          );
        })}
      </div>

      <button
        type="button"
        onClick={handleTap}
        aria-label="Toca para gritar Cafeteros"
        className="mt-[18px] flex w-full items-center justify-center gap-[12px] rounded-[14px] border border-[#2E2E2E] bg-[#141414] p-[18px] font-['Barlow_Condensed',_'Arial_Narrow',_sans-serif] text-[19px] font-bold uppercase tracking-[1.5px] text-white transition-[background-color,transform] duration-100 hover:bg-[#1A1A1A] active:scale-[0.98] active:bg-[#1D1D1D] focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-white motion-reduce:transition-none"
      >
        <Hand aria-hidden="true" className="h-[24px] w-[24px] text-[#F5CE3E]" strokeWidth={2} />
        Toca para gritar
      </button>

      <div aria-hidden="true" className="mt-[6px] flex gap-[6px]">
        {Array.from({ length: TOTAL_ROUNDS }).map((_, k) => (
          <i
            key={k}
            className={
              "block h-[4px] w-[28px] rounded-[2px] transition-colors duration-200 " +
              (k < rounds ? "bg-[#F5CE3E]" : "bg-[#2A2A2A]")
            }
          />
        ))}
      </div>

      <p
        aria-live="polite"
        className={
          "mt-[12px] min-h-[24px] font-['Barlow_Condensed',_'Arial_Narrow',_sans-serif] text-[17px] font-semibold transition-colors duration-200 " +
          (isHot ? "text-[#F5CE3E]" : "text-[#8F8F8F]")
        }
      >
        {msg}
      </p>
    </div>
  );
}
