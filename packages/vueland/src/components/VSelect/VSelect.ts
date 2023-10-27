import { computed, defineComponent, h, VNode } from 'vue'
import { useInputStates } from '../../composables/use-input-states'
import { useActivator } from '../../composables/use-activator'
import { getStringKeysValue } from '../../helpers'

// Components
import { VInput } from '../VInput'
import { VMenu } from '../VMenu'
import { VIcon } from '../VIcon'
import { VSelectList } from './VSelectList'
import { VProgressCircular } from '../VProgressCircular'

// Services
import { FaIcons } from '../../services/icons'

export default defineComponent({
  name: 'v-select',
  inheritAttrs: true,
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
  setup(props, { attrs, emit, slots }) {
    const { activatorRef } = useActivator(props)
    const {
      isDisabled,
      isReadonly,
      inputState,
      onBlur,
      onSelect,
      onFocus,
    } = useInputStates(props, { attrs, emit })

    const computedValue = computed<string | number>(() => {
      if (!!props.modelValue && typeof props.modelValue === 'object') {
        return getStringKeysValue(props.valueKey, props.modelValue)
      }

      return props.modelValue
    })

    const classes = computed<Record<string, boolean>>(() => ({
      'v-select': true,
      'v-select--expanded': inputState.focused,
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
        class: 'v-select__preloader',
      }, h(VProgressCircular, {
        indeterminate: true,
        width: 2,
        size: 30,
        color: (attrs.color || 'primary') as string,
      }))
    }

    const genSelectListSlot = () => {
      return h('div', {
        class: 'v-select__select-list-slot',
      }, {
        default: () => slots['select-list']?.({ onSelect }),
      })
    }

    const genSelectList = () => {
      return h(VSelectList, {
        items: props.items,
        selected: props.modelValue,
        valueKey: props.valueKey,
        activeClass: props.activeClass,
        onSelect,
      })
    }

    const genSelectMenu = (): VNode => {
      const content = slots['select-list'] ? genSelectListSlot() : genSelectList()

      return h(VMenu, {
        internalActivator: true,
        activator: activatorRef.value!,
        inputActivator: '.v-input__text-field',
        openOnClick: true,
        maxHeight: 240,
        // zIndex: 12,
        onShow: onFocus,
        onHide: onBlur,
      }, {
        default: () => props.loading ? genListPreloader() : content,
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
      ref: activatorRef,
      value: computedValue.value,
      focused: inputState.focused,
    }, {
      ['text-field']: ({ textCssColor, textClassColor, disabled }) => {
        return genSelect({ textCssColor, textClassColor, disabled })
      },
      ['append-icon']: () => genExpandIcon(),
      select: () => activatorRef.value ? genSelectMenu() : null,
    })
  },
})
