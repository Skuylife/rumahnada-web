import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'addOn',
  title: 'Additional Items',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nama Item',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Harga (Rp)',
      type: 'number',
    }),
    defineField({
      name: 'icon',
      title: 'Icon (Emoji)',
      type: 'string',
      description: 'Masukkan emoji, contoh: 🎹 atau 🎤',
    }),
  ],
})