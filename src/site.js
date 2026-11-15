import { useEffect, useState } from "react";
import defaultContent from "./data/default-content.json";
import { assetPath } from "./utils";

// Company data used on every page, banners and the business card.
export const PHONE = "+48 513 999 450";
export const PHONE_TEL = "tel:+48513999450";
export const EMAIL = "kontakt@zielonyzajac.pl";
export const WEBSITE = "zielonyzajac.pl";
export const NIP = "1133216745";
export const REGON = "546053806";
export const GOOGLE_MAPS_URL = "https://maps.app.goo.gl/928bwgZNxqXQfxgY7";
export const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61596534090714";
export const SITE_URL = "https://averysultan3-creator.github.io/s-klima/";

export const PHOTO_CATEGORIES = [
  { id: "wewnatrz", label: "Wewnątrz" },
  { id: "zewnatrz", label: "Na zewnątrz" },
  { id: "bruzdowanie", label: "Bruzdowanie" },
];

// Admin API (prices + photos).
//   unset            -> bundled content only
//   "same-origin"    -> the site is served by our server itself (/api/content)
//   "https://host"   -> a separate API host (GitHub Pages mirror)
const RAW_API = import.meta.env.VITE_API_URL || "";
const API_ENABLED = RAW_API !== "";
export const API_URL = RAW_API === "same-origin" ? "" : RAW_API.replace(/\/$/, "");

export const photoUrl = (src) => {
  if (!src) return src;
  if (/^(https?:|data:|blob:)/.test(src)) return src;
  if (src.startsWith("/uploads/")) return `${API_URL}${src}`;
  return assetPath(src);
};

let cache = null;
let pending = null;
const listeners = new Set();

function loadContent() {
  if (pending || !API_ENABLED) return;
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 6000);
  pending = fetch(`${API_URL}/api/content`, { signal: ctrl.signal, cache: "no-store" })
    .then((r) => (r.ok ? r.json() : null))
    .then((data) => {
      if (data && data.photos && data.cennik) {
        cache = data;
        listeners.forEach((fn) => fn(data));
      }
    })
    .catch(() => {})
    .finally(() => clearTimeout(timer));
}

export function useContent() {
  const [content, setContent] = useState(cache || defaultContent);
  useEffect(() => {
    listeners.add(setContent);
    loadContent();
    return () => listeners.delete(setContent);
  }, []);
  return content;
}

export function allPhotos(content) {
  return PHOTO_CATEGORIES.flatMap((c) => content.photos[c.id] || []);
}
