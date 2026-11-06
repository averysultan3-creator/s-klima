import React, { useState } from "react";
import { ArrowLeft, CheckCircle2, Phone, MapPin, ShieldCheck, Sparkles, Filter } from "lucide-react";

// 80 real photos from client
const photos = [
  { id: 1, file: "/realizacje/foto-1.jpeg", title: "Montaż klimatyzacji split", loc: "Mokotów, Warszawa", cat: "mieszkanie" },
  { id: 2, file: "/realizacje/foto-2.jpeg", title: "Instalacja jednostki wewnętrznej", loc: "Wola, Warszawa", cat: "mieszkanie" },
  { id: 3, file: "/realizacje/foto-3.jpeg", title: "Montaż na elewacji budynku", loc: "Wilanów, Warszawa", cat: "dom" },
  { id: 4, file: "/realizacje/foto-4.jpeg", title: "Klimatyzator designerski w salonie", loc: "Ursynów, Warszawa", cat: "mieszkanie" },
  { id: 5, file: "/realizacje/foto-5.jpeg", title: "Czysty montaż bezpyłowy", loc: "Białołęka, Warszawa", cat: "mieszkanie" },
  { id: 6, file: "/realizacje/foto-6.jpeg", title: "Wyprowadzenie instalacji freonowej", loc: "Bemowo, Warszawa", cat: "mieszkanie" },
  { id: 7, file: "/realizacje/foto-7.jpeg", title: "Agregat zewnętrzny na balkonie", loc: "Ochota, Warszawa", cat: "mieszkanie" },
  { id: 8, file: "/realizacje/foto-8.jpeg", title: "Multi-Split w domu jednorodzinnym", loc: "Piaseczno k. Warszawy", cat: "dom" },
  { id: 9, file: "/realizacje/foto-9.jpeg", title: "Montaż na wysokości z asekuracją", loc: "Konstancin-Jeziorna", cat: "dom" },
  { id: 10, file: "/realizacje/foto-10.jpeg", title: "Precyzyjne poziomowanie jednostki", loc: "Targówek, Warszawa", cat: "mieszkanie" },
  { id: 11, file: "/realizacje/foto-11.jpeg", title: "Klimatyzacja w sypialni", loc: "Śródmieście, Warszawa", cat: "mieszkanie" },
  { id: 12, file: "/realizacje/foto-12.jpeg", title: "Montaż w biurze i lokalu", loc: "Włochy, Warszawa", cat: "biuro" },
  { id: 13, file: "/realizacje/foto-13.jpeg", title: "Instalacja na dachu płaskim", loc: "Praga-Południe, Warszawa", cat: "biuro" },
  { id: 14, file: "/realizacje/foto-14.jpeg", title: "Bezpyłowe wiercenie diamentowe", loc: "Żoliborz, Warszawa", cat: "mieszkanie" },
  { id: 15, file: "/realizacje/foto-15.jpeg", title: "Wibroizolatory pod agregat", loc: "Bielany, Warszawa", cat: "mieszkanie" },
  { id: 16, file: "/realizacje/foto-16.jpeg", title: "Test szczelności i próżnia pompy", loc: "Ursus, Warszawa", cat: "serwis" },
  { id: 17, file: "/realizacje/foto-17.jpeg", title: "Klimatyzator ze złotym panelem", loc: "Mokotów, Warszawa", cat: "mieszkanie" },
  { id: 18, file: "/realizacje/foto-18.jpeg", title: "Ukryte korytka instalacyjne", loc: "Wawer, Warszawa", cat: "dom" },
  { id: 19, file: "/realizacje/foto-19.jpeg", title: "Serwis i odgrzybianie klimatyzacji", loc: "Wesoła, Warszawa", cat: "serwis" },
  { id: 20, file: "/realizacje/foto-20.jpeg", title: "Montaż klimatyzacji Gree", loc: "Rembertów, Warszawa", cat: "mieszkanie" },
  { id: 21, file: "/realizacje/foto-21.jpeg", title: "Estetyczne doprowadzenie zasilania", loc: "Marki k. Warszawy", cat: "dom" },
  { id: 22, file: "/realizacje/foto-22.jpeg", title: "System chłodzenia w gabinecie", loc: "Ząbki, Warszawa", cat: "biuro" },
  { id: 23, file: "/realizacje/foto-23.jpeg", title: "Podłączenie czujników i Wi-Fi", loc: "Pruszków k. Warszawy", cat: "mieszkanie" },
  { id: 24, file: "/realizacje/foto-24.jpeg", title: "Gotowy salon z klimatyzacją", loc: "Legionowo k. Warszawy", cat: "dom" },
];

export default function RealizacjePage({ onBack }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const filtered = activeFilter === "all" 
    ? photos 
    : photos.filter((item) => item.cat === activeFilter);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-24">
      {/* Header */}
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
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Realne zdjęcia z naszych montaży 2026/2027
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Galeria Montaży Zielony Zając
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Zobacz jakość naszej pracy na żywo. Montujemy bez kurzu, z poszanowaniem Twojego mieszkania i zawsze zgodnie z normami UDT F-Gaz.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {[
              { id: "all", label: "Wszystkie montaze (80+)" },
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

      {/* Photo Grid */}
      <section className="max-w-6xl mx-auto px-4 mt-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-lg transition cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                <img
                  src={item.file}
                  alt={item.title}
                  className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <span className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-semibold px-2 py-0.5 rounded">
                  {item.loc}
                </span>
              </div>
              <div className="p-3">
                <h3 className="font-semibold text-slate-800 text-xs sm:text-sm line-clamp-1">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Lightbox */}
        {selectedPhoto && (
          <div 
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 rounded-3xl max-w-3xl w-full overflow-hidden border border-white/20 shadow-2xl"
            >
              <div className="relative aspect-[4/3] sm:aspect-[16/10] bg-black">
                <img
                  src={selectedPhoto.file}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-slate-900">
                <div>
                  <h3 className="text-lg font-bold text-white">{selectedPhoto.title}</h3>
                  <div className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {selectedPhoto.loc}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <a
                    href="tel:+48513666450"
                    className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-500 transition flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Chcę taki montaż
                  </a>
                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="px-4 py-2.5 rounded-xl bg-white/10 text-white text-sm font-semibold hover:bg-white/20 transition"
                  >
                    Zamknij
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl text-center relative overflow-hidden">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Potrzebujesz profesjonalnego montażu klimatyzacji?
          </h2>
          <p className="mt-3 text-emerald-200 text-sm sm:text-base max-w-xl mx-auto">
            Przyjeżdżamy na bezpłatny dobór i audyt. Montaż realizujemy w 1 dzień roboczy bez brudu i kurzu.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href="tel:+48513666450"
              className="px-6 py-3.5 rounded-2xl bg-white text-emerald-950 font-bold text-base hover:bg-emerald-50 shadow-lg transition flex items-center gap-2"
            >
              <Phone className="w-5 h-5 text-emerald-600" />
              Zadzwoń: +48 513 666 450
            </a>
            <button
              onClick={onBack}
              className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-semibold text-base transition border border-white/20"
            >
              Powrót do oferty
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
