import { defineComponent, h, provide, watch, ref, toRaw, computed, onMounted } from 'vue'
import { useColors, colorProps } from '../../composable/use-colors'
import { mapToValArray } from '../../helpers'

export default defineComponent({
  name: 'v-list',
  props: {
    value: {
      type: [Number, Array],
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
  emits: ['update:value'],
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
      mapToValArray(toRaw(items.value)).forEach((it) => {
        it.isActive.value = it === item
      })
    }

    const toggleItem = (item) => {
      item.isActive.value = !item.isActive.value
    }

    const prepareIndexes = () => {
      const values = mapToValArray(toRaw(items.value))
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

    const setItemState = (value) => {
      if (value === null) return setActiveItem(value)
      const values = mapToValArray(toRaw(items.value))

      if (values.length) {
        if (props.multiple) {
          ;(value as number[]).forEach((ind) => toggleItem(values[ind]))
        } else {
          setActiveItem(values[value as number])
        }
      }
    }

    watch(() => props.value, (to) => {
        if (!isTrustedSelect) setItemState(to)
        isTrustedSelect && (isTrustedSelect = false)
      },
    )

    // this part is for fixing
    // async components mounting sequence
    const stop = watch(items, () => {
      setItemState(props.value)
      stop()
    }, { deep: true })

    onMounted(() => {
      setItemState(props.value)
    })

    provide('list', {
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
