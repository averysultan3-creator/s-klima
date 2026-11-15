# Zielony Zając — strona + panel na naszym serwerze

Jeden proces Node (zero zależności, Node 18+) serwuje wszystko z jednego adresu:

| adres | co |
|---|---|
| `/` | strona (gotowy build w `server/site/`) |
| `/admin/` | panel klienta (login + hasło): cennik, zdjęcia w 3 kategoriach |
| `/api/...` | dane dla strony i panelu |
| `/healthz` | stan serwera (dla monitoringu) |

Dane (ceny, zdjęcia klienta, hasła, kopie) leżą POZA repo w `DATA_DIR` — `git pull` ich nie rusza.
GitHub Pages (https://averysultan3-creator.github.io/s-klima/) zostaje jako zapasowa kopia strony
i też pobiera ceny/zdjęcia z naszego serwera.

## 1. Pierwsze uruchomienie
```
git clone -b feat/zielony-zajac-rebranding https://github.com/averysultan3-creator/s-klima.git C:\srv\zielony-zajac
cd C:\srv\zielony-zajac\server
set DATA_DIR=C:\srv\zielony-zajac-data
node server.mjs --set-password zielonyzajac <silne hasło, 14+ znaków>
set ZZ_DATA_DIR=C:\srv\zielony-zajac-data
pm2 start ecosystem.config.cjs
pm2 save
```
- `ecosystem.config.cjs`: nazwa `zielony-zajac`, port 4810 tylko na 127.0.0.1, COOKIE_SECURE=1,
  autorestart, restart przy >300 MB RAM. Domyślny DATA_DIR = `..\..\zielony-zajac-data` (obok repo).
- `--set-password` i pm2 muszą używać TEGO SAMEGO DATA_DIR.
- pm2 musi wstawać po restarcie Windows (tak jak `mob-tunnel`): `pm2 save` po każdej zmianie.
- Hasło przekazać tylko właścicielowi. Zmiana później: to samo polecenie albo zakładka „Konto” w panelu.

## 2. Cloudflare Tunnel
Hostname **zielonyzajac.clackdance.pl** → `http://127.0.0.1:4810`
(zapasowa kopia na GitHub Pages jest zbudowana z tym adresem API — inny hostname = przebudować:
zmienić `PUBLIC_API` w `scripts/build.mjs`, `node scripts/build.mjs`, wypchnąć `dist` na gh-pages).

## 3. Sprawdzenie
- https://zielonyzajac.clackdance.pl/healthz → `{"ok":true,"site":true,...,"photos":84}`
- https://zielonyzajac.clackdance.pl/ → strona
- https://zielonyzajac.clackdance.pl/admin/ → logowanie, zmiana ceny → widać na stronie po odświeżeniu
- Monitoring (zalecany): UptimeRobot / Cloudflare Health Check na `/healthz` co 1–5 min z alertem.

## 4. Aktualizacja strony (po zmianach w kodzie)
```
cd C:\srv\zielony-zajac && git pull && pm2 restart zielony-zajac
```
Pliki strony serwer czyta z dysku, więc nawet bez restartu nowa wersja jest widoczna od razu.
Sesje klienta przeżywają restart (na dysku tylko hash tokenu).

## 5. Własna domena zielonyzajac.pl (gdy klient da dostęp do panelu domeny w cyberfolks)
1. Dodać strefę zielonyzajac.pl do naszego Cloudflare. **PRZED zmianą serwerów DNS skopiować
   WSZYSTKIE rekordy z cyberfolks, zwłaszcza MX / SPF (TXT) / DKIM / autodiscover** — inaczej przestanie
   działać poczta kontakt@zielonyzajac.pl.
2. W cyberfolks zmienić serwery nazw (NS) na te z Cloudflare.
3. Tunnel: `zielonyzajac.pl` i `www.zielonyzajac.pl` → `http://127.0.0.1:4810`
   (www → przekierowanie na zielonyzajac.pl w Cloudflare Redirect Rules).
4. `PUBLIC_API` w `scripts/build.mjs` = `https://zielonyzajac.pl`, przebudować, wypchnąć.

## Odporność
- Każdy błąd zapytania łapany osobno; nieoczekiwany błąd procesu → wyjście, pm2 podnosi w <1 s.
- Zapis atomowy (plik tymczasowy + rename). Uszkodzony content.json (np. zanik prądu) → serwer sam
  bierze najnowszą dobrą kopię z `backups/`, uszkodzony plik odkłada jako `damaged-*.json`.
- Każdy zapis cennika/zdjęć = kopia w `backups/` (ostatnie 50); usunięte zdjęcia też trafiają do `backups/`.
- Strona działa nawet gdy API nie odpowiada (wbudowane dane z dnia budowy).
- Logowanie: 8 błędnych prób = blokada IP na 15 min (IP z Cloudflare `CF-Connecting-IP`).
- Kopia zapasowa całości = folder DATA_DIR (warto kopiować raz dziennie na inny dysk).
