import { provide, inject, ref, ComponentPublicInstance, Ref } from 'vue'

type Group = {
  ref: Ref<HTMLElement | ComponentPublicInstance | null>
  active: boolean
}

export function useGroup() {
  const groupRef: Ref<HTMLElement | ComponentPublicInstance | null> = ref(null)

  function provideGroup(groupName, options: object | null = null) {
    provide(groupName, options)
  }

  function injectGroup(groupName: string) {
    const injected: any = ref(null)

    injected.value = inject(groupName) || null

    function register(group: Group) {
      injected.value?.groups.push(group)
    }

    function unregister(group: Group) {
      injected.value?.groups.filter((it) => {
        return it.ref !== group.ref
      })
    }

    if (injected.value) {
      return {
        ...injected.value,
        register,
        unregister
      }
    }

    return null
  }

  return {
    groupRef,
    provideGroup,
    injectGroup,
  }
}
