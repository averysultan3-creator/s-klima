import React, { useState } from "react";
import { ArrowLeft, Phone, CheckCircle2, ShieldCheck, Wrench, AlertCircle, Sparkles } from "lucide-react";

export default function CennikPage({ onBack, onOpenOrder }) {
  const [activeTab, setActiveTab] = useState("split");

  const splitServices = [
    { name: "Montaż klimatyzacji do 3,5 kW", price: "1 600 zł", note: "do mieszkań i mniejszych salonów" },
    { name: "Montaż klimatyzacji 5,0–7,0 kW", price: "1 800 zł", note: "do dużych salonów i otwartych przestrzeni" },
    { name: "Montaż klimatyzacji powyżej 7,0 kW", price: "od 2 000 zł", note: "duże domy i lokale komercyjne" },
    { name: "Montaż urządzenia na gotowej instalacji", price: "od 1 000 zł", note: "gdy rury i kable są już w ścianie" },
    { name: "Montaż klimatyzacji zakupionej przez klienta", price: "od 2 000 zł", note: "własny sprzęt kupiony w markecie" },
  ];

  const multisplitServices = [
    { name: "Multisplit 2 jednostki wewnętrzne", price: "od 3 000 zł", note: "1 agregat zewnętrzny + 2 pokoje" },
    { name: "Multisplit 3 jednostki wewnętrzne", price: "od 4 000 zł", note: "1 agregat zewnętrzny + 3 pokoje" },
    { name: "Multisplit 4 jednostki wewnętrzne", price: "od 5 000 zł", note: "1 agregat zewnętrzny + 4 pokoje" },
    { name: "Multisplit 5 jednostek wewnętrznych", price: "od 6 500 zł", note: "duże domy i biura piętrowe" },
  ];

  const additionalServices = [
    { name: "Dodatkowy metr instalacji freonowej", price: "150 zł/mb" },
    { name: "Dodatkowy metr korytka instalacyjnego", price: "50 zł/mb" },
    { name: "Dodatkowy przewód elektryczny", price: "25 zł/mb" },
    { name: "Wykonanie bruzdy w cegle", price: "120 zł/mb" },
    { name: "Wykonanie bruzdy w betonie", price: "200 zł/mb" },
    { name: "Przewiert w żelbecie", price: "od 250 zł" },
    { name: "Montaż pompki skroplin", price: "od 550 zł" },
    { name: "Dodatkowy uchwyt jednostki zewnętrznej", price: "200 zł" },
    { name: "Demontaż starej klimatyzacji", price: "od 400 zł" },
    { name: "Montaż z wykorzystaniem podnośnika", price: "wycena indywidualna" },
  ];

  const serviceAndCleaning = [
    { name: "Przegląd i czyszczenie klimatyzacji SPLIT", price: "250 zł" },
    { name: "Gruntowne czyszczenie i odgrzybianie", price: "400 zł" },
    { name: "Przegląd jednostki MULTISPLIT (2 jednostki)", price: "450 zł" },
    { name: "Przegląd MULTISPLIT (3 jednostki)", price: "550 zł" },
    { name: "Przegląd MULTISPLIT (4 jednostki)", price: "650 zł" },
    { name: "Diagnostyka usterki", price: "od 200 zł" },
    { name: "Kontrola szczelności układu", price: "od 250 zł" },
    { name: "Uzupełnienie czynnika chłodniczego", price: "od 350 zł" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-24 font-sans selection:bg-emerald-500 selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:text-emerald-600 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Powrót na stronę główną
          </button>

          <a
            href="tel:+48513666450"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 shadow transition"
          >
            <Phone className="w-4 h-4" />
            <span>513 666 450</span>
          </a>
        </div>
      </header>

      {/* Intro */}
      <section className="bg-gradient-to-b from-emerald-50/80 via-white to-slate-50 pt-12 pb-6 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Oficjalny cennik na sezon 2027 • Warszawa i okolice
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Cennik Usług Klimatyzacyjnych 2027
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            Przejrzyste i uczciwe stawki za profesjonalny montaż oraz serwis klimatyzacji. Każda instalacja jest wyceniana przed rozpoczęciem prac bez ukrytych kosztów.
          </p>

          {/* Navigation Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {[
              { id: "split", label: "1. Montaż Split" },
              { id: "multi", label: "2. Montaż MultiSplit" },
              { id: "dodatkowe", label: "3. Usługi Dodatkowe" },
              { id: "serwis", label: "4. Serwis i Odgrzybianie" },
              { id: "standard", label: "5. Co w cenie montażu?" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-emerald-600 text-white shadow"
                    : "bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-4 mt-8 space-y-10">
        {/* TAB 1: SPLIT */}
        {(activeTab === "split" || activeTab === "all") && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                  1. Montaż Standardowy Klimatyzacji Split
                </h2>
                <p className="text-xs text-slate-500 mt-1">Ceny netto (dla osób prywatnych +8% VAT)</p>
              </div>
              <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full">
                Najpopularniejsze
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {splitServices.map((item, idx) => (
                <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50/70 px-3 rounded-xl transition">
                  <div>
                    <div className="font-extrabold text-slate-900 text-base">{item.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{item.note}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-black text-emerald-700 whitespace-nowrap">{item.price}</span>
                    <button
                      onClick={() => onOpenOrder(`Wycena: ${item.name}`)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-600 text-slate-800 hover:text-white font-bold text-xs transition cursor-pointer"
                    >
                      Zamów
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: MULTISPLIT */}
        {(activeTab === "multi" || activeTab === "all") && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="border-b border-slate-100 pb-4 mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                2. Montaż MultiSplit (Kilka pomieszczeń)
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Jedna jednostka zewnętrzna obsługująca od 2 do 5 pokoi. Ceny dotyczą standardowych warunków montażowych.
              </p>
            </div>

            <div className="divide-y divide-slate-100">
              {multisplitServices.map((item, idx) => (
                <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-50/70 px-3 rounded-xl transition">
                  <div>
                    <div className="font-extrabold text-slate-900 text-base">{item.name}</div>
                    <div className="text-xs text-slate-500 mt-0.5">{item.note}</div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-black text-emerald-700 whitespace-nowrap">{item.price}</span>
                    <button
                      onClick={() => onOpenOrder(`Wycena: ${item.name}`)}
                      className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-emerald-600 text-slate-800 hover:text-white font-bold text-xs transition cursor-pointer"
                    >
                      Zamów
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: DODATKOWE */}
        {(activeTab === "dodatkowe" || activeTab === "all") && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="border-b border-slate-100 pb-4 mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                3. Usługi Dodatkowe i Prace Budowlane
              </h2>
              <p className="text-xs text-slate-500 mt-1">Cena netto za metr bieżący lub punkt montażowy</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {additionalServices.map((item, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-800">{item.name}</span>
                  <span className="text-sm font-black text-emerald-800 whitespace-nowrap ml-2">{item.price}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: SERWIS */}
        {(activeTab === "serwis" || activeTab === "all") && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="border-b border-slate-100 pb-4 mb-6">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                4. Serwis i Czyszczenie Klimatyzacji
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Dezynfekcja parowa, preparaty z atestem PZH, szczelność i uzupełnienie czynnika
              </p>
            </div>

            <div className="divide-y divide-slate-100">
              {serviceAndCleaning.map((item, idx) => (
                <div key={idx} className="py-3.5 flex items-center justify-between hover:bg-slate-50 px-2 rounded-xl transition">
                  <span className="font-bold text-slate-800 text-sm">{item.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-base font-black text-emerald-700">{item.price}</span>
                    <button
                      onClick={() => onOpenOrder(`Serwis: ${item.name}`)}
                      className="px-3 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-600 text-emerald-800 hover:text-white font-bold text-xs transition cursor-pointer"
                    >
                      Zamów
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CO W CENIE I INFORMACJE */}
        {(activeTab === "standard" || activeTab === "all") && (
          <div className="bg-emerald-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
            <h2 className="text-xl sm:text-2xl font-black text-emerald-300 mb-4 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-emerald-400" />
              5. Co obejmuje montaż standardowy?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-emerald-100 mb-6">
              {[
                "Montaż jednostki wewnętrznej i zewnętrznej",
                "Do 3 metrów instalacji freonowej",
                "Izolacja rur chłodniczych",
                "Przewód komunikacyjny",
                "Korytka maskujące instalację",
                "Odprowadzenie skroplin grawitacyjnie",
                "Jeden standardowy przewiert przez ścianę",
                "Podłączenie i wykonanie próżni w układzie",
                "Próba szczelności i uruchomienie urządzenia",
                "Instruktaż obsługi klimatyzatora",
                "Posprzątanie miejsca montażu odkurzaczem",
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-emerald-800/80 pt-4 text-xs text-emerald-200/90 leading-relaxed">
              <p className="font-bold text-emerald-300 mb-1">Informacje dodatkowe:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Ceny dotyczą standardowych warunków montażowych na terenie Warszawy i okolic.</li>
                <li>Prace nietypowe i wysokościowe wyceniane są indywidualnie.</li>
                <li>Każda instalacja wyceniana jest przed rozpoczęciem prac. Ostateczna cena zależy od warunków technicznych.</li>
                <li>Cena montażu nie obejmuje zakupu klimatyzatora, chyba że oferta wyraźnie stanowi inaczej.</li>
              </ul>
            </div>
          </div>
        )}

        {/* Contact Banner */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-8 text-white shadow-xl text-center">
          <h3 className="text-2xl font-black">Zapraszamy do kontaktu i bezpłatnej wyceny!</h3>
          <p className="text-sm text-emerald-100 mt-2">
            Zadzwoń do nas, a nasz instalator bezpłatnie skonsultuje warunki techniczne Twojego lokalu.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href="tel:+48513666450"
              className="px-6 py-3.5 rounded-2xl bg-white text-emerald-950 font-black text-base hover:bg-emerald-50 shadow-lg transition flex items-center gap-2"
            >
              <Phone className="w-5 h-5 text-emerald-600" />
              Zadzwoń: +48 513 666 450
            </a>
            <button
              onClick={onBack}
              className="px-6 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-base transition border border-emerald-500/40 cursor-pointer"
            >
              Wróć na stronę główną
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
