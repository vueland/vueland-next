import "../../../src/components/VTextField/VTextField.scss";
import { h, watch, computed, reactive, defineComponent } from 'vue';
import { useColors, colorProps } from '../../effects/use-colors';
import { useTheme } from '../../effects/use-theme';
import { validateProps } from '../../effects/use-validate';
import { VInput } from '../VInput';
export const VTextField = defineComponent({
  name: 'v-text-field',
  props: {
    dark: Boolean,
    disabled: Boolean,
    readonly: Boolean,
    label: String,
    isDirty: Boolean,
    type: {
      type: String,
      default: 'text'
    },
    modelValue: [String, Number, Date],
    tag: {
      type: String,
      default: 'input'
    },
    ...colorProps(),
    ...validateProps()
  },
  emits: ['input', 'focus', 'blur', 'change', 'clear', 'update:value', 'update:modelValue'],

  setup(props, {
    emit,
    attrs
  }) {
    const state = reactive({
      value: '',
      focused: false
    });
    state.value = props.modelValue || props.value;
    const {
      setTextColor
    } = useColors();
    const {
      base
    } = useTheme();
    const computedValue = computed(() => {
      return props.modelValue || props.value;
    });
    watch(() => computedValue.value, value => state.value = value);
    const classes = computed(() => ({
      'v-text-field': true,
      'v-text-field--disabled': props.disabled
    }));

    function onClear() {
      state.value = '';
      emit('update:modelValue', state.value);
      emit('update:value', state.value);
      emit('input', state.value);
      emit('clear', state.value);
    }

    function onBlur() {
      setTimeout(() => {
        state.focused = false;
        emit('blur');
      });
    }

    function onFocus() {
      state.focused = true;
      emit('focus');
    }

    function onChange() {
      emit('change', state.value);
    }

    function onInput(e) {
      state.value = e.target.value;
      emit('update:modelValue', e.target.value);
      emit('update:value', e.target.value);
      emit('input', e.target.value);
    }

    function genInput() {
      const propsData = {
        disabled: props.disabled,
        readonly: props.readonly,
        value: state.value,
        autocomplete: attrs.autocomplete,
        class: 'v-text-field__input',
        onFocus,
        onBlur,
        onInput,
        onChange
      };

      if (props.tag === 'input') {
        propsData.type = props.type;
      }

      return h(props.tag, setTextColor(props.dark ? 'white' : base, propsData));
    }

    function genTextField() {
      return h('div', {
        class: classes.value
      }, genInput());
    }

    return () => {
      const propsData = {
        label: props.label,
        focused: state.focused,
        hasState: !!state.value,
        dark: props.dark,
        disabled: props.disabled,
        clearable: props.clearable,
        value: computedValue.value,
        rules: props.rules,
        color: props.color,
        onClear
      };
      return h(VInput, propsData, {
        textField: () => genTextField()
      });
    };
  }

});
//# sourceMappingURL=VTextField.js.map