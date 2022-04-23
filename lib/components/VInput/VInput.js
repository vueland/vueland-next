import "../../../src/components/VInput/VInput.scss";
import { h, watch, computed, defineComponent, inject, onBeforeMount, onBeforeUnmount } from 'vue';
import { VLabel } from '../VLabel';
import { VIcon } from '../VIcon';
import { useTransition } from '../../effects/use-transition';
import { colorProps, useColors } from '../../effects/use-colors';
import { useIcons } from '../../effects/use-icons';
import { themeProps } from '../../effects/use-theme';
import { validateProps, useValidate } from '@/effects/use-validate';
import { Transitions } from '../../services/transitions';
export const VInput = defineComponent({
  name: 'v-input',
  inheritAttrs: false,
  props: {
    inputSlotRef: Object,
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
    modelValue: [String, Number, Object],
    ...colorProps(),
    ...themeProps(),
    ...validateProps()
  },
  emits: ['clear', 'focus'],

  setup(props, {
    slots,
    emit,
    attrs
  }) {
    var _props$rules;

    const {
      setTextColor
    } = useColors();
    const {
      icons,
      iconSize
    } = useIcons('md');
    const {
      validate,
      dirty,
      errorState,
      validationState
    } = useValidate(props);
    const fields = props.rules && inject('fields');

    if (fields !== null && fields !== void 0 && fields.value && (_props$rules = props.rules) !== null && _props$rules !== void 0 && _props$rules.length) {
      fields.value.push(validateValue);
    }

    const isValid = computed(() => {
      return errorState.isDirty && props.hasState && !errorState.innerError;
    });
    const isNotValid = computed(() => {
      return errorState.isDirty && !!errorState.innerError;
    });
    const classes = computed(() => ({
      'v-input': true,
      'v-input--disabled': props.disabled,
      'v-input--dirty': errorState.isDirty,
      'v-input--valid': isValid.value,
      'v-input--not-valid': isNotValid.value,
      'v-input--focused': props.focused
    }));
    watch(() => props.value, () => requestAnimationFrame(validateValue));
    watch(() => props.focused, to => !to && requestAnimationFrame(validateValue));

    function onClick() {
      !errorState.isDirty && dirty();
      emit('focus');
    }

    function validateValue() {
      var _props$rules2;

      return ((_props$rules2 = props.rules) === null || _props$rules2 === void 0 ? void 0 : _props$rules2.length) && validate(props.value);
    }

    function genLabel() {
      const propsData = {
        absolute: true,
        onField: true,
        hasState: props.hasState,
        disabled: props.disabled,
        focused: props.focused,
        color: validationState.value
      };
      return h(VLabel, propsData, {
        default: () => props.label
      });
    }

    function genIcon(iconName, clickable = false) {
      return h(VIcon, {
        color: validationState.value,
        dark: props.dark,
        icon: iconName,
        size: iconSize,
        disabled: props.disabled,
        clickable
      });
    }

    function genPrependIcon() {
      return h('div', {
        class: 'v-input__prepend-icon'
      }, genIcon(props.prependIcon));
    }

    function genAppendIcon() {
      const propsData = {
        class: 'v-input__append-icon'
      };
      return h('div', propsData, genIcon(props.appendIcon));
    }

    function genClearIcon() {
      const propsData = {
        class: 'v-input__clear',
        onClick: () => {
          !props.disabled && props.hasState && emit('clear');
        }
      };
      return h('div', propsData, genIcon(icons.$close, true));
    }

    function genInputSlot() {
      const propsData = {
        class: 'v-input__slot',
        onClick
      };
      return h('div', setTextColor(validationState.value, propsData), [genSlotContent(), genStatus()]);
    }

    function genSlotContent() {
      const propsData = {
        class: {
          'v-input__field-slot': true
        }
      };
      return h('div', propsData, [props.prependIcon && genPrependIcon(), !props.clearable && props.appendIcon && genAppendIcon(), props.clearable && genClearIcon(), genLabel(), slots.textField && slots.textField()]);
    }

    function genStatusMessage() {
      const propsData = {
        class: {
          'v-input__status-message': true
        }
      };
      return h('span', propsData, errorState.innerErrorMessage);
    }

    function genStatus() {
      const transitionedMessage = useTransition(errorState.innerErrorMessage && genStatusMessage(), Transitions.FADE);
      const propsData = {
        class: 'v-input__status'
      };
      return h('div', propsData, transitionedMessage);
    }

    onBeforeMount(() => {
      props.focused && !errorState.isDirty && dirty();
    });
    onBeforeUnmount(() => {
      if (fields !== null && fields !== void 0 && fields.value) {
        fields.value = fields.value.filter(v => v !== validateValue);
      }
    });
    return () => {
      const propsData = {
        class: classes.value,
        style: attrs.style
      };
      return h('div', propsData, genInputSlot());
    };
  }

});
//# sourceMappingURL=VInput.js.map