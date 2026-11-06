import React, { useState, useEffect } from "react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ChevronRight,
  Star,
  Zap,
  Snowflake,
  Flame,
  Wind,
  Wrench,
  Check,
  Menu,
  X,
  Layers,
} from "lucide-react";
import HubPage from "./HubPage";
import RealizacjePage, { projectObjects } from "./RealizacjePage";
import { assetPath } from "./utils";

const PHONE = "+48 513 666 450";
const EMAIL = "kontakt@zielonyzajac.pl";
const GOOGLE_MAPS_URL = "https://maps.google.com/?q=Zielony+Zajac+Klimatyzacja+Warszawa";

const BRANDS = [
  { name: "Gree", tag: "Lider niezawodności" },
  { name: "Hisense", tag: "Najlepszy stosunek ceny do jakości" },
  { name: "LG", tag: "Design i technologia Dual Inverter" },
  { name: "Panasonic", tag: "Zaawansowane oczyszczanie nanoe™ X" },
  { name: "Toshiba", tag: "Japońska trwałość i cicha praca" },
  { name: "Daikin", tag: "Klasa Premium i najwyższa sprawność" },
  { name: "Mitsubishi Electric", tag: "Maksymalny komfort bez kompromisów" },
];

const PACKAGES = [
  {
    name: "Pakiet Standard",
    badge: "Najczęściej wybierany",
    popular: true,
    examples: "Gree Pular / Hisense Energy",
    price: "3 490 zł",
    vatNote: "z montażem (8% VAT dla osób prywatnych)",
    desc: "Kompletny zestaw klimatyzacji z montażem do mieszkań do 35 m². Szybkie chłodzenie i ekonomiczne dogrzewanie.",
    features: [
      "Klimatyzator ścienny z Wi-Fi 2.5 - 3.2 kW",
      "Standardowy montaż do 3 metrów instalacji freonowej",
      "1 przewiert przez ścianę zewnętrzną",
      "Grawitacyjne odprowadzenie skroplin",
      "Podłączenie zasilania elektrycznego",
      "Próba ciśnieniowa azotem i próżniowanie",
      "Certyfikat F-Gaz i gwarancja do 5 lat",
    ],
  },
  {
    name: "Pakiet Comfort",
    badge: "Wysoka energooszczędność",
    popular: false,
    examples: "LG DualCool / Panasonic TZ",
    price: "4 290 zł",
    vatNote: "z montażem (8% VAT dla osób prywatnych)",
    desc: "Cichy split (od 19 dB) idealny do sypialni i pokoju dziecka. Zaawansowane filtry antybakteryjne.",
    features: [
      "Jednostka 2.5 - 3.5 kW klasa energetyczna A++",
      "Super cicha praca nocna (19 dB)",
      "Standardowy montaż do 4m instalacji",
      "Wibroizolatory pod agregat zewnętrzny",
      "Wbudowane zaawansowane filtry powietrza",
      "Sterowanie aplikacją ze smartfona z każdego miejsca",
      "Certyfikat F-Gaz i pełne przeszkolenie z obsługi",
    ],
  },
  {
    name: "Pakiet Premium",
    badge: "Klasa Premium",
    popular: false,
    examples: "Daikin Sensira / Mitsubishi HR",
    price: "5 490 zł",
    vatNote: "z montażem (8% VAT dla osób prywatnych)",
    desc: "Bezkompromisowa jakość japońskich producentów. Najwyższy współczynnik chłodzenia i grzania nawet przy -25°C.",
    features: [
      "Urządzenie japońskiej marki Daikin / Mitsubishi",
      "Najwyższa kultura pracy i ultra-trwały kompresor",
      "Kompleksowy montaż z estetyczną zabudową maskującą",
      "Czysty montaż bezpyłowy z odkurzaczem przemysłowym",
      "Podwójny test szczelności i uruchomienie serwisowe",
      "Priorytetowy serwis gwarancyjny",
      "5 lat pełnej gwarancji producenta",
    ],
  },
];

const DISTRICTS = [
  "Mokotów", "Wola", "Ursynów", "Wilanów", "Bemowo", "Białołęka",
  "Bielany", "Ochota", "Targówek", "Praga-Południe", "Praga-Północ",
  "Śródmieście", "Wawer", "Włochy", "Ursus", "Żoliborz", "Rembertów",
  "Wesoła", "Piaseczno", "Pruszków", "Marki", "Ząbki", "Legionowo"
];

export default function App() {
  const [currentView, setCurrentView] = useState("main"); // 'main', 'hub', 'realizacje'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roomTemp, setRoomTemp] = useState(21); // 18, 21, 24
  const [hoveredMarqueeId, setHoveredMarqueeId] = useState(null);

  // Listen to hash routes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === "#/hub" || hash === "#hub") setCurrentView("hub");
      else if (hash === "#/realizacje" || hash === "#realizacje") setCurrentView("realizacje");
      else setCurrentView("main");
    };
    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const navigateTo = (view) => {
    setCurrentView(view);
    if (view === "hub") window.location.hash = "/hub";
    else if (view === "realizacje") window.location.hash = "/realizacje";
    else {
      window.location.hash = "";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (currentView === "hub") {
    return <HubPage onGoToSite={() => navigateTo("main")} onGoToRealizacje={() => navigateTo("realizacje")} />;
  }

  if (currentView === "realizacje") {
    return <RealizacjePage onBack={() => navigateTo("main")} />;
  }

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Banner */}
      <div className="bg-emerald-950 text-emerald-100 text-xs py-2 px-4 border-b border-emerald-900">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-1 text-center sm:text-left">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Warszawa i Mazowsze • Wolne terminy na bieżący tydzień</span>
          </div>
          <div className="flex items-center gap-4 text-emerald-200">
            <span>Pn–Pt: 8:00–18:00 | Sob: 9:00–15:00</span>
            <button
              onClick={() => navigateTo("hub")}
              className="text-white hover:text-emerald-300 font-bold underline underline-offset-2 transition"
            >
              Wersja Mobilna QR
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => navigateTo("main")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="h-12 w-auto flex items-center justify-center group-hover:scale-105 transition">
              <img
                src={assetPath("/zielony-zajac-logo.svg")}
                alt="Zielony Zając"
                className="h-11 w-auto object-contain"
              />
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-600">
            <a href="#oferta" className="hover:text-emerald-600 transition">Zakres Usług</a>
            <button onClick={() => navigateTo("realizacje")} className="hover:text-emerald-600 transition">
              Realizacje (80+)
            </button>
            <a href="#cennik" className="hover:text-emerald-600 transition">Cennik 2026/2027</a>
            <a href="#dlaczego-my" className="hover:text-emerald-600 transition">Dlaczego My</a>
            <a href="#dzielnice" className="hover:text-emerald-600 transition">Dzielnice</a>
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-amber-600 hover:text-amber-700 font-bold transition"
            >
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              Opinie 5.0
            </a>
          </nav>

          {/* Action Call Button */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`tel:${PHONE.replace(/\s+/g, "")}`}
              className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md hover:shadow-emerald-600/30 transition flex items-center gap-2 group"
            >
              <Phone className="w-4 h-4 text-emerald-100 group-hover:animate-bounce" />
              <span>{PHONE}</span>
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-5 space-y-3">
            <a
              href="#oferta"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-semibold text-slate-700 py-1"
            >
              Zakres Usług
            </a>
            <button
              onClick={() => { setMobileMenuOpen(false); navigateTo("realizacje"); }}
              className="block text-left w-full text-base font-semibold text-slate-700 py-1"
            >
              Realizacje (80+ zdjęć)
            </button>
            <a
              href="#cennik"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-semibold text-slate-700 py-1"
            >
              Cennik 2026/2027
            </a>
            <a
              href="#dlaczego-my"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-semibold text-slate-700 py-1"
            >
              Dlaczego My
            </a>
            <a
              href="#dzielnice"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-semibold text-slate-700 py-1"
            >
              Dzielnice Warszawy
            </a>
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <a
                href={`tel:${PHONE.replace(/\s+/g, "")}`}
                className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold text-center flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                Zadzwoń: {PHONE}
              </a>
              <button
                onClick={() => { setMobileMenuOpen(false); navigateTo("hub"); }}
                className="w-full py-2.5 rounded-xl bg-slate-100 text-slate-800 font-semibold text-sm text-center"
              >
                Otwórz widok QR Hub
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-emerald-50/60 via-white to-slate-50 pt-10 sm:pt-16 pb-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 border border-emerald-200 text-emerald-900 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Autoryzowany instalator • Certyfikat F-Gaz
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[46px] font-black text-slate-900 leading-[1.15] tracking-tight">
              Montaż i Serwis Klimatyzacji Warszawa
              <span className="block text-emerald-600 mt-1 sm:mt-2">
                Czysto, Szybko, w 1 Dzień.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Kompleksowy montaż klimatyzacji do mieszkań, domów i lokali. Bezpłatny dobór mocy, bezpyłowe wiercenie diamentowe i gwarancja do 5 lat.
            </p>

            {/* Quick Benefits Tags */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
                <Check className="w-4 h-4 text-emerald-600" />
                Montaż w 1 dzień roboczy
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
                <Check className="w-4 h-4 text-emerald-600" />
                Stawka 8% VAT (osoby prywatne)
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm">
                <Check className="w-4 h-4 text-emerald-600" />
                Brak ukrytych kosztów
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <a
                href={`tel:${PHONE.replace(/\s+/g, "")}`}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-base shadow-xl hover:shadow-emerald-600/30 transition flex items-center justify-center gap-3 transform hover:-translate-y-0.5"
              >
                <Phone className="w-5 h-5 text-emerald-100" />
                Zadzwoń teraz: {PHONE}
              </a>
              <a
                href="#cennik"
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-base border border-slate-300 shadow-sm transition flex items-center justify-center gap-2"
              >
                Sprawdź Cennik
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </a>
            </div>
          </div>

          {/* Right Interactive Cooling Room Component */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl bg-white border border-slate-200/80 shadow-2xl p-4 sm:p-5 overflow-hidden">
              {/* Room Illustration with switchable temperature */}
              <div className="relative rounded-2xl aspect-[4/3] overflow-hidden bg-slate-100 border border-slate-100">
                <img
                  src={
                    roomTemp === 18 
                      ? assetPath("/hero-cool-room.png") 
                      : roomTemp === 24 
                      ? assetPath("/hero-hot-room.png") 
                      : assetPath("/hero-airflow-room.png")
                  }
                  alt="Komfort w pomieszczeniu"
                  className="w-full h-full object-cover transition-all duration-500"
                />

                {/* Status Badges on Image */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/50 shadow-sm text-xs font-bold text-slate-800 flex items-center gap-1.5">
                  <Wind className="w-4 h-4 text-emerald-600 animate-spin" />
                  dobór mocy + montaż + serwis
                </div>

                <div className="absolute top-3 right-3 bg-emerald-600/95 backdrop-blur-md text-white px-3 py-1 rounded-xl shadow-md text-[11px] font-bold">
                  Komfort gotowy
                </div>

                {/* Temperature overlay pill */}
                <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-slate-100 flex items-center gap-3">
                  <div className={`p-2 rounded-xl ${roomTemp <= 21 ? 'bg-cyan-100 text-cyan-700' : 'bg-amber-100 text-amber-700'}`}>
                    {roomTemp <= 21 ? <Snowflake className="w-5 h-5 animate-pulse" /> : <Flame className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="text-xl font-black text-slate-900 leading-none">
                      {roomTemp}°C
                    </div>
                    <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-0.5">
                      {roomTemp === 18 ? "Mocne chłodzenie" : roomTemp === 21 ? "Optymalny komfort" : "Ciepły nawiew"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Temperature Control Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Efekt chłodzenia:
                </span>
                <div className="flex gap-2">
                  {[
                    { temp: 18, label: "18°C Chłód" },
                    { temp: 21, label: "21°C Eko" },
                    { temp: 24, label: "24°C Grzanie" },
                  ].map((btn) => (
                    <button
                      key={btn.temp}
                      onClick={() => setRoomTemp(btn.temp)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                        roomTemp === btn.temp
                          ? "bg-emerald-600 text-white shadow"
                          : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Ticker */}
      <section className="border-y border-slate-200/80 bg-slate-50/70 py-8 px-4 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-5">
            <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-800">
              Pracujemy wyłącznie na sprawdzonych markach klimatyzatorów
            </span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6">
            {BRANDS.map((brand, idx) => (
              <div
                key={idx}
                className="px-4 py-2.5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-2 hover:border-emerald-300 transition"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-extrabold text-sm sm:text-base text-slate-800">
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scope of Services */}
      <section id="oferta" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Oferta dla Warszawy i okolic
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3">
              Kompleksowy Montaż i Serwis
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              Specjalizujemy się w estetycznych instalacjach chłodniczych. Żadnych wiszących kabli czy krzywo poprowadzonych rur.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 1. Mieszkania */}
            <div className="bg-slate-50/80 rounded-3xl p-6 border border-slate-200/80 hover:border-emerald-300 hover:shadow-xl transition flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl mb-5 group-hover:scale-110 transition">
                  🏢
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Klimatyzacja w Mieszkaniu
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Bloki, kamienice, nowe osiedla deweloperskie. Pomagamy w formalnościach ze spółdzielnią i montujemy bezpyłowo na gotowych ścianach.
                </p>
                <ul className="mt-4 space-y-2 text-xs font-semibold text-slate-700">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Wiercenie diamentowe z odsysaniem
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Odprowadzenie skroplin na balkon
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">od 3 490 zł z montażem</span>
                <a href={`tel:${PHONE.replace(/\s+/g, "")}`} className="text-emerald-700 hover:text-emerald-800 font-bold text-xs flex items-center gap-1">
                  Zapytaj <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* 2. Domy */}
            <div className="bg-slate-50/80 rounded-3xl p-6 border border-slate-200/80 hover:border-emerald-300 hover:shadow-xl transition flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl mb-5 group-hover:scale-110 transition">
                  🏡
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Domy Jednorodzinne
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Systemy Multi-Split z jedną jednostką zewnętrzną zasilającą kilka pomieszczeń (salon, gabinet, sypialnie). Oszczędność energii i estetyka elewacji.
                </p>
                <ul className="mt-4 space-y-2 text-xs font-semibold text-slate-700">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Indywidualne sterowanie w każdym pokoju
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Efektywne dogrzewanie zimą
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">Wycena indywidualna</span>
                <a href={`tel:${PHONE.replace(/\s+/g, "")}`} className="text-emerald-700 hover:text-emerald-800 font-bold text-xs flex items-center gap-1">
                  Zapytaj <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* 3. Biura */}
            <div className="bg-slate-50/80 rounded-3xl p-6 border border-slate-200/80 hover:border-emerald-300 hover:shadow-xl transition flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl mb-5 group-hover:scale-110 transition">
                  💼
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Biura i Lokale Usługowe
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Klimatyzatory ścienne i kasetonowe dla gabinetów, salonów urody, sklepów i biur. Praca w dogodnych godzinach bez zakłócania pracy personelu.
                </p>
                <ul className="mt-4 space-y-2 text-xs font-semibold text-slate-700">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Pełna faktura VAT 23%
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Możliwy montaż weekendowy
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">Oferta dla firm</span>
                <a href={`tel:${PHONE.replace(/\s+/g, "")}`} className="text-emerald-700 hover:text-emerald-800 font-bold text-xs flex items-center gap-1">
                  Zapytaj <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* 4. Serwis */}
            <div className="bg-slate-50/80 rounded-3xl p-6 border border-slate-200/80 hover:border-emerald-300 hover:shadow-xl transition flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl mb-5 group-hover:scale-110 transition">
                  🛡️
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Serwis i Odgrzybianie
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                  Okresowe czyszczenie parowe, dezynfekcja chemiczna, pomiary ciśnienia czynnika chłodniczego i wymiana filtrów. Bezpieczeństwo i świeże powietrze.
                </p>
                <ul className="mt-4 space-y-2 text-xs font-semibold text-slate-700">
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Usunięcie pleśni i bakterii
                  </li>
                  <li className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Utrzymanie gwarancji producenta
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500">od 250 zł</span>
                <a href={`tel:${PHONE.replace(/\s+/g, "")}`} className="text-emerald-700 hover:text-emerald-800 font-bold text-xs flex items-center gap-1">
                  Zamów serwis <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee Realizations Accordion Preview (Directly after Services) */}
      <section className="py-14 bg-slate-900 text-white overflow-hidden relative">
        <div className="max-w-6xl mx-auto px-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase font-extrabold tracking-wider text-emerald-400">
              <Sparkles className="w-4 h-4" />
              Nasze Realizacje • Zdjęcia z montaży w Warszawie
            </div>
            <h2 className="text-2xl sm:text-3xl font-black mt-1">
              Zobacz wykonane realizacje z harmonijką ujęć
            </h2>
          </div>
          <button
            onClick={() => navigateTo("realizacje")}
            className="px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition flex items-center gap-2 whitespace-nowrap"
          >
            Wszystkie obiekty i zdjęcia (80+)
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Scrolling Cards Accordion Preview */}
        <div className="relative w-full overflow-x-auto no-scrollbar py-2">
          <div className="flex gap-5 px-4 min-w-max">
            {projectObjects.map((obj) => (
              <div
                key={obj.id}
                onClick={() => navigateTo("realizacje")}
                onMouseEnter={() => setHoveredMarqueeId(obj.id)}
                onMouseLeave={() => setHoveredMarqueeId(null)}
                className="group relative w-72 sm:w-80 rounded-2xl overflow-hidden bg-slate-800 border border-slate-700/60 shadow-lg cursor-pointer transform hover:-translate-y-1 transition duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
                  <img
                    src={obj.photos[0]}
                    alt={obj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                  {/* Mini floating accordion previews on hover */}
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between bg-slate-950/80 backdrop-blur-md p-1 rounded-xl border border-white/10">
                    <div className="flex gap-1">
                      {obj.photos.slice(0, 3).map((p, idx) => (
                        <div key={idx} className="w-6 h-6 rounded-md overflow-hidden border border-white/30">
                          <img src={p} alt="" className="w-full h-full object-cover" />
                        </div>
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
                      <Layers className="w-3 h-3" />
                      {obj.photos.length} zdjęcia
                    </span>
                  </div>
                </div>
                <div className="p-3 bg-slate-800/95 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200 line-clamp-1">{obj.title}</span>
                  <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-0.5 ml-2 flex-shrink-0">
                    Otwórz <ExternalLink className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section (Cennik 2026/2027) */}
      <section id="cennik" className="py-20 px-4 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-700 bg-emerald-100 px-3.5 py-1 rounded-full">
              Przejrzysty cennik na sezon 2026 / 2027
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3">
              Pakiety z Montażem «Pod Klucz»
            </h2>
            <p className="mt-3 text-slate-600 text-base">
              Podajemy realne ceny z dostawą i kompletnym montażem. Bez ukrytych dopłat na miejscu.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {PACKAGES.map((pkg, idx) => (
              <div
                key={idx}
                className={`rounded-3xl p-7 flex flex-col justify-between transition duration-300 ${
                  pkg.popular
                    ? "bg-white border-2 border-emerald-600 shadow-xl relative"
                    : "bg-white border border-slate-200 shadow-sm hover:shadow-md"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs font-black uppercase tracking-wider px-4 py-1 rounded-full shadow">
                    {pkg.badge}
                  </div>
                )}

                <div>
                  <div className="text-sm font-bold text-slate-500 uppercase tracking-wider">
                    {pkg.examples}
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mt-1">
                    {pkg.name}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {pkg.desc}
                  </p>

                  <div className="my-6 py-4 border-y border-slate-100">
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-bold text-slate-500">od</span>
                      <span className="text-4xl font-black text-slate-900">{pkg.price}</span>
                    </div>
                    <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                      {pkg.vatNote}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="text-xs font-extrabold uppercase tracking-wider text-slate-800">
                      W pakiecie otrzymujesz:
                    </div>
                    {pkg.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4">
                  <a
                    href={`tel:${PHONE.replace(/\s+/g, "")}`}
                    className={`w-full py-3.5 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition ${
                      pkg.popular
                        ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg"
                        : "bg-slate-100 hover:bg-emerald-50 text-slate-900 hover:text-emerald-700"
                    }`}
                  >
                    <Phone className="w-4 h-4" />
                    Wybierz pakiet – Zadzwoń
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Standard installation note */}
          <div className="mt-12 bg-white rounded-2xl p-6 border border-slate-200 text-xs text-slate-600 max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-4">
            <div className="p-3 bg-emerald-50 rounded-xl text-emerald-700 font-bold text-xl">
              ℹ️
            </div>
            <div>
              <span className="font-bold text-slate-800">Co wchodzi w montaż standardowy?</span>{" "}
              Dostarczenie urządzeń, wykonanie przewiertu diamentowego (do 40 cm), ułożenie instalacji freonowej do 3 m w korytku maskującym, zawieszenie jednostki wewnętrznej i agregatu na wibroizolatorach, wykonanie próżni, test szczelności azotem oraz uruchomienie i instruktaż obsługi.
            </div>
          </div>
        </div>
      </section>

      {/* Why Us (Dlaczego Zielony Zając) */}
      <section id="dlaczego-my" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
              Bezpieczeństwo i Profesjonalizm
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3">
              Dlaczego Klienci Wybierają Zielony Zając?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl mb-4">
                📜
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Certyfikat F-Gaz</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Posiadamy państwowe uprawnienia UDT F-Gaz. Montaż jest w 100% legalny, co gwarantuje pełną ochronę gwarancyjną producenta.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl mb-4">
                🧹
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Montaż Bezpyłowy</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Wiercimy wiertnicą diamentową ze stałym odsysaniem pyłu. Twoje meble, ściany i podłogi pozostają idealnie czyste.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl mb-4">
                ⚡
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Realizacja w 1 Dzień</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Standardowy montaż klimatyzacji split trwa od 3 do 5 godzin. Przyjeżdżamy rano, a popołudniu cieszysz się chłodem.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xl mb-4">
                🛡️
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Do 5 Lat Gwarancji</h3>
              <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                Zapewniamy pełną gwarancję na sprzęt oraz wykonaną usługę montażu wraz z regularnymi przeglądami serwisowymi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Warsaw Districts SEO Section */}
      <section id="dzielnice" className="py-16 px-4 bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
              Lokalny montaż w Warszawie
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-3">
              Gdzie Realizujemy Usługi Montażu?
            </h2>
            <p className="mt-2 text-slate-600 text-sm">
              Dojazd na bezpłatną wizję lokalną oraz montaż realizujemy we wszystkich 18 dzielnicach Warszawy oraz okolicznych miejscowościach:
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {DISTRICTS.map((district, idx) => (
              <span
                key={idx}
                className="px-3 py-1.5 rounded-xl bg-white border border-slate-200/80 text-slate-700 text-xs font-semibold hover:border-emerald-400 hover:text-emerald-700 transition shadow-2xs"
              >
                📍 Klimatyzacja Warszawa {district}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Google Reviews CTA Banner */}
      <section className="py-16 px-4 bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-950 text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 px-3.5 py-1 rounded-full text-xs font-bold mb-4">
            <Star className="w-4 h-4 fill-current text-amber-400" />
            Średnia ocena 5.0 w Google Maps
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            Zaufaj sprawdzonym specjalistom od klimatyzacji
          </h2>
          <p className="mt-3 text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Sprawdź opinie naszych klientów lub zadzwoń, by umówić dogodny termin montażu w Twoim mieszkaniu.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href={`tel:${PHONE.replace(/\s+/g, "")}`}
              className="px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-base shadow-lg transition flex items-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Zadzwoń: {PHONE}
            </a>
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-base border border-white/20 transition flex items-center gap-2"
            >
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              Zobacz opinie w Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-12 px-4 text-xs border-t border-slate-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src={assetPath("/zielony-zajac-logo.svg")} alt="Logo" className="h-9 w-auto filter brightness-200" />
            </div>
            <p className="text-slate-400 leading-relaxed">
              Zielony Zając Sp. z o.o.<br />
              NIP: 1133216745<br />
              Profesjonalny montaż, serwis i odgrzybianie klimatyzacji na terenie Warszawy i Mazowsza.
            </p>
          </div>

          <div>
            <div className="font-bold text-white text-sm mb-3">Kontakt Bezpośredni</div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-4 h-4 text-emerald-400" />
                <a href={`tel:${PHONE.replace(/\s+/g, "")}`} className="hover:text-white font-semibold">
                  {PHONE}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Mail className="w-4 h-4 text-emerald-400" />
                <a href={`mailto:${EMAIL}`} className="hover:text-white">
                  {EMAIL}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Clock className="w-4 h-4 text-emerald-400" />
                <span>Pn–Pt: 8:00–18:00 | Sob: 9:00–15:00</span>
              </div>
            </div>
          </div>

          <div>
            <div className="font-bold text-white text-sm mb-3">Szybkie Linki</div>
            <div className="space-y-1.5">
              <div><button onClick={() => navigateTo("hub")} className="hover:text-emerald-400">Strona QR Hub dla Klienta</button></div>
              <div><button onClick={() => navigateTo("realizacje")} className="hover:text-emerald-400">Wszystkie Realizacje (80+ zdjęć)</button></div>
              <div><a href="#cennik" className="hover:text-emerald-400">Cennik 2026/2027</a></div>
              <div><a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">Wizytówka Google</a></div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-slate-500 gap-2">
          <div>© {new Date().getFullYear()} Zielony Zając Sp. z o.o. Wszelkie prawa zastrzeżone.</div>
          <div>Domenę obsługuje Cyberfolks • Warszawa, Mazowieckie</div>
        </div>
      </footer>

      {/* Floating Sticky Call Button */}
      <div className="fixed bottom-5 right-5 z-50">
        <a
          href={`tel:${PHONE.replace(/\s+/g, "")}`}
          className="flex items-center gap-2.5 px-5 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm shadow-2xl hover:scale-105 active:scale-95 transition border-2 border-emerald-400/40"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          <Phone className="w-4 h-4" />
          <span>Zadzwoń teraz</span>
        </a>
      </div>
    </div>
  );
}
