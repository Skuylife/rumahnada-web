// src/components/Footer.tsx

import { Music, Instagram, Youtube, Phone } from 'lucide-react';

// TikTok icon (tidak ada di lucide-react, buat manual)
function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z"/>
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="bg-charcoal border-t border-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Music className="h-7 w-7 text-gold-500" />
              <span className="font-serif text-xl font-bold text-white">
                Rumah<span className="text-gold-500">Nada</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium entertainment service untuk momen spesial Anda. 
              Kami hadir untuk membuat setiap acara lebih berkesan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gold-500 font-semibold mb-4 uppercase text-sm tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              {['Home', 'Packages', 'Gallery', 'About Us', 'Contact'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-gold-500 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold-500 font-semibold mb-4 uppercase text-sm tracking-wider">
              Hubungi Kami
            </h4>
            <div className="space-y-3 text-gray-400 text-sm">

              {/* WhatsApp 1  */}
              <a
                href="https://wa.me/6287887525520"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-gold-500 transition-colors"
              >
                <Phone className="h-4 w-4 shrink-0" />
                <span>
                  +62 878-8752-5520
                </span>
              </a>

              {/* Instagram Entertainment */}
              <a
                href="https://www.instagram.com/rumahnadaentertainment"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-gold-500 transition-colors"
              >
                <Instagram className="h-4 w-4 shrink-0" />
                @rumahnadaentertainment
              </a>

              {/* Instagram Sound System */}
              <a
                href="https://www.instagram.com/rumahsoundsystemnada"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-gold-500 transition-colors"
              >
                <Instagram className="h-4 w-4 shrink-0" />
                <span>
                  @rumahsoundsystemnada
                  <span className="ml-1 text-xs text-gray-600">(Sound System)</span>
                </span>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com/@rumahnadaentertainment"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-gold-500 transition-colors"
              >
                <Youtube className="h-4 w-4 shrink-0" />
                Rumah Nada Entertainment
              </a>

              {/* TikTok */}
              <a
                href="https://www.tiktok.com/@rumahnadaentertainment"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-gold-500 transition-colors"
              >
                <TikTokIcon className="h-4 w-4 shrink-0" />
                @rumahnadaentertainment
              </a>

            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Rumah Nada Entertainment. All rights reserved.
        </div>
      </div>
    </footer>
  );
}