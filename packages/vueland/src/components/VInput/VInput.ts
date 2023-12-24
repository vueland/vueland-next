// Vue API
import { computed, defineComponent, h, inject, onBeforeMount, onBeforeUnmount, VNode, watch } from 'vue'

// Composable
import { validationProps } from '../../composables/use-validation'
import { colorProps, useColors } from '../../composables/use-colors'
import { useInputStates } from '../../composables/use-input-states'
import { useTransition } from '../../composables/use-transition'
import { useIcons } from '../../composables/use-icons'

// Components
import { VLabel } from '../VLabel'
import { VIcon } from '../VIcon'
import { VProgressLinear } from '../VProgressLinear'

type Form = {
  add: (item: (val?: any) => boolean | void) => void
  remove: (item: (val?: any) => boolean | void) => void
}

export default defineComponent({
  name: 'v-input',
  components: {
    VLabel,
    VIcon,
  },
  inheritAttrs: true,
  props: {
    label: {
      type: String,
      default: '',
    },
    prependIcon: {
      type: String,
      default: '',
    },
    appendIcon: {
      type: String,
      default: '',
    },
    clearable: Boolean,
    disabled: Boolean,
    focused: Boolean,
    readonly: Boolean,
    file: Boolean,
    loading: Boolean,
    hints: {
      type: Boolean,
      default: true,
    },
    hintMessage: {
      type: String,
      default: '',
    },
    textColor: {
      type: String,
      default: '',
    },
    ...validationProps(),
    ...colorProps(),
  },
  emits: [ 'clear' ],

  setup(props, { attrs, emit, slots, expose }) {
    const { setTextCssColor, setTextClassNameColor } = useColors()

    const {
      inputState,
      errorState,
      isDisabled,
      isReadonly,
      stateClasses,
      validate,
      onFocus,
      onBlur,
    } = useInputStates(props, { attrs, emit })

    const { icons } = useIcons()

    const form: Maybe<Form> = inject('$v_form', null as any)

    const textClassColor = setTextClassNameColor(props.textColor)
    const textCssColor = setTextCssColor(props.textColor)

    const hasPrependIcon = computed<boolean>(() => !!props.prependIcon || !!slots['prepend-icon'])
    const hasAppendIcon = computed<boolean>(() => !!props.appendIcon || !!slots['append-icon'] || props.clearable)

    const classes = computed<Record<string, boolean>>(() => ({
      'v-input': true,
      'v-input--focused': inputState.focused && !isReadonly.value,
      'v-input--disabled': isDisabled.value,
      'v-input--readonly': isReadonly.value,
      'v-input--file': props.file,
      'v-input--has-prepend-icon': hasPrependIcon.value,
      'v-input--has-append-icon': hasAppendIcon.value,
      'v-input--not-valid': !!errorState.innerError,
      ...stateClasses.value,
      ...(!props.disabled && !errorState.innerError ? setTextClassNameColor(props.color) : {}),
      ...(attrs.class as object),
    }))

    const styles = computed<Record<string, string>>(() => ({
      ...(!props.disabled && !errorState.innerError ? setTextCssColor(props.color) : {}),
      ...(attrs.style as object),
    }))

    watch(() => props.modelValue, (val: any) => inputState.value = val)

    const genLabel = (): VNode => {
      const label = h(VLabel, {
          class: 'v-label--on-input',
          disabled: isDisabled.value,
          focused: inputState.focused,
          color: !errorState.innerError ? props.color : '',
        },
        {
          default: () => props.label,
        },
      )

      return h('div', { class: 'v-input__label' }, [ label ])
    }

    const genIcon = (iconName: string, clickable = false): VNode => h(VIcon, {
      icon: iconName,
      size: 16,
      disabled: props.disabled,
      clickable,
      ...(clickable ? { onClick: () => emit('clear') } : {}),
    })

    const genPrependIcon = (): Maybe<VNode> => {
      const icon = props.prependIcon ? genIcon(props.prependIcon) : slots['prepend-icon']?.()

      return icon
        ? h('div', { class: 'v-input__prepend-icon' }, icon)
        : null
    }

    const genAppendIcon = (): Maybe<VNode> => {
      const icon = props.appendIcon ? props.appendIcon : props.clearable ? icons.$close : ''

      const content = icon ? genIcon(icon, props.clearable) : slots['append-icon']?.()

      return content
        ? h('div', { class: 'v-input__append-icon' }, content)
        : null
    }

    const genLinearProgress = (): VNode => h('div', {
        class: { 'v-input__loading': true },
      },

      h(VProgressLinear, {
        height: 2,
        indeterminate: true,
        color: props.color,
        backgroundColor: props.color,
      }),
    )

    const genTextFieldSlot = () => {
      const prependIconContent = genPrependIcon()
      const appendIconContent = genAppendIcon()
      const loadingIndicator = genLinearProgress()

      const { disabled } = props

      const textFieldContent = slots['text-field']?.({
        textCssColor,
        textClassColor,
        disabled,
      })

      return h('div', { class: 'v-input__text-field' },
        [ prependIconContent, textFieldContent, appendIconContent, props.loading ? loadingIndicator : null ],
      )
    }

    const genHintMessage = (): Maybe<VNode> => !!errorState.innerErrorMessage
      ? h('span', { class: 'v-input__hints-message' }, [ errorState.innerErrorMessage ])
      : null

    const genHints = (): VNode => h(
      'div',
      { class: 'v-input__hints' },
      useTransition(genHintMessage()!, 'fade'),
    )

    const genSelectSlot = (): Maybe<VNode> => slots.select
      ? h('div', { class: 'v-input__selects' }, slots.select?.())
      : null


    onBeforeMount(() => {
      if (props.rules) form?.add(validate)
    })

    onBeforeUnmount(() => {
      form?.remove(validate)
    })

    expose({
      onFocus,
      onBlur,
    })

    return () => h('div', { class: classes.value, style: styles.value },
      [
        genLabel(),
        genTextFieldSlot(),
        genHints(),
        genSelectSlot(),
      ],
    )
  },
})
