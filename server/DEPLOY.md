# Panel administracyjny Zielony Zając — wdrożenie na nasz serwer

Bez zależności (czysty Node 18+). Dane w `data/` (content.json, users.json, uploads/, backups/) — NIE w git.

## 1. Kod
```
git clone -b feat/zielony-zajac-rebranding https://github.com/averysultan3-creator/s-klima.git zielony-zajac
cd zielony-zajac/server
```
(albo skopiować sam folder `server/`: server.mjs, admin.html, seed-content.json)

## 2. Konto klienta (login + hasło, min. 8 znaków)
```
node server.mjs --set-password <login> <hasło>
```
Zmiana hasła później: to samo polecenie albo w panelu zakładka „Konto”.

## 3. Start (pm2)
```
set PORT=4810
set COOKIE_SECURE=1
set DATA_DIR=D:\zielony-zajac-data
pm2 start server.mjs --name zz-admin
pm2 save
```
Serwer słucha tylko na 127.0.0.1 (HOST), dostęp z zewnątrz wyłącznie przez Cloudflare Tunnel.

## 4. Cloudflare Tunnel
Hostname **zz-admin.clackdance.pl** → `http://127.0.0.1:4810`
(strona na GitHub Pages jest zbudowana z `VITE_API_URL=https://zz-admin.clackdance.pl` — jeśli
hostname będzie inny, trzeba przebudować stronę z nowym VITE_API_URL).

## 5. Sprawdzenie
- https://zz-admin.clackdance.pl/api/content → JSON z cennikiem i zdjęciami
- https://zz-admin.clackdance.pl/admin → logowanie
- zmiana ceny w panelu → widoczna na https://averysultan3-creator.github.io/s-klima/#/cennik po odświeżeniu

## Kopie zapasowe
Każdy zapis tworzy kopię w `data/backups/` (ostatnie 50). Usunięte zdjęcia też trafiają do backups.
Do backupu serwera wystarczy folder DATA_DIR.
