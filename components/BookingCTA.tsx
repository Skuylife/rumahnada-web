"use client";

import { useState } from "react";
import styles from "./BookingCTA.module.css";

const WA_NUMBER = "6287887525520";

const EVENT_TYPES = [
  "Wedding / Pernikahan",
  "Private Party",
  "Corporate Event",
  "Birthday Party",
  "Gathering / Reunion",
  "Lainnya",
];

export default function BookingCTA() {
  const [name, setName] = useState("");
  const [eventType, setEventType] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");

  const handleBooking = () => {
    const text = `Halo Rumah Nada Entertainment! 👋

Saya ingin menanyakan ketersediaan untuk acara saya:

👤 Nama: ${name || "-"}
🎉 Jenis Acara: ${eventType || "-"}
📅 Tanggal: ${date || "-"}
📝 Pesan: ${message || "-"}

Mohon informasinya, terima kasih!`;

    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const isValid = name.trim() !== "" && eventType !== "";

  return (
    <section className={styles.section} id="booking">
      {/* Background decorative */}
      <div className={styles.bgDecor} aria-hidden="true">
        <div className={styles.bgCircle1} />
        <div className={styles.bgCircle2} />
      </div>

      <div className={styles.inner}>
        {/* Left: Text */}
        <div className={styles.left}>
          <p className={styles.eyebrow}>✦ Siap Membuat Acara Anda Spesial</p>
          <h2 className={styles.title}>
            Book Your<br />
            <span className={styles.titleGold}>Event Now</span>
          </h2>
          <p className={styles.subtitle}>
            Hubungi kami langsung via WhatsApp dan dapatkan konsultasi gratis untuk paket terbaik sesuai acara Anda.
          </p>

          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statNum}>500+</span>
              <span className={styles.statLabel}>Event Sukses</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>7</span>
              <span className={styles.statLabel}>Pilihan Paket</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.stat}>
              <span className={styles.statNum}>100%</span>
              <span className={styles.statLabel}>Kepuasan Klien</span>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className={styles.right}>
          <div className={styles.formCard}>
            <div className={styles.formCardTop} />
            <h3 className={styles.formTitle}>Konsultasi Gratis</h3>
            <p className={styles.formSubtitle}>Isi form singkat, kami balas dalam 5 menit</p>

            <div className={styles.formFields}>
              <div className={styles.field}>
                <label className={styles.label}>Nama Anda *</label>
                <input
                  type="text"
                  placeholder="Masukkan nama Anda"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={styles.input}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Jenis Acara *</label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className={styles.select}
                >
                  <option value="">Pilih jenis acara...</option>
                  {EVENT_TYPES.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Tanggal Acara</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={styles.input}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              <div className={styles.field}>
                <label className={styles.label}>Pesan Tambahan</label>
                <textarea
                  placeholder="Ceritakan detail acara Anda..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={styles.textarea}
                  rows={3}
                />
              </div>
            </div>

            <button
              onClick={handleBooking}
              disabled={!isValid}
              className={styles.ctaBtn}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Chat WhatsApp Sekarang
            </button>

            <p className={styles.formNote}>
              Atau hubungi langsung:{" "}
              <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noreferrer" className={styles.formNoteLink}>
                +62 878-8752-5520
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}