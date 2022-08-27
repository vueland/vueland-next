import { Library } from './index'

declare module 'vueland' {
  const createLibrary: () => Library

  export { createLibrary }
}
