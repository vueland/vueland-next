// Vue API
import { h, computed, defineComponent } from 'vue'

// Effects
import { colorProps, useColors } from '../../composable/use-colors'

// Helpers
import { convertToUnit } from '../../helpers'

// Components
import { VResize } from '../VResize'

// Types
import { VNode } from 'vue'

export const VDataTableCell = defineComponent({
  name: 'v-data-table-cell',
  props: {
    dark: Boolean,
    resizeable: Boolean,
    align: {
      type: String,
      default: 'start',
    },
    width: {
      type: [String, Number],
      default: 75,
    },
    contentColor: String,
    ...colorProps(),
  } as any,

  emits: ['resize'],

  setup(props, { slots, emit }): () => VNode {
    const {
      setTextClassNameColor,
      setTextCssColor,
      setBackgroundCssColor,
      setBackgroundClassNameColor,
    } = useColors()

    const classes = computed<Record<string, boolean>>(() => ({
      'v-data-table__cell': true,
      ...(props.contentColor ? setTextClassNameColor(props.contentColor) : {}),
      ...(props.color ? setBackgroundClassNameColor(props.color) : {}),
    }))

    const styles = computed(() => ({
      width: convertToUnit(+props.width),
      ...(props.contentColor ? setTextCssColor(props.contentColor) : {}),
      ...(props.color ? setBackgroundCssColor(props.color) : {}),
    }))

    function genResize(): VNode {
      const propsData = {
        right: true,
        emit: true,
        class: {
          primary: true,
        },
        onResize: ($size) => emit('resize', $size),
      }

      return h(VResize, propsData)
    }

    function genCellContent(): VNode {
      const propsData = {
        class: {
          'v-data-table__cell-content': true,
          [`text-align--${props.align}`]: !!props.align,
        },
      }

      return h('div', propsData, slots.default && slots.default())
    }

    return () => {
      const propsData = {
        class: classes.value,
        style: styles.value,
      }

      return h('div', propsData, [
        genCellContent(),
        props.resizeable && genResize(),
      ])
    }
  },
})
