import React from "react";
import { X, ShieldCheck, Lock } from "lucide-react";

export default function RodoModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200"
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 leading-tight">
                Polityka Prywatności i RODO
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Zielony Zając Sp. z o.o. • NIP: 1133216745
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200/60 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Legal Body */}
        <div className="p-6 overflow-y-auto text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4">
          <section>
            <h4 className="font-extrabold text-slate-900 text-base mb-1">1. Administrator Danych Osobowych</h4>
            <p>
              Administratorem Twoich danych osobowych jest <strong>Zielony Zając Spółka z ograniczoną odpowiedzialnością</strong> z siedzibą w Warszawie, NIP: <strong>1133216745</strong> (dalej: „Administrator”).
              Kontakt z Administratorem możliwy jest pod adresem e-mail: <a href="mailto:kontakt@zielonyzajac.pl" className="text-emerald-700 font-bold underline">kontakt@zielonyzajac.pl</a> lub telefonicznie: <strong>+48 513 666 450</strong>.
            </p>
          </section>

          <section>
            <h4 className="font-extrabold text-slate-900 text-base mb-1">2. Cel i podstawa przetwarzania danych</h4>
            <p>Twoje dane osobowe przetwarzane są w celu:</p>
            <ul className="list-disc list-inside mt-1 space-y-1 text-slate-600">
              <li>Udzielenia odpowiedzi na zapytanie ofertowe, przygotowania bezpłatnego kosztorysu i doboru klimatyzacji (art. 6 ust. 1 lit. b RODO);</li>
              <li>Realizacji umowy na montaż lub serwis urządzeń klimatyzacyjnych oraz wystawienia faktury VAT (art. 6 ust. 1 lit. b oraz lit. c RODO);</li>
              <li>Utrzymania gwarancji producenta oraz archiwizacji dokumentacji F-Gaz zgodnie z prawem ochrony środowiska;</li>
              <li>Prawnie uzasadnionego interesu Administratora, w tym obrony przed ewentualnymi roszczeniami (art. 6 ust. 1 lit. f RODO).</li>
            </ul>
          </section>

          <section>
            <h4 className="font-extrabold text-slate-900 text-base mb-1">3. Zakres zbieranych danych</h4>
            <p>
              Przetwarzamy wyłącznie dane niezbędne do wykonania audytu technicznego i montażu: imię i nazwisko, numer telefonu, adres e-mail oraz adres planowanego montażu (dzielnica / ulica).
            </p>
          </section>

          <section>
            <h4 className="font-extrabold text-slate-900 text-base mb-1">4. Okres przechowywania danych</h4>
            <p>
              Dane przetwarzane w celach kontaktowych przechowujemy do momentu zakończenia rozmów lub wygaśnięcia oferty. Dane związane z realizacją umowy i gwarancji przechowujemy przez okres trwania gwarancji (do 5 lat) oraz zgodnie z wymogami przepisów podatkowych (5 lat od końca roku podatkowego).
            </p>
          </section>

          <section>
            <h4 className="font-extrabold text-slate-900 text-base mb-1">5. Prawa użytkownika</h4>
            <p>
              Każdej osobie, której dane dotyczą, przysługuje prawo: dostępu do swoich danych, ich sprostowania, usunięcia („prawo do bycia zapomnianym”), ograniczenia przetwarzania, przenoszenia danych oraz wniesienia sprzeciwu. Masz również prawo wnieść skargę do Prezesa Urzędu Ochrony Danych Osobowych (UODO).
            </p>
          </section>

          <section>
            <h4 className="font-extrabold text-slate-900 text-base mb-1">6. Pliki Cookies (Ciasteczka)</h4>
            <p>
              Strona wykorzystuje wyłącznie niezbędne pliki cookies służące prawidłowemu funkcjonowaniu witryny i zapamiętywaniu preferencji sesji użytkownika. Nie stosujemy inwazyjnych trackerów śledzących.
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition cursor-pointer"
          >
            Rozumiem i akceptuję
          </button>
        </div>
      </div>
    </div>
  );
}
