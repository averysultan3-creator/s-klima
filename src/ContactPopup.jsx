import React, { useEffect, useState } from "react";
import { Phone, Mail, X, Copy, Check } from "lucide-react";
import { PHONE, PHONE_TEL, EMAIL } from "./site";

// On a computer a tel: link usually does nothing useful, so every phone link/button on the site
// opens this window with the number and e-mail instead. On phones/tablets (touch screens)
// tel: links work as usual and open the dialer.
const isDesktop = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(any-pointer: coarse)").matches;

function CopyButton({ value }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const t = document.createElement("textarea");
      t.value = value;
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      t.remove();
    }
    setDone(true);
    setTimeout(() => setDone(false), 1500);
  };
  return (
    <button
      type="button"
      onClick={copy}
      className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-full border border-emerald-200 text-emerald-700 text-xs font-bold hover:bg-emerald-50 transition"
    >
      {done ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      {done ? "Skopiowano" : "Kopiuj"}
    </button>
  );
}

export default function ContactPopup() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="tel:"]');
      if (!a || a.hasAttribute("data-direct-call") || !isDesktop()) return;
      e.preventDefault();
      setOpen(true);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 backdrop-blur-sm px-4"
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-popup-title"
      data-contact-popup
    >
      <div className="relative w-full max-w-sm rounded-3xl bg-white p-7 shadow-2xl text-left" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Zamknij"
          className="absolute top-4 right-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 id="contact-popup-title" className="text-xl font-black text-slate-900">Skontaktuj się z nami</h2>
        <p className="mt-1 text-sm text-slate-500">Bezpłatna wycena – zadzwoń lub napisz.</p>

        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-3">
            <span className="shrink-0 w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </span>
            <a href={PHONE_TEL} data-direct-call className="flex-1 text-lg font-black text-emerald-700 hover:underline whitespace-nowrap">
              {PHONE}
            </a>
            <CopyButton value={PHONE} />
          </div>
          <div className="flex items-center gap-3">
            <span className="shrink-0 w-10 h-10 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </span>
            <a href={`mailto:${EMAIL}`} className="flex-1 min-w-0 truncate text-base font-bold text-slate-800 hover:underline">
              {EMAIL}
            </a>
            <CopyButton value={EMAIL} />
          </div>
        </div>
      </div>
    </div>
  );
}
