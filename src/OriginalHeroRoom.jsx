import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "framer-motion";
import { Fan, ThermometerSun, Check } from "lucide-react";
import { assetPath } from "./utils";

export default function OriginalHeroRoom() {
  const containerRef = useRef(null);
  const [temp, setTemp] = useState(29);
  const progressMotion = useMotionValue(0);

  // Wheel interaction: WHEN CURSOR IS OVER ANIMATION -> prevent page scroll & animate room!
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e) => {
      // Prevent default page scroll while hovering over the room
      e.preventDefault();
      e.stopPropagation();

      const current = progressMotion.get();
      // Sensitivity factor
      const delta = e.deltaY > 0 ? 0.045 : -0.045;
      const next = Math.min(1, Math.max(0, current + delta));
      progressMotion.set(next);
    };

    // Note: passive: false is strictly required to allow e.preventDefault()
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheel);
    };
  }, [progressMotion]);

  // Exact spring and transforms from the original S-Klima engine
  const smooth = useSpring(progressMotion, { stiffness: 72, damping: 24, mass: 0.25 });
  const cameraScale = useTransform(smooth, [0, 0.18, 0.55, 1], [1.08, 1.34, 0.92, 0.92]);
  const cameraY = useTransform(smooth, [0, 0.18, 0.55, 1], [16, -24, 0, 0]);

  const hotImageOpacity = useTransform(smooth, [0, 0.2, 0.38], [1, 0.5, 0]);
  const airflowImageOpacity = useTransform(smooth, [0.12, 0.28, 0.62, 0.82], [0, 1, 0.9, 0]);
  const coolImageOpacity = useTransform(smooth, [0.52, 0.72, 1], [0, 1, 1]);

  const warmOpacity = useTransform(smooth, [0, 0.25, 0.72], [0.58, 0.35, 0.02]);
  const coolOpacity = useTransform(smooth, [0.15, 0.55, 1], [0, 0.32, 0.58]);
  const airflowOpacity = useTransform(smooth, [0, 0.18, 0.5, 1], [0.08, 0.88, 1, 0.72]);

  const closeupOpacity = useTransform(smooth, [0.1, 0.22, 0.48, 0.58], [0, 1, 1, 0]);
  const closeupScale = useTransform(smooth, [0.1, 0.36, 0.58], [0.82, 1.08, 0.86]);
  const closeupX = useTransform(smooth, [0.1, 0.58], [80, -34]);

  const hotStoryOpacity = useTransform(smooth, [0, 0.16, 0.3], [1, 1, 0]);
  const airflowStoryOpacity = useTransform(smooth, [0.24, 0.4, 0.58], [0, 1, 0]);
  const coolStoryOpacity = useTransform(smooth, [0.54, 0.74, 1], [0, 1, 1]);

  const finalCardOpacity = useTransform(smooth, [0.72, 0.88, 1], [0, 1, 1]);
  const finalCardY = useTransform(smooth, [0.72, 1], [18, 0]);

  const tempMotion = useTransform(smooth, [0, 0.25, 0.65, 1], [29, 27, 22, 21]);
  const mercuryScale = useTransform(smooth, [0, 1], [1, 0.28]);

  useMotionValueEvent(tempMotion, "change", (latest) => {
    setTemp(Math.round(latest));
  });

  return (
    <div
      ref={containerRef}
      className="hero-visual-wrap relative select-none cursor-ns-resize"
      title="Przewiń kółkiem myszy tutaj, aby schłodzić pokój"
    >
      <motion.div className="room-stage" style={{ scale: cameraScale, y: cameraY }}>
        {/* Stage 1: Hot Room */}
        <motion.div className="room-image-layer" style={{ opacity: hotImageOpacity }}>
          <img
            src={assetPath("/hero-hot-room.png")}
            alt="Pokój przed montażem klimatyzacji"
            className="room-image"
          />
        </motion.div>

        {/* Stage 2: Airflow Room */}
        <motion.div className="room-image-layer" style={{ opacity: airflowImageOpacity }}>
          <img
            src={assetPath("/hero-airflow-room.png")}
            alt="Klimatyzator rozprowadza chłodne powietrze"
            className="room-image"
          />
        </motion.div>

        {/* Stage 3: Cool Room */}
        <motion.div className="room-image-layer" style={{ opacity: coolImageOpacity }}>
          <img
            src={assetPath("/hero-cool-room.png")}
            alt="Schłodzony salon po montażu klimatyzacji"
            className="room-image"
          />
        </motion.div>

        {/* Filters */}
        <motion.div className="warm-filter" style={{ opacity: warmOpacity }} />
        <motion.div className="cool-filter" style={{ opacity: coolOpacity }} />

        {/* Animated Air Streams and Snow particles */}
        <motion.div className="air-system" style={{ opacity: airflowOpacity }}>
          <span className="air-stream stream-one" />
          <span className="air-stream stream-two" />
          <span className="air-stream stream-three" />
          <span className="air-stream stream-four" />
          <span className="snow-dot dot-one" />
          <span className="snow-dot dot-two" />
          <span className="snow-dot dot-three" />
        </motion.div>

        {/* Thermometer Widget */}
        <div className="thermo-card" aria-label={`Temperatura ${temp} stopni`}>
          <div className="thermo-icon">
            <ThermometerSun size={22} />
          </div>
          <div>
            <strong>{temp}°C</strong>
            <span>{temp > 23 ? "schładzamy pomieszczenie" : "komfort gotowy"}</span>
          </div>
          <div className="mercury-track">
            <motion.span style={{ scaleY: mercuryScale, transformOrigin: "bottom" }} />
          </div>
        </div>

        {/* Service badge */}
        <div className="install-badge">
          <Fan size={18} />
          dobór mocy + montaż + serwis
        </div>

        {/* 1-2-3 Story Card */}
        <div className="hero-story">
          <motion.div style={{ opacity: hotStoryOpacity }}>
            <span>1</span>
            <strong>Najpierw czuć upał</strong>
            <small>pomieszczenie nagrzewa się i komfort spada</small>
          </motion.div>
          <motion.div style={{ opacity: airflowStoryOpacity }}>
            <span>2</span>
            <strong>Urządzenie rozprowadza chłód</strong>
            <small>nawiew szybko miesza powietrze w pokoju</small>
          </motion.div>
          <motion.div style={{ opacity: coolStoryOpacity }}>
            <span>3</span>
            <strong>W pokoju robi się przyjemnie</strong>
            <small>temperatura spada, komfort rośnie od razu</small>
          </motion.div>
        </div>

        {/* AC Unit Closeup card appearing on zoom */}
        <motion.div
          className="ac-closeup-card"
          style={{ opacity: closeupOpacity, scale: closeupScale, x: closeupX }}
          aria-hidden="true"
        >
          <img src={assetPath("/ac-closeup.png")} alt="" className="ac-closeup-image" />
          <span>cichy nawiew</span>
        </motion.div>

        {/* Final Result Success Card */}
        <motion.div
          className="comfort-result"
          style={{ opacity: finalCardOpacity, y: finalCardY }}
        >
          <Check size={18} />
          <div>
            <strong>Komfort gotowy</strong>
            <span>wycena, dobór i termin w jednym miejscu</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
