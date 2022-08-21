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
import { validationProps } from '../../composable/use-validation'
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

export default defineComponent({
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
    file: Boolean,
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
      onBlur
    } = useInputStates(props, { attrs, emit })

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

    watch(
      () => props.value,
      (to) => inputState.value = to as string,
    )

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

      return h('div', { class: 'v-input__text-field' },
        [prependIconContent, textFieldContent, appendIconContent],
      )
    }

    const genHintMessage = (): Maybe<VNode> => {
      return !!errorState.innerErrorMessage ? h(
        'span',
        { class: 'v-input__hints-message' },
        [errorState.innerErrorMessage],
      ) : null
    }

    const genHints = (): Maybe<VNode> => {
      return h(
        'div',
        { class: 'v-input__hints' },
        useTransition(genHintMessage()!, 'fade'),
      )
    }

    const genSelectSlot = (): Maybe<VNode> => {
      return slots.select ?
        h('div', { class: 'v-input__selects' }, slots.select?.())
        : null
    }

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
