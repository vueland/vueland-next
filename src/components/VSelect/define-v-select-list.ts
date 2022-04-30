import { defineComponent, computed } from 'vue'
import { VList, VListItem, VListItemTitle, VListItemIcon } from '../VList'
import { getStringKeysValue } from '../../helpers'
import { FaIcons } from '../../services/icons'
import { Maybe } from '../../../types/base'

export const defineVSelectList = () => {
  return defineComponent({
    name: 'v-select-list',
    components: {
      VList,
      VListItem,
      VListItemTitle,
      VListItemIcon,
    },
    props: {
      items: {
        type: Array,
        default: null,
      },
      color: {
        type: String,
        default: '#ffffff',
      },
      textColor: {
        type: String,
        default: '',
      },
      valueKey: {
        type: String,
        default: '',
      },
      selected: {
        type: [String, Number, Object],
        default: null,
      },
      activeClass: {
        type: String,
        default: '',
      },
    },
    emits: ['select'],
    setup(props, { emit }) {
      const onClick = (it) => emit('select', it)

      const computedSelect = computed<Maybe<number>>({
        get() {
          return props.selected
            ? props.items.findIndex((it) => {
                const itemValue = getStringKeysValue(props.valueKey, it)
                const selectedValue = getStringKeysValue(
                  props.valueKey,
                  props.selected
                )
                return itemValue === selectedValue
              })
            : null
        },
        set(val: number) {
          emit('select', props.items[val])
        },
      })

      return {
        FaIcons,
        onClick,
        computedSelect,
        getStringKeysValue,
      }
    },
  })
}
