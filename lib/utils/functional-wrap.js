import { h } from 'vue';
export const wrapComponent = component => ({
  functional: true,
  name: 'withFunctional',

  render(context) {
    return h(component, { ...context.data
    }, context.children);
  }

});
//# sourceMappingURL=functional-wrap.js.map