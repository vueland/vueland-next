import "../../../src/components/VInput/VInput.scss";
import { h, computed, defineComponent } from 'vue';
import { VLabel } from '../VLabel';
import { VIcon } from '../VIcon';
import { useTransition } from '../../effects/use-transition';
import { useColors } from '../../effects/use-colors';
import { useIcons } from '../../effects/use-icons';
import { themeProps } from '../../effects/use-theme';
export const VInput = defineComponent({
  name: 'v-input',
  inheritAttrs: false,
  props: {
    focused: Boolean,
    hasState: Boolean,
    hasError: Boolean,
    isDirty: Boolean,
    disabled: Boolean,
    clearable: Boolean,
    label: String,
    prependIcon: String,
    appendIcon: String,
    message: String,
    type: {
      type: String,
      default: 'text'
    },
    color: {
      type: String,
      default: 'primary'
    },
    modelValue: [String, Number],
    ...themeProps()
  },
  emits: ['clear'],

  setup(props, {
    slots,
    emit
  }) {
    const {
      setTextColor
    } = useColors();
    const {
      icons,
      iconSize
    } = useIcons('md');
    const isValid = computed(() => {
      return props.isDirty && props.hasState && !props.hasError;
    });
    const isNotValid = computed(() => {
      return props.isDirty && props.hasError;
    });
    const classes = computed(() => ({
      'v-input': true,
      'v-input--disabled': props.disabled,
      'v-input--dirty': props.isDirty,
      'v-input--valid': isValid.value,
      'v-input--not-valid': isNotValid.value,
      'v-input--focused': props.focused
    }));

    function genLabel() {
      const propsData = {
        absolute: true,
        onField: true,
        hasState: props.hasState,
        disabled: props.disabled,
        focused: props.focused,
        color: props.color
      };
      return h(VLabel, propsData, {
        default: () => props.label
      });
    }

    function genIcon(iconName, clickable = false) {
      return h(VIcon, {
        color: props.color,
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
      return h('div', {
        class: 'v-input__append-icon'
      }, genIcon(props.appendIcon));
    }

    function genClearIcon() {
      return h('div', {
        class: 'v-input__clear',
        onClick: () => !props.disabled && emit('clear')
      }, genIcon(icons.$close, true));
    }

    function genInputSlot() {
      const propsData = {
        class: 'v-input__slot'
      };
      return h('div', props.color ? setTextColor(props.color, propsData) : propsData, [genSlotContent(), genStatus()]);
    }

    function genSlotContent() {
      const propsData = {
        class: {
          'v-input__select-slot': !!slots.select,
          'v-input__field-slot': !!slots.textField
        }
      };
      return h('div', propsData, [props.prependIcon && genPrependIcon(), !props.clearable && props.appendIcon && genAppendIcon(), props.clearable && genClearIcon(), genLabel(), slots.select && slots.select(), slots.textField && slots.textField()]);
    }

    function genStatusMessage() {
      const propsData = {
        class: {
          'v-input__status-message': true
        }
      };
      return h('span', propsData, props.message);
    }

    function genStatus() {
      const transitionedMessage = useTransition(props.message && genStatusMessage(), 'fade');
      const propsData = {
        class: {
          'v-input__status': true
        }
      };
      return h('div', propsData, transitionedMessage);
    }

    function genPropsData() {
      return {
        class: { ...classes.value
        }
      };
    }

    return () => h('div', genPropsData(), genInputSlot());
  }

});
//# sourceMappingURL=VInput.js.map