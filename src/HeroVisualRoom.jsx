import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "framer-motion";
import { Fan, ThermometerSun, Sparkles } from "lucide-react";
import { assetPath } from "./utils";

export default function HeroVisualRoom() {
  const containerRef = useRef(null);
  const [temp, setTemp] = useState(29);
  const progressMotion = useMotionValue(0);

  // Wheel interaction inside container
  const handleWheel = (e) => {
    // allow interactive scrolling
    const current = progressMotion.get();
    const delta = e.deltaY > 0 ? 0.08 : -0.08;
    const next = Math.min(1, Math.max(0, current + delta));
    progressMotion.set(next);
  };

  // Also listen to global window scroll
  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // When entering viewport
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const total = windowHeight + rect.height;
        const current = windowHeight - rect.top;
        const ratio = Math.min(1, Math.max(0, current / (total * 0.75)));
        progressMotion.set(ratio);
      }
    };

    const handleScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress();
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [progressMotion]);

  const smooth = useSpring(progressMotion, { stiffness: 80, damping: 22, mass: 0.25 });
  const cameraScale = useTransform(smooth, [0, 0.2, 0.6, 1], [1.02, 1.15, 0.98, 0.98]);
  const cameraY = useTransform(smooth, [0, 0.2, 0.6, 1], [10, -15, 0, 0]);

  const hotImageOpacity = useTransform(smooth, [0, 0.22, 0.42], [1, 0.4, 0]);
  const airflowImageOpacity = useTransform(smooth, [0.15, 0.32, 0.65, 0.85], [0, 1, 0.9, 0]);
  const coolImageOpacity = useTransform(smooth, [0.55, 0.75, 1], [0, 1, 1]);

  const warmOpacity = useTransform(smooth, [0, 0.25, 0.7], [0.5, 0.25, 0]);
  const coolOpacity = useTransform(smooth, [0.2, 0.6, 1], [0, 0.3, 0.55]);
  const airflowOpacity = useTransform(smooth, [0, 0.2, 0.55, 1], [0.05, 0.9, 1, 0.75]);

  const hotStoryOpacity = useTransform(smooth, [0, 0.18, 0.32], [1, 1, 0]);
  const airflowStoryOpacity = useTransform(smooth, [0.26, 0.42, 0.6], [0, 1, 0]);
  const coolStoryOpacity = useTransform(smooth, [0.56, 0.75, 1], [0, 1, 1]);

  const tempMotion = useTransform(smooth, [0, 0.25, 0.65, 1], [29, 26, 22, 21]);
  const mercuryScale = useTransform(smooth, [0, 1], [1, 0.28]);

  useMotionValueEvent(tempMotion, "change", (latest) => {
    setTemp(Math.round(latest));
  });

  const setManualStep = (ratio) => {
    progressMotion.set(ratio);
  };

  return (
    <div 
      ref={containerRef}
      onWheel={handleWheel}
      className="relative rounded-3xl bg-white border border-slate-200 shadow-2xl p-4 sm:p-5 overflow-hidden select-none"
    >
      {/* Animated Camera Stage */}
      <div className="relative rounded-2xl aspect-[4/3] overflow-hidden bg-slate-900 border border-slate-100">
        <motion.div 
          className="relative w-full h-full"
          style={{ scale: cameraScale, y: cameraY }}
        >
          {/* Layer 1: Hot Room */}
          <motion.div 
            className="absolute inset-0 w-full h-full" 
            style={{ opacity: hotImageOpacity }}
          >
            <img
              src={assetPath("/hero-hot-room.png")}
              alt="Pokój przed montażem klimatyzacji"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Layer 2: Airflow Room */}
          <motion.div 
            className="absolute inset-0 w-full h-full" 
            style={{ opacity: airflowImageOpacity }}
          >
            <img
              src={assetPath("/hero-airflow-room.png")}
              alt="Klimatyzator rozprowadza chłodne powietrze"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Layer 3: Cool Room */}
          <motion.div 
            className="absolute inset-0 w-full h-full" 
            style={{ opacity: coolImageOpacity }}
          >
            <img
              src={assetPath("/hero-cool-room.png")}
              alt="Schłodzony salon po montażu"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Color filter overlays */}
          <motion.div 
            className="absolute inset-0 bg-amber-500/20 pointer-events-none mix-blend-color" 
            style={{ opacity: warmOpacity }} 
          />
          <motion.div 
            className="absolute inset-0 bg-cyan-500/25 pointer-events-none mix-blend-color" 
            style={{ opacity: coolOpacity }} 
          />

          {/* Airflow particle waves */}
          <motion.div 
            className="absolute inset-0 pointer-events-none overflow-hidden" 
            style={{ opacity: airflowOpacity }}
          >
            <div className="absolute top-[28%] right-[14%] w-48 h-24 border-b-2 border-cyan-300/60 rounded-full blur-[0.5px] transform -rotate-12 animate-pulse" />
            <div className="absolute top-[32%] right-[18%] w-56 h-28 border-b-2 border-emerald-300/50 rounded-full blur-[1px] transform -rotate-6" />
          </motion.div>
        </motion.div>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/50 shadow-sm text-xs font-bold text-slate-800 flex items-center gap-1.5 z-10">
          <Fan className="w-4 h-4 text-emerald-600 animate-spin" />
          dobór mocy + montaż + serwis
        </div>

        <div className="absolute top-3 right-3 bg-emerald-600 text-white px-3 py-1 rounded-xl shadow-md text-[11px] font-bold z-10">
          Komfort gotowy
        </div>

        {/* Dynamic Story steps changing with scroll */}
        <div className="absolute bottom-3 left-3 z-10">
          <div className="relative bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-slate-100 max-w-[210px]">
            <motion.div style={{ opacity: hotStoryOpacity }} className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-500 text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0">1</span>
              <div>
                <strong className="block text-xs text-slate-900 leading-tight">Upał w pokoju</strong>
                <small className="text-[10px] text-slate-500 leading-none">temperatura 29°C</small>
              </div>
            </motion.div>

            <motion.div style={{ opacity: airflowStoryOpacity }} className="absolute inset-x-3.5 top-2 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-cyan-500 text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0">2</span>
              <div>
                <strong className="block text-xs text-slate-900 leading-tight">Nawiew chłodzi</strong>
                <small className="text-[10px] text-slate-500 leading-none">równomierny obieg</small>
              </div>
            </motion.div>

            <motion.div style={{ opacity: coolStoryOpacity }} className="absolute inset-x-3.5 top-2 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] font-bold flex items-center justify-center flex-shrink-0">3</span>
              <div>
                <strong className="block text-xs text-slate-900 leading-tight">Komfort gotowy</strong>
                <small className="text-[10px] text-slate-500 leading-none">idealne 21°C</small>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Dynamic Thermometer Card */}
        <div className="absolute bottom-3 right-3 z-10 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-3">
          <div className={`p-2 rounded-xl transition ${temp > 24 ? "bg-amber-100 text-amber-700" : "bg-cyan-100 text-cyan-700"}`}>
            <ThermometerSun className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xl font-black text-slate-900 leading-none">
              {temp}°C
            </div>
            <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">
              {temp > 24 ? "Schładzamy" : "Komfort gotowy"}
            </div>
          </div>
          <div className="w-1.5 h-10 bg-slate-200 rounded-full overflow-hidden flex flex-col justify-end">
            <motion.div 
              className={`w-full ${temp > 24 ? "bg-amber-500" : "bg-cyan-500"}`} 
              style={{ scaleY: mercuryScale, transformOrigin: "bottom" }} 
            />
          </div>
        </div>
      </div>

      {/* Interactive Controls & Scroll Hint */}
      <div className="mt-4 pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-xs font-bold text-slate-500 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          Przewijaj lub kliknij etap:
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setManualStep(0)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
          >
            1. Upał 29°C
          </button>
          <button
            onClick={() => setManualStep(0.5)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition cursor-pointer"
          >
            2. Nawiew
          </button>
          <button
            onClick={() => setManualStep(1)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition cursor-pointer shadow-xs"
          >
            3. Komfort 21°C
          </button>
        </div>
      </div>
    </div>
  );
}
