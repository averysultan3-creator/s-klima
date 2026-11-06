import React, { useState } from "react";
import {
  ArrowLeft,
  Printer,
  Copy,
  Check,
  Phone,
  Mail,
  Globe,
  MapPin,
  ShieldCheck,
  QrCode,
  Download,
  Share2,
  Sparkles,
  Award,
  Layers,
  RotateCw,
} from "lucide-react";
import { assetPath } from "./utils";

const PHONE = "+48 513 666 450";
const EMAIL = "kontakt@zielonyzajac.pl";
const WEBSITE = "zielonyzajac.pl";
const HUB_URL = "https://averysultan3-creator.github.io/s-klima/hub/";

export default function WizytowkaPage({ onBack }) {
  const [copied, setCopied] = useState(false);
  const [activeSide, setActiveSide] = useState("both"); // "both" | "front" | "back"
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-sans selection:bg-emerald-500 selection:text-white pb-20">
      {/* Top Bar (hidden during print) */}
      <header className="print:hidden sticky top-0 z-30 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-400 hover:text-emerald-300 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Powrót na stronę główną
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 border border-slate-700 transition cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Skopiowano" : "Kopiuj link"}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold text-white shadow transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Drukuj / PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* Intro Header */}
      <div className="print:hidden max-w-4xl mx-auto px-4 pt-10 pb-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-800/60 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">
          <Award className="w-4 h-4" />
          Oficjalna Wizytówka Firmowa • Format Standard 85 × 55 mm
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Wizytówka Zielony Zając Sp. z o.o.
        </h1>
        <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-2xl mx-auto">
          Makieta gotowa do druku w drukarni lub udostępnienia. Na rewersie znajduje się kod QR prowadzący bezpośrednio do mobilnego cennika i galerii realizacji.
        </p>

        {/* View Switcher on Desktop/Mobile */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setActiveSide("both")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeSide === "both"
                ? "bg-emerald-600 text-white shadow-lg"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
            }`}
          >
            Obie strony (Przód i Tył)
          </button>
          <button
            onClick={() => setActiveSide("front")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeSide === "front"
                ? "bg-emerald-600 text-white shadow-lg"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
            }`}
          >
            Tylko Przód (Awers)
          </button>
          <button
            onClick={() => setActiveSide("back")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeSide === "back"
                ? "bg-emerald-600 text-white shadow-lg"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
            }`}
          >
            Tylko Tył (Rewers z QR)
          </button>
        </div>
      </div>

      {/* CARDS DISPLAY CONTAINER */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 print:flex-col print:gap-10">
          
          {/* ========================================================= */}
          {/* FRONT CARD (AWERS) */}
          {/* ========================================================= */}
          {(activeSide === "both" || activeSide === "front") && (
            <div className="flex flex-col items-center">
              <span className="print:hidden text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Strona Przednia (Awers)
              </span>

              {/* Physical Business Card 85x55 ratio */}
              <div
                id="card-front"
                className="w-[360px] sm:w-[440px] md:w-[480px] aspect-[85/55] bg-gradient-to-br from-white via-slate-50 to-emerald-50/40 text-slate-900 rounded-2xl shadow-2xl p-6 sm:p-7 relative overflow-hidden border border-slate-200/80 flex flex-col justify-between print:shadow-none print:border-slate-300 print:w-[85mm] print:h-[55mm] print:p-4"
              >
                {/* Decorative emerald subtle wave bar on right */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute top-0 right-0 w-1.5 h-full bg-gradient-to-b from-emerald-500 via-emerald-600 to-teal-700" />

                {/* Top Section: Logo & Badge */}
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <img
                        src={assetPath("/zielony-zajac-logo.jpg")}
                        alt="Zielony Zając"
                        className="h-10 sm:h-12 w-auto object-contain rounded"
                      />
                    </div>
                    <div className="mt-2 text-[10px] sm:text-xs font-black uppercase tracking-wider text-emerald-800">
                      Montaż i Serwis Klimatyzacji
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-900 text-[10px] sm:text-xs font-extrabold border border-emerald-300">
                      <ShieldCheck className="w-3 h-3 text-emerald-700" />
                      F-Gaz UDT
                    </span>
                  </div>
                </div>

                {/* Middle: Company Legal & Slogan */}
                <div className="my-auto py-1">
                  <div className="text-xs sm:text-sm font-black text-slate-900">
                    Zielony Zając Sp. z o.o.
                  </div>
                  <div className="text-[11px] sm:text-xs text-slate-600">
                    Profesjonalny dobór, montaż w 1 dzień i serwis
                  </div>
                </div>

                {/* Bottom Section: Contact Grid */}
                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-200/80 text-[11px] sm:text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-3 h-3" />
                    </div>
                    <span>{PHONE}</span>
                  </div>

                  <div className="flex items-center gap-1.5 font-medium text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                      <Globe className="w-3 h-3" />
                    </div>
                    <span className="truncate">{WEBSITE}</span>
                  </div>

                  <div className="flex items-center gap-1.5 font-medium text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-3 h-3" />
                    </div>
                    <span className="truncate">{EMAIL}</span>
                  </div>

                  <div className="flex items-center gap-1.5 font-medium text-slate-700">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-3 h-3" />
                    </div>
                    <span className="truncate">Warszawa i Mazowsze</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* BACK CARD (REWERS) */}
          {/* ========================================================= */}
          {(activeSide === "both" || activeSide === "back") && (
            <div className="flex flex-col items-center">
              <span className="print:hidden text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Strona Tylna (Rewers z kodem QR)
              </span>

              {/* Physical Business Card Back */}
              <div
                id="card-back"
                className="w-[360px] sm:w-[440px] md:w-[480px] aspect-[85/55] bg-gradient-to-br from-emerald-950 via-slate-900 to-emerald-900 text-white rounded-2xl shadow-2xl p-6 sm:p-7 relative overflow-hidden border border-emerald-800 flex flex-col justify-between print:shadow-none print:w-[85mm] print:h-[55mm] print:p-4"
              >
                {/* Subtle Glow */}
                <div className="absolute -top-12 -right-12 w-36 h-36 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* Top Badge */}
                <div className="flex items-center justify-between text-[10px] sm:text-xs font-bold text-emerald-400 tracking-wider uppercase">
                  <span>Szybki Kontakt i Oferta</span>
                  <span>Zeskanuj Smartfonem</span>
                </div>

                {/* Middle Content: Centered QR and Quick Benefits */}
                <div className="my-auto flex items-center justify-between gap-4 py-1">
                  {/* High Resolution Sharp QR Code */}
                  <div className="bg-white p-2 sm:p-2.5 rounded-xl shadow-lg border border-emerald-400/40 flex-shrink-0">
                    <img
                      src={assetPath("/qr-hub.svg")}
                      alt="QR Hub Zielony Zając"
                      className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
                    />
                  </div>

                  {/* QR Description & What's inside */}
                  <div className="space-y-1.5 flex-1 pl-2">
                    <div className="text-xs sm:text-sm font-black text-white leading-tight">
                      Cennik, Realizacje i Kontakt w 1 kliknięcie
                    </div>
                    <p className="text-[10px] sm:text-xs text-slate-300 leading-snug">
                      Skieruj aparat telefonu na kod QR, aby natychmiast zobaczyć:
                    </p>
                    <ul className="text-[10px] sm:text-xs space-y-1 text-emerald-300 font-semibold">
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Aktualny cennik na sezon 2027
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Galerię ponad 80 montaży w Warszawie
                      </li>
                      <li className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Opinie Google i szybki kontakt
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Bottom Legal Footer */}
                <div className="pt-2 border-t border-emerald-800/80 flex items-center justify-between text-[9px] sm:text-[11px] text-slate-300 font-medium">
                  <div>
                    <span className="text-white font-bold">Zielony Zając Sp. z o.o.</span> • NIP: 1133216745
                  </div>
                  <div className="text-emerald-400 font-bold">
                    Darmowa wycena w 24h
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Action Buttons & Instructions (hidden in print) */}
        <div className="print:hidden max-w-2xl mx-auto mt-12 bg-slate-950 p-6 rounded-3xl border border-slate-800 text-center space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-400" />
            Wskazówki do wydruku dla drukarni
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
            Format wizytówki jest w standardzie europejskim <strong className="text-white">85 mm × 55 mm</strong>. Możesz kliknąć poniżej przycisk <strong className="text-white">"Drukuj / Pobierz PDF"</strong>, a w oknie drukowania wybrać orientację poziomą i opcję zapisu jako PDF w skali 100%.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-xl transition flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              Drukuj wizytówkę (lub Zapisz jako PDF)
            </button>

            <a
              href={assetPath("/qr-hub.png")}
              download="zielony-zajac-qr-hub.png"
              className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm border border-slate-700 transition flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              Pobierz plik QR-kod
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
