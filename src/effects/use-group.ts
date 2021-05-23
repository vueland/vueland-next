import { provide, inject, ref } from 'vue'

import { Group } from '../../types'

export function useGroup() {
  function provideGroup(groupName: string, options = {}) {
    const groups = ref<Group[]>([])

    Object.keys(options).forEach((key) => {
      let value

      if (typeof options[key] === 'function') {
        value = options[key].bind(null, groups)
      } else {
        value = options[key]
      }

      Object.defineProperty(options, key, { value })
    })

    provide(groupName, {
      groups,
      ...options,
    })
  }

  function injectGroup(groupName: string) {
    const injected: any = ref(null)

    injected.value = inject(groupName) || null

    const register = (group: Group) => {
      injected.value?.groups.push(group)
    }

    const unregister = (group: Group) => {
      injected.value?.groups.filter((it) => {
        return it.ref !== group.ref
      })
    }

    if (injected.value) {
      return {
        ...injected.value,
        register,
        unregister,
      }
    }

    return null
  }

  return {
    provideGroup,
    injectGroup,
  }
}
