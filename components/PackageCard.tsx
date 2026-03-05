// src/components/PackageCard.tsx (LANJUTAN dari yang terputus)

import { Check } from 'lucide-react';

interface PackageCardProps {
  title: string;
  price: number;
  category: string;
  features: string[];
  duration: number;
  imageUrl?: string;
  isPopular?: boolean;
}

export default function PackageCard({
  title,
  price,
  category,
  features,
  duration,
  imageUrl,
  isPopular = false,
}: PackageCardProps) {
  const formatRupiah = (angka: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(angka);
  };

  return (
    <div className={`card relative ${isPopular ? 'ring-2 ring-gold-500' : ''}`}>
      {isPopular && (
        <div className="absolute top-4 right-4 bg-gold-500 text-charcoal text-xs font-bold px-3 py-1 rounded-full">
          POPULAR
        </div>
      )}
      
      {/* Image */}
      <div className="h-48 bg-gray-800 relative">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-600">
            <span className="text-4xl">🎵</span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-charcoal to-transparent h-20" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="text-gold-500 text-sm uppercase tracking-wider mb-2">{category}</div>
        <h3 className="text-2xl font-serif font-bold text-white mb-2">{title}</h3>
        
        <div className="text-3xl font-bold text-gold-500 mb-1">
          {formatRupiah(price)}
        </div>
        <p className="text-gray-400 text-sm mb-6">Durasi {duration} menit</p>

        {/* Features */}
        <ul className="space-y-2 mb-6">
          {features?.map((feature, index) => (
            <li key={index} className="flex items-center gap-2 text-gray-300 text-sm">
              <Check className="h-4 w-4 text-gold-500 shrink-0" />
              {feature}
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        
        <a  href={`https://wa.me/6281234567890?text=Halo, saya tertarik dengan paket ${title}`}
          target="_blank"
          rel="noreferrer"
          className="w-full btn-primary text-sm text-center block"
        >
          Pesan Sekarang
        </a>
      </div>
    </div>
  );
}