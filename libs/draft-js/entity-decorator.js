import { CompositeDecorator } from 'draft-js'
import { annotationDecorator } from './annotation'
import { colorTextDecorator } from './color-text'
import { linkDecorator } from './link'

const decorators = new CompositeDecorator([
  annotationDecorator,
  linkDecorator,
  colorTextDecorator,
])

export default decorators
