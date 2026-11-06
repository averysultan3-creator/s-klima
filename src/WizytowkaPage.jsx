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
  Download,
  Sparkles,
  Award,
  Crop,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { assetPath } from "./utils";

const PHONE = "+48 513 666 450";
const EMAIL = "kontakt@zielonyzajac.pl";
const WEBSITE = "zielonyzajac.pl";
const HUB_URL = "https://averysultan3-creator.github.io/s-klima/hub/";

export default function WizytowkaPage({ onBack }) {
  const [copied, setCopied] = useState(false);
  const [activeSide, setActiveSide] = useState("both"); // "both" | "front" | "back"
  const [showCropMarks, setShowCropMarks] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans selection:bg-emerald-500 selection:text-white pb-24">
      {/* Top Bar (hidden during print) */}
      <header className="print:hidden sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:text-emerald-600 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Powrót na stronę główną
          </button>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setShowCropMarks(!showCropMarks)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
                showCropMarks
                  ? "bg-emerald-50 text-emerald-800 border-emerald-300 shadow-xs"
                  : "bg-white text-slate-600 hover:text-slate-900 border-slate-200"
              }`}
              title="Pokaż linie i znaczniki cięcia dla drukarni"
            >
              <Crop className="w-3.5 h-3.5" />
              <span>{showCropMarks ? "Ukryj linie cięcia" : "Linie cięcia (Drukarnia)"}</span>
            </button>

            <button
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 border border-slate-200 transition cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? "Skopiowano" : "Kopiuj link"}</span>
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-xs font-bold text-white shadow-sm transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Drukuj / PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* Intro Header (hidden during print) */}
      <div className="print:hidden max-w-4xl mx-auto px-4 pt-10 pb-6 text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-3 border border-emerald-200">
          <Award className="w-4 h-4 text-emerald-600" />
          Oficjalna Wizytówka Firmowa • Format Standard 85 × 55 mm
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Wizytówka Zielony Zając Sp. z o.o.
        </h1>
        <p className="mt-2 text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Jednolity, elegancki styl na białym tle z zielonym i czarnym tekstem. Zaprojektowana z myślą o fizycznym druku na wizytówkach (kreda mat 350g/soft-touch) z kodem QR do mobilnego cennika.
        </p>

        {/* View Switcher */}
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setActiveSide("both")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeSide === "both"
                ? "bg-emerald-700 text-white shadow"
                : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
            }`}
          >
            Obie strony (Przód i Tył)
          </button>
          <button
            onClick={() => setActiveSide("front")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeSide === "front"
                ? "bg-emerald-700 text-white shadow"
                : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
            }`}
          >
            Tylko Przód (Awers)
          </button>
          <button
            onClick={() => setActiveSide("back")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
              activeSide === "back"
                ? "bg-emerald-700 text-white shadow"
                : "bg-white text-slate-700 hover:bg-slate-50 border border-slate-200"
            }`}
          >
            Tylko Tył (Rewers z QR)
          </button>
        </div>
      </div>

      {/* CARDS DISPLAY CONTAINER */}
      <div className="max-w-5xl mx-auto px-4 py-6 print:p-0 print:m-0">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 print:flex-col print:gap-8 print:items-center">
          
          {/* ========================================================= */}
          {/* FRONT CARD (AWERS) - Pure White Minimalist Luxury */}
          {/* ========================================================= */}
          {(activeSide === "both" || activeSide === "front") && (
            <div className="flex flex-col items-center">
              <span className="print:hidden text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2.5">
                Strona Przednia (Awers)
              </span>

              {/* Crop marks wrapper */}
              <div className={`relative ${showCropMarks ? "p-3 border border-dashed border-slate-400 bg-white" : ""}`}>
                {showCropMarks && (
                  <span className="print:hidden absolute -top-5 left-0 text-[10px] font-bold text-slate-400">
                    Format brutto z marginesem cięcia
                  </span>
                )}

                {/* Physical Business Card: 85x55 ratio */}
                <div
                  id="card-front"
                  className="w-[360px] sm:w-[440px] md:w-[480px] aspect-[85/55] bg-white text-slate-900 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 p-6 sm:p-7 relative overflow-hidden border border-slate-200/90 flex flex-col justify-between print:shadow-none print:border print:border-slate-300 print:w-[85mm] print:h-[55mm] print:p-4 print:rounded-none"
                >
                  {/* Subtle Emerald Top Accent Line (2.5mm) */}
                  <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600" />
                  
                  {/* Top Row: Logo */}
                  <div className="flex items-start justify-between">
                    <div>
                      <img
                        src={assetPath("/zielony-zajac-logo.jpg")}
                        alt="Zielony Zając"
                        className="h-11 sm:h-12 w-auto object-contain rounded"
                      />
                      <div className="mt-1.5 text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-emerald-700">
                        Montaż i Serwis Klimatyzacji
                      </div>
                    </div>
                  </div>

                  {/* Middle: Company Name & Core Promise */}
                  <div className="my-auto py-1">
                    <h2 className="text-base sm:text-lg font-black text-slate-950 tracking-tight leading-snug">
                      Zielony Zając Sp. z o.o.
                    </h2>
                    <p className="text-[11px] sm:text-xs text-slate-600 font-medium mt-0.5">
                      Profesjonalny dobór mocy • Bezpyłowy montaż w 1 dzień • Gwarancja do 5 lat
                    </p>
                  </div>

                  {/* Bottom: Contact Details (Strict Corporate Black & Emerald) */}
                  <div className="grid grid-cols-2 gap-2.5 pt-3 border-t border-slate-200 text-[11px] sm:text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-800 flex items-center justify-center flex-shrink-0 border border-emerald-200/60">
                        <Phone className="w-3 h-3 text-emerald-700" />
                      </div>
                      <span className="font-black text-slate-900 tracking-tight">{PHONE}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-800 flex items-center justify-center flex-shrink-0 border border-emerald-200/60">
                        <Globe className="w-3 h-3 text-emerald-700" />
                      </div>
                      <span className="font-bold text-slate-800 truncate">{WEBSITE}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-800 flex items-center justify-center flex-shrink-0 border border-emerald-200/60">
                        <Mail className="w-3 h-3 text-emerald-700" />
                      </div>
                      <span className="font-semibold text-slate-700 truncate">{EMAIL}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-md bg-emerald-50 text-emerald-800 flex items-center justify-center flex-shrink-0 border border-emerald-200/60">
                        <MapPin className="w-3 h-3 text-emerald-700" />
                      </div>
                      <span className="font-semibold text-slate-700 truncate">Warszawa i Mazowsze</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================= */}
          {/* BACK CARD (REWERS) - Pure White Matching Awers with QR */}
          {/* ========================================================= */}
          {(activeSide === "both" || activeSide === "back") && (
            <div className="flex flex-col items-center">
              <span className="print:hidden text-xs font-extrabold uppercase tracking-wider text-slate-500 mb-2.5">
                Strona Tylna (Rewers z kodem QR)
              </span>

              {/* Crop marks wrapper */}
              <div className={`relative ${showCropMarks ? "p-3 border border-dashed border-slate-400 bg-white" : ""}`}>
                {showCropMarks && (
                  <span className="print:hidden absolute -top-5 left-0 text-[10px] font-bold text-slate-400">
                    Format brutto z marginesem cięcia
                  </span>
                )}

                {/* Physical Business Card Back: Pure White Matching Awers */}
                <div
                  id="card-back"
                  className="w-[360px] sm:w-[440px] md:w-[480px] aspect-[85/55] bg-white text-slate-900 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 p-6 sm:p-7 relative overflow-hidden border border-slate-200/90 flex flex-col justify-between print:shadow-none print:border print:border-slate-300 print:w-[85mm] print:h-[55mm] print:p-4 print:rounded-none"
                >
                  {/* Subtle Emerald Bottom Accent Line */}
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600" />

                  {/* Top Header: Clear Action Invitation */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <div>
                      <div className="text-[10px] sm:text-xs font-black uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        Zeskanuj aparat telefonu
                      </div>
                      <div className="text-xs sm:text-sm font-extrabold text-slate-900 mt-0.5">
                        Cennik, Realizacje i Kontakt w 1 kliknięcie
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                        QR Portal
                      </span>
                    </div>
                  </div>

                  {/* Middle Content: Large High-Resolution QR + 3 Value Bullets */}
                  <div className="my-auto flex items-center justify-between gap-4 py-2">
                    {/* Razor-sharp QR Code on Pure White with crisp border */}
                    <div className="bg-white p-2 rounded-xl border-2 border-emerald-600/30 shadow-xs flex-shrink-0">
                      <img
                        src={assetPath("/qr-hub.svg")}
                        alt="QR Hub Zielony Zając"
                        className="w-24 h-24 sm:w-28 sm:h-28 object-contain"
                      />
                    </div>

                    {/* Description Bullets */}
                    <div className="space-y-1.5 flex-1 pl-1">
                      <div className="text-[11px] sm:text-xs text-slate-600 font-medium">
                        Skieruj aparat telefonu na kod QR, aby natychmiast zobaczyć:
                      </div>

                      <ul className="text-[10px] sm:text-[11px] space-y-1 text-slate-900 font-bold">
                        <li className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span>Oficjalny cennik na sezon 2027</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span>Galerię ponad 100 montaży w Warszawie</span>
                        </li>
                        <li className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                          <span>Opinie Google (5.0 ★) i szybki kontakt</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Bottom Legal / Company Footer (Strict Black / Emerald) */}
                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between text-[10px] sm:text-[11px] font-medium text-slate-600">
                    <div>
                      <strong className="text-slate-900 font-black">Zielony Zając Sp. z o.o.</strong> • NIP: 1133216745
                    </div>
                    <div className="text-emerald-700 font-bold">
                      Dojazd i wycena w 24h
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Action Panel & Print Guidelines (hidden in print) */}
        <div className="print:hidden max-w-2xl mx-auto mt-12 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-md text-center space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 mx-auto">
            <Printer className="w-6 h-6" />
          </div>

          <h3 className="text-xl font-black text-slate-900">
            Gotowe do wydruku w drukarni
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-lg mx-auto">
            Wizytówki posiadają standardowy wymiar <strong className="text-slate-900">85 mm × 55 mm</strong>. Obie strony są w jednolitym białym stylu z czarno-zieloną typografią. Kliknij przycisk poniżej, aby wydrukować lub zapisać jako PDF w skali 100%.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              Drukuj wizytówkę (lub Zapisz jako PDF)
            </button>

            <a
              href={assetPath("/qr-hub.svg")}
              download="zielony-zajac-qr.svg"
              className="px-5 py-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-sm border border-slate-200 transition flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-emerald-600" />
              Pobierz wektorowy QR (SVG)
            </a>

            <a
              href={assetPath("/qr-hub.png")}
              download="zielony-zajac-qr.png"
              className="px-5 py-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-800 font-bold text-sm border border-slate-200 transition flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-emerald-600" />
              Pobierz QR (PNG 600px)
            </a>
          </div>

          <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-100">
            Zalecany papier: Kreda matowa 350g lub 400g z uszlachetnieniem Soft Touch.
          </div>
        </div>
      </div>
    </div>
  );
}
