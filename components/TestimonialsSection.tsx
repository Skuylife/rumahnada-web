"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import ReviewForm from "@/components/ReviewForm"; // sesuaikan path

type Testimonial = {
  _id?: string;
  id?: string;
  clientName?: string;
  name?: string;
  eventType?: string;
  rating: number;
  review?: string;
  message?: string;
  photoUrl?: string;
  created_at?: string;
  source?: "sanity" | "supabase";
};

export default function TestimonialsSection({ testimonials: sanityTestimonials = [] }: { testimonials?: any[] }) {
  const [index, setIndex] = useState(0);
  const [supabaseReviews, setSupabaseReviews] = useState<Testimonial[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Normalize Sanity data shape
  const normalizedSanity: Testimonial[] = sanityTestimonials.map((t) => ({
    _id: t._id,
    clientName: t.clientName,
    eventType: t.eventType,
    rating: t.rating,
    review: t.review,
    photoUrl: t.photoUrl,
    source: "sanity",
  }));

  // Fetch Supabase reviews
  const fetchSupabaseReviews = useCallback(async () => {
    try {
      setIsRefreshing(true);
      const res = await fetch("/api/review"); // GET endpoint (lihat route.ts di bawah)
      if (res.ok) {
        const data = await res.json();
        const normalized: Testimonial[] = (data || []).map((r: any) => ({
          id: r.id,
          clientName: r.name,
          eventType: "Guest Review",
          rating: r.rating,
          review: r.message,
          source: "supabase",
        }));
        setSupabaseReviews(normalized);
      }
    } catch (err) {
      console.error("Gagal fetch reviews:", err);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchSupabaseReviews();
  }, [fetchSupabaseReviews]);

  // Gabungkan: Supabase (terbaru) + Sanity
  const allTestimonials = [...supabaseReviews, ...normalizedSanity];

  const testimonial = allTestimonials[index];

  const handleReviewSubmitted = () => {
    setShowForm(false);
    fetchSupabaseReviews();
    setIndex(0); // scroll ke paling atas (review terbaru)
  };

  if (allTestimonials.length === 0 && !showForm) {
    return (
      <section className="py-24 bg-charcoal-light">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="section-title mb-10">What Our Clients Say</h2>
          <p className="text-gray-500 mb-8">Belum ada ulasan. Jadilah yang pertama!</p>
          <button onClick={() => setShowForm(true)} className="review-cta-btn">
            Tulis Ulasan
          </button>
          {showForm && <div className="mt-12"><ReviewForm onReviewSubmitted={handleReviewSubmitted} /></div>}
        </div>
        <StyleBlock />
      </section>
    );
  }

  return (
    <section id="testimonial" className="testimonials-section">
      <StyleBlock />
      <div className="testimonials-inner">
        <div className="section-header">
          <h2 className="section-title-custom">What Our Clients Say</h2>
          <div className="title-line" />
        </div>

        {/* Carousel Card */}
        {testimonial && (
          <div className="testimonial-card" key={index}>
            {/* Quote mark */}
            <div className="quote-mark">"</div>

            {/* Rating */}
            <div className="star-row">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className={i < testimonial.rating ? "star active" : "star"}>★</span>
              ))}
              {testimonial.source === "supabase" && (
                <span className="new-badge">✦ Baru</span>
              )}
            </div>

            {/* Review text */}
            <p className="review-text">"{testimonial.review}"</p>

            {/* Client info */}
            <div className="client-row">
              {testimonial.photoUrl ? (
                <Image
                  src={testimonial.photoUrl}
                  alt={testimonial.clientName || ""}
                  width={48}
                  height={48}
                  className="client-photo"
                />
              ) : (
                <div className="client-avatar">
                  {(testimonial.clientName || "A")[0].toUpperCase()}
                </div>
              )}
              <div>
                <h4 className="client-name">{testimonial.clientName}</h4>
                <p className="client-event">{testimonial.eventType}</p>
              </div>
            </div>
          </div>
        )}

        {/* Dots navigation */}
        <div className="dots-row">
          {allTestimonials.map((_: any, i: number) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`dot ${i === index ? "dot-active" : ""}`}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>

        {/* Arrow navigation */}
        {allTestimonials.length > 1 && (
          <div className="arrow-row">
            <button
              className="arrow-btn"
              onClick={() => setIndex((prev) => (prev - 1 + allTestimonials.length) % allTestimonials.length)}
            >
              ←
            </button>
            <span className="counter">{index + 1} / {allTestimonials.length}</span>
            <button
              className="arrow-btn"
              onClick={() => setIndex((prev) => (prev + 1) % allTestimonials.length)}
            >
              →
            </button>
          </div>
        )}

        {/* Toggle Review Form */}
        <div className="form-toggle-area">
          {!showForm ? (
            <button className="write-review-btn" onClick={() => setShowForm(true)}>
              ✦ Tulis Ulasan Anda
            </button>
          ) : (
            <>
              <button className="cancel-btn" onClick={() => setShowForm(false)}>
                ✕ Batal
              </button>
              <div className="form-wrapper">
                <ReviewForm onReviewSubmitted={handleReviewSubmitted} />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function StyleBlock() {
  return (
    <style>{`
      .testimonials-section {
        padding: 96px 24px;
        background: #111111;
        position: relative;
        overflow: hidden;
      }
      .testimonials-section::before {
        content: '';
        position: absolute;
        inset: 0;
        background:
          radial-gradient(ellipse 60% 40% at 20% 50%, rgba(212,175,55,0.04) 0%, transparent 70%),
          radial-gradient(ellipse 50% 50% at 80% 50%, rgba(212,175,55,0.03) 0%, transparent 70%);
        pointer-events: none;
      }
      .testimonials-inner {
        max-width: 680px;
        margin: 0 auto;
        text-align: center;
        position: relative;
        z-index: 1;
      }
      .section-header { margin-bottom: 48px; }
      .section-title-custom {
        font-family: 'Georgia', serif;
        font-size: clamp(28px, 4vw, 40px);
        font-weight: 400;
        color: #ffffff;
        letter-spacing: 2px;
        margin-bottom: 16px;
      }
      .title-line {
        width: 60px;
        height: 1px;
        background: linear-gradient(90deg, transparent, #d4af37, transparent);
        margin: 0 auto;
      }

      /* Card */
      .testimonial-card {
        background: linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.02) 100%);
        border: 1px solid rgba(212,175,55,0.15);
        border-radius: 20px;
        padding: 48px 40px;
        position: relative;
        overflow: hidden;
        animation: cardIn 0.5s ease;
      }
      @keyframes cardIn {
        from { opacity: 0; transform: translateY(12px); }
        to { opacity: 1; transform: translateY(0); }
      }
      .testimonial-card::before {
        content: '';
        position: absolute;
        top: 0; left: 0; right: 0;
        height: 1px;
        background: linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent);
      }
      .quote-mark {
        font-family: Georgia, serif;
        font-size: 80px;
        color: rgba(212,175,55,0.12);
        line-height: 0.6;
        margin-bottom: 24px;
        text-align: left;
      }

      /* Stars */
      .star-row {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 4px;
        margin-bottom: 20px;
      }
      .star {
        font-size: 20px;
        color: rgba(255,255,255,0.15);
        transition: color 0.2s;
      }
      .star.active { color: #d4af37; }
      .new-badge {
        font-size: 10px;
        letter-spacing: 2px;
        color: #d4af37;
        background: rgba(212,175,55,0.1);
        border: 1px solid rgba(212,175,55,0.3);
        padding: 3px 8px;
        border-radius: 20px;
        margin-left: 8px;
        font-family: 'Helvetica Neue', sans-serif;
        text-transform: uppercase;
      }

      /* Review text */
      .review-text {
        font-family: 'Georgia', serif;
        font-size: 17px;
        line-height: 1.8;
        color: rgba(255,255,255,0.75);
        font-style: italic;
        margin-bottom: 32px;
      }

      /* Client */
      .client-row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 14px;
      }
      .client-photo {
        border-radius: 50%;
        object-fit: cover;
        border: 2px solid rgba(212,175,55,0.3);
      }
      .client-avatar {
        width: 48px; height: 48px;
        border-radius: 50%;
        background: linear-gradient(135deg, #d4af37, #b8962e);
        color: #111;
        font-size: 18px;
        font-weight: 700;
        display: flex; align-items: center; justify-content: center;
        font-family: Georgia, serif;
        flex-shrink: 0;
      }
      .client-name {
        color: #ffffff;
        font-family: 'Helvetica Neue', sans-serif;
        font-size: 15px;
        font-weight: 600;
        text-align: left;
        margin: 0 0 2px;
      }
      .client-event {
        color: rgba(212,175,55,0.6);
        font-size: 12px;
        letter-spacing: 1.5px;
        text-transform: uppercase;
        font-family: 'Helvetica Neue', sans-serif;
        text-align: left;
        margin: 0;
      }

      /* Navigation */
      .dots-row {
        display: flex;
        justify-content: center;
        gap: 8px;
        margin-top: 28px;
      }
      .dot {
        width: 8px; height: 8px;
        border-radius: 50%;
        background: rgba(255,255,255,0.15);
        border: none;
        cursor: pointer;
        transition: background 0.3s, transform 0.3s;
        padding: 0;
      }
      .dot-active {
        background: #d4af37;
        transform: scale(1.3);
      }
      .arrow-row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        margin-top: 16px;
      }
      .arrow-btn {
        background: rgba(255,255,255,0.05);
        border: 1px solid rgba(255,255,255,0.1);
        color: rgba(255,255,255,0.5);
        width: 40px; height: 40px;
        border-radius: 50%;
        cursor: pointer;
        font-size: 16px;
        transition: all 0.2s;
        display: flex; align-items: center; justify-content: center;
      }
      .arrow-btn:hover {
        background: rgba(212,175,55,0.1);
        border-color: rgba(212,175,55,0.3);
        color: #d4af37;
      }
      .counter {
        color: rgba(255,255,255,0.3);
        font-size: 12px;
        letter-spacing: 2px;
        font-family: 'Helvetica Neue', sans-serif;
        min-width: 50px;
      }

      /* Form toggle */
      .form-toggle-area {
        margin-top: 48px;
      }
      .write-review-btn {
        background: transparent;
        border: 1px solid rgba(212,175,55,0.4);
        color: #d4af37;
        padding: 14px 32px;
        border-radius: 40px;
        font-size: 12px;
        letter-spacing: 3px;
        text-transform: uppercase;
        font-family: 'Helvetica Neue', sans-serif;
        cursor: pointer;
        transition: all 0.3s;
      }
      .write-review-btn:hover {
        background: rgba(212,175,55,0.08);
        border-color: #d4af37;
      }
      .cancel-btn {
        background: transparent;
        border: none;
        color: rgba(255,255,255,0.3);
        font-size: 12px;
        letter-spacing: 2px;
        cursor: pointer;
        font-family: 'Helvetica Neue', sans-serif;
        margin-bottom: 24px;
        transition: color 0.2s;
      }
      .cancel-btn:hover { color: rgba(255,255,255,0.6); }
      .form-wrapper {
        animation: fadeUp 0.4s ease;
      }
      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(16px); }
        to { opacity: 1; transform: translateY(0); }
      }
    `}</style>
  );
}