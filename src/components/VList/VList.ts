import { defineComponent, h, provide, watch, computed, onMounted } from 'vue'
import { useColors, colorProps } from '../../composable/use-colors'
import { mapToValArray } from '../../helpers'

export const VList = defineComponent({
  name: 'v-list',
  props: {
    value: {
      type: [ Number, Array ],
      default: null
    },
    multiple: Boolean,
    active: {
      type: Boolean,
      default: false
    },
    activeClass: {
      type: String,
      default: 'primary white--text text--base'
    },
    textColor: {
      type: String,
      default: ''
    },
    ...colorProps()
  },
  emits: [ 'update:value' ],
  setup(props, { emit, slots }) {
    const {
      setTextClassNameColor,
      setBackgroundClassNameColor,
      setTextCssColor,
      setBackgroundCssColor
    } = useColors()

    const items = new Map()
    let isTrustedSelect = false

    const classes = computed<Record<string, boolean>>(() => ({
      'v-list': true,
      'v-list--active': props.active,
      ...setTextClassNameColor(props.textColor),
      ...setBackgroundClassNameColor(props.color)
    }))

    const isNan = computed(() => isNaN(parseFloat(`${ props.value }`)))

    const styles = computed<Record<string, string>>(() => ({
      ...setTextCssColor(props.textColor),
      ...setBackgroundCssColor(props.color)
    }))

    const register = (item) => {
      !items.has(item) && items.set(item, item)
    }

    const unregister = (item) => {
      items.has(item) && items.delete(item)
    }

    const dispatchEvent = (val) => {
      isTrustedSelect = true
      emit('update:value', val)
    }

    const setActiveItem = (item) => {
      mapToValArray(items).forEach((it) => {
        it.isActive.value = it === item
      })
    }

    const toggleItem = (item) => {
      item.isActive.value = !item.isActive.value
    }

    const prepareIndexes = () => {
      const values = mapToValArray(items)
      const { multiple } = props

      let val = multiple ? [] : 0

      values.forEach((it, i) => {
        if (it.isActive.value) {
          multiple && (val as number[]).push(i)
          !multiple && (val = i)
        }
      })

      return val
    }

    const onClick = (item) => {
      if (!props.active) return

      props.multiple && toggleItem(item)
      !props.multiple && setActiveItem(item)

      dispatchEvent(prepareIndexes())
    }

    const setSelectedItems = (value) => {
      const values = mapToValArray(items)

      if (props.multiple) {
        ;(value as number[]).forEach((ind) => toggleItem(values[ind]))
      } else {
        setActiveItem(values[value as number])
      }
    }

    watch(isNan, (to) => {
        if (!isTrustedSelect && !to) setSelectedItems(props.value)
        if (!isTrustedSelect && to) setActiveItem(null)

        isTrustedSelect && (isTrustedSelect = false)
      }, { immediate: true }
    )

    onMounted(() => {
      !isNan.value && setSelectedItems(props.value)
    })

    provide('list', {
      add: register,
      remove: unregister,
      click: onClick,
      activeClass: props.activeClass
    })

    return () => h(
      'div',
      { class: classes.value, style: styles.value },
      { default: () => slots.default && slots.default() }
    )
  }
})
