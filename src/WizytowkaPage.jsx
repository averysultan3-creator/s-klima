import React from "react";
import { ArrowLeft, Printer, Phone, Mail, Globe, Download, LayoutTemplate } from "lucide-react";
import { assetPath } from "./utils";
import { PHONE, EMAIL, WEBSITE, NIP, REGON } from "./site";
import { QrCode, Scaled, PrintRoot, printSheets, sheetStyle, QR_URL } from "./print";

const W = 85;
const H = 55;
const GREEN = "#15803d";
const DARK = "#0b3d2e";
export const CARD_BLEED = 2; // mm on every side for the print shop ("spad")

// bleed > 0: the sheet grows by `bleed` mm on each side, content stays where it was relative to the cut line
// and the green bar runs past the cut line.
export function CardFront({ bleed = 0 }) {
  return (
    <div style={{ ...sheetStyle(W + 2 * bleed, H + 2 * bleed), padding: `${5 + bleed}mm ${5 + bleed}mm ${4.5 + bleed}mm ${4 + bleed}mm` }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: `${1.2 + bleed}mm`, background: GREEN }} />
      <div style={{ display: "flex", height: "100%", gap: "3mm" }}>
        {/* Left: big logo + slogan */}
        <div style={{ width: "40mm", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <img src={assetPath("/zielony-zajac-logo-hd.png")} alt="Zielony Zając" style={{ width: "40mm", height: "auto" }} />
          <div>
            <div style={{ fontSize: "3.6mm", fontWeight: 900, color: GREEN, lineHeight: 1.1, letterSpacing: "-0.1mm" }}>
              Tworzymy dobry klimat
            </div>
            <div style={{ fontSize: "2.5mm", fontWeight: 700, color: "#334155", marginTop: "0.8mm" }}>
              Montaż w jeden dzień
            </div>
          </div>
        </div>

        {/* Right: what we do + contacts */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-end", textAlign: "right" }}>
          <div style={{ fontSize: "4.1mm", fontWeight: 900, lineHeight: 1.05, color: DARK, textTransform: "uppercase", letterSpacing: "0.1mm", marginTop: "1mm" }}>
            Montaż
            <br />
            <span style={{ color: GREEN }}>i serwis</span>
            <br />
            klimatyzacji
          </div>
          <div style={{ fontSize: "2.45mm", lineHeight: 1.55, color: "#0f172a" }}>
            <div style={{ fontWeight: 900, fontSize: "3.1mm", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "1.2mm" }}>
              <Phone style={{ width: "2.8mm", height: "2.8mm", color: GREEN }} />
              {PHONE}
            </div>
            <div style={{ fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "1.2mm" }}>
              <Globe style={{ width: "2.4mm", height: "2.4mm", color: GREEN }} />
              {WEBSITE}
            </div>
            <div style={{ fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "1.2mm" }}>
              <Mail style={{ width: "2.4mm", height: "2.4mm", color: GREEN }} />
              {EMAIL}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CardBack({ bleed = 0 }) {
  return (
    <div style={{ ...sheetStyle(W + 2 * bleed, H + 2 * bleed), padding: `${bleed}mm`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "3mm" }}>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: `${1.2 + bleed}mm`, background: GREEN }} />
      <QrCode value={QR_URL} style={{ width: "33mm", height: "33mm" }} />
      <div style={{ fontSize: "2.3mm", color: "#334155", fontWeight: 600, textAlign: "center", lineHeight: 1.45 }}>
        <div style={{ fontWeight: 900, color: DARK, fontSize: "2.6mm" }}>Zielony Zając Sp. z o.o.</div>
        NIP: {NIP} • REGON: {REGON}
      </div>
    </div>
  );
}

export default function WizytowkaPage({ onBack, onGoToBanery }) {
  const [bleed, setBleed] = React.useState(0);
  const print = (b = 0) => {
    setBleed(b);
    setTimeout(() => printSheets({ wmm: W + 2 * b, hmm: H + 2 * b, title: b ? "Wizytowka-Zielony-Zajac-spad-2mm" : "Wizytowka-Zielony-Zajac" }), 100);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans pb-24">
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between gap-2">
          <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:text-emerald-600 cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Strona główna</span>
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onGoToBanery}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              <LayoutTemplate className="w-4 h-4 text-emerald-600" />
              Banery i naklejka
            </button>
            <button
              onClick={() => print(0)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              Drukuj / PDF
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 pt-10 text-center">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Wizytówka</h1>
        <p className="mt-2 text-sm text-slate-500">85 × 55 mm • strona przednia i tylna</p>
      </div>

      <div className="max-w-5xl mx-auto px-4 mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 text-center">Przód</div>
          <Scaled wmm={W} hmm={H} maxWidth={460}>
            <CardFront />
          </Scaled>
        </div>
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 text-center">Tył</div>
          <Scaled wmm={W} hmm={H} maxWidth={460}>
            <CardBack />
          </Scaled>
        </div>
      </div>

      <div className="max-w-2xl mx-auto mt-12 px-4 flex flex-wrap justify-center gap-3">
        <button
          onClick={() => print(0)}
          className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm flex items-center gap-2 cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          Drukuj (lub „Zapisz jako PDF”)
        </button>
        <a
          href={assetPath("/druk/wizytowka-85x55.pdf")}
          download
          className="px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-200 flex items-center gap-2"
        >
          <Download className="w-4 h-4 text-emerald-600" />
          Pobierz PDF
        </a>
        <a
          href={assetPath("/druk/wizytowka-85x55-spad-2mm.pdf")}
          download
          className="px-5 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-200 flex items-center gap-2"
        >
          <Download className="w-4 h-4 text-emerald-600" />
          PDF dla drukarni (spad 2 mm)
        </a>
        <button
          data-print-bleed
          onClick={() => print(CARD_BLEED)}
          className="hidden"
          aria-hidden="true"
          tabIndex={-1}
        />
      </div>
      <p className="text-center text-xs text-slate-400 mt-4 max-w-xl mx-auto">
        Przy drukowaniu wybierz skalę 100% (bez dopasowania do strony). Drukarnia zwykle prosi o plik ze spadem:
        85 × 55 mm + 2 mm z każdej strony = 89 × 59 mm, linia cięcia 2 mm od krawędzi.
      </p>

      <PrintRoot>
        <CardFront bleed={bleed} />
        <CardBack bleed={bleed} />
      </PrintRoot>
    </div>
  );
}
