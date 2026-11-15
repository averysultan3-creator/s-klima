import React from "react";
import { ArrowLeft, Printer, Download, Phone, Mail, Snowflake, Flame, CheckCircle2 } from "lucide-react";
import { assetPath } from "./utils";
import { PHONE, EMAIL, WEBSITE } from "./site";
import { QrCode, Scaled, PrintRoot, printSheets, sheetStyle, QR_URL } from "./print";

const GREEN = "#15803d";
const DARK = "#0b3d2e";

export const BANNER_BLEED = 10; // mm on every side for the print shop ("spad")

export const BANNERS = [
  { id: "naklejka-auto", title: "Naklejka na auto", wmm: 800, hmm: 400, variant: "standard" },
  { id: "baner-zimowy", title: "Baner zimowy", wmm: 1000, hmm: 500, variant: "zima" },
  { id: "baner", title: "Baner", wmm: 1000, hmm: 500, variant: "standard" },
];

// Layout is drawn in "u" = 1% of the banner width, so 80x40 and 100x50 share one design.
// bleed > 0: sheet grows by `bleed` mm per side; content keeps its place relative to the cut line,
// the bottom bar runs past it.
export function Banner({ wmm, hmm, variant, bleed = 0 }) {
  const um = (n) => (wmm / 100) * n;
  const u = (n) => `${um(n)}mm`;
  const winter = variant === "zima";
  return (
    <div style={{ ...sheetStyle(wmm + 2 * bleed, hmm + 2 * bleed), display: "flex", flexDirection: "column" }}>
      <div style={{ flex: 1, display: "flex", alignItems: "stretch", padding: `${um(3.2) + bleed}mm ${um(4) + bleed}mm ${um(2.4)}mm ${um(3) + bleed}mm` }}>
        {/* Logo column */}
        <div style={{ width: u(34), flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <img src={assetPath("/zielony-zajac-logo-hd.png")} alt="Zielony Zając" style={{ width: u(31), height: "auto" }} />
          <div style={{ marginTop: u(0.6), fontSize: u(2.75), fontWeight: 800, color: GREEN, whiteSpace: "nowrap" }}>
            {winter ? WEBSITE : `www.${WEBSITE}`}
          </div>
        </div>

        {/* Text column */}
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", justifyContent: "space-between", paddingLeft: u(3) }}>
          <div>
            <div style={{ fontSize: u(6.5), fontWeight: 900, color: DARK, lineHeight: 1, letterSpacing: u(0.12), whiteSpace: "nowrap", textTransform: "uppercase" }}>
              Klimatyzacja
            </div>
            {winter ? (
              <div style={{ marginTop: u(2.2), display: "flex", flexDirection: "column", gap: u(1.1) }}>
                {[
                  { icon: Flame, text: "Zamontuj, aby się dogrzać zimą" },
                  { icon: CheckCircle2, text: "Robimy instalacje na etapie deweloperskim lub remontu" },
                ].map(({ icon: Icon, text }) => (
                  <div key={text} style={{ display: "flex", alignItems: "center", gap: u(1.2), fontSize: u(2.45), fontWeight: 800, color: "#1e293b", lineHeight: 1.2 }}>
                    <Icon style={{ width: u(3.2), height: u(3.2), color: GREEN, flexShrink: 0 }} />
                    {text}
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ marginTop: u(1.8), fontSize: u(3.5), fontWeight: 800, color: GREEN, whiteSpace: "nowrap" }}>
                montaż • sprzedaż • serwis
              </div>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: u(2) }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: u(1.3), fontSize: u(5.2), fontWeight: 900, color: DARK, lineHeight: 1, whiteSpace: "nowrap" }}>
                <Phone style={{ width: u(4.6), height: u(4.6), color: GREEN }} />
                {PHONE.replace("+48 ", "")}
              </div>
              <div style={{ marginTop: u(1.4), display: "flex", alignItems: "center", gap: u(1.2), fontSize: u(2.7), fontWeight: 700, color: "#334155" }}>
                <Mail style={{ width: u(2.8), height: u(2.8), color: GREEN }} />
                {EMAIL}
              </div>
            </div>
            <QrCode value={QR_URL} color={DARK} style={{ width: u(14), height: u(14), flexShrink: 0 }} />
          </div>
        </div>
      </div>

      {/* Bottom bar in the site colours */}
      <div
        style={{
          height: `${um(5.2) + bleed}mm`,
          paddingBottom: `${bleed}mm`,
          boxSizing: "border-box",
          background: `linear-gradient(90deg, ${DARK}, ${GREEN})`,
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: u(1.5),
          fontSize: u(2.5),
          fontWeight: 800,
          letterSpacing: u(0.3),
          textTransform: "uppercase",
        }}
      >
        {winter && <Snowflake style={{ width: u(2.6), height: u(2.6) }} />}
        Tworzymy dobry klimat
        {winter && <Snowflake style={{ width: u(2.6), height: u(2.6) }} />}
      </div>
    </div>
  );
}

export default function BaneryPage({ onBack }) {
  const [printing, setPrinting] = React.useState({ ...BANNERS[0], bleed: 0 });

  const print = (b, bleed = 0) => {
    setPrinting({ ...b, bleed });
    setTimeout(
      () => printSheets({ wmm: b.wmm + 2 * bleed, hmm: b.hmm + 2 * bleed, title: `${b.id}-${b.wmm / 10}x${b.hmm / 10}cm${bleed ? "-spad-1cm" : ""}` }),
      100
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans pb-24">
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={onBack} className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:text-emerald-600 cursor-pointer">
            <ArrowLeft className="w-4 h-4" />
            Wizytówka
          </button>
          <span className="text-sm font-black text-slate-900">Banery i naklejka</span>
        </div>
      </header>

      <p className="max-w-6xl mx-auto px-4 mt-6 text-xs text-slate-500">
        „Pobierz PDF” = dokładny format. „PDF dla drukarni” = ten sam projekt + 1 cm spadu z każdej strony (np. 82 × 42 cm dla
        naklejki 80 × 40), linia cięcia 1 cm od krawędzi. Drukuj w skali 100%.
      </p>
      <div className="max-w-6xl mx-auto px-4 mt-8 space-y-14">
        {BANNERS.map((b) => (
          <section key={b.id}>
            <div className="flex flex-wrap items-end justify-between gap-3 mb-4">
              <div>
                <h2 className="text-xl font-black text-slate-900">{b.title}</h2>
                <p className="text-sm text-slate-500">
                  {b.wmm / 10} × {b.hmm / 10} cm
                </p>
              </div>
              <div className="flex gap-2">
                <a
                  href={assetPath(`/druk/${b.id}-${b.wmm / 10}x${b.hmm / 10}cm.pdf`)}
                  download
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold"
                >
                  <Download className="w-4 h-4" />
                  Pobierz PDF
                </a>
                <a
                  href={assetPath(`/druk/${b.id}-${b.wmm / 10}x${b.hmm / 10}cm-spad-1cm.pdf`)}
                  download
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50"
                >
                  <Download className="w-4 h-4 text-emerald-600" />
                  PDF dla drukarni (spad 1 cm)
                </a>
                <button data-print-bleed onClick={() => print(b, BANNER_BLEED)} className="hidden" aria-hidden="true" tabIndex={-1} />
                <button
                  onClick={() => print(b)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-emerald-600" />
                  Drukuj
                </button>
              </div>
            </div>
            <Scaled wmm={b.wmm} hmm={b.hmm} maxWidth={1100}>
              <Banner {...b} />
            </Scaled>
          </section>
        ))}
      </div>

      <PrintRoot>
        <Banner {...printing} />
      </PrintRoot>
    </div>
  );
}
