"use client";

import { useState, useMemo, useCallback } from "react";
import styles from "./PackagesSection.module.css";

// ─── Configurable constants ─────────────────────────────────────────────────
const WA_NUMBER = "6287887525520";
const ADD_ON_PERSONEL_PRICE = 1_000_000;
const SOUND_UPGRADE_PRICE_PER_1000W = 1_000_000;
const BASE_SOUND_WATT = 2000;

const EXTRA_SERVICES = [
  { id: "dj",         label: "DJ",              price: 3_000_000 },
  { id: "mc_wedding", label: "MC Wedding",       price: 2_500_000, onlyFor: "wedding" as EventType },
  { id: "mc_event",   label: "MC Event",         price: 5_000_000, onlyFor: "event"   as EventType },
  { id: "lighting",   label: "Lighting (mulai)", price: 3_000_000 },
] as const;

type ServiceId = (typeof EXTRA_SERVICES)[number]["id"];
type EventType = "wedding" | "event";

// ─── Standalone service cards (DJ / MC / Lighting) ──────────────────────────
// Harga flat, tanpa kalkulator. Bisa dipesan standalone maupun di-add-on ke paket.
type StandaloneService = {
  id: string;
  title: string;
  price: number;
  priceNote?: string;   // mis. "mulai dari" — ditampilkan di bawah harga
  icon: string;         // emoji / karakter dekoratif
  description: string;
  imageUrl?: string;
};

const STANDALONE_SERVICES: StandaloneService[] = [
  {
    id: "standalone-dj",
    title: "DJ",
    price: 4_000_000,
    icon: "🎧",
    description: "DJ profesional siap memeriahkan acara Anda dengan mixing live berkualitas tinggi.",
  },
  {
    id: "standalone-mc-wedding",
    title: "MC Wedding",
    price: 2_500_000,
    icon: "🎙️",
    description: "Master of Ceremony Wedding berpengalaman, memandu acara pernikahan Anda dengan elegan.",
  },
  {
    id: "standalone-mc-event",
    title: "MC Event",
    price: 5_000_000,
    icon: "🎤",
    description: "MC Event profesional untuk seminar, gathering, corporate event, dan acara besar lainnya.",
  },
  {
    id: "standalone-lighting",
    title: "Lighting",
    price: 3_000_000,
    priceNote: "mulai dari",
    icon: "💡",
    description: "Paket lighting profesional untuk mempercantik suasana acara Anda.",
  },
];

// ─── Location logic ──────────────────────────────────────────────────────────
const LOCATIONS = [
  { value: "DKI Jakarta", label: "DKI Jakarta", discount: false },
  { value: "Bekasi",      label: "Bekasi",       discount: false },
  { value: "Tangerang",   label: "Tangerang",    discount: true  },
  { value: "Depok",       label: "Depok",        discount: true  },
  { value: "Bogor",       label: "Bogor",        discount: true  },
  { value: "Bandung",     label: "Bandung",      discount: true  },
  { value: "Cianjur",     label: "Cianjur",      discount: true  },
  { value: "Sukabumi",    label: "Sukabumi",     discount: true  },
];

// ─── Office location ─────────────────────────────────────────────────────────
const OFFICE = {
  name: "Rumah Nada Entertainment",
  address: "Pamulang, Tangerang Selatan, Banten",
  mapsUrl: "https://maps.app.goo.gl/SrQ8c1kjThKP8YPQ6",
  embedSrc:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.1!2d106.7307!3d-6.3563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69eff1762c1cc5%3A0x322325c834323d3f!2sRumah%20Nada%20Entertainment%2C%20Pamulang%20Tangerang%20Selatan!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid",
};

// ─── Package data ─────────────────────────────────────────────────────────────
const FLAT_PRICE_TITLES = ["Orchestra", "Mini Orchestra"];

export type Package = {
  _id: string;
  title: string;
  price: number;
  flatPrice?: boolean;
  imageUrl?: string;
  isFeatured?: boolean;
  features?: string[];
};

function isFlatPrice(pkg: Package): boolean {
  return !!pkg.flatPrice || FLAT_PRICE_TITLES.includes(pkg.title);
}

const NOTES = [
  "Price belum termasuk Sound System (+Rp 1.500.000, FREE dari Akad–Resepsi, 1 operator standby)",
  "Durasi 3 × 60 menit (3 jam)",
  "DP 40% maks. 1 minggu setelah deal booked, H-3 pelunasan (DP hangus jika ada pembatalan)",
  "Open request maksimal 5 lagu",
  "FREE biaya sewa alat musik",
  "FREE iringan kirab untuk paket yang menggunakan Saxo / Biola",
  "Pemadaman listrik tidak ada pemotongan harga",
];

// ─── Price calculator (hanya untuk paket band) ────────────────────────────────
function calculateTotal({
  basePrice, flatPrice, eventType, location, extraPersonel,
  extraSoundKw, selectedServices, personelCount,
}: {
  basePrice: number; flatPrice?: boolean; eventType: EventType; location: string;
  extraPersonel: number; extraSoundKw: number;
  selectedServices: Set<ServiceId>; personelCount: number;
}) {
  let total = (!flatPrice && eventType === "event") ? basePrice * 1.5 : basePrice;
  const loc = LOCATIONS.find((l) => l.value === location);
  if (loc?.discount) total -= (personelCount + extraPersonel) * 200_000;
  total += extraPersonel * ADD_ON_PERSONEL_PRICE;
  total += extraSoundKw * SOUND_UPGRADE_PRICE_PER_1000W;
  for (const svc of EXTRA_SERVICES) {
    if (selectedServices.has(svc.id)) total += svc.price;
  }
  return Math.max(0, total);
}

function fmt(n: number) {
  return "IDR " + n.toLocaleString("id-ID");
}

// ─── Logo mark ────────────────────────────────────────────────────────────────
function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36" fill="none">
      <rect x="6" y="6" width="24" height="24" rx="4" stroke="#d4af37" strokeWidth="1.5" transform="rotate(45 18 18)" />
      <rect x="9" y="9" width="18" height="18" rx="3" stroke="#d4af37" strokeWidth="1" transform="rotate(45 18 18)" />
      <circle cx="18" cy="18" r="5" fill="#d4af37" fillOpacity="0.8" />
    </svg>
  );
}

// ─── WA icon ──────────────────────────────────────────────────────────────────
function WaIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

// ─── Standalone Service Modal ─────────────────────────────────────────────────
function StandaloneModal({
  svc,
  onClose,
}: {
  svc: StandaloneService;
  onClose: () => void;
}) {
  const waText = [
    `Halo! Saya ingin memesan layanan *${svc.title}* secara standalone.`,
    `Harga: ${fmt(svc.price)}${svc.priceNote ? ` (${svc.priceNote})` : ""}`,
    `Mohon informasi ketersediaan dan detail lebih lanjut. Terima kasih!`,
  ].join("\n");
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waText)}`;

  return (
    <div className={styles.modalBackdrop} onClick={onClose} role="dialog" aria-modal="true">
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalTop} />

        {svc.imageUrl && (
          <div className={styles.modalImageWrap}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={svc.imageUrl} alt={svc.title} className={styles.modalImage} />
            <div className={styles.modalImageOverlay} />
            <div className={styles.modalImageTitle}>
              <h2>{svc.title}</h2>
              <p>{fmt(svc.price)}</p>
            </div>
          </div>
        )}

        <div className={styles.modalBody}>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Tutup">✕</button>

          {!svc.imageUrl && (
            <div className={styles.modalTitleBlock}>
              <div className={styles.standaloneIconLarge}>{svc.icon}</div>
              <h2 className={styles.modalPkgName}>{svc.title}</h2>
              <p className={styles.modalBasePrice}>
                {svc.priceNote && <span className={styles.priceNote}>{svc.priceNote} </span>}
                {fmt(svc.price)}
              </p>
            </div>
          )}

          {/* Deskripsi */}
          <div className={styles.modalSection}>
            <h4 className={styles.modalSectionLabel}>Tentang Layanan</h4>
            <p className={styles.standaloneDesc}>{svc.description}</p>
          </div>

          {/* Info flat price */}
          <div className={styles.modalSection}>
            <div className={styles.standaloneFlatInfo}>
              <span className={styles.standaloneFlatIcon}>✦</span>
              <span>Harga flat untuk Wedding maupun Event. Dapat juga digabungkan sebagai add-on ke paket band manapun.</span>
            </div>
          </div>

          {/* Ketentuan */}
          <div className={styles.modalSection}>
            <h4 className={styles.modalSectionLabel}>Ketentuan</h4>
            <ul className={styles.notesList}>
              {NOTES.map((note, i) => (
                <li key={i} className={styles.noteItem}>
                  <span className={styles.noteDot}>•</span>
                  {note}
                </li>
              ))}
            </ul>
          </div>

          <a href={waUrl} target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>
            <WaIcon />
            Booking Sekarang via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function PackagesSection({ packages = [] }: { packages?: Package[] }) {
  // Package modal state
  const [selected, setSelected]             = useState<Package | null>(null);
  // Standalone modal state
  const [selectedSvc, setSelectedSvc]       = useState<StandaloneService | null>(null);

  // Calculator state (for package modal only)
  const [eventType, setEventType]           = useState<EventType>("wedding");
  const [location, setLocation]             = useState("DKI Jakarta");
  const [extraPersonel, setExtraPersonel]   = useState(0);
  const [extraSoundKw, setExtraSoundKw]     = useState(0);
  const [selectedServices, setSelectedServices] = useState<Set<ServiceId>>(new Set());

  const resetCalc = useCallback(() => {
    setEventType("wedding");
    setLocation("DKI Jakarta");
    setExtraPersonel(0);
    setExtraSoundKw(0);
    setSelectedServices(new Set());
  }, []);

  const openModal    = (pkg: Package)          => { resetCalc(); setSelected(pkg); };
  const closeModal   = ()                      => setSelected(null);
  const openSvcModal = (svc: StandaloneService) => setSelectedSvc(svc);
  const closeSvcModal = ()                     => setSelectedSvc(null);

  const personelCount = selected?.features?.length ?? 0;

  const totalPrice = useMemo(() =>
    selected ? calculateTotal({
      basePrice: selected.price, flatPrice: isFlatPrice(selected), eventType, location,
      extraPersonel, extraSoundKw, selectedServices, personelCount,
    }) : 0,
    [selected, eventType, location, extraPersonel, extraSoundKw, selectedServices, personelCount]
  );

  const toggleService = (id: ServiceId) =>
    setSelectedServices((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const waMessage = useMemo(() => {
    if (!selected) return "#";
    const svcs = EXTRA_SERVICES.filter((s) => selectedServices.has(s.id)).map((s) => s.label).join(", ");
    const sw = BASE_SOUND_WATT + extraSoundKw * 1000;
    const isFlat = isFlatPrice(selected);
    const lines = [
      `Halo! Saya tertarik dengan *${selected.title}*`,
      `Tipe Acara : ${eventType === "wedding" ? "Wedding" : "Event"}`,
      `Lokasi     : ${location}`,
      extraPersonel > 0 ? `Tambah Personel : ${extraPersonel} orang` : null,
      !isFlat ? `Sound System   : ${sw.toLocaleString("id-ID")} Watt` : null,
      svcs ? `Add-ons        : ${svcs}` : null,
      `Total Estimasi : ${fmt(totalPrice)}`,
    ].filter(Boolean).join("\n");
    return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(lines)}`;
  }, [selected, eventType, location, extraPersonel, extraSoundKw, selectedServices, totalPrice]);

  // Total packages count for animation delay offset
  const pkgCount = packages.length;

  return (
    <section className={styles.section} id="packages">
      {/* ── HEADER ── */}
      <div className={styles.header}>
        <p className={styles.eyebrow}>— Pilih Paket Anda —</p>
        <h2 className={styles.title}>
          Daftar Layanan <span className={styles.titleAccent}>Kami</span>
        </h2>
        <div className={styles.titleLine} />
      </div>

      {/* ── PACKAGE GRID ── */}
      <div className={styles.grid}>
        {/* Band packages from CMS */}
        {packages.map((pkg, i) => (
          <div
            key={pkg._id}
            className={`${styles.card} ${pkg.isFeatured ? styles.cardFeatured : ""}`}
            onClick={() => openModal(pkg)}
            style={{ animationDelay: `${i * 0.07}s` }}
          >
            {pkg.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={pkg.imageUrl} alt={pkg.title} className={styles.cardImage} />
            ) : (
              <div className={styles.cardImageFallback}>
                <span className={styles.cardIcon}>🎵</span>
              </div>
            )}
            <div className={styles.cardOverlay} />
            {pkg.isFeatured && <div className={styles.featuredBadge}>✦ Populer</div>}
            <div className={styles.cardLogo}><LogoMark /></div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{pkg.title}</h3>
              <p className={styles.cardPrice}>{fmt(pkg.price)}</p>
              <button className={styles.cardBtn}>Lihat Detail →</button>
            </div>
          </div>
        ))}

        {/* ── STANDALONE SERVICE CARDS ── */}
        {STANDALONE_SERVICES.map((svc, i) => (
          <div
            key={svc.id}
            className={`${styles.card} ${styles.cardStandalone}`}
            onClick={() => openSvcModal(svc)}
            style={{ animationDelay: `${(pkgCount + i) * 0.07}s` }}
          >
            {svc.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={svc.imageUrl} alt={svc.title} className={styles.cardImage} />
            ) : (
              <div className={`${styles.cardImageFallback} ${styles.cardImageFallbackSvc}`}>
                <span className={styles.standaloneCardIcon}>{svc.icon}</span>
              </div>
            )}
            <div className={styles.cardOverlay} />
            <div className={styles.standaloneBadge}>Additional Service</div>
            <div className={styles.cardLogo}><LogoMark /></div>
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{svc.title}</h3>
              <p className={styles.cardPrice}>
                {svc.priceNote && <span className={styles.cardPriceNote}>{svc.priceNote} </span>}
                {fmt(svc.price)}
              </p>
              <button className={styles.cardBtn}>Lihat Detail →</button>
            </div>
          </div>
        ))}
      </div>

      {/* ── OFFICE / MAP SECTION ── */}
      <div className={styles.mapSection}>
        <div className={styles.mapHeader}>
          <h3 className={styles.mapTitle}>Kantor Pusat Kami</h3>
          <p className={styles.mapSubtitle}>Kunjungi kami atau hubungi via WhatsApp</p>
        </div>

        <div className={styles.officeLayout}>
          <div className={styles.mapEmbed}>
            <iframe
              src={OFFICE.embedSrc}
              allowFullScreen
              loading="lazy"
              title={OFFICE.name}
            />
            <div className={styles.mapOverlayLabel}>📍 {OFFICE.name}</div>
          </div>

          <div className={styles.officeCard}>
            <div className={styles.officeLogoWrap}><LogoMark size={48} /></div>
            <h4 className={styles.officeName}>{OFFICE.name}</h4>
            <p className={styles.officeAddress}>{OFFICE.address}</p>
            <div className={styles.officeDivider} />
            <div className={styles.officeLinks}>
              <a href={OFFICE.mapsUrl} target="_blank" rel="noopener noreferrer" className={styles.officeLinkBtn}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                Buka di Google Maps
              </a>
              <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noopener noreferrer" className={`${styles.officeLinkBtn} ${styles.officeLinkWa}`}>
                <WaIcon />
                Chat WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── PACKAGE BAND MODAL ── */}
      {selected && (
        <div className={styles.modalBackdrop} onClick={closeModal} role="dialog" aria-modal="true">
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.modalTop} />

            {selected.imageUrl && (
              <div className={styles.modalImageWrap}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={selected.imageUrl} alt={selected.title} className={styles.modalImage} />
                <div className={styles.modalImageOverlay} />
                <div className={styles.modalImageTitle}>
                  <h2>{selected.title}</h2>
                  <p>{fmt(selected.price)}</p>
                </div>
              </div>
            )}

            <div className={styles.modalBody}>
              <button className={styles.closeBtn} onClick={closeModal} aria-label="Tutup">✕</button>

              {!selected.imageUrl && (
                <div className={styles.modalTitleBlock}>
                  <h2 className={styles.modalPkgName}>{selected.title}</h2>
                  <p className={styles.modalBasePrice}>{fmt(selected.price)}</p>
                </div>
              )}

              {/* Personel */}
              {selected.features && selected.features.length > 0 && (
                <div className={styles.modalSection}>
                  <h4 className={styles.modalSectionLabel}>Personel</h4>
                  <div className={styles.featureGrid}>
                    {selected.features.map((f, i) => (
                      <div key={i} className={styles.featureItem}>
                        <span className={styles.featureDot}>♦</span>
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Kalkulator */}
              <div className={styles.modalSection}>
                <h4 className={styles.modalSectionLabel}>Kalkulator Harga</h4>

                {/* Tipe Acara */}
                <div className={styles.calcRow}>
                  <span className={styles.calcLabel}>Tipe Acara</span>
                  {isFlatPrice(selected) ? (
                    <span className={styles.flatPriceBadge}>✦ Harga sama untuk Wedding &amp; Event</span>
                  ) : (
                    <div className={styles.toggleGroup}>
                      <button type="button"
                        className={`${styles.toggleBtn} ${eventType === "wedding" ? styles.toggleBtnActive : ""}`}
                        onClick={() => setEventType("wedding")}>Wedding</button>
                      <button type="button"
                        className={`${styles.toggleBtn} ${eventType === "event" ? styles.toggleBtnActive : ""}`}
                        onClick={() => setEventType("event")}>
                        Event <span className={styles.toggleBadge}>+50%</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Lokasi */}
                <div className={styles.calcRow}>
                  <span className={styles.calcLabel}>
                    Lokasi
                    {LOCATIONS.find((l) => l.value === location)?.discount && (
                      <span className={styles.calcHint}>
                        Diskon −Rp {((personelCount + extraPersonel) * 200_000).toLocaleString("id-ID")}
                      </span>
                    )}
                  </span>
                  <select className={styles.calcSelect} value={location} onChange={(e) => setLocation(e.target.value)}>
                    {LOCATIONS.map((l) => (
                      <option key={l.value} value={l.value}>{l.label}</option>
                    ))}
                  </select>
                </div>

                {/* Tambah Personel */}
                <div className={styles.calcRow}>
                  <span className={styles.calcLabel}>
                    Tambah Player
                    <span className={styles.calcHint}>+Rp {ADD_ON_PERSONEL_PRICE.toLocaleString("id-ID")}/orang</span>
                  </span>
                  <div className={styles.stepper}>
                    <button type="button" className={styles.stepperBtn}
                      onClick={() => setExtraPersonel((v) => Math.max(0, v - 1))}
                      disabled={extraPersonel === 0}>−</button>
                    <span className={styles.stepperVal}>{extraPersonel}</span>
                    <button type="button" className={styles.stepperBtn}
                      onClick={() => setExtraPersonel((v) => v + 1)}>+</button>
                  </div>
                </div>

                {/* Sound System */}
                <div className={styles.calcRow}>
                  <span className={styles.calcLabel}>
                    Sound System
                    {!isFlatPrice(selected) && (
                      <span className={styles.calcHint}>
                        Base {BASE_SOUND_WATT.toLocaleString("id-ID")} W · +Rp {SOUND_UPGRADE_PRICE_PER_1000W.toLocaleString("id-ID")}/1000W
                      </span>
                    )}
                  </span>
                  {isFlatPrice(selected) ? (
                    <a
                      href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(`Halo! Saya ingin tanya kebutuhan Sound System untuk paket *${selected.title}*. Mohon informasinya, terima kasih!`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.askAdminBtn}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      Tanya Admin
                    </a>
                  ) : (
                    <div className={styles.stepper}>
                      <button type="button" className={styles.stepperBtn}
                        onClick={() => setExtraSoundKw((v) => Math.max(0, v - 1))}
                        disabled={extraSoundKw === 0}>−</button>
                      <span className={styles.stepperVal}>
                        {(BASE_SOUND_WATT + extraSoundKw * 1000).toLocaleString("id-ID")} W
                      </span>
                      <button type="button" className={styles.stepperBtn}
                        onClick={() => setExtraSoundKw((v) => v + 1)}>+</button>
                    </div>
                  )}
                </div>

                {/* Layanan Tambahan */}
                <div className={`${styles.calcRow} ${styles.calcRowTop}`}>
                  <span className={styles.calcLabel}>Layanan Tambahan</span>
                  <div className={styles.serviceList}>
                    {EXTRA_SERVICES.map((svc) => {
                      if ("onlyFor" in svc && svc.onlyFor !== eventType) return null;
                      return (
                        <label key={svc.id} className={styles.serviceItem}>
                          <input type="checkbox" className={styles.serviceCheckbox}
                            checked={selectedServices.has(svc.id)}
                            onChange={() => toggleService(svc.id)} />
                          <span className={styles.serviceLabel}>
                            {svc.label}
                            <span className={styles.servicePrice}>+Rp {svc.price.toLocaleString("id-ID")}</span>
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Total */}
                <div className={styles.calcTotal}>
                  <span className={styles.calcTotalLabel}>Total Estimasi</span>
                  <span className={styles.calcTotalPrice}>{fmt(totalPrice)}</span>
                </div>
              </div>

              {/* Notes */}
              <div className={styles.modalSection}>
                <h4 className={styles.modalSectionLabel}>Ketentuan</h4>
                <ul className={styles.notesList}>
                  {NOTES.map((note, i) => (
                    <li key={i} className={styles.noteItem}>
                      <span className={styles.noteDot}>•</span>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>

              <a href={waMessage} target="_blank" rel="noopener noreferrer" className={styles.ctaBtn}>
                <WaIcon />
                Booking Sekarang via WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ── STANDALONE SERVICE MODAL ── */}
      {selectedSvc && (
        <StandaloneModal svc={selectedSvc} onClose={closeSvcModal} />
      )}
    </section>
  );
}