import React, { useState, useEffect, useRef } from "react";
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
  ChevronLeft,
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
  Send,
} from "lucide-react";
import HubPage from "./HubPage";
import RealizacjePage, { projectObjects } from "./RealizacjePage";
import CennikPage from "./CennikPage";
import OriginalHeroRoom from "./OriginalHeroRoom";
import RodoModal from "./RodoModal";
import { assetPath } from "./utils";

const PHONE = "+48 513 666 450";
const EMAIL = "kontakt@zielonyzajac.pl";
const GOOGLE_MAPS_URL = "https://maps.google.com/?q=Zielony+Zajac+Klimatyzacja+Warszawa";

const BRAND_LOGOS = [
  { name: "Gree", logo: "/brands/gree.svg" },
  { name: "Samsung", logo: "/brands/samsung.svg" },
  { name: "Hisense", logo: "/brands/hisense.svg" },
  { name: "LG", logo: "/brands/lg.svg" },
  { name: "Panasonic", logo: "/brands/panasonic.svg" },
  { name: "Toshiba", logo: "/brands/toshiba.svg" },
  { name: "Daikin", logo: "/brands/daikin.svg" },
  { name: "Mitsubishi Electric", logo: "/brands/mitsubishi.svg" },
];

const PACKAGES = [
  {
    id: "standard",
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
    id: "comfort",
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
    id: "premium",
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
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSubject, setModalSubject] = useState("");
  const [contactSuccess, setContactSuccess] = useState(false);
  const [userPhoneInput, setUserPhoneInput] = useState("");
  const [rodoOpen, setRodoOpen] = useState(false);
  const [showAllDistricts, setShowAllDistricts] = useState(false);

  const galleryRef = useRef(null);

  // Listen to hash routes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === "#/hub" || hash === "#hub") setCurrentView("hub");
      else if (hash === "#/realizacje" || hash === "#realizacje") setCurrentView("realizacje");
      else if (hash === "#/cennik" || hash === "#cennik") setCurrentView("cennik");
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
    else if (view === "cennik") window.location.hash = "/cennik";
    else {
      window.location.hash = "";
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleOpenContactModal = (subject) => {
    setModalSubject(subject || "Zapytanie o montaż klimatyzacji");
    setContactSuccess(false);
    setUserPhoneInput("");
    setModalOpen(true);
  };

  const handleScrollGallery = (direction) => {
    if (galleryRef.current) {
      const scrollAmount = direction === "left" ? -340 : 340;
      galleryRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  const handleQuickLeadSubmit = (e) => {
    e.preventDefault();
    if (userPhoneInput.trim().length > 5) {
      setContactSuccess(true);
    }
  };

  if (currentView === "hub") {
    return <HubPage onGoToSite={() => navigateTo("main")} onGoToRealizacje={() => navigateTo("realizacje")} onGoToCennik={() => navigateTo("cennik")} />;
  }

  if (currentView === "realizacje") {
    return <RealizacjePage onBack={() => navigateTo("main")} />;
  }

  if (currentView === "cennik") {
    return <CennikPage onBack={() => navigateTo("main")} onOpenOrder={(sub) => handleOpenContactModal(sub)} />;
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
          {/* Authentic Logo */}
          <div 
            onClick={() => navigateTo("main")}
            className="flex items-center cursor-pointer group"
          >
            <div className="h-14 w-auto flex items-center group-hover:scale-105 transition">
              <img
                src={assetPath("/zielony-zajac-logo.jpg")}
                alt="Zielony Zając"
                className="h-12 w-auto object-contain rounded-lg"
              />
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-slate-600">
            <a href="#oferta" className="hover:text-emerald-600 transition">Zakres Usług</a>
            <button onClick={() => navigateTo("cennik")} className="hover:text-emerald-600 transition cursor-pointer font-bold text-emerald-800">
              Cennik 2027
            </button>
            <button onClick={() => navigateTo("realizacje")} className="hover:text-emerald-600 transition cursor-pointer">
              Realizacje (80+)
            </button>
            <a href="#dlaczego-my" className="hover:text-emerald-600 transition">Dlaczego My</a>
            <a href="#faq" className="hover:text-emerald-600 transition">FAQ</a>
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
              <button
                onClick={() => navigateTo("cennik")}
                className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-base border border-slate-300 shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
              >
                Zobacz Cennik 2027
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>
            </div>
          </div>

          {/* Right Interactive Cooling Room Component */}
          <div className="lg:col-span-5 relative">
            <OriginalHeroRoom />
          </div>
        </div>
      </section>

      {/* Endless Marquee Brand Logos (Continuous ticker) */}
      <section className="border-y border-slate-200/80 bg-slate-50/70 py-6 overflow-hidden">
        <div className="text-center mb-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-800">
            Pracujemy wyłącznie na sprawdzonych markach klimatyzatorów
          </span>
        </div>
        
        {/* Infinite scrolling marquee track */}
        <div className="relative w-full overflow-hidden flex items-center">
          <div className="animate-marquee flex items-center gap-8 py-2">
            {[...BRAND_LOGOS, ...BRAND_LOGOS, ...BRAND_LOGOS].map((brand, idx) => (
              <div
                key={idx}
                className="h-16 px-6 py-2 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center min-w-[150px] hover:border-emerald-400 transition"
              >
                <img
                  src={assetPath(brand.logo)}
                  alt={brand.name}
                  className="max-h-9 max-w-[120px] object-contain"
                  loading="lazy"
                />
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
                <button
                  onClick={() => handleOpenContactModal("Klimatyzacja w Mieszkaniu")}
                  className="text-emerald-700 hover:text-emerald-800 font-bold text-xs flex items-center gap-1 cursor-pointer"
                >
                  Zapytaj <ArrowRight className="w-3.5 h-3.5" />
                </button>
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
                <button
                  onClick={() => handleOpenContactModal("Domy Jednorodzinne (Multi-Split)")}
                  className="text-emerald-700 hover:text-emerald-800 font-bold text-xs flex items-center gap-1 cursor-pointer"
                >
                  Zapytaj <ArrowRight className="w-3.5 h-3.5" />
                </button>
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
                <button
                  onClick={() => handleOpenContactModal("Biura i Lokale Usługowe")}
                  className="text-emerald-700 hover:text-emerald-800 font-bold text-xs flex items-center gap-1 cursor-pointer"
                >
                  Zapytaj <ArrowRight className="w-3.5 h-3.5" />
                </button>
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
                <button
                  onClick={() => handleOpenContactModal("Serwis i Odgrzybianie klimatyzacji")}
                  className="text-emerald-700 hover:text-emerald-800 font-bold text-xs flex items-center gap-1 cursor-pointer"
                >
                  Zamów serwis <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Carousel with Side Arrows and clean container */}
      <section className="py-16 bg-slate-900 text-white relative">
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

          <div className="flex items-center gap-3">
            {/* Carousel Side Navigation Arrows */}
            <button
              onClick={() => handleScrollGallery("left")}
              aria-label="Poprzednie"
              className="w-11 h-11 rounded-full bg-slate-800 hover:bg-emerald-600 text-white flex items-center justify-center border border-slate-700 shadow-md transition cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => handleScrollGallery("right")}
              aria-label="Następne"
              className="w-11 h-11 rounded-full bg-slate-800 hover:bg-emerald-600 text-white flex items-center justify-center border border-slate-700 shadow-md transition cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            <button
              onClick={() => navigateTo("realizacje")}
              className="ml-2 px-5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-md transition flex items-center gap-2 whitespace-nowrap cursor-pointer"
            >
              Wszystkie (80+)
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Smooth Scrolling Container without ugly scrollbar */}
        <div className="max-w-6xl mx-auto px-4">
          <div
            ref={galleryRef}
            className="flex gap-5 overflow-x-auto no-scrollbar scroll-smooth py-3"
          >
            {projectObjects.map((obj) => (
              <div
                key={obj.id}
                onClick={() => navigateTo("realizacje")}
                className="group relative w-72 sm:w-80 flex-shrink-0 rounded-2xl overflow-hidden bg-slate-800 border border-slate-700/60 shadow-lg cursor-pointer transform hover:-translate-y-1 transition duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-slate-950">
                  <img
                    src={obj.photos[0]}
                    alt={obj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                  {/* Floating preview thumbnails inside */}
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between bg-slate-950/80 backdrop-blur-md p-1.5 rounded-xl border border-white/10">
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

      {/* Pricing Preview Banner linking to dedicated Cennik page */}
      <section id="cennik" className="py-16 px-4 bg-slate-50">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="inline-block px-3.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                Oficjalny cennik usług 2027
              </span>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                Przejrzyste Ceny Montażu i Serwisu
              </h2>
              <p className="mt-3 text-emerald-100 text-sm sm:text-base leading-relaxed">
                Montaż standardowy split już od <strong>1 600 zł netto</strong> (+8% VAT). Systemy MultiSplit, prace budowlane, przewierty w żelbecie i pełny serwis odgrzybiania.
              </p>
              <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold text-emerald-200">
                <span>✓ Do 3m instalacji w cenie</span>
                <span>•</span>
                <span>✓ Bezpłatna wycena na miejscu</span>
                <span>•</span>
                <span>✓ Brak ukrytych dopłat</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 flex-shrink-0">
              <button
                onClick={() => navigateTo("cennik")}
                className="px-8 py-4 rounded-2xl bg-white text-emerald-950 hover:bg-emerald-50 font-black text-base shadow-xl transition flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>Otwórz Pełny Cennik 2027</span>
                <ArrowRight className="w-5 h-5 text-emerald-600 group-hover:translate-x-1 transition" />
              </button>
              <a
                href={`tel:${PHONE.replace(/\s+/g, "")}`}
                className="px-6 py-3 rounded-xl bg-emerald-700/80 hover:bg-emerald-700 text-white font-bold text-xs text-center border border-emerald-500/30 transition flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                Zadzwoń po szybką wycenę: {PHONE}
              </a>
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

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-700 bg-emerald-100 px-3.5 py-1 rounded-full">
              Często zadawane pytania
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mt-3">
              FAQ • Wszystko o montażu klimatyzacji
            </h2>
            <p className="mt-2 text-slate-600 text-sm">
              Odpowiedzi na najważniejsze pytania przed zamówieniem instalacji w Warszawie.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Ile trwa standardowy montaż klimatyzacji w mieszkaniu?",
                a: "Zazwyczaj od 3 do 5 godzin. Przyjeżdżamy rano z kompletem sprzętu i odkurzaczem przemysłowym. Po południu instalacja jest sprawdzona ciśnieniowo, uruchomiona i gotowa do pracy.",
              },
              {
                q: "Czy montaż zniszczy wyremontowane ściany?",
                a: "Nie. Wykonujemy bezpyłowy przewiert wiertnicą diamentową z bezpośrednim odsysaniem pyłu. Trasy freonowe prowadzimy w estetycznych, wąskich korytkach maskujących lub w bruzdach ściennych, jeśli jesteś na etapie remontu.",
              },
              {
                q: "Czy potrzebuję zgody spółdzielni lub wspólnoty mieszkaniowej?",
                a: "Jeśli agregat montowany jest na posadzce balkonu poniżej linii balustrady, większość wspólnot w Warszawie nie wymaga zgody architektonicznej. Przy montażu na elewacji budynku pomagamy przygotować schemat i wniosek do spółdzielni.",
              },
              {
                q: "Dlaczego stawka wynosi 8% VAT zamiast 23%?",
                a: "Dla osób prywatnych w lokalach mieszkalnych o powierzchni do 150 m² oraz domach do 300 m² usługa montażu klimatyzacji wraz ze sprzętem jest opodatkowana preferencyjną stawką 8% VAT. Dla firm wystawiamy pełną fakturę 23% VAT.",
              },
              {
                q: "Co ile należy wykonywać serwis i odgrzybianie?",
                a: "Zalecamy przegląd minimum raz w roku (najlepiej na wiosnę przed sezonem upałów). Obejmuje on dezynfekcję parową parownika, czyszczenie filtrów z atestem PZH, sprawdzenie odpływu skroplin i ciśnienia czynnika R32. Regularny serwis jest też warunkiem utrzymania 5-letniej gwarancji.",
              },
              {
                q: "Czy klimatyzatorem można ogrzewać mieszkanie w zimie?",
                a: "Tak, wszystkie montowane przez nas modele (Gree, Daikin, LG, Samsung, Mitsubishi) posiadają funkcję pompy ciepła powietrze-powietrze i działają w trybie grzania nawet przy temperaturach zewnętrznych do -20°C / -25°C, będąc bardzo ekonomicznym źródłem ciepła w okresie jesienno-zimowym.",
              },
            ].map((faq, idx) => (
              <details
                key={idx}
                className="group bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs open:border-emerald-500 transition"
              >
                <summary className="font-extrabold text-slate-900 text-base sm:text-lg cursor-pointer list-none flex items-center justify-between gap-4">
                  <span>{faq.q}</span>
                  <span className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm group-open:rotate-180 transition flex-shrink-0">
                    ↓
                  </span>
                </summary>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Warsaw Districts SEO Section */}
      <section id="dzielnice" className="py-16 px-4 bg-slate-50 border-t border-slate-200">
        <div className="max-w-4xl mx-auto text-center">
          <span className="text-xs uppercase font-extrabold tracking-widest text-emerald-700 bg-emerald-100 px-3.5 py-1 rounded-full">
            Lokalny montaż w Warszawie
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-3">
            Gdzie Realizujemy Usługi Montażu?
          </h2>
          <p className="mt-2 text-slate-600 text-sm max-w-xl mx-auto">
            Dojazd na bezpłatną wizję lokalną oraz montaż realizujemy we wszystkich 18 dzielnicach Warszawy oraz okolicznych miejscowościach:
          </p>

          {/* Top 3 most frequent districts initially */}
          <div className="flex flex-wrap justify-center gap-2.5 mt-8">
            {(showAllDistricts ? DISTRICTS : DISTRICTS.slice(0, 3)).map((district, idx) => (
              <button
                key={idx}
                onClick={() => handleOpenContactModal(`Dojazd i wycena w dzielnicy: Warszawa ${district}`)}
                className="px-4 py-2.5 rounded-xl bg-white border border-slate-200/90 text-slate-800 text-xs sm:text-sm font-bold hover:border-emerald-500 hover:text-emerald-700 hover:bg-emerald-50/50 transition shadow-2xs cursor-pointer flex items-center gap-1.5"
              >
                <span>📍</span> Klimatyzacja Warszawa {district}
              </button>
            ))}
          </div>

          {/* Expand / Collapse Button */}
          <div className="mt-5">
            <button
              onClick={() => setShowAllDistricts(!showAllDistricts)}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-slate-200/80 hover:bg-emerald-100 text-slate-700 hover:text-emerald-800 font-bold text-xs transition cursor-pointer"
            >
              <span>{showAllDistricts ? "Zwiń listę dzielnic ↑" : "Pokaż pozostałe dzielnice Warszawy i okolice (18+) ↓"}</span>
            </button>
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
              <img src={assetPath("/zielony-zajac-logo.jpg")} alt="Logo" className="h-10 w-auto rounded" />
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
              <div><button onClick={() => navigateTo("hub")} className="hover:text-emerald-400 cursor-pointer">Strona QR Hub dla Klienta</button></div>
              <div><button onClick={() => navigateTo("realizacje")} className="hover:text-emerald-400 cursor-pointer">Wszystkie Realizacje (80+ zdjęć)</button></div>
              <div><a href="#cennik" className="hover:text-emerald-400">Cennik 2026/2027</a></div>
              <div><a href={GOOGLE_MAPS_URL} target="_blank" rel="noopener noreferrer" className="hover:text-emerald-400">Wizytówka Google</a></div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-slate-500 gap-2">
          <div>© {new Date().getFullYear()} Zielony Zając Sp. z o.o. Wszelkie prawa zastrzeżone.</div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setRodoOpen(true)}
              className="text-slate-400 hover:text-emerald-400 underline underline-offset-2 cursor-pointer"
            >
              Polityka Prywatności i RODO
            </button>
            <span>•</span>
            <span>Domenę obsługuje Cyberfolks</span>
          </div>
        </div>
      </footer>

      {/* RODO / Privacy Policy Modal */}
      <RodoModal isOpen={rodoOpen} onClose={() => setRodoOpen(false)} />

      {/* Quick Interactive Order Modal */}
      {modalOpen && (
        <div 
          onClick={() => setModalOpen(false)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-slate-200"
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 leading-tight">
                  Zamów bezpłatną wycenę
                </h3>
                <p className="text-xs text-emerald-700 font-semibold mt-0.5">
                  {modalSubject}
                </p>
              </div>
            </div>

            {contactSuccess ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Check className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-black text-slate-900">Dziękujemy za kontakt!</h4>
                <p className="text-xs text-slate-600 mt-2">
                  Nasz technik oddzwoni pod podany numer w ciągu 15 minut z propozycją terminu montażu.
                </p>
                <button
                  onClick={() => setModalOpen(false)}
                  className="mt-5 w-full py-3 rounded-2xl bg-emerald-600 text-white font-bold text-sm cursor-pointer hover:bg-emerald-700 transition"
                >
                  Zamknij okno
                </button>
              </div>
            ) : (
              <form onSubmit={handleQuickLeadSubmit} className="space-y-4">
                <p className="text-xs text-slate-600">
                  Zostaw swój numer telefonu — oddzwonimy i dobierzemy idealną moc klimatyzatora oraz zarezerwujemy termin:
                </p>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Twój numer telefonu:
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+48 ___ ___ ___"
                    value={userPhoneInput}
                    onChange={(e) => setUserPhoneInput(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-emerald-500 text-sm font-semibold text-slate-900"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 transition cursor-pointer shadow-md"
                >
                  <Send className="w-4 h-4" />
                  Poproś o kontakt w 15 minut
                </button>

                <div className="pt-2 text-center">
                  <span className="text-xs text-slate-500 font-medium">Lub zadzwoń bezpośrednio:</span>
                  <a
                    href={`tel:${PHONE.replace(/\s+/g, "")}`}
                    className="block text-sm font-black text-emerald-700 hover:text-emerald-800 mt-0.5"
                  >
                    📞 {PHONE}
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Floating Sticky Call Button */}
      <div className="fixed bottom-5 right-5 z-40">
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
