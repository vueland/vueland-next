import { h } from 'vue'

import { VNode, Component } from 'vue'

export const wrapComponent = <T>(component: T): Component => ({
  functional: true,
  name: 'withFunctional',
  render(context: any): VNode {
    return h(
      component,
      {
        ...context.data,
      },
      context.children,
    )
  },
})
