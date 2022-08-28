import { Library } from './index'

declare module 'vueland' {
  const createVueland: (args: any) => Library

  export { createVueland }
}
