// Style
import './VInput.scss'

// Vue API
import {
  h,
  watch,
  computed,
  defineComponent,
  inject,
  onBeforeMount,
  onBeforeUnmount
} from 'vue'

// Components
import { VLabel } from '../VLabel'
import { VIcon } from '../VIcon'

// Types
import { VNode, PropType, Ref } from 'vue'

// Effects
import { useTransition } from '../../effects/use-transition'
import { colorProps, useColors } from '../../effects/use-colors'
import { useIcons } from '../../effects/use-icons'
import { themeProps } from '../../effects/use-theme'
import { validateProps, useValidate } from '@/effects/use-validate'

import { Transitions } from '../../services/transitions'

export const VInput = defineComponent({
  name: 'v-input',
  inheritAttrs: false,
  props: {
    inputSlotRef: Object as PropType<Ref<null>>,
    focused: Boolean,
    hasState: Boolean,
    disabled: Boolean,
    clearable: Boolean,
    label: String,
    prependIcon: String,
    appendIcon: String,
    type: {
      type: String,
      default: 'text'
    },
    modelValue: [ String, Number, Object ],
    ...colorProps(),
    ...themeProps(),
    ...validateProps()
  } as any,

  emits: [ 'clear', 'focus' ],

  setup(props, { slots, emit, attrs }): () => VNode {
    const { setTextColor } = useColors()
    const { icons, iconSize } = useIcons('md')
    const {
      validate,
      dirty,
      errorState,
      validationState
    } = useValidate(props)

    const fields: Ref<any[]> | undefined = props.rules && inject('fields')

    if (fields?.value && props.rules?.length) {
      fields.value.push(validateValue)
    }

    const isValid = computed<boolean>(() => {
      return errorState.isDirty && props.hasState && !errorState.innerError
    })

    const isNotValid = computed<boolean>(() => {
      return errorState.isDirty && !!errorState.innerError
    })

    const classes = computed<Record<string, boolean>>(() => ({
      'v-input': true,
      'v-input--disabled': props.disabled,
      'v-input--dirty': errorState.isDirty,
      'v-input--valid': isValid.value,
      'v-input--not-valid': isNotValid.value,
      'v-input--focused': props.focused
    }))

    watch(() => props.value, () => requestAnimationFrame(validateValue))
    watch(() => props.focused, (to) => !to && requestAnimationFrame(validateValue))

    function onClick() {
      !errorState.isDirty && dirty()
      emit('focus')
    }

    function onClear() {
      !props.disabled && props.hasState && emit('clear')
    }

    function validateValue() {
      return props.rules?.length && validate(props.value)
    }

    function genLabel(): VNode {
      const propsData = {
        absolute: true,
        onField: true,
        hasState: props.hasState,
        disabled: props.disabled,
        focused: props.focused,
        color: validationState.value
      }

      return h(VLabel, propsData, {
        default: () => props.label
      })
    }

    function genIcon(iconName, clickable = false) {
      return h(VIcon, {
        color: validationState.value,
        dark: props.dark,
        icon: iconName,
        size: iconSize,
        disabled: props.disabled,
        clickable
      })
    }

    function genPrependIcon() {
      return h(
        'div',
        { class: 'v-input__prepend-icon' },
        genIcon(props.prependIcon)
      )
    }

    function genAppendIcon() {
      const propsData = { class: 'v-input__append-icon' }
      return h('div', propsData, genIcon(props.appendIcon))
    }

    function genClearIcon() {
      const propsData = {
        class: 'v-input__clear',
        onClick: onClear
      }
      return h('div', propsData, genIcon(icons.$close, true))
    }

    function genInputSlot() {
      const propsData = {
        class: 'v-input__slot',
        onClick
      }
      return h('div', setTextColor(validationState.value!, propsData), [
        genSlotContent(),
        genStatus()
      ])
    }

    function genSlotContent(): VNode {
      const propsData = {
        class: {
          'v-input__field-slot': true
        }
      }

      return h('div', propsData, [
        props.prependIcon && genPrependIcon(),
        !props.clearable && props.appendIcon && genAppendIcon(),
        props.clearable && genClearIcon(),
        genLabel(),
        slots.textField && slots.textField()
      ])
    }

    function genStatusMessage(): VNode {
      const propsData = {
        class: { 'v-input__status-message': true }
      }

      return h('span', propsData, errorState.innerErrorMessage!)
    }

    function genStatus(): VNode {
      const transitionedMessage = useTransition(
        errorState.innerErrorMessage! && (genStatusMessage() as VNode),
        Transitions.FADE
      )

      const propsData = { class: 'v-input__status' }

      return h('div', propsData, transitionedMessage)
    }

    onBeforeMount(() => {
      props.focused && !errorState.isDirty && dirty()
    })

    onBeforeUnmount(() => {
      if (fields?.value) {
        fields!.value = fields!.value.filter((v) => v !== validateValue)
      }
    })

    return () => {
      const propsData = {
        class: classes.value,
        style: attrs.style
      }
      return h('div', propsData, genInputSlot())
    }
  }
})
