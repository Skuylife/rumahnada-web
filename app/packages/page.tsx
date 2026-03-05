import { getPackages } from "@/lib/sanity"
import Image from "next/image"
import Link from "next/link"

export const metadata = {
  title: "Our Packages",
}

export default async function PackagesPage() {
  const packages = await getPackages()

  return (
    <section className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="section-title">Our Premium Packages</h1>
        <p className="section-subtitle mb-12">
          Choose the perfect musical experience for your special moment.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg: any) => (
            <div key={pkg._id} className="card p-6">
              <Image
                src={pkg.imageUrl}
                alt={pkg.title}
                width={600}
                height={400}
                className="rounded-lg mb-4"
              />

              <h2 className="text-xl font-semibold mb-2">{pkg.title}</h2>
              <p className="text-gold-500 font-bold text-lg mb-4">
                Rp {pkg.price.toLocaleString()}
              </p>

              <Link
                href={`/packages/${pkg.slug.current}`}
                className="btn-secondary inline-block"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}