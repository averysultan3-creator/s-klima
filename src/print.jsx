import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import QRCode from "qrcode";
import { SITE_URL } from "./site";

// Where every printed QR code leads (mobile business card / hub).
// If the site moves to zielonyzajac.pl, change this one line and re-print.
export const QR_URL = `${SITE_URL}hub/`;

const PX_PER_MM = 96 / 25.4;

export function QrCode({ value = QR_URL, color = "#0b3d2e", className, style }) {
  const [svg, setSvg] = useState("");
  useEffect(() => {
    QRCode.toString(value, { type: "svg", margin: 0, errorCorrectionLevel: "M", color: { dark: color, light: "#0000" } })
      .then(setSvg)
      .catch(() => setSvg(""));
  }, [value, color]);
  return (
    <div
      className={className}
      style={{ lineHeight: 0, ...style }}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: svg.replace("<svg ", '<svg width="100%" height="100%" ') }}
    />
  );
}

// Shows a sheet designed in real millimetres scaled to the available width.
export function Scaled({ wmm, hmm, maxWidth = 900, children }) {
  const box = useRef(null);
  const [scale, setScale] = useState(0.5);
  useLayoutEffect(() => {
    const el = box.current;
    if (!el) return;
    const fit = () => setScale(Math.min(el.clientWidth, maxWidth) / (wmm * PX_PER_MM));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [wmm, maxWidth]);
  return (
    <div ref={box} className="w-full flex justify-center print:hidden">
      <div style={{ width: wmm * PX_PER_MM * scale, height: hmm * PX_PER_MM * scale }} className="relative shadow-2xl">
        <div style={{ transform: `scale(${scale})`, transformOrigin: "top left", position: "absolute", top: 0, left: 0 }}>
          {children}
        </div>
      </div>
    </div>
  );
}

// Print exactly the given sheets (each on its own page of wmm x hmm, no margins).
// Sheets to print live in <PrintRoot>; each direct child is one page.
export function printSheets({ wmm, hmm, title }) {
  const style = document.createElement("style");
  style.id = "print-page-size";
  style.textContent = `@page { size: ${wmm}mm ${hmm}mm; margin: 0; }`;
  document.head.appendChild(style);
  const oldTitle = document.title;
  if (title) document.title = title;
  document.body.classList.add("printing-sheets");
  const done = () => {
    style.remove();
    document.title = oldTitle;
    document.body.classList.remove("printing-sheets");
    window.removeEventListener("afterprint", done);
  };
  window.addEventListener("afterprint", done);
  setTimeout(() => window.print(), 50);
}

// Rendered straight into <body>, outside #root; only visible while printing.
export function PrintRoot({ children }) {
  return createPortal(<div id="print-root">{children}</div>, document.body);
}

export const sheetStyle = (wmm, hmm) => ({
  width: `${wmm}mm`,
  height: `${hmm}mm`,
  position: "relative",
  overflow: "hidden",
  background: "#fff",
  boxSizing: "border-box",
  fontFamily: "'Plus Jakarta Sans', 'Inter', system-ui, sans-serif",
  color: "#0f172a",
});
