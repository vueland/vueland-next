import { computed, defineComponent, h, ref, VNode } from 'vue'
import { useInputStates } from '../../composable/use-input-states'
import { getStringKeysValue } from '../../helpers'

// Components
import { VInput } from '../VInput'
import { VMenu } from '../VMenu'
import { VIcon } from '../VIcon'
import { VSelectList } from './VSelectList'
import { VProgressCircular } from '../VProgressCircular'

// Services
import { FaIcons } from '../../services/icons'
import { Maybe } from '../../../types/base'

export const VSelect = defineComponent({
  name: 'v-select',
  props: {
    modelValue: {
      type: [String, Number, Object],
      default: null,
    },
    items: {
      type: Array,
      default: null,
    },
    valueKey: {
      type: String,
      default: '',
    },
    activeClass: {
      type: String,
      default: 'primary white--text text--base',
    },
    loading: Boolean,
  },
  emits: ['click', 'focus', 'select', 'blur', 'change', 'update:modelValue'],
  setup(props, { attrs, emit }) {
    const { isDisabled, isReadonly, state, onBlur, onSelect, onFocus } =
      useInputStates(props, { attrs, emit })

    const activator = ref<Maybe<HTMLElement>>(null)

    const computedValue = computed<string | number>(() => {
      if (!!props.modelValue && typeof props.modelValue === 'object') {
        return getStringKeysValue(props.valueKey, props.modelValue)
      }

      return props.modelValue
    })

    const classes = computed<Record<string, boolean>>(() => ({
      'v-select': true,
      'v-select--expanded': state.focused,
      'v-select--readonly': isReadonly.value,
      'v-select--disabled': isDisabled.value,
    }))

    const genInput = ({ textCssColor, textClassColor, disabled }) => {
      return h('input', {
        class: {
          'v-select__input': true,
          ...(disabled ? textClassColor : {}),
        },
        style: {
          ...(!disabled ? textCssColor : {}),
        },
        disabled: isDisabled.value,
        type: attrs.type || 'text',
        placeholder: attrs.placeholder,
        value: computedValue.value,
        readonly: true,
      })
    }

    const genListPreloader = () => {
      return h('div', {
        class: 'v-select__preloader'
      }, h(VProgressCircular, {
        indeterminate: true,
        width: 2,
        size: 30,
        color: (attrs.color || 'primary') as string
      }))
    }

    const genSelectList = (): VNode => {
      return h(VMenu, {
        internalActivator: true,
        activator: activator.value!,
        inputActivator: '.v-input__text-field',
        openOnClick: !isDisabled.value && !isReadonly.value,
        maxHeight: 240,
        zIndex: 12,
        onShow: onFocus,
        onHide: onBlur,
      }, {
        default: () => props.loading ? genListPreloader() : h(VSelectList, {
          items: props.items,
          selected: props.modelValue,
          valueKey: props.valueKey,
          activeClass: props.activeClass,
          onSelect,
        }),
      })
    }

    const genExpandIcon = (): VNode => {
      return h(VIcon, {
        icon: FaIcons.$chevronDown,
        color: !isDisabled.value ? attrs.color : '',
        size: 16,
      })
    }

    const genSelect = ({ textCssColor, textClassColor, disabled }) => {
      return h('div', {
        class: classes.value,
      }, genInput({ textCssColor, textClassColor, disabled }))
    }

    return () => h(VInput, {
      ref: activator,
      value: computedValue.value,
      focused: state.focused,
    }, {
      ['text-field']: ({ textCssColor, textClassColor, disabled }) => {
        return genSelect({ textCssColor, textClassColor, disabled })
      },
      ['append-icon']: () => genExpandIcon(),
      select: () => activator.value ? genSelectList() : null,
    })
  },
})
