import React, { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { Fan, ThermometerSun } from "lucide-react";
import { assetPath } from "./utils";

// Hero story plays by itself (~8 s): hot room -> airflow -> cool room, then loops.
// The frame never changes size; only the layers inside cross-fade.
const PLAY_SECONDS = 8;
const HOLD_SECONDS = 2.5;

export default function OriginalHeroRoom() {
  const [temp, setTemp] = useState(29);
  const progress = useMotionValue(0);

  useEffect(() => {
    let stopped = false;
    let current = null;
    const run = (to, duration, ease = "easeInOut") =>
      new Promise((resolve) => {
        current = animate(progress, to, { duration, ease, onComplete: resolve });
      });
    const wait = (s) => new Promise((r) => setTimeout(r, s * 1000));

    (async () => {
      await wait(0.8);
      while (!stopped) {
        await run(1, PLAY_SECONDS);
        if (stopped) break;
        await wait(HOLD_SECONDS);
        if (stopped) break;
        await run(0, 1.2, "easeOut");
        if (stopped) break;
        await wait(1.2);
      }
    })();

    return () => {
      stopped = true;
      current?.stop();
    };
  }, [progress]);

  const hotImageOpacity = useTransform(progress, [0, 0.2, 0.38], [1, 0.5, 0]);
  const airflowImageOpacity = useTransform(progress, [0.12, 0.28, 0.62, 0.82], [0, 1, 0.9, 0]);
  const coolImageOpacity = useTransform(progress, [0.52, 0.72, 1], [0, 1, 1]);

  const warmOpacity = useTransform(progress, [0, 0.25, 0.72], [0.45, 0.3, 0.02]);
  const coolOpacity = useTransform(progress, [0.15, 0.55, 1], [0, 0.32, 0.5]);
  const airflowOpacity = useTransform(progress, [0, 0.18, 0.5, 1], [0.08, 0.88, 1, 0.72]);

  const closeupOpacity = useTransform(progress, [0.1, 0.22, 0.48, 0.58], [0, 1, 1, 0]);
  const closeupX = useTransform(progress, [0.1, 0.58], [60, -24]);

  const hotStoryOpacity = useTransform(progress, [0, 0.16, 0.3], [1, 1, 0]);
  const airflowStoryOpacity = useTransform(progress, [0.24, 0.4, 0.58], [0, 1, 0]);
  const coolStoryOpacity = useTransform(progress, [0.54, 0.74, 1], [0, 1, 1]);

  const tempMotion = useTransform(progress, [0, 0.25, 0.65, 1], [29, 27, 22, 21]);
  const mercuryScale = useTransform(progress, [0, 1], [1, 0.28]);

  useMotionValueEvent(tempMotion, "change", (latest) => setTemp(Math.round(latest)));

  return (
    <div className="hero-visual-wrap relative select-none">
      <div className="room-stage">
        <motion.div className="room-image-layer" style={{ opacity: hotImageOpacity }}>
          <img src={assetPath("/hero-hot-room.jpg")} alt="Upał w pokoju – dziewczyna na kanapie przed montażem klimatyzacji" className="room-image" />
        </motion.div>
        <motion.div className="room-image-layer" style={{ opacity: airflowImageOpacity }}>
          <img src={assetPath("/hero-airflow-room.png")} alt="Klimatyzator rozprowadza chłodne powietrze" className="room-image" />
        </motion.div>
        <motion.div className="room-image-layer" style={{ opacity: coolImageOpacity }}>
          <img src={assetPath("/hero-cool-room.png")} alt="Schłodzony salon po montażu klimatyzacji" className="room-image" />
        </motion.div>

        <motion.div className="warm-filter" style={{ opacity: warmOpacity }} />
        <motion.div className="cool-filter" style={{ opacity: coolOpacity }} />

        <motion.div className="air-system" style={{ opacity: airflowOpacity }}>
          <span className="air-stream stream-one" />
          <span className="air-stream stream-two" />
          <span className="air-stream stream-three" />
          <span className="air-stream stream-four" />
          <span className="snow-dot dot-one" />
          <span className="snow-dot dot-two" />
          <span className="snow-dot dot-three" />
        </motion.div>

        <div className="thermo-card" aria-label={`Temperatura ${temp} stopni`}>
          <div className="thermo-icon">
            <ThermometerSun size={20} />
          </div>
          <div>
            <strong>{temp}°C</strong>
            <span>{temp > 23 ? "schładzamy" : "komfort gotowy"}</span>
          </div>
          <div className="mercury-track">
            <motion.span style={{ scaleY: mercuryScale, transformOrigin: "bottom" }} />
          </div>
        </div>

        <div className="install-badge">
          <Fan size={16} />
          wycena + montaż + serwis
        </div>

        <div className="hero-story-compact">
          <motion.div style={{ opacity: hotStoryOpacity }} className="story-step">
            <span className="step-num">1</span>
            <div className="step-text">
              <strong>Najpierw upał</strong>
              <small>nagrzane pomieszczenie</small>
            </div>
          </motion.div>
          <motion.div style={{ opacity: airflowStoryOpacity }} className="story-step">
            <span className="step-num">2</span>
            <div className="step-text">
              <strong>Nawiew chłodzi</strong>
              <small>cyrkulacja powietrza</small>
            </div>
          </motion.div>
          <motion.div style={{ opacity: coolStoryOpacity }} className="story-step">
            <span className="step-num">3</span>
            <div className="step-text">
              <strong>Przyjemny chłód</strong>
              <small>komfortowe 21°C</small>
            </div>
          </motion.div>
        </div>

        <motion.div className="ac-closeup-card" style={{ opacity: closeupOpacity, x: closeupX }} aria-hidden="true">
          <img src={assetPath("/ac-closeup.png")} alt="" className="ac-closeup-image" />
          <span>cichy nawiew</span>
        </motion.div>
      </div>
    </div>
  );
}
