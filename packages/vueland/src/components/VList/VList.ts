import { defineComponent, h, provide, watch, ref, unref, nextTick, computed } from 'vue'
import { useColors, colorProps } from '../../composables/use-colors'
import { mapToValArray } from '../../helpers'

export default defineComponent({
  name: 'v-list',
  props: {
    value: {
      type: [ Number, Array ],
      default: null,
    },
    multiple: Boolean,
    active: {
      type: Boolean,
      default: false,
    },
    activeClass: {
      type: String,
      default: '',
    },
    textColor: {
      type: String,
      default: '',
    },
    ...colorProps(),
  },
  emits: [ 'update:value' ],
  setup(props, { emit, slots }) {
    const {
      setTextClassNameColor,
      setBackgroundClassNameColor,
      setTextCssColor,
      setBackgroundCssColor,
    } = useColors()

    const items = ref<Map<any, any>>(new Map())
    let isTrustedSelect = false

    const classes = computed<Record<string, boolean>>(() => ({
      'v-list': true,
      'v-list--active': props.active,
      'v-list--themeable': !props.color,
      'v-list--base': !props.color,
      ...setTextClassNameColor(props.textColor),
      ...setBackgroundClassNameColor(props.color),
    }))

    const styles = computed<Record<string, string>>(() => ({
      ...setTextCssColor(props.textColor),
      ...setBackgroundCssColor(props.color),
    }))

    const register = (item) => {
      !items.value.has(item) && items.value.set(item, item)
    }

    const unregister = (item) => {
      items.value.has(item) && items.value.delete(item)
    }

    const dispatchEvent = (val) => {
      isTrustedSelect = true
      emit('update:value', val)
    }

    const setActiveItem = (item) => {
      mapToValArray(unref(items)).forEach((it) => {
        it.isActive = it === item
      })
    }

    const toggleItem = (item) => {
      item.isActive = !item.isActive
    }

    const prepareValue = (item) => {
      const values = mapToValArray(unref(items))
      const index = values.findIndex(it => it === item)

      if (!props.multiple) {
        return index
      }

      const { value } = props
      let copy = (value as number[]).slice()

      if (!item.isActive) {
        copy = copy.filter(it => it !== index)
      } else {
        copy.push(index)
      }

      return copy
    }

    const onClick = (item) => {
      if (!props.active) return

      const _item = items.value.get(item)

      if (props.multiple) {
        toggleItem(_item)
      } else {
        setActiveItem(_item)
      }

      dispatchEvent(prepareValue(_item))
    }

    const setItemState = (value) => {
      if (value === null || props.multiple && !value.length) {
        return setActiveItem(null)
      }

      nextTick(() => {
        const values = mapToValArray(unref(items))

        if (!values.length) return

        if (props.multiple) {
          value.forEach((ind) => toggleItem(values[ind]))
        } else {
          setActiveItem(values[value as number])
        }
      })
    }

    watch(() => props.value, (to) => {
        if (!isTrustedSelect) {
          setItemState(to)
        } else {
          isTrustedSelect = false
        }
      },
    )

    provide('$v_list', {
      add: register,
      remove: unregister,
      click: onClick,
      activeClass: props.activeClass,
    })

    return () => h(
      'div',
      { class: classes.value, style: styles.value },
      { default: () => slots.default?.() },
    )
  },
})
