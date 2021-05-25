import { provide, inject, ref } from 'vue'

import { Group, RefGroup, InjectedGroup, GroupManager } from '../../types'

export function useGroup(): GroupManager {
  const provideGroup = (groupName: string, options = {}) => {
    const group = ref<Group[]>([])

    Object.keys(options).forEach((key) => {
      let value

      if (typeof options[key] === 'function') {
        value = options[key].bind(null, group)
      } else {
        value = options[key]
      }

      Object.defineProperty(options, key, { value })
    })

    provide(groupName, {
      group,
      options,
    })
  }

  const injectGroup = (groupName: string): InjectedGroup | null => {
    let injected: any = {}

    injected = inject(groupName) || null

    const register = (group: RefGroup) => {
      injected.group.value.push(group)
    }

    const unregister = (group: RefGroup) => {
      injected.group.value.filter((it) => {
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
