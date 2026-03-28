import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // false = selalu ambil data terbaru dari Sanity
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Revalidate setiap 60 detik — data Sanity akan refresh otomatis
const REVALIDATE = { next: { revalidate: 60 } }

export async function getPackages() {
  return client.fetch(
    `*[_type == "package"] | order(price desc) {
      _id,
      title,
      slug,
      price,
      category,
      description,
      features,
      baseIncludes,
      duration,
      isFeatured,
      "imageUrl": coverImage.asset->url
    }`,
    {},
    REVALIDATE
  )
}

export async function getGallery() {
  return client.fetch(
    `*[_type == "gallery"] | order(_createdAt desc) {
      _id,
      title,
      eventType,
      "imageUrl": image.asset->url
    }`,
    {},
    REVALIDATE
  )
}

export async function getAddOns() {
  return client.fetch(
    `*[_type == "addOn"] | order(price asc) {
      _id,
      name,
      price,
      icon
    }`,
    {},
    REVALIDATE
  )
}

export async function getTestimonials() {
  return client.fetch(
    `*[_type == "testimonial"] | order(_createdAt desc) {
      _id,
      clientName,
      eventType,
      rating,
      review,
      "photoUrl": photo.asset->url
    }`,
    {},
    REVALIDATE
  )
}