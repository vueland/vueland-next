// @ts-ignore
// import paths from './paths.json'
// Types
import { UserOptions } from '../types'
import { install } from './install'

export class Vueland {
  static options: UserOptions
  static install: Function = install

  constructor(options?: UserOptions) {
    Vueland.options = options! || {}
  }
}
