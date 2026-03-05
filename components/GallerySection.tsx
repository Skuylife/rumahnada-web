"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function GallerySection({ gallery = [] }: any) {

  const [index, setIndex] = useState(-1);

  return (
    <section id="gallery" className="py-24 bg-charcoal">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="section-title">Event Gallery</h2>
          <p className="section-subtitle">
            Beberapa momen terbaik dari event yang telah kami meriahkan.
          </p>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">

          {gallery.map((item: any, i: number) => (

            <div
              key={item._id}
              className="relative group overflow-hidden rounded-xl cursor-pointer"
              onClick={() => setIndex(i)}
            >

              <Image
                src={item.imageUrl}
                alt={item.title}
                width={600}
                height={400}
                className="w-full h-auto object-cover transition duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-end p-6">

                <div>
                  <p className="text-gold-500 text-sm uppercase">
                    {item.eventType}
                  </p>

                  <h3 className="text-white text-lg font-semibold">
                    {item.title}
                  </h3>
                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

      <Lightbox
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={gallery.map((item: any) => ({
          src: item.imageUrl,
        }))}
        index={index}
      />

    </section>
  );
}