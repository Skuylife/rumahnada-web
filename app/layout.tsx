import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsappButton from "@/components/WhatsappButton";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

// const BASE_URL = "https://www.rumahnada.com";
const BASE_URL = "https://rumahnada-web.vercel.app";

export const metadata: Metadata = {
  // ── Basic ──────────────────────────────────────────────
  title: {
    default: "Rumah Nada Entertainment | Band Wedding & Live Music Jakarta",
    template: "%s | Rumah Nada Entertainment",
  },
  description:
    "Rumah Nada Entertainment – jasa band wedding, live music, dan hiburan profesional untuk pernikahan, corporate event, dan private party di Jakarta & sekitarnya. Paket mulai Rp 1.600.000.",

  // ── Keywords ───────────────────────────────────────────
  keywords: [
    "band wedding jakarta",
    "entertainment wedding jakarta",
    "live music wedding jakarta",
    "jasa band pernikahan jakarta",
    "hiburan pernikahan jakarta",
    "live music event jakarta",
    "band pernikahan profesional",
    "entertainment event organizer jakarta",
    "sewa band wedding jakarta",
    "musik pernikahan jakarta",
    "band wedding murah jakarta",
    "rumah nada entertainment",
    "live music corporate event jakarta",
    "band jazz wedding jakarta",
    "hiburan private party jakarta",
  ],

  // ── Authors & Canonical ────────────────────────────────
  authors: [{ name: "Rumah Nada Entertainment", url: BASE_URL }],
  creator: "Rumah Nada Entertainment",
  publisher: "Rumah Nada Entertainment",
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: "/",
  },

  // ── Open Graph (Facebook, WhatsApp preview) ────────────
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: BASE_URL,
    siteName: "Rumah Nada Entertainment",
    title: "Rumah Nada Entertainment | Band Wedding & Live Music Jakarta",
    description:
      "Jasa band wedding & live music profesional di Jakarta. Paket lengkap mulai Rp 1.600.000 untuk pernikahan, corporate event, dan private party.",
    images: [
      {
        url: `${BASE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Rumah Nada Entertainment – Band Wedding Jakarta",
      },
    ],
  },

  // ── Twitter / X Card ───────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Rumah Nada Entertainment | Band Wedding & Live Music Jakarta",
    description:
      "Jasa band wedding & live music profesional di Jakarta. Paket mulai Rp 1.600.000.",
    images: [`${BASE_URL}/og-image.jpg`],
  },

  // ── Robots ─────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Icons ──────────────────────────────────────────────
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  // ── Verification (isi setelah daftar Google Search Console) ──
  // verification: {
  //   google: "GOOGLE_VERIFICATION_CODE_HERE",
  // },
};

// ── JSON-LD Structured Data ────────────────────────────────
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "LocalBusiness",
      "@id": `${BASE_URL}/#business`,
      name: "Rumah Nada Entertainment",
      description:
        "Jasa band wedding, live music, dan entertainment profesional untuk pernikahan dan event di Jakarta.",
      url: BASE_URL,
      telephone: "+6287887525520",
      email: "rumahnadaentertainment@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Jakarta",
        addressRegion: "DKI Jakarta",
        addressCountry: "ID",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -6.2088,
        longitude: 106.8456,
      },
      areaServed: ["Jakarta", "Bogor", "Depok", "Tangerang", "Bekasi", "Bandung"],
      priceRange: "Rp 1.600.000 – Rp 4.600.000",
      sameAs: [
        "https://www.instagram.com/rumahnadaentertainment",
        "https://www.instagram.com/rumahsoundsystemnada",
        "https://youtube.com/@rumahnadaentertainment",
        "https://www.tiktok.com/@rumahnadaentertainment",
      ],
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        opens: "08:00",
        closes: "22:00",
      },
    },
    {
      "@type": "MusicGroup",
      "@id": `${BASE_URL}/#musicgroup`,
      name: "Rumah Nada Entertainment",
      url: BASE_URL,
      genre: ["Wedding Music", "Jazz", "Pop", "Dangdut", "Keroncong"],
      sameAs: [
        "https://www.instagram.com/rumahnadaentertainment",
        "https://youtube.com/@rumahnadaentertainment",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Rumah Nada Entertainment",
      potentialAction: {
        "@type": "SearchAction",
        target: `${BASE_URL}/?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} bg-charcoal text-white antialiased`}>
        <Navbar />
        {children}
        <Footer />
        <WhatsappButton />
      </body>
    </html>
  );
}