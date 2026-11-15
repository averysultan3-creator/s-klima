import React, { useEffect, useState } from "react";
import { animate, motion, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { Fan, ThermometerSun } from "lucide-react";
import { assetPath } from "./utils";

// Hero story plays by itself (~8 s): hot room -> airflow -> cool room, then starts again from the hot room.
// The frame never changes size; only the layers inside cross-fade.
const PLAY_SECONDS = 8;
const HOLD_SECONDS = 2.5;
const RESTART_FADE = 1.2;

export default function OriginalHeroRoom() {
  const [temp, setTemp] = useState(29);
  const progress = useMotionValue(0);
  // 1 = show the final frame, 0 = follow progress. Used for the cross-fade back to the start.
  const restart = useMotionValue(0);

  useEffect(() => {
    let stopped = false;
    let current = null;
    const run = (mv, to, duration, ease = "easeInOut") =>
      new Promise((resolve) => {
        current = animate(mv, to, { duration, ease, onComplete: resolve });
      });
    const wait = (s) => new Promise((r) => setTimeout(r, s * 1000));

    (async () => {
      await wait(0.8);
      while (!stopped) {
        await run(progress, 1, PLAY_SECONDS);
        if (stopped) break;
        await wait(HOLD_SECONDS);
        if (stopped) break;
        // Restart from the beginning (no rewind): freeze the final frame, jump to the start
        // underneath and cross-fade the final frame away.
        restart.set(1);
        progress.set(0);
        await run(restart, 0, RESTART_FADE, "easeInOut");
        if (stopped) break;
        await wait(0.6);
      }
    })();

    return () => {
      stopped = true;
      current?.stop();
    };
  }, [progress, restart]);

  const hotImageOpacityRaw = useTransform(progress, [0, 0.2, 0.38], [1, 0.5, 0]);
  const airflowImageOpacityRaw = useTransform(progress, [0.12, 0.28, 0.62, 0.82], [0, 1, 0.9, 0]);
  const coolImageOpacityRaw = useTransform(progress, [0.52, 0.72, 1], [0, 1, 1]);

  const warmOpacityRaw = useTransform(progress, [0, 0.25, 0.72], [0.45, 0.3, 0.02]);
  const coolOpacityRaw = useTransform(progress, [0.15, 0.55, 1], [0, 0.32, 0.5]);
  const airflowOpacityRaw = useTransform(progress, [0, 0.18, 0.5, 1], [0.08, 0.88, 1, 0.72]);

  const closeupOpacityRaw = useTransform(progress, [0.1, 0.22, 0.48, 0.58], [0, 1, 1, 0]);
  const closeupX = useTransform(progress, [0.1, 0.58], [60, -24]);

  const hotStoryOpacityRaw = useTransform(progress, [0, 0.16, 0.3], [1, 1, 0]);
  const airflowStoryOpacityRaw = useTransform(progress, [0.24, 0.4, 0.58], [0, 1, 0]);
  const coolStoryOpacityRaw = useTransform(progress, [0.54, 0.74, 1], [0, 1, 1]);

  const tempMotionRaw = useTransform(progress, [0, 0.25, 0.65, 1], [29, 27, 22, 21]);
  const mercuryScaleRaw = useTransform(progress, [0, 1], [1, 0.28]);

  // Blend each value with its final-frame value while restarting.
  const hotImageOpacity = useTransform([hotImageOpacityRaw, restart], ([v, r]) => v + (0 - v) * r);
  const airflowImageOpacity = useTransform([airflowImageOpacityRaw, restart], ([v, r]) => v + (0 - v) * r);
  const coolImageOpacity = useTransform([coolImageOpacityRaw, restart], ([v, r]) => v + (1 - v) * r);
  const warmOpacity = useTransform([warmOpacityRaw, restart], ([v, r]) => v + (0.02 - v) * r);
  const coolOpacity = useTransform([coolOpacityRaw, restart], ([v, r]) => v + (0.5 - v) * r);
  const airflowOpacity = useTransform([airflowOpacityRaw, restart], ([v, r]) => v + (0.72 - v) * r);
  const closeupOpacity = useTransform([closeupOpacityRaw, restart], ([v, r]) => v + (0 - v) * r);
  const hotStoryOpacity = useTransform([hotStoryOpacityRaw, restart], ([v, r]) => v + (0 - v) * r);
  const airflowStoryOpacity = useTransform([airflowStoryOpacityRaw, restart], ([v, r]) => v + (0 - v) * r);
  const coolStoryOpacity = useTransform([coolStoryOpacityRaw, restart], ([v, r]) => v + (1 - v) * r);
  const tempMotion = useTransform([tempMotionRaw, restart], ([v, r]) => v + (21 - v) * r);
  const mercuryScale = useTransform([mercuryScaleRaw, restart], ([v, r]) => v + (0.28 - v) * r);

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
