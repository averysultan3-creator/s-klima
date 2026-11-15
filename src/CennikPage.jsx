import React, { useState } from "react";
import { ArrowLeft, Phone, CheckCircle2, ShieldCheck } from "lucide-react";
import { PHONE, PHONE_TEL, useContent } from "./site";

export default function CennikPage({ onBack, onOpenOrder }) {
  const [activeTab, setActiveTab] = useState("split");

  const content = useContent();
  const sections = content.cennik.sections;
  const current = sections.find((x) => x.id === activeTab);

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
            href={PHONE_TEL}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 shadow transition"
          >
            <Phone className="w-4 h-4" />
            <span>{PHONE}</span>
          </a>
        </div>
      </header>

      {/* Intro */}
      <section className="bg-gradient-to-b from-emerald-50/80 via-white to-slate-50 pt-12 pb-6 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Cennik Usług Klimatyzacyjnych
          </h1>
          <p className="mt-3 text-slate-600 text-sm sm:text-base font-semibold">
            Cennik jedynie poglądowo, każda wycena indywidualnie.
          </p>

          {/* Navigation Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {[
              ...sections.map((x, i) => ({ id: x.id, label: `${i + 1}. ${x.title}` })),
              { id: "standard", label: `${sections.length + 1}. Co w cenie montażu?` },
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
        {current && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <div className="border-b border-slate-100 pb-4 mb-4">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">{current.title}</h2>
              {current.subtitle && <p className="text-xs text-slate-500 mt-1">{current.subtitle}</p>}
            </div>
            <div className="divide-y divide-slate-100">
              {current.items.map((item, idx) => (
                <div key={idx} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-2">
                  <div>
                    <div className="font-extrabold text-slate-900 text-base">{item.name}</div>
                    {item.note && <div className="text-xs text-slate-500 mt-0.5">{item.note}</div>}
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

        {/* TAB 5: CO W CENIE I INFORMACJE */}
        {activeTab === "standard" && (
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
                <li>Ceny dotyczą standardowych warunków montażowych na terenie Warszawy i okolic (do 30 km od centrum).</li>
                <li>Prace nietypowe i wysokościowe wyceniane są indywidualnie.</li>
                <li>Każda instalacja wyceniana jest przed rozpoczęciem prac. Ostateczna cena zależy od warunków technicznych.</li>
                <li>Cena montażu nie obejmuje zakupu klimatyzatora, chyba że oferta wyraźnie stanowi inaczej.</li>
              </ul>
            </div>
          </div>
        )}

        {/* Contact Banner */}
        <div className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 rounded-3xl p-8 sm:p-10 text-white shadow-2xl text-center border border-emerald-800 relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-block px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              Darmowa wycena i doradztwo
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">Zapraszamy do kontaktu i bezpłatnej wyceny!</h3>
            <p className="text-sm text-emerald-200 mt-2 leading-relaxed">
              Zadzwoń do nas, a nasz instalator bezpłatnie skonsultuje warunki techniczne i przygotuje precyzyjny kosztorys montażu.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <button
                onClick={() => onOpenOrder("Wycena klimatyzacji (z cennika)")}
                className="px-7 py-4 rounded-2xl bg-white hover:bg-slate-100 text-emerald-950 font-black text-base shadow-xl transition flex items-center gap-2 cursor-pointer"
              >
                Zamów bezpłatną wycenę
              </button>
              <a
                href={PHONE_TEL}
                className="px-7 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-base shadow-xl transition flex items-center gap-2 cursor-pointer"
              >
                <Phone className="w-5 h-5 text-slate-950" />
                Zadzwoń: {PHONE}
              </a>
              <button
                onClick={onBack}
                className="px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-base transition border border-white/20 cursor-pointer"
              >
                Wróć na stronę główną
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
