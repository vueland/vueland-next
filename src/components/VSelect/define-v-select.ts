import { defineComponent, ref, toRefs, computed } from 'vue'
import { getStringKeysValue } from '../../helpers'
import { useInputStates } from '../../composable/use-input-states'

// Components
import { VInput } from '../VInput'
import { VMenu } from '../VMenu'
import { VIcon } from '../VIcon'

import VSelectList from './VSelectList.vue'

// Services
import { FaIcons } from '../../services/icons'

import { Maybe } from '../../../types/base'

export const defineVSelect = () => {
  return defineComponent({
    name: 'v-select',
    components: {
      VMenu,
      VIcon,
      VInput,
      VSelectList,
    },
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
      showExpIcon: {
        type: Boolean,
        default: true,
      },
    },
    emits: ['click', 'focus', 'select', 'blur', 'change', 'update:modelValue'],
    setup(props, { attrs, emit }) {
      const { isDisabled, isReadonly, state, onBlur, onSelect, onFocus } =
        useInputStates(props, { attrs, emit })

      const activator = ref<Maybe<HTMLElement>>(null)

      const computedKeyValue = computed<string | number>(() => {
        return props.modelValue
          ? props.valueKey
            ? getStringKeysValue(props.valueKey, props.modelValue)
            : props.modelValue
          : ''
      })

      const classes = computed<Record<string, boolean>>(() => ({
        'v-select': true,
        'v-select--expanded': state.focused,
        'v-select--readonly': isReadonly.value,
        'v-select--disabled': isDisabled.value,
      }))

      return {
        ...toRefs(state),
        activator,
        classes,
        computedKeyValue,
        isReadonly,
        isDisabled,
        FaIcons,
        onFocus,
        onSelect,
        onBlur,
      }
    },
  })
}
