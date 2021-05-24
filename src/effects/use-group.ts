import { provide, inject, ref } from 'vue'

import { Group } from '../../types'

export function useGroup() {
  const provideGroup = (groupName: string, options = {}) => {
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

  const injectGroup = (groupName: string) => {
    let injected: any = {}

    injected = inject(groupName) || null

    const register = (group: Group) => {
      injected.groups.value.push(group)
    }

    const unregister = (group: Group) => {
      injected.groups.value.filter((it) => {
        return it.ref !== group.ref
      })
    }

    if (injected) {
      return {
        ...injected,
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
