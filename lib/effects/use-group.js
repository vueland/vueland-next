import { provide, inject, ref } from 'vue';
export function useGroup() {
  const provideGroup = (groupName, options = {}) => {
    const groups = ref([]);
    Object.keys(options).forEach(key => {
      let value;

      if (typeof options[key] === 'function') {
        value = options[key].bind(null, groups);
      } else {
        value = options[key];
      }

      Object.defineProperty(options, key, {
        value
      });
    });
    provide(groupName, {
      groups,
      ...options
    });
  };

  const injectGroup = groupName => {
    let injected = {};
    injected = inject(groupName) || null;

    const register = group => {
      injected.groups.value.push(group);
    };

    const unregister = group => {
      injected.groups.value.filter(it => {
        return it.ref !== group.ref;
      });
    };

    if (injected) {
      return { ...injected,
        register,
        unregister
      };
    }

    return null;
  };

  return {
    provideGroup,
    injectGroup
  };
}
//# sourceMappingURL=use-group.js.map