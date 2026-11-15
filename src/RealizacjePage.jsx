import React, { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, Phone, X } from "lucide-react";
import { PHONE, PHONE_TEL, PHOTO_CATEGORIES, photoUrl, useContent } from "./site";

export default function RealizacjePage({ onBack }) {
  const content = useContent();
  const [cat, setCat] = useState(PHOTO_CATEGORIES[0].id);
  const [open, setOpen] = useState(null); // index in current category
  const touchX = useRef(null);

  const photos = content.photos[cat] || [];

  const step = useCallback(
    (d) => setOpen((i) => (i === null ? i : (i + d + photos.length) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, step]);

  return (
    <div className="min-h-screen bg-white text-slate-800 pb-24 font-sans">
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-800 hover:text-emerald-600 transition cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Strona główna
          </button>
          <a
            href={PHONE_TEL}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold text-sm hover:bg-emerald-700 transition"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">{PHONE}</span>
          </a>
        </div>
      </header>

      <section className="max-w-6xl mx-auto px-4 pt-10 pb-6 text-center">
        <h1 className="mx-auto text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">Realizacje</h1>
        <div className="inline-flex flex-wrap justify-center gap-2 mt-6 p-1.5 rounded-2xl bg-slate-100">
          {PHOTO_CATEGORIES.map((c) => (
            <button
              key={c.id}
              onClick={() => setCat(c.id)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition cursor-pointer ${
                cat === c.id ? "bg-emerald-600 text-white shadow" : "text-slate-600 hover:text-emerald-700"
              }`}
            >
              {c.label}
              <span className={`ml-1.5 text-xs ${cat === c.id ? "text-emerald-100" : "text-slate-400"}`}>
                {(content.photos[c.id] || []).length}
              </span>
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4">
        {photos.length === 0 ? (
          <p className="text-center text-slate-400 py-16">Wkrótce dodamy zdjęcia.</p>
        ) : (
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 [column-fill:_balance]">
            {photos.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setOpen(i)}
                className="block w-full mb-3 break-inside-avoid rounded-xl overflow-hidden bg-slate-100 cursor-zoom-in"
              >
                <img
                  src={photoUrl(p.src)}
                  alt=""
                  loading="lazy"
                  className="w-full h-auto block hover:opacity-90 transition"
                />
              </button>
            ))}
          </div>
        )}
      </section>

      {open !== null && photos[open] && (
        <div
          onClick={() => setOpen(null)}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchX.current === null) return;
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
            touchX.current = null;
          }}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
        >
          <img
            src={photoUrl(photos[open].src)}
            alt=""
            onClick={(e) => e.stopPropagation()}
            className="max-w-[94vw] max-h-[88vh] w-auto h-auto object-contain rounded-lg select-none"
          />
          <button
            onClick={() => setOpen(null)}
            aria-label="Zamknij"
            className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          {photos.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); step(-1); }}
                aria-label="Poprzednie"
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 cursor-pointer"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); step(1); }}
                aria-label="Następne"
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 cursor-pointer"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm font-semibold">
            {open + 1} / {photos.length}
          </div>
        </div>
      )}
    </div>
  );
}
