import { defineComponent, h, computed, VNode } from 'vue'

export default defineComponent({
  name: 'v-layout',
  props: {
    column: Boolean,
    wrap: Boolean,
  },
  setup(props, { slots }): () => VNode {
    const classes = computed<Record<string, boolean>>(() => ({
      'v-layout': true,
      'flex-column': props.column,
      'flex-wrap': props.wrap,
    }))

    return () =>
      h(
        'div',
        {
          class: classes.value,
        },
        {
          default: () => slots.default && slots.default(),
        }
      )
  },
})
