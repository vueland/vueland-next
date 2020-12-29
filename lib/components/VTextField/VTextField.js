import "../../../src/components/VTextField/VTextField.scss";
import { h, inject, watch, computed, reactive, defineComponent, onBeforeUnmount } from 'vue';
import { useValidate, validateProps } from '../../effects/use-validate';
import { useColors, colorProps } from '../../effects/use-colors';
import { VInput } from '../VInput';
export const VTextField = defineComponent({
  name: 'v-text-field',
  emits: ['input', 'focus', 'blur', 'change', 'update:value', 'update:modelValue'],
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
    ...validateProps(),
    ...colorProps()
  },

  setup(props, {
    emit,
    attrs
  }) {
    var _props$rules2;

    const state = reactive({
      value: '',
      focused: false
    });
    state.value = props.modelValue || props.value;
    const fields = props.rules && inject('fields');
    const {
      setTextColor
    } = useColors();
    const {
      validate,
      dirty,
      update,
      errorState,
      validateClasses,
      validationState
    } = useValidate(props);
    watch(() => props.modelValue || props.value, value => {
      state.value = value;
      validateValue();
    });
    const classes = computed(() => ({
      'v-text-field': true,
      'v-text-field--disabled': props.disabled,
      'v-text-field--dirty': errorState.isDirty,
      'v-text-field--valid': errorState.isDirty && !errorState.innerError,
      'v-text-field--not-valid': errorState.isDirty && !!errorState.innerError,
      ...validateClasses.value
    }));

    function validateValue() {
      var _props$rules;

      return ((_props$rules = props.rules) === null || _props$rules === void 0 ? void 0 : _props$rules.length) && validate(state.value);
    }

    if (fields !== null && fields !== void 0 && fields.value && (_props$rules2 = props.rules) !== null && _props$rules2 !== void 0 && _props$rules2.length) {
      fields.value.push(validateValue);
    }

    onBeforeUnmount(() => {
      if (fields !== null && fields !== void 0 && fields.value) {
        fields.value = fields.value.filter(v => v !== validateValue);
      }
    });

    function focusHandler() {
      dirty();
      update(errorState.innerError);
      state.focused = true;
      emit('focus');
    }

    function blurHandler() {
      state.focused = false;
      emit('blur');
      validateValue();
    }

    function changeHandler() {
      emit('change', state.value);
    }

    function inputHandler(e) {
      state.value = e.target.value;
      emit('update:modelValue', state.value);
      emit('update:value', state.value);
      emit('input', state.value);
    }

    function genInput() {
      const propsData = {
        disabled: props.disabled,
        readonly: props.readonly,
        value: state.value,
        autocomplete: attrs.autocomplete,
        class: {
          'v-text-field__input': true
        },
        onFocus: focusHandler,
        onBlur: blurHandler,
        onInput: inputHandler,
        onChange: changeHandler
      };

      if (props.tag === 'input') {
        propsData.type = props.type;
      }

      return h(props.tag, props.dark ? setTextColor('white', propsData) : propsData);
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
        hasError: errorState.innerError,
        dark: props.dark,
        color: validationState.value,
        isDirty: errorState.isDirty,
        disabled: props.disabled,
        message: errorState.innerErrorMessage
      };
      return h(VInput, propsData, {
        textField: () => genTextField()
      });
    };
  }

});
//# sourceMappingURL=VTextField.js.map