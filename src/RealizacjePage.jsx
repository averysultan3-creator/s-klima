import React, { useState } from "react";
import { ArrowLeft, CheckCircle2, Phone, MapPin, Sparkles, Layers, ChevronRight, X } from "lucide-react";
import { assetPath } from "./utils";

// Real installations grouped by projects/objects
export const projectObjects = [
  {
    id: "obj-1",
    title: "Montaż klimatyzacji Gree Pular w nowym bloku",
    location: "Warszawa, Mokotów",
    category: "mieszkanie",
    date: "Październik 2026",
    duration: "3.5 godziny",
    desc: "Kompletny montaż w wykończonym salonie. Odprowadzenie skroplin grawitacyjnie na balkon, przewiert diamentowy bez pyłu.",
    photos: [
      assetPath("/realizacje/foto-1.jpeg"),
      assetPath("/realizacje/foto-2.jpeg"),
      assetPath("/realizacje/foto-3.jpeg"),
      assetPath("/realizacje/foto-4.jpeg"),
    ],
    features: ["Brak widocznych rur", "Gwarancja 5 lat", "Cicha praca nocna"],
  },
  {
    id: "obj-2",
    title: "System ścienny Daikin Sensira z ukrytą instalacją",
    location: "Warszawa, Wola (Odolany)",
    category: "mieszkanie",
    date: "Wrzesień 2026",
    duration: "4 godziny",
    desc: "Montaż jednostki wewnętrznej nad drzwiami do sypialni. Agregat na wibroizolatorach, pełna próżnia i test azotowy.",
    photos: [
      assetPath("/realizacje/foto-5.jpeg"),
      assetPath("/realizacje/foto-6.jpeg"),
      assetPath("/realizacje/foto-7.jpeg"),
      assetPath("/realizacje/foto-8.jpeg"),
    ],
    features: ["Klasa energetyczna A++", "Filtr tytanowo-apatytowy", "F-Gaz protokół"],
  },
  {
    id: "obj-3",
    title: "Multi-Split w domu jednorodzinnym (2 sypialnie + salon)",
    location: "Wilanów / Piaseczno",
    category: "dom",
    date: "Wrzesień 2026",
    duration: "1 dzień",
    desc: "Jeden estetyczny agregat zewnętrzny na ścianie bocznej domu i trzy ciche jednostki wewnętrzne.",
    photos: [
      assetPath("/realizacje/foto-9.jpeg"),
      assetPath("/realizacje/foto-10.jpeg"),
      assetPath("/realizacje/foto-11.jpeg"),
      assetPath("/realizacje/foto-12.jpeg"),
    ],
    features: ["Ogrzewanie zimą do -20°C", "Niezależne sterowanie Wi-Fi", "Estetyczna elewacja"],
  },
  {
    id: "obj-4",
    title: "Klimatyzator designerski w sypialni",
    location: "Warszawa, Ursynów",
    category: "mieszkanie",
    date: "Sierpień 2026",
    duration: "3 godziny",
    desc: "Dyskretny montaż w wielkiej płycie z odprowadzeniem skroplin do dedykowanego zbiornika na balkonie.",
    photos: [
      assetPath("/realizacje/foto-13.jpeg"),
      assetPath("/realizacje/foto-14.jpeg"),
      assetPath("/realizacje/foto-15.jpeg"),
      assetPath("/realizacje/foto-16.jpeg"),
    ],
    features: ["Ultra cichy 19 dB", "Czystość montażu 100%", "Ekologiczny R32"],
  },
  {
    id: "obj-5",
    title: "Montaż w biurze i gabinecie lekarskim",
    location: "Warszawa, Śródmieście",
    category: "biuro",
    date: "Październik 2026",
    duration: "4 godziny",
    desc: "Wydajne chłodzenie i filtracja powietrza dla komfortu pacjentów i personelu. Faktura VAT 23%.",
    photos: [
      assetPath("/realizacje/foto-17.jpeg"),
      assetPath("/realizacje/foto-18.jpeg"),
      assetPath("/realizacje/foto-19.jpeg"),
      assetPath("/realizacje/foto-20.jpeg"),
    ],
    features: ["Faktura VAT 23%", "Maksymalny przepływ powietrza", "Certyfikat higieniczny"],
  },
  {
    id: "obj-6",
    title: "Kompleksowy serwis okresowy i odgrzybianie parowe",
    location: "Warszawa, Bemowo",
    category: "serwis",
    date: "Listopad 2026",
    duration: "1.5 godziny",
    desc: "Dezynfekcja chemiczna parownicą ciśnieniową, mycie filtrów, kontrola ciśnienia układu i czyszczenie skraplacza.",
    photos: [
      assetPath("/realizacje/foto-21.jpeg"),
      assetPath("/realizacje/foto-22.jpeg"),
      assetPath("/realizacje/foto-23.jpeg"),
      assetPath("/realizacje/foto-24.jpeg"),
    ],
    features: ["Środki z atestem PZH", "Usunięcie zarodników grzybów", "Przedłużenie gwarancji"],
  },
  {
    id: "obj-7",
    title: "Instalacja na dachu płaskim z asekuracją",
    location: "Warszawa, Praga-Południe",
    category: "biuro",
    date: "Wrzesień 2026",
    duration: "5 godzin",
    desc: "Specjalistyczny montaż agregatu komercyjnego na dachu budynku biurowego z podstropowym prowadzeniem instalacji.",
    photos: [
      assetPath("/realizacje/foto-25.jpeg"),
      assetPath("/realizacje/foto-26.jpeg"),
      assetPath("/realizacje/foto-27.jpeg"),
      assetPath("/realizacje/foto-28.jpeg"),
    ],
    features: ["Podstawy antywibracyjne", "Bezpieczny montaż wysokościowy", "Wysoka wydajność"],
  },
  {
    id: "obj-8",
    title: "Klimatyzacja w apartamencie z antresolą",
    location: "Warszawa, Żoliborz",
    category: "mieszkanie",
    date: "Październik 2026",
    duration: "4.5 godziny",
    desc: "Równomierne rozprowadzenie chłodnego powietrza na dwa poziomy mieszkania bez przeciągów.",
    photos: [
      assetPath("/realizacje/foto-29.jpeg"),
      assetPath("/realizacje/foto-30.jpeg"),
      assetPath("/realizacje/foto-31.jpeg"),
      assetPath("/realizacje/foto-32.jpeg"),
    ],
    features: ["Precyzyjne nawiewy 3D", "Smart Home integracja", "Niski pobór prądu"],
  },
  {
    id: "obj-9",
    title: "Agregat na wibroizolatorach na balkonie apartamentowca",
    location: "Warszawa, Mokotów / Wilanów",
    category: "mieszkanie",
    date: "Listopad 2026",
    duration: "4 godziny",
    desc: "Czysty montaż jednostki zewnętrznej na dedykowanych stopach antywibracyjnych. Estetyczne prowadzenie instalacji chłodniczej, odprowadzenie skroplin i próżnia układu.",
    photos: [
      assetPath("/realizacje/foto-81.jpeg"),
      assetPath("/realizacje/foto-82.jpeg"),
      assetPath("/realizacje/foto-83.jpeg"),
      assetPath("/realizacje/foto-84.jpeg"),
    ],
    features: ["Stopy antywibracyjne", "Bezpyłowy montaż", "Test szczelności azotem"],
  },
];

export default function RealizacjePage({ onBack, onOpenOrder }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [hoveredObjectId, setHoveredObjectId] = useState(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState({});
  const [modalData, setModalData] = useState(null); // { obj, photoIdx }

  const filtered = activeFilter === "all"
    ? projectObjects
    : projectObjects.filter((item) => item.category === activeFilter);

  const handleSelectPhoto = (objId, photoIdx, e) => {
    e.stopPropagation();
    setActivePhotoIndex((prev) => ({ ...prev, [objId]: photoIdx }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-24 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:text-emerald-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Wróć na stronę główną
          </button>
          
          <div className="flex items-center gap-3">
            <a
              href="tel:+48513666450"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 shadow transition"
            >
              <Phone className="w-4 h-4" />
              <span>513 666 450</span>
            </a>
          </div>
        </div>
      </header>

      {/* Intro */}
      <section className="bg-gradient-to-b from-emerald-50/70 via-white to-slate-50 pt-12 pb-6 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Realne realizacje • Warszawa i Mazowsze
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Galeria Montaży Klimatyzacji
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Zdjęcia z naszych prawdziwych zleceń. Najedź kursorem na dowolny obiekt, aby rozwinąć <strong>harmonijkę ujęć z tego montażu</strong> (etapy prac, jednostka wewnątrz i agregat na zewnątrz).
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {[
              { id: "all", label: "Wszystkie obiekty" },
              { id: "mieszkanie", label: "Mieszkania i bloki" },
              { id: "dom", label: "Domy jednorodzinne" },
              { id: "biuro", label: "Biura i lokale" },
              { id: "serwis", label: "Serwis i odgrzybianie" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
                  activeFilter === tab.id
                    ? "bg-emerald-600 text-white shadow"
                    : "bg-white text-slate-600 hover:bg-emerald-50 border border-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Accordion Cards Grid */}
      <section className="max-w-6xl mx-auto px-4 mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((obj) => {
            const currentIdx = activePhotoIndex[obj.id] || 0;
            const isHovered = hoveredObjectId === obj.id;

            return (
              <div
                key={obj.id}
                onMouseEnter={() => setHoveredObjectId(obj.id)}
                onMouseLeave={() => setHoveredObjectId(null)}
                className="group bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden"
              >
                {/* Accordion / Stacking Photo Container */}
                <div 
                  className="relative aspect-[4/3] bg-slate-900 overflow-hidden cursor-pointer"
                  onClick={() => setModalData({ obj, photoIdx: currentIdx })}
                >
                  {/* Main Active Photo */}
                  <img
                    src={obj.photos[currentIdx]}
                    alt={obj.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />

                  {/* Location badge */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-xl text-xs font-bold text-slate-800 shadow flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    {obj.location}
                  </div>

                  {/* Duration badge */}
                  <div className="absolute top-3 right-3 bg-emerald-600/90 text-white text-[11px] font-bold px-2.5 py-1 rounded-xl shadow">
                    {obj.duration}
                  </div>

                  {/* Peek Accordion Thumbnails appearing on hover */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md p-1 rounded-xl border border-white/20">
                      {obj.photos.map((photo, pIdx) => (
                        <button
                          key={pIdx}
                          onClick={(e) => handleSelectPhoto(obj.id, pIdx, e)}
                          className={`relative w-8 h-8 rounded-lg overflow-hidden border transition transform ${
                            currentIdx === pIdx
                              ? "border-emerald-400 scale-110 shadow-md ring-2 ring-emerald-500"
                              : "border-white/40 opacity-70 hover:opacity-100 hover:scale-105"
                          } ${isHovered ? "translate-y-0" : "translate-y-0.5"}`}
                        >
                          <img src={photo} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>

                    <span className="text-[11px] font-bold text-white bg-slate-900/80 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/20 flex items-center gap-1">
                      <Layers className="w-3 h-3 text-emerald-400" />
                      {currentIdx + 1}/{obj.photos.length}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-extrabold text-slate-900 text-lg leading-snug group-hover:text-emerald-700 transition">
                      {obj.title}
                    </h3>
                    <p className="mt-2 text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {obj.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-slate-100">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {obj.features.map((feat, fIdx) => (
                        <span
                          key={fIdx}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-md"
                        >
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          {feat}
                        </span>
                      ))}
                    </div>

                    <a
                      href="tel:+48513666450"
                      className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-emerald-600 text-slate-800 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition shadow-2xs"
                    >
                      <Phone className="w-3.5 h-3.5 text-emerald-600 group-hover:text-white" />
                      Chcę taki montaż – Zadzwoń
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Lightbox */}
        {modalData && (
          <div
            onClick={() => setModalData(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 rounded-3xl max-w-4xl w-full overflow-hidden border border-white/20 shadow-2xl flex flex-col"
            >
              <div className="relative aspect-[16/10] bg-black flex items-center justify-center">
                <img
                  src={modalData.obj.photos[modalData.photoIdx]}
                  alt={modalData.obj.title}
                  className="max-h-full max-w-full object-contain"
                />
                <button
                  onClick={() => setModalData(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 text-white hover:bg-slate-700 transition"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Thumbnails and Info */}
              <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-800">
                <div>
                  <h3 className="text-lg font-black">{modalData.obj.title}</h3>
                  <div className="text-xs text-emerald-400 mt-0.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {modalData.obj.location} • Czas montażu: {modalData.obj.duration}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {modalData.obj.photos.map((p, pIdx) => (
                    <button
                      key={pIdx}
                      onClick={() => setModalData({ ...modalData, photoIdx: pIdx })}
                      className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition ${
                        modalData.photoIdx === pIdx ? "border-emerald-400 scale-105" : "border-slate-700 opacity-60"
                      }`}
                    >
                      <img src={p} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                  <a
                    href="tel:+48513666450"
                    className="ml-3 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition flex items-center gap-2 whitespace-nowrap"
                  >
                    <Phone className="w-4 h-4" />
                    Zadzwoń: 513 666 450
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl text-center relative overflow-hidden">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Chcesz estetyczny montaż klimatyzacji w swoim mieszkaniu?
          </h2>
          <p className="mt-3 text-emerald-200 text-sm sm:text-base max-w-xl mx-auto">
            Przyjeżdżamy na bezpłatną wizję lokalną w Warszawie i okolicach. Montujemy w 1 dzień roboczy.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onOpenOrder && onOpenOrder("Wycena po obejrzeniu galerii 80+")}
              className="px-6 py-3.5 rounded-2xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-base shadow-lg transition flex items-center gap-2 cursor-pointer"
            >
              Zamów bezpłatną wycenę
            </button>
            <a
              href="tel:+48513666450"
              className="px-6 py-3.5 rounded-2xl bg-white text-emerald-950 font-bold text-base hover:bg-emerald-50 shadow-lg transition flex items-center gap-2"
            >
              <Phone className="w-5 h-5 text-emerald-600" />
              Zadzwoń: +48 513 666 450
            </a>
            <button
              onClick={onBack}
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-base transition border border-white/20 cursor-pointer"
            >
              Powrót do strony głównej
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
