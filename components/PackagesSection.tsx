"use client";

import Image from "next/image";
import { useState } from "react";
import styles from "./PackagesSection.module.css";

type Package = {
  _id: string;
  title: string;
  price: number;
  category?: string;
  description?: string;
  features?: string[];
  baseIncludes?: string[];
  duration?: string;
  imageUrl?: string;
  isFeatured?: boolean;
};

const NOTES = [
  "Price belum termasuk Sound System (dengan Sound System + Rp 1.500.000, FREE dari Akad – Resepsi, 1 operator standby)",
  "Durasi 3 × 60 menit (3 jam)",
  "DP 40% maksimal 1 minggu setelah Deal Booked, H-3 pelunasan (DP hangus jika ada pembatalan)",
  "Open request maksimal 5 lagu",
  "FREE biaya sewa alat musik",
  "FREE iringan kirab khusus untuk paket yang menggunakan Saxo / Biola",
  "Apabila terjadi pemadaman listrik tidak ada pemotongan harga",
];

export default function PackagesSection({ packages = [] }: { packages?: Package[] }) {
  const [selected, setSelected] = useState<Package | null>(null);

  return (
    <section className={styles.section} id="packages">
      <div className={styles.header}>
        <p className={styles.eyebrow}>— Choose Your Package —</p>
        <h2 className={styles.title}>Our Services</h2>
        <div className={styles.titleLine} />
      </div>

      {/* GRID */}
      <div className={styles.grid}>
        {packages.map((pkg, i) => (
          <div
            key={pkg._id}
            className={`${styles.card} ${pkg.isFeatured ? styles.cardFeatured : ""}`}
            onClick={() => setSelected(pkg)}
            style={{ animationDelay: `${i * 0.08}s` }}
          >
            {/* Background image */}
            {pkg.imageUrl ? (
              <Image
                src={pkg.imageUrl}
                alt={pkg.title}
                fill
                className={styles.cardImage}
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            ) : (
              <div className={styles.cardImageFallback} />
            )}

            {/* Overlay gradient */}
            <div className={styles.cardOverlay} />

            {/* Featured badge */}
            {pkg.isFeatured && (
              <div className={styles.featuredBadge}>✦ Populer</div>
            )}

            {/* Logo watermark */}
            <div className={styles.cardLogo}>
              <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                <rect x="6" y="6" width="24" height="24" rx="4" stroke="#d4af37" strokeWidth="1.5" transform="rotate(45 18 18)" />
                <rect x="9" y="9" width="18" height="18" rx="3" stroke="#d4af37" strokeWidth="1" transform="rotate(45 18 18)" />
                <circle cx="18" cy="18" r="5" fill="#d4af37" fillOpacity="0.8" />
              </svg>
            </div>

            {/* Content */}
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{pkg.title}</h3>
              <p className={styles.cardPrice}>
                IDR {pkg.price.toLocaleString("id-ID")}
              </p>
              <button className={styles.cardBtn}>Kunjungi →</button>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selected && (
        <div className={styles.modalBackdrop} onClick={() => setSelected(null)}>
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header image */}
            {selected.imageUrl && (
              <div className={styles.modalImageWrap}>
                <Image
                  src={selected.imageUrl}
                  alt={selected.title}
                  fill
                  className={styles.modalImage}
                />
                <div className={styles.modalImageOverlay} />
                <div className={styles.modalImageTitle}>
                  <h2>{selected.title}</h2>
                  <p>IDR {selected.price.toLocaleString("id-ID")}</p>
                </div>
              </div>
            )}

            <div className={styles.modalBody}>
              {/* Close */}
              <button
                className={styles.closeBtn}
                onClick={() => setSelected(null)}
                aria-label="Tutup"
              >
                ✕
              </button>

              {!selected.imageUrl && (
                <div className={styles.modalTitleFallback}>
                  <h2 className={styles.modalTitle}>{selected.title}</h2>
                  <p className={styles.modalPrice}>
                    IDR {selected.price.toLocaleString("id-ID")}
                  </p>
                </div>
              )}

              {/* Personel */}
              {selected.features && selected.features.length > 0 && (
                <div className={styles.modalSection}>
                  <h4 className={styles.modalSectionLabel}>Personel</h4>
                  <ul className={styles.featureList}>
                    {selected.features.map((f, i) => (
                      <li key={i} className={styles.featureItem}>
                        <span className={styles.featureDot}>♦</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

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

              {/* CTA */}
              <a
                href={`https://wa.me/6287887525520?text=Halo%2C%20saya%20tertarik%20dengan%20${encodeURIComponent(selected.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.ctaBtn}
              >
                Booking Sekarang via WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}