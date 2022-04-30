// Vue API
import {
  defineComponent,
  h,
  watch,
  inject,
  computed,
  onBeforeMount,
  onBeforeUnmount,
  VNode,
} from 'vue'

// Composable
import { useValidation, validationProps } from '../../composable/use-validation'
import { useColors, colorProps } from '../../composable/use-colors'
import { useInputStates } from '../../composable/use-input-states'
import { useTransition } from '../../composable/use-transition'

// Components
import { VLabel } from '../VLabel'
import { VIcon } from '../VIcon'

import { Maybe } from '../../../types/base'

type Form = {
  add: (item: (val?: any) => boolean | void) => void
  remove: (item: (val?: any) => boolean | void) => void
}

export const VInput = defineComponent({
  name: 'v-input',
  components: {
    VLabel,
    VIcon,
  },
  inheritAttrs: false,
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
    disabled: Boolean,
    focused: Boolean,
    readonly: Boolean,
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
  emits: ['click'],
  setup(props, { attrs, emit, slots }) {
    const { validate, errorState } = useValidation(props)
    const { setTextCssColor, setTextClassNameColor } = useColors()
    const { isDisabled, isReadonly } = useInputStates(props, { attrs, emit })

    const form: Maybe<Form> = inject('form', null as any)

    const textClassColor = setTextClassNameColor(props.textColor)
    const textCssColor = setTextCssColor(props.textColor)

    const hasPrependIcon = computed<boolean>(() => {
      return !!props.prependIcon || !!slots['prepend-icon']
    })

    const hasAppendIcon = computed<boolean>(() => {
      return !!props.appendIcon || !!slots['append-icon']
    })

    const classes = computed<Record<string, boolean>>(() => ({
      'v-input': true,
      'v-input--primary': !props.color,
      'v-input--focused': props.focused && !isReadonly.value,
      'v-input--disabled': isDisabled.value,
      'v-input--readonly': isReadonly.value,
      'v-input--has-prepend-icon': hasPrependIcon.value,
      'v-input--has-append-icon': hasAppendIcon.value,
      'v-input--not-valid': !!errorState.innerError,
      ...(!props.disabled && !errorState.innerError
        ? setTextClassNameColor(props.color)
        : {}),
      ...(attrs.class as object),
    }))

    const styles = computed<Record<string, string>>(() => ({
      ...(!props.disabled && !errorState.innerError
        ? setTextCssColor(props.color)
        : {}),
      ...(attrs.style as object),
    }))

    watch(
      () => props.focused,
      (to) => !to && validate(),
    )

    watch(
      () => props.value,
      () => validate(),
    )

    const genLabel = (): VNode => {
      const label = h(
        VLabel,
        {
          class: 'v-label--on-input',
          disabled: isDisabled.value,
          focused: props.focused,
          color: !errorState.innerError ? props.color : '',
        },
        {
          default: () => props.label,
        },
      )

      return h('div', { class: 'v-input__label' }, [label])
    }

    const genIcon = (iconName, clickable = false): VNode => {
      return h(VIcon, {
        icon: iconName,
        size: 16,
        disabled: props.disabled,
        clickable,
      })
    }

    const genPrependIcon = (): Maybe<VNode> => {
      let content

      if (props.prependIcon) {
        content = genIcon(props.prependIcon)
      } else {
        content = slots['prepend-icon']?.()
      }

      return content ?
        h('div', { class: 'v-input__prepend-icon' }, content)
        : null
    }

    const genAppendIcon = (): Maybe<VNode> => {
      let content

      if (props.appendIcon) {
        content = genIcon(props.appendIcon)
      } else {
        content = slots['append-icon']?.()
      }

      return content ?
        h('div', { class: 'v-input__append-icon' }, content)
        : null
    }

    const genTextFieldSlot = () => {
      const prependIconContent = genPrependIcon()
      const appendIconContent = genAppendIcon()
      const { disabled } = props

      const textFieldContent = slots['text-field']?.({
        textCssColor,
        textClassColor,
        disabled,
      })

      return h(
        'div',
        { class: 'v-input__text-field' },
        [prependIconContent, textFieldContent, appendIconContent],
      )
    }

    const genHintMessage = (): Maybe<VNode> => {
      return props.hintMessage || errorState.innerErrorMessage ?
        h(
          'span',
          { class: 'v-input__hints-message' },
          [errorState.innerErrorMessage],
        )
        : null
    }

    const genHints = (): Maybe<VNode> => {
      return (props.hints || props.rules) ? h(
        'div',
        { class: 'v-input__hints' },
        useTransition(genHintMessage()!, 'fade'),
      ) : null
    }

    const genSelectSlot = (): Maybe<VNode> => {
      return slots.select ?
        h(
          'div',
          { class: 'v-input__selects' },
          slots.select?.(),
        )
        : null
    }

    onBeforeMount(() => {
      if (props.rules) form?.add(validate)
    })

    onBeforeUnmount(() => {
      form?.remove(validate)
    })

    return () => h(
      'div',
      { class: classes.value, style: styles.value },
      [
        props.label && genLabel(),
        genTextFieldSlot(),
        genHints(),
        genSelectSlot(),
      ],
    )
  },
})
