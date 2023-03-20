import { computed, h, defineComponent, VNode } from 'vue'
import { VList, VListItem, VListItemTitle } from '../VList'
import { getStringKeysValue } from '../../helpers'

export default defineComponent({
  name: 'v-multiselect-list',
  props: {
    modelValue: {
      type: Array,
      default: () => []
    },
    items: {
      type: Array,
      default: () => []
    },
    valueKey: {
      type: String,
      default: ''
    }
  },
  emits: [ 'update:modelValue' ],
  setup(props, { emit }) {
    const computedValue = computed({
      get: () => props.modelValue,
      set: (val) => emit('update:modelValue', val)
    })

    const genListItemTitle = (item) => {
      const { valueKey } = props

      return h(VListItemTitle, {}, {
        default: () => valueKey ? getStringKeysValue(valueKey, item) : item
      })
    }

    const genListItems = (): VNode[] => {
      return props.items.reduce((vNodes: VNode[], item) => {
        const vNode = h(VListItem, {}, { default: () => genListItemTitle(item) })

        vNodes.push(vNode)

        return vNodes
      }, []) as VNode[]
    }

    const genList = () => {
      return h(VList, {
        value: computedValue.value,
        multiple: true,
        active: true,
        ['onUpdate:value']: (val) => computedValue.value = val
      }, {
        default: () => genListItems()
      })
    }

    return () => h('div', {
      class: 'v-multi-select-list',
    }, [props.items ? genList() : null])
  }
})
