import React from "react";
import { Globe, Star, Image as ImageIcon, Phone, Mail, ArrowUpRight, ShieldCheck, Clock, CreditCard } from "lucide-react";
import { assetPath } from "./utils";

export default function HubPage({ onGoToSite, onGoToRealizacje, onGoToCennik }) {
  const phone = "+48 513 666 450";
  const email = "kontakt@zielonyzajac.pl";
  const googleMapsUrl = "https://maps.google.com/?q=Zielony+Zajac+Klimatyzacja+Warszawa";

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col justify-between relative overflow-hidden font-sans selection:bg-emerald-500 selection:text-white">
      {/* Background with Air Conditioner ambience */}
      <div className="absolute inset-0 z-0">
        <img
          src={assetPath("/hero-cool-room.png")}
          alt="Komfortowy chłód"
          className="w-full h-full object-cover opacity-20 filter blur-[2px] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/95 to-slate-950" />
      </div>

      {/* Subtle cooling glow effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-md mx-auto px-5 py-8 flex-1 flex flex-col justify-center">
        {/* Logo and Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-white rounded-3xl border border-white/20 shadow-2xl mb-4">
            <img
              src={assetPath("/zielony-zajac-logo.jpg")}
              alt="Zielony Zając"
              className="h-14 w-auto object-contain rounded-xl"
            />
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white flex items-center justify-center gap-2">
            Zielony Zając
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              Warszawa
            </span>
          </h1>
          <p className="text-sm text-slate-300 mt-1 font-medium">
            Montaż i serwis klimatyzacji w 1 dzień
          </p>

          <div className="flex items-center justify-center gap-4 mt-3 text-xs text-slate-400 font-medium">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Certyfikat F-Gaz
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-emerald-400" />
              Montaż w 1 dzień
            </span>
          </div>
        </div>

        {/* 4 Main Action Cards */}
        <div className="space-y-3.5">
          {/* 1. Strona Główna */}
          <button
            onClick={onGoToSite}
            className="w-full group p-4 rounded-2xl bg-white/10 hover:bg-emerald-600/90 border border-white/15 hover:border-emerald-400 backdrop-blur-md transition-all duration-300 flex items-center justify-between text-left shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5 cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 group-hover:bg-white/20 flex items-center justify-center text-emerald-400 group-hover:text-white transition">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-base text-white">Strona Oficjalna</div>
                <div className="text-xs text-slate-300 group-hover:text-emerald-100">
                  Oferta, usługi i montaż klimatyzacji
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-white transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          {/* Cennik 2027 Button */}
          <button
            onClick={onGoToCennik}
            className="w-full group p-4 rounded-2xl bg-emerald-700/40 hover:bg-emerald-600 border border-emerald-500/30 hover:border-emerald-400 backdrop-blur-md transition-all duration-300 flex items-center justify-between text-left shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5 cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/30 group-hover:bg-white/20 flex items-center justify-center text-emerald-300 group-hover:text-white transition">
                <span className="font-black text-lg">PLN</span>
              </div>
              <div>
                <div className="font-bold text-base text-white flex items-center gap-2">
                  Cennik Usług 2027
                  <span className="text-[10px] bg-emerald-500/30 text-emerald-300 px-1.5 py-0.5 rounded font-bold">
                    Nowy
                  </span>
                </div>
                <div className="text-xs text-slate-300 group-hover:text-emerald-100">
                  Montaż split od 1600 zł, multisplit i serwis
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-white transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          {/* 2. Opinie Google */}
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full group p-4 rounded-2xl bg-white/10 hover:bg-emerald-600/90 border border-white/15 hover:border-emerald-400 backdrop-blur-md transition-all duration-300 flex items-center justify-between text-left shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5 cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 group-hover:bg-white/20 flex items-center justify-center text-amber-400 group-hover:text-white transition">
                <Star className="w-6 h-6 fill-current" />
              </div>
              <div>
                <div className="font-bold text-base text-white flex items-center gap-2">
                  Opinie Google
                  <span className="text-[11px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-bold">
                    5.0 ★
                  </span>
                </div>
                <div className="text-xs text-slate-300 group-hover:text-emerald-100">
                  Zobacz oceny naszych klientów w Google Maps
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-white transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>

          {/* 3. Realizacje */}
          <button
            onClick={onGoToRealizacje}
            className="w-full group p-4 rounded-2xl bg-white/10 hover:bg-emerald-600/90 border border-white/15 hover:border-emerald-400 backdrop-blur-md transition-all duration-300 flex items-center justify-between text-left shadow-lg hover:shadow-emerald-500/20 hover:-translate-y-0.5 cursor-pointer"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-xl bg-teal-500/20 group-hover:bg-white/20 flex items-center justify-center text-teal-400 group-hover:text-white transition">
                <ImageIcon className="w-6 h-6" />
              </div>
              <div>
                <div className="font-bold text-base text-white">Nasze Realizacje</div>
                <div className="text-xs text-slate-300 group-hover:text-emerald-100">
                  Galeria estetycznych montaży bez widocznych rur
                </div>
              </div>
            </div>
            <ArrowUpRight className="w-5 h-5 text-slate-400 group-hover:text-white transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>

          {/* 4. Kontakt Bezpośredni */}
          <div className="p-4 rounded-2xl bg-emerald-600 border border-emerald-400 shadow-xl text-white">
            <div className="text-xs uppercase font-extrabold tracking-wider text-emerald-100 mb-2">
              Szybki kontakt telefoniczny
            </div>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${phone.replace(/\s+/g, "")}`}
                className="py-3 px-3 rounded-xl bg-white text-emerald-950 font-bold text-sm flex items-center justify-center gap-2 hover:bg-emerald-50 transition shadow"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                Zadzwoń
              </a>
              <a
                href={`mailto:${email}`}
                className="py-3 px-3 rounded-xl bg-emerald-700 text-white font-semibold text-sm flex items-center justify-center gap-2 hover:bg-emerald-800 transition border border-emerald-400/40"
              >
                <Mail className="w-4 h-4" />
                Napisz
              </a>
            </div>
            <div className="text-[11px] text-center text-emerald-100/90 mt-2 font-medium">
              Pn–Pt: 8:00–18:00 | Sobota: 9:00–15:00
            </div>
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center text-[11px] text-slate-400">
          <div>Zielony Zając Sp. z o.o. • NIP: 1133216745</div>
          <div className="mt-0.5">Warszawa i województwo mazowieckie</div>
        </div>
      </div>
    </div>
  );
}
