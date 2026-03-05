import { type SchemaTypeDefinition } from 'sanity'
import packageType from './package'
import addOn from './addOn'
import testimonial from './testimonial'
import gallery from './gallery'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [packageType, addOn, testimonial, gallery],
}