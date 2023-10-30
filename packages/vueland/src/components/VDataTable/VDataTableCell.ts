// Vue API
import { h, computed, defineComponent } from 'vue'

// Effects
import { colorProps, useColors } from '../../composables/use-colors'

// Helpers
import { convertToUnit } from '../../helpers'

// Components
import { VResize } from '../VResize'

// Types
import { VNode } from 'vue'

export const VDataTableCell = defineComponent({
  name: 'v-data-table-cell',
  props: {
    resizeable: Boolean,
    align: {
      type: String,
      default: 'start',
    },
    width: {
      type: [ String, Number ],
      default: 75,
    },
    resizerColor: {
      type: String,
      default: 'primary',
    },
    contentColor: String,
    ...colorProps(),
  } as any,

  emits: [ 'resize' ],

  setup(props, { slots, emit }): () => VNode {
    const {
      setTextClassNameColor,
      setTextCssColor,
      setBackgroundCssColor,
      setBackgroundClassNameColor,
    } = useColors()

    const classes = computed<Record<string, boolean>>(() => ({
      'v-data-table__cell': true,
      'v-data-table__cell--themeable': !props.color,
      ...(props.contentColor ? setTextClassNameColor(props.contentColor) : {}),
      ...(props.color ? setBackgroundClassNameColor(props.color) : {}),
    }))

    const styles = computed(() => ({
      width: convertToUnit(+props.width),
      ...(props.contentColor ? setTextCssColor(props.contentColor) : {}),
      ...(props.color ? setBackgroundCssColor(props.color) : {}),
    }))

    const genResize = (): VNode => {
      const propsData = {
        right: true,
        emit: true,
        color: props.resizerColor,
        onResize: ($size) => emit('resize', $size),
      }

      return h(VResize, propsData)
    }

    const genCellContent = (): VNode => h('div', {
      class: {
        'v-data-table__cell-content': true,
        [`text-align--${ props.align }`]: !!props.align,
      },
    }, {
      default: () => slots.default?.()
    })

    return () => h('div', {
      class: classes.value,
      style: styles.value,
    }, [
      genCellContent(),
      props.resizeable && genResize(),
    ])
  },
})
