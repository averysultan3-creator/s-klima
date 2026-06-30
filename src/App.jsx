import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  Camera,
  Check,
  Clock3,
  Fan,
  FileImage,
  Home,
  Mail,
  MapPin,
  Phone,
  Ruler,
  Send,
  ShieldCheck,
  ShoppingBag,
  Snowflake,
  Sparkles,
  ThermometerSun,
  Upload,
  Wind,
  Wrench,
  X,
  Zap,
} from "lucide-react";

const phone = "+48 513 999 450";
const email = "kontakt@s-klimawarszawa.pl";

const products = [
  {
    id: "samsung-windfree",
    brand: "Samsung",
    name: "WindFree Comfort 2.5 kW",
    range: "do 25 m²",
    area: 25,
    image: "/products/samsung-windfree.svg",
    storePrice: 4199,
    packageReady: 3790,
    packageNew: 4390,
    shopName: "Media Expert",
    shopUrl:
      "https://www.mediaexpert.pl/agd-male/do-domu/klimatyzatory-scienne/klimatyzator-samsung-split-windfree-pure-z-usluga-montazu-1",
    note: "cicha praca i tryb bez bezpośredniego nawiewu",
  },
  {
    id: "lg-dualcool-compact",
    brand: "LG",
    name: "DualCool Compact 2.5 kW",
    range: "do 25 m²",
    area: 25,
    image: "/products/lg-dualcool-25.svg",
    storePrice: 3899,
    packageReady: 3690,
    packageNew: 4290,
    shopName: "MediaMarkt",
    shopUrl: "https://mediamarkt.pl/agd/klimatyzatory",
    note: "kompaktowy split do sypialni, gabinetu i małego salonu",
  },
  {
    id: "gree-pular",
    brand: "Gree",
    name: "Pular 3.2 kW",
    range: "20-32 m²",
    area: 32,
    image: "/products/gree-pular.svg",
    storePrice: 3799,
    packageReady: 3590,
    packageNew: 4290,
    shopName: "Gree",
    shopUrl: "https://gree.pl/klimatyzatory/",
    note: "dobry stosunek ceny do mocy przy codziennym chłodzeniu",
  },
  {
    id: "daikin-sensira",
    brand: "Daikin",
    name: "Sensira 3.5 kW",
    range: "26-35 m²",
    area: 35,
    image: "/products/daikin-sensira.svg",
    storePrice: 4599,
    packageReady: 3990,
    packageNew: 4690,
    shopName: "Daikin",
    shopUrl:
      "https://www.daikin.pl/pl_pl/klienci-indywidualni/products-and-advice/product-categories/air-conditioners.html",
    note: "dobry wybór do salonu i większej sypialni",
  },
  {
    id: "lg-dualcool",
    brand: "LG",
    name: "DualCool Standard 3.5 kW",
    range: "26-35 m²",
    area: 35,
    image: "/products/lg-dualcool-35.svg",
    storePrice: 3999,
    packageReady: 3890,
    packageNew: 4590,
    shopName: "LG",
    shopUrl: "https://www.lg.com/pl/klimatyzatory/",
    note: "szybkie chłodzenie i sterowanie z aplikacji",
  },
  {
    id: "haier-pearl",
    brand: "Haier",
    name: "Pearl 3.5 kW",
    range: "26-35 m²",
    area: 35,
    image: "/products/haier-pearl.svg",
    storePrice: 4299,
    packageReady: 3890,
    packageNew: 4590,
    shopName: "Haier",
    shopUrl: "https://www.haier-europe.com/pl_PL/klimatyzacja/",
    note: "estetyczny model do mieszkania z funkcjami oczyszczania powietrza",
  },
  {
    id: "rotenso-imoto",
    brand: "Rotenso",
    name: "Imoto 3.5 kW",
    range: "26-35 m²",
    area: 35,
    image: "/products/rotenso-imoto.svg",
    storePrice: 3899,
    packageReady: 3690,
    packageNew: 4390,
    shopName: "Rotenso",
    shopUrl: "https://rotenso.com/pl/klimatyzatory/",
    note: "popularny wybór do mieszkań, gdy liczy się cena całego pakietu",
  },
  {
    id: "samsung-luzon",
    brand: "Samsung",
    name: "Luzon 3.5 kW",
    range: "26-35 m²",
    area: 35,
    image: "/products/samsung-luzon.svg",
    storePrice: 3999,
    packageReady: 3790,
    packageNew: 4490,
    shopName: "Samsung",
    shopUrl: "https://www.samsung.com/pl/air-conditioners/",
    note: "prosty i solidny model do salonu lub większej sypialni",
  },
  {
    id: "mitsubishi-hr",
    brand: "Mitsubishi Electric",
    name: "MSZ-HR 5.0 kW",
    range: "36-50 m²",
    area: 50,
    image: "/products/mitsubishi-hr.svg",
    storePrice: 5699,
    packageReady: 5290,
    packageNew: 5990,
    shopName: "Klima Sklep",
    shopUrl:
      "https://klima-sklep.pl/klimatyzacja/14871-klimatyzator-scienny-mitsubishi-msz-hr35vf-muz-hr35vf.html",
    note: "stabilna praca w większych pomieszczeniach",
  },
  {
    id: "euro-selection",
    brand: "Dobór z marketu",
    name: "Model z EURO RTV AGD",
    range: "wg wyboru",
    area: 42,
    image: "/products/market-selection.svg",
    storePrice: 4099,
    packageReady: 3790,
    packageNew: 4490,
    shopName: "EURO RTV AGD",
    shopUrl: "https://www.euro.com.pl/klimatyzatory.bhtml",
    note: "gdy masz już wybrany model i chcesz zamówić sam montaż",
  },
];

const services = [
  [
    "Montaż klimatyzacji",
    "Czysty montaż split i multisplit z uruchomieniem oraz sprawdzeniem szczelności.",
    Wrench,
    "/offer-installation.png",
  ],
  [
    "Dobór urządzenia",
    "Moc i model dobrane do metrażu, nasłonecznienia i układu pomieszczeń.",
    Ruler,
    "/offer-selection.png",
  ],
  [
    "Zakup sprzętu",
    "Możliwość zakupu przez S-Klima albo montaż urządzenia wybranego w sklepie.",
    ShoppingBag,
    "/offer-package-price.png",
  ],
  [
    "Serwis i naprawa",
    "Przeglądy, odgrzybianie, naprawy oraz przygotowanie sprzętu przed sezonem.",
    ShieldCheck,
    "/offer-service.png",
  ],
  [
    "Instalacja freonowa",
    "Bruzdowanie, trasy freonowe, skropliny i zasilanie pod przyszły montaż.",
    Wind,
    "/no-pipes-installation.png",
  ],
  [
    "Szybki termin",
    "Wybrane instalacje w Warszawie i okolicach nawet w tym samym tygodniu.",
    Clock3,
    "/schedule-installer.png",
  ],
];

const processSteps = [
  {
    title: "Pokazujesz pomieszczenie",
    text: "Metraż, zdjęcie ściany i informacja, czy są już rurki. Bez długich rozmów.",
    image: "/calculator-room.png",
  },
  {
    title: "Dobieramy moc i model",
    text: "Klimatyzator jest dobrany do pokoju, salonu albo biura, a nie „na oko”.",
    image: "/offer-selection.png",
  },
  {
    title: "Widzisz cenę z montażem",
    text: "Od razu porównujesz cenę sklepową z pakietem S-Klima z montażem.",
    image: "/offer-package-price.png",
  },
  {
    title: "Rezerwujesz termin",
    text: "Wybierasz wolne okno montażowe i wysyłasz gotowe zgłoszenie na WhatsApp.",
    image: "/schedule-installer.png",
  },
];

const pipeOptions = [
  {
    id: "left",
    label: "Rurki z lewej",
    hint: "Najczęstszy wariant w mieszkaniach.",
    image: "/pipes-left.png",
  },
  {
    id: "right",
    label: "Rurki z prawej",
    hint: "Dobry układ przy krótkiej trasie.",
    image: "/pipes-right.png",
  },
  {
    id: "center",
    label: "Za jednostką",
    hint: "Najczystszy efekt wizualny.",
    image: "/pipes-behind.png",
  },
  {
    id: "unknown",
    label: "Nie wiem",
    hint: "Dodaj zdjęcie, dobierzemy układ.",
    image: "/no-pipes-installation.png",
  },
];

const formatPrice = (value) =>
  new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
    maximumFractionDigits: 0,
  }).format(value);

const socialLinks = {
  whatsapp: "https://wa.me/48513999450",
  instagram: "https://www.instagram.com/explore/search/keyword/?q=s-klimawarszawa",
  facebook: "https://www.facebook.com/search/top?q=S-klima%20Warszawa",
};

function scrollToId(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

function SmartImage({ src, alt, className = "", fallback = "/climate-room.png" }) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hidden, setHidden] = useState(false);

  if (hidden) return null;

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={() => {
        if (!fallback) {
          setHidden(true);
          return;
        }
        if (currentSrc !== fallback) setCurrentSrc(fallback);
      }}
    />
  );
}

function getSuggestion(area) {
  if (area <= 25) return { power: "2.5 kW", text: "mieszkanie, sypialnia lub mały salon" };
  if (area <= 35) return { power: "3.5 kW", text: "salon lub większy pokój" };
  if (area <= 50) return { power: "5.0 kW", text: "duże pomieszczenie albo biuro" };
  return { power: "multi-split", text: "warto zrobić krótką konsultację techniczną" };
}

function makeSlots() {
  const formatterDay = new Intl.DateTimeFormat("pl-PL", { weekday: "short" });
  const formatterDate = new Intl.DateTimeFormat("pl-PL", { day: "2-digit", month: "short" });
  const base = new Date();

  return Array.from({ length: 6 }, (_, index) => {
    const date = new Date(base);
    date.setDate(base.getDate() + index);
    return {
      id: date.toISOString().slice(0, 10),
      day: formatterDay.format(date),
      date: formatterDate.format(date),
      slots:
        index % 3 === 0
          ? ["09:00", "13:30"]
          : index % 3 === 1
            ? ["10:30", "16:00"]
            : ["08:30", "12:00", "17:30"],
    };
  });
}

function Nav() {
  return (
    <header className="site-nav">
      <a className="brand" href="#top" aria-label="S-Klima start">
        <span>S</span>-Klima
      </a>

      <nav className="nav-links" aria-label="Główna nawigacja">
        <button onClick={() => scrollToId("wycena")}>Wycena</button>
        <button onClick={() => scrollToId("oferta")}>Oferta</button>
        <button onClick={() => scrollToId("terminy")}>Terminy</button>
        <button onClick={() => scrollToId("kontakt")}>Kontakt</button>
      </nav>

      <a className="nav-call" href={`tel:${phone.replaceAll(" ", "")}`}>
        <Phone size={18} />
        <span>{phone}</span>
      </a>
    </header>
  );
}

function SocialButtons({ compact = false }) {
  return (
    <div className={compact ? "social-buttons compact" : "social-buttons"} aria-label="Szybki kontakt">
      <a
        className="social-btn wa"
        href={socialLinks.whatsapp}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        title="WhatsApp"
      >
        WA
      </a>
      <a
        className="social-btn ig"
        href={socialLinks.instagram}
        target="_blank"
        rel="noreferrer"
        aria-label="Instagram"
        title="Instagram"
      >
        IG
      </a>
      <a
        className="social-btn fb"
        href={socialLinks.facebook}
        target="_blank"
        rel="noreferrer"
        aria-label="Facebook"
        title="Facebook"
      >
        FB
      </a>
    </div>
  );
}

function Hero() {
  const heroRef = useRef(null);
  const [temp, setTemp] = useState(29);
  const scrollYProgress = useMotionValue(0);

  useEffect(() => {
    let frame = 0;

    const updateProgress = () => {
      if (!heroRef.current) return;
      const start = heroRef.current.offsetTop;
      const distance = Math.max(1, heroRef.current.offsetHeight - window.innerHeight);
      const next = Math.min(1, Math.max(0, (window.scrollY - start) / distance));
      scrollYProgress.set(next);
    };

    const requestUpdate = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateProgress);
    };

    updateProgress();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, [scrollYProgress]);

  const smooth = useSpring(scrollYProgress, { stiffness: 72, damping: 24, mass: 0.25 });
  const cameraScale = useTransform(smooth, [0, 0.18, 0.55, 1], [1.08, 1.34, 0.92, 0.92]);
  const cameraY = useTransform(smooth, [0, 0.18, 0.55, 1], [16, -24, 0, 0]);
  const hotImageOpacity = useTransform(smooth, [0, 0.2, 0.38], [1, 0.5, 0]);
  const airflowImageOpacity = useTransform(smooth, [0.12, 0.28, 0.62, 0.82], [0, 1, 0.9, 0]);
  const coolImageOpacity = useTransform(smooth, [0.52, 0.72, 1], [0, 1, 1]);
  const warmOpacity = useTransform(smooth, [0, 0.25, 0.72], [0.58, 0.35, 0.02]);
  const coolOpacity = useTransform(smooth, [0.15, 0.55, 1], [0, 0.32, 0.58]);
  const airflowOpacity = useTransform(smooth, [0, 0.18, 0.5, 1], [0.08, 0.88, 1, 0.72]);
  const closeupOpacity = useTransform(smooth, [0.1, 0.22, 0.48, 0.58], [0, 1, 1, 0]);
  const closeupScale = useTransform(smooth, [0.1, 0.36, 0.58], [0.82, 1.08, 0.86]);
  const closeupX = useTransform(smooth, [0.1, 0.58], [80, -34]);
  const hotStoryOpacity = useTransform(smooth, [0, 0.16, 0.3], [1, 1, 0]);
  const airflowStoryOpacity = useTransform(smooth, [0.24, 0.4, 0.58], [0, 1, 0]);
  const coolStoryOpacity = useTransform(smooth, [0.54, 0.74, 1], [0, 1, 1]);
  const finalCardOpacity = useTransform(smooth, [0.72, 0.88, 1], [0, 1, 1]);
  const finalCardY = useTransform(smooth, [0.72, 1], [18, 0]);
  const tempMotion = useTransform(smooth, [0, 0.25, 0.65, 1], [29, 27, 22, 21]);
  const mercuryScale = useTransform(smooth, [0, 1], [1, 0.28]);

  useMotionValueEvent(tempMotion, "change", (latest) => {
    setTemp(Math.round(latest));
  });

  return (
    <section id="top" className="hero-scroll" ref={heroRef}>
      <div className="hero-sticky">
        <div className="hero-layout">
          <div className="hero-copy">
            <div className="eyebrow">
              <Sparkles size={16} />
              Montaż klimatyzacji Warszawa
            </div>
            <h1>S-Klima Warszawa</h1>
            <p className="lead">
              Dobór, zakup i szybki montaż klimatyzacji bez czekania na oddzielną rozmowę.
              Zobacz efekt chłodzenia, policz orientacyjną cenę i wybierz termin.
            </p>

            <div className="hero-actions">
              <button className="primary-btn" onClick={() => scrollToId("wycena")}>
                <Send size={18} />
                Darmowa wycena
              </button>
              <button className="secondary-btn" onClick={() => scrollToId("terminy")}>
                <CalendarDays size={18} />
                Zaplanuj montaż
              </button>
            </div>
            <SocialButtons compact />

            <div className="metric-row" aria-label="Najważniejsze informacje">
              <div>
                <strong>60 sek.</strong>
                <span>wstępna wycena</span>
              </div>
              <div>
                <strong>1 dzień</strong>
                <span>typowy montaż split</span>
              </div>
              <div>
                <strong>21°C</strong>
                <span>komfort po instalacji</span>
              </div>
            </div>
          </div>

          <div className="hero-visual-wrap">
            <motion.div className="room-stage" style={{ scale: cameraScale, y: cameraY }}>
              <motion.div className="room-image-layer" style={{ opacity: hotImageOpacity }}>
                <SmartImage
                  src="/hero-hot-room.png"
                  alt="Pokój przed montażem klimatyzacji w upalny dzień"
                  className="room-image"
                />
              </motion.div>
              <motion.div className="room-image-layer" style={{ opacity: airflowImageOpacity }}>
                <SmartImage
                  src="/hero-airflow-room.png"
                  alt="Klimatyzator rozprowadza chłodne powietrze po salonie"
                  className="room-image"
                />
              </motion.div>
              <motion.div className="room-image-layer" style={{ opacity: coolImageOpacity }}>
                <SmartImage
                  src="/hero-cool-room.png"
                  alt="Schłodzony salon po montażu klimatyzacji"
                  className="room-image"
                />
              </motion.div>
              <motion.div className="warm-filter" style={{ opacity: warmOpacity }} />
              <motion.div className="cool-filter" style={{ opacity: coolOpacity }} />
              <motion.div className="air-system" style={{ opacity: airflowOpacity }}>
                <span className="air-stream stream-one" />
                <span className="air-stream stream-two" />
                <span className="air-stream stream-three" />
                <span className="air-stream stream-four" />
                <span className="snow-dot dot-one" />
                <span className="snow-dot dot-two" />
                <span className="snow-dot dot-three" />
              </motion.div>

              <div className="thermo-card" aria-label={`Temperatura ${temp} stopni`}>
                <div className="thermo-icon">
                  <ThermometerSun size={22} />
                </div>
                <div>
                  <strong>{temp}°C</strong>
                  <span>{temp > 23 ? "schładzamy pomieszczenie" : "komfort gotowy"}</span>
                </div>
                <div className="mercury-track">
                  <motion.span style={{ scaleY: mercuryScale }} />
                </div>
              </div>

              <div className="install-badge">
                <Fan size={18} />
                dobór mocy + montaż + serwis
              </div>

              <div className="hero-story">
                <motion.div style={{ opacity: hotStoryOpacity }}>
                  <span>1</span>
                  <strong>Najpierw czuć upał</strong>
                  <small>pomieszczenie nagrzewa się i komfort spada</small>
                </motion.div>
                <motion.div style={{ opacity: airflowStoryOpacity }}>
                  <span>2</span>
                  <strong>Urządzenie rozprowadza chłód</strong>
                  <small>nawiew szybko miesza powietrze w pokoju</small>
                </motion.div>
                <motion.div style={{ opacity: coolStoryOpacity }}>
                  <span>3</span>
                  <strong>W pokoju robi się przyjemnie</strong>
                  <small>temperatura spada, komfort rośnie od razu</small>
                </motion.div>
              </div>

              <motion.div
                className="ac-closeup-card"
                style={{ opacity: closeupOpacity, scale: closeupScale, x: closeupX }}
                aria-hidden="true"
              >
                <SmartImage src="/ac-closeup.png" alt="" className="ac-closeup-image" />
                <span>cichy nawiew</span>
              </motion.div>

              <motion.div
                className="comfort-result"
                style={{ opacity: finalCardOpacity, y: finalCardY }}
              >
                <Check size={18} />
                <div>
                  <strong>Komfort gotowy</strong>
                  <span>wycena, dobór i termin w jednym miejscu</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <button className="hero-peek" onClick={() => scrollToId("wycena")}>
          <span>Przejdź do wyceny</span>
          <ArrowRight size={18} />
        </button>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="section process-section">
      <div className="section-heading">
        <span className="section-kicker">Jak działa</span>
        <h2>Od pierwszego kliknięcia do terminu montażu.</h2>
        <p>
          Sprawdzasz metraż, wybierasz wariant instalacji, porównujesz modele i wysyłasz
          zapytanie bez długich rozmów telefonicznych.
        </p>
      </div>

      <div className="process-grid">
        {processSteps.map((step, index) => (
          <article className="process-card" key={step.title}>
            <div className="process-number">{String(index + 1).padStart(2, "0")}</div>
            <SmartImage src={step.image} alt={step.title} />
            <h3>{step.title}</h3>
            <p>{step.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function OfferSection() {
  return (
    <section id="oferta" className="section offer-section">
      <div className="section-heading">
        <span className="section-kicker">Oferta</span>
        <h2>Wszystko, czego potrzebujesz przed montażem.</h2>
        <p>
          Dobór klimatyzatora, zakup urządzenia, montaż, serwis i przygotowanie instalacji
          w Warszawie oraz okolicach.
        </p>
      </div>

      <div className="service-grid">
        {services.map(([title, description, Icon, image]) => (
          <article className="service-tile" key={title}>
            <div className="service-visual">
              <SmartImage src={image} alt={title} />
              <span>
                <Icon size={19} />
              </span>
            </div>
            <div className="service-copy">
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function PipeSketch({ type }) {
  return (
    <div className={`pipe-sketch pipe-${type}`} aria-hidden="true">
      <span className="unit" />
      <span className="pipe-line" />
      <span className="wall-dot" />
    </div>
  );
}

function LeadCalculator() {
  const [area, setArea] = useState(28);
  const [hasPipes, setHasPipes] = useState("yes");
  const [pipeType, setPipeType] = useState("left");
  const [selectedId, setSelectedId] = useState(products[1].id);
  const [fileName, setFileName] = useState("");
  const [lead, setLead] = useState({ name: "", phone: "", district: "" });
  const [submitted, setSubmitted] = useState(false);

  const selectedProduct = products.find((product) => product.id === selectedId) ?? products[0];
  const suggestion = getSuggestion(Number(area) || 0);
  const routeAddOn = Number(area) > selectedProduct.area ? 350 : 0;
  const packageBase =
    hasPipes === "yes" ? selectedProduct.packageReady : selectedProduct.packageNew;
  const total = packageBase + routeAddOn;
  const whatsappMessage = encodeURIComponent(
    `Dzień dobry, proszę o wycenę klimatyzacji. Metraż: ${area} m². Rurki: ${
      hasPipes === "yes" ? pipeType : "brak, potrzebna instalacja"
    }. Model: ${selectedProduct.name}. Orientacyjna cena ze strony: ${formatPrice(total)}. Imię: ${
      lead.name || "-"
    }. Dzielnica: ${lead.district || "-"}.`,
  );

  const visibleProducts =
    hasPipes === "yes"
      ? products.filter((product) => Number(area) <= product.area + 10)
      : products;

  function submitLead(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="wycena" className="calculator-band">
      <div className="section-heading light">
        <span className="section-kicker">Darmowa wycena</span>
        <h2>Policz orientacyjny koszt klimatyzacji.</h2>
        <p>
          Podaj metraż, zaznacz czy są już rurki w ścianie i wybierz urządzenie. Od razu
          zobaczysz cenę pakietu z montażem.
        </p>
      </div>

      <div className="calculator-shell">
        <div className="calc-main">
          <div className="calc-row">
            <div className="field-block">
              <label htmlFor="area">Metraż pomieszczenia</label>
              <div className="area-control">
                <input
                  id="area"
                  type="range"
                  min="12"
                  max="80"
                  value={area}
                  onChange={(event) => setArea(Number(event.target.value))}
                />
                <input
                  type="number"
                  min="12"
                  max="120"
                  value={area}
                  onChange={(event) => setArea(Number(event.target.value))}
                  aria-label="Metraż w metrach kwadratowych"
                />
                <span>m²</span>
              </div>
            </div>

            <div className="suggestion-box">
              <Snowflake size={24} />
              <div>
                <span>Rekomendowana moc</span>
                <strong>{suggestion.power}</strong>
                <small>{suggestion.text}</small>
              </div>
            </div>
          </div>

          <div className="choice-group" role="group" aria-label="Czy są już rurki w ścianie">
            <button
              className={hasPipes === "yes" ? "is-active" : ""}
              onClick={() => setHasPipes("yes")}
              type="button"
            >
              <Check size={18} />
              Mam już rurki w ścianie
            </button>
            <button
              className={hasPipes === "no" ? "is-active" : ""}
              onClick={() => setHasPipes("no")}
              type="button"
            >
              <Wrench size={18} />
              Trzeba zrobić całą instalację
            </button>
          </div>

          {hasPipes === "yes" && (
            <div className="pipes-block">
              <div className="mini-heading">
                <Camera size={18} />
                Wybierz układ rurek albo dodaj zdjęcie
              </div>
              <div className="pipe-options">
                {pipeOptions.map((option) => (
                  <button
                    className={pipeType === option.id ? "pipe-card is-active" : "pipe-card"}
                    key={option.id}
                    type="button"
                    onClick={() => setPipeType(option.id)}
                  >
                    <SmartImage
                      src={option.image}
                      alt={option.label}
                      className="pipe-image"
                      fallback=""
                    />
                    <PipeSketch type={option.id} />
                    <strong>{option.label}</strong>
                    <span>{option.hint}</span>
                  </button>
                ))}
              </div>
              <label className="upload-zone">
                <Upload size={20} />
                <span>{fileName || "Dodaj zdjęcie ściany lub schemat instalacji"}</span>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
                />
              </label>
            </div>
          )}

          <div className="mini-heading product-heading">
            <ShoppingBag size={18} />
            Wybierz urządzenie
          </div>
          <div className="product-grid">
            {visibleProducts.map((product) => {
              const isSelected = product.id === selectedId;
              const productBase =
                hasPipes === "yes" ? product.packageReady : product.packageNew;
              const productTotal =
                productBase + (Number(area) > product.area ? 350 : 0);
              return (
                <article className={isSelected ? "product-card is-selected" : "product-card"} key={product.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(product.id)}
                    aria-pressed={isSelected}
                  >
                    <span className="product-visual">
                      <SmartImage
                        src={product.image}
                        alt={`${product.brand} ${product.name}`}
                        className="product-image"
                      />
                    </span>
                    <span className="brand-line">{product.brand}</span>
                    <strong>{product.name}</strong>
                    <small>{product.range}</small>
                  </button>
                  <p>{product.note}</p>
                  <div className="compare-price">
                    <span>W sklepie ok. {formatPrice(product.storePrice)}</span>
                    <strong>U nas z montażem od {formatPrice(productTotal)}</strong>
                  </div>
                  <div className="product-footer">
                    <a href={product.shopUrl} target="_blank" rel="noreferrer">
                      {product.shopName}
                      <ArrowRight size={15} />
                    </a>
                    <strong>{formatPrice(productTotal)}</strong>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <aside className="price-panel">
          <span className="panel-label">Orientacyjna wycena</span>
          <h3>{selectedProduct.name}</h3>
          <div className="selected-product-visual">
            <SmartImage
              src={selectedProduct.image}
              alt={`${selectedProduct.brand} ${selectedProduct.name}`}
            />
          </div>
          <div className="price-total">{formatPrice(total)}</div>
          <ul className="price-list">
            <li>
              <span>Cena w sklepie</span>
              <strong>{formatPrice(selectedProduct.storePrice)}</strong>
            </li>
            <li>
              <span>{hasPipes === "yes" ? "Pakiet S-Klima do gotowych rurek" : "Pakiet z nową instalacją"}</span>
              <strong>{formatPrice(packageBase)}</strong>
            </li>
            {routeAddOn > 0 && (
              <li>
                <span>Dłuższa trasa / większy metraż</span>
                <strong>{formatPrice(routeAddOn)}</strong>
              </li>
            )}
          </ul>
          <p className="price-disclaimer">
            Cena orientacyjna. Dokładną kwotę potwierdzamy po zdjęciu ściany lub krótkich
            oględzinach.
          </p>

          <form className="lead-form" onSubmit={submitLead}>
            <label>
              Imię
              <input
                value={lead.name}
                onChange={(event) => setLead({ ...lead, name: event.target.value })}
                placeholder="Np. Mateusz"
              />
            </label>
            <label>
              Telefon
              <input
                value={lead.phone}
                onChange={(event) => setLead({ ...lead, phone: event.target.value })}
                placeholder="+48 ..."
                required
              />
            </label>
            <label>
              Dzielnica / miasto
              <input
                value={lead.district}
                onChange={(event) => setLead({ ...lead, district: event.target.value })}
                placeholder="Mokotów, Wola, Piaseczno..."
              />
            </label>
            <button className="primary-btn full" type="submit">
              <Send size={18} />
              Poproś o dokładną wycenę
            </button>
          </form>

          {submitted && (
            <div className="success-note" role="status">
              <Check size={18} />
              <div>
                <strong>Zapytanie gotowe.</strong>
                <span>Następny krok: potwierdzenie terminu i modelu.</span>
                <a
                  href={`${socialLinks.whatsapp}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Wyślij szczegóły przez WhatsApp
                </a>
              </div>
            </div>
          )}
        </aside>
      </div>
    </section>
  );
}

function ScheduleSection() {
  const slots = useMemo(() => makeSlots(), []);
  const [selected, setSelected] = useState(`${slots[0].id} 09:00`);
  const scheduleMessage = encodeURIComponent(
    `Dzień dobry, chcę zarezerwować termin montażu klimatyzacji: ${selected}. Proszę o potwierdzenie dostępności.`,
  );

  return (
    <section id="terminy" className="section schedule-section">
      <div className="section-heading">
        <span className="section-kicker">Terminy</span>
        <h2>Wybierz wygodny termin montażu.</h2>
        <p>
          Zarezerwuj preferowany dzień i godzinę. Po wysłaniu zgłoszenia potwierdzimy
          dostępność, model urządzenia i warunki techniczne.
        </p>
      </div>

      <div className="schedule-layout">
        <div className="schedule-art">
          <SmartImage src="/schedule-installer.png" alt="Instalator pokazujący dostępny termin" />
        </div>
        <div className="calendar-grid" role="group" aria-label="Dostępne terminy montażu">
          {slots.map((day) => (
            <div className="calendar-day" key={day.id}>
              <div className="day-head">
                <strong>{day.day}</strong>
                <span>{day.date}</span>
              </div>
              {day.slots.map((slot) => {
                const id = `${day.id} ${slot}`;
                return (
                  <button
                    className={selected === id ? "slot-btn is-selected" : "slot-btn"}
                    key={id}
                    onClick={() => setSelected(id)}
                    type="button"
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          ))}
        </div>

        <aside className="schedule-summary">
          <CalendarDays size={30} />
          <span>Wybrany termin</span>
          <strong>{selected}</strong>
          <p>
            Po wysłaniu wyceny S-Klima potwierdza dostępność, model urządzenia i warunki
            techniczne montażu.
          </p>
          <div className="summary-actions">
            <a
              className="primary-btn"
              href={`${socialLinks.whatsapp}?text=${scheduleMessage}`}
              target="_blank"
              rel="noreferrer"
            >
              <Send size={18} />
              Rezerwuj na WhatsApp
            </a>
            <a className="secondary-btn" href={`tel:${phone.replaceAll(" ", "")}`}>
              <Phone size={18} />
              Zadzwoń teraz
            </a>
            <a className="secondary-btn" href={`mailto:${email}`}>
              <Mail size={18} />
              Wyślij mail
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}

function AvailabilityPopup() {
  const [visible, setVisible] = useState(true);
  const [armed, setArmed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector(".hero-scroll");
      const heroBottom = hero ? hero.offsetTop + hero.offsetHeight : window.innerHeight;
      setArmed(window.scrollY >= heroBottom - 8);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (!visible || !armed) return null;

  return (
    <div className="availability-pop">
      <button className="close-pop" onClick={() => setVisible(false)} aria-label="Zamknij">
        <X size={16} />
      </button>
      <div className="pulse-dot" />
      <div>
        <strong>3 wolne terminy w tym tygodniu</strong>
        <span>Montaż split lub oględziny techniczne.</span>
      </div>
      <button type="button" onClick={() => scrollToId("terminy")}>
        Pokaż
      </button>
    </div>
  );
}

function ContactFooter() {
  return (
    <footer id="kontakt" className="footer">
      <div>
        <a className="brand light-brand" href="#top">
          <span>S</span>-Klima
        </a>
        <p>
          Profesjonalny dobór, montaż i serwis klimatyzacji w Warszawie oraz okolicach.
          Szybka wycena, wygodny termin i kontakt bez zbędnego czekania.
        </p>
        <SocialButtons />
      </div>
      <div className="footer-links">
        <a href={`tel:${phone.replaceAll(" ", "")}`}>
          <Phone size={18} />
          {phone}
        </a>
        <a href={`mailto:${email}`}>
          <Mail size={18} />
          {email}
        </a>
        <span>
          <MapPin size={18} />
          Warszawa i okolice
        </span>
      </div>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    window.setTimeout(() => scrollToId(id), 80);
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProcessSection />
        <OfferSection />
        <LeadCalculator />
        <ScheduleSection />
      </main>
      <ContactFooter />
      <AvailabilityPopup />
    </>
  );
}
