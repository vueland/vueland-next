// Styles
import './VSelectList.scss'

// Vue API
import { h, ref, watch, defineComponent } from 'vue'

// Components
import { VList, VListGroup, VListItem, VListItemTitle } from '../VList'

// Effects
import { colorProps, useColors } from '../../composable/use-colors'

// Helpers
import { getKeyValueFromTarget } from '../../helpers'

// Types
import { VNode } from 'vue'

export const VSelectList = defineComponent({
  name: 'v-select-list',
  props: {
    items: Array,
    valueKey: String,
    idKey: String,
    active: Boolean,
    dark: Boolean,
    listColor: {
      type: String,
      default: 'white',
    },
    elevation: {
      type: [String, Number],
      default: 4,
    },
    select: [Object, String, Array, Number],
    ...colorProps(),
  } as any,

  emits: ['select'],

  setup(props, { emit }) {
    const {
      setTextCssColor,
      setTextClassNameColor,
      setBackgroundCssColor,
      setBackgroundClassNameColor,
    } = useColors()
    const selected = ref<any>(null)

    watch(
      () => props.select,
      (to) => (selected.value = to),
      { immediate: true }
    )

    function genItems(): VNode[] {
      const key = props.valueKey

      const propsData = {
        class: {
          ...(props.color ? setTextClassNameColor(props.color) : {}),
        },
        style: {
          ...(props.color ? setTextCssColor(props.color) : {}),
        },
      }

      return props.items?.map((it: any) => {
        const item = h(VListItemTitle, propsData, {
          default: () => (key ? getKeyValueFromTarget(key, it) : it),
        })

        return h(
          VListItem,
          {
            key: props.idKey,
            active: selected.value === it,
            onClick: () => {
              selected.value = it
              emit('select', it)
            },
          },
          {
            default: () => item,
          }
        )
      })
    }

    function genSelectListItems(): VNode {
      return h(VList, {}, { default: () => genItemsGroup() })
    }

    function genItemsGroup(): VNode {
      return h(
        VListGroup,
        {
          color: props.color,
          noAction: true,
          expanded: true,
          dark: props.dark,
        },
        { default: () => genItems() }
      )
    }

    function genList(): VNode {
      const propsData = {
        class: {
          'v-select-list': true,
          ...(props.listColor
            ? setBackgroundClassNameColor(props.listColor)
            : {}),
        },
        style: {
          ...(props.listColor ? setBackgroundCssColor(props.listColor) : {}),
        },
      }

      return h('div', propsData, genSelectListItems())
    }

    return () => genList()
  },
})
