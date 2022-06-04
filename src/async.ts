import { defineAsyncComponent } from 'vue'
// @ts-ignore
import paths from './paths.json'

export default Object.keys(paths).reduce((list, key) => {
  list[key] = defineAsyncComponent(
    () => import(/*Vueland_component*/`${ paths[key] }`)
  )
  return list
}, {})
