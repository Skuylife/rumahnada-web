"use client";

import { useState } from "react";
import styles from "./ReviewForm.module.css";

export default function ReviewForm({
  onReviewSubmitted,
}: {
  onReviewSubmitted?: () => void;
}) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message || rating === 0) return;

    setLoading(true);

    await fetch("/api/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, message, rating }),
    });

    setLoading(false);
    setSubmitted(true);
    setName("");
    setMessage("");
    setRating(0);

    onReviewSubmitted?.();

    setTimeout(() => setSubmitted(false), 4000);
  };

  const displayRating = hovered || rating;
  const ratingLabels = ["", "Kurang", "Cukup", "Bagus", "Sangat Bagus", "Luar Biasa"];

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <p className={styles.title}>Leave a Review</p>
        <p className={styles.subtitle}>Ceritakan pengalaman spesial Anda bersama kami</p>
        <hr className={styles.divider} />

        {submitted ? (
          <div className={styles.successMsg}>
            ✦ Terima kasih! Ulasan Anda telah diterima.
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            {/* Nama */}
            <div className={styles.field}>
              <label className={styles.label}>Nama</label>
              <input
                type="text"
                placeholder="Nama Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={styles.input}
                required
              />
            </div>

            {/* Ulasan */}
            <div className={styles.field}>
              <label className={styles.label}>Ulasan</label>
              <textarea
                placeholder="Ceritakan pengalaman Anda..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className={styles.textarea}
                required
              />
            </div>

            {/* Rating */}
            <div className={styles.field}>
              <label className={styles.label}>Rating</label>
              <div className={styles.starRow}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    className={styles.starBtn}
                    onMouseEnter={() => setHovered(star)}
                    onMouseLeave={() => setHovered(0)}
                    onClick={() => setRating(star)}
                    aria-label={`Rating ${star}`}
                  >
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path
                        className={star <= displayRating ? styles.starFilled : styles.starEmpty}
                        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                      />
                    </svg>
                  </button>
                ))}
                {displayRating > 0 && (
                  <span className={styles.starLabel}>
                    {ratingLabels[displayRating]}
                  </span>
                )}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={loading || !name || !message || rating === 0}
            >
              {loading ? "Mengirim..." : "Kirim Ulasan"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}