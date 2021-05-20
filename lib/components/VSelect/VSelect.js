import "../../../src/components/VSelect/VSelect.scss";
import { h, reactive, computed, defineComponent, watch, inject, onBeforeUnmount } from 'vue';
import { validateProps, useValidate } from '../../effects/use-validate';
import { colorProps, useColors } from '../../effects/use-colors';
import { useTheme } from '../../effects/use-theme';
import { VInput } from '../VInput';
import { VSelectList } from './VSelectList';
import { VMenu } from '../VMenu';
export const VSelect = defineComponent({
  name: 'v-select',
  props: {
    label: String,
    items: Array,
    dark: Boolean,
    valueKey: String,
    idKey: String,
    listColor: String,
    disabled: Boolean,
    readonly: Boolean,
    clearable: Boolean,
    modelValue: [Array, String, Object, Number],
    ...validateProps(),
    ...colorProps()
  },
  emits: ['input', 'blur', 'focus', 'select', 'update:modelValue', 'update:value'],

  setup(props, {
    emit,
    attrs
  }) {
    var _props$rules2;

    const state = reactive({
      selected: null,
      focused: false
    });
    const {
      setTextColor
    } = useColors();
    const {
      base
    } = useTheme();
    const {
      validate,
      dirty,
      update,
      errorState,
      validationState
    } = useValidate(props);
    const fields = props.rules && inject('fields');
    const classes = computed(() => ({
      'v-select': true,
      'v-select--disabled': props.disabled,
      'v-select--readonly': props.readonly,
      'v-select--focused': state.focused
    }));
    const computedInputValue = computed(() => {
      return state.selected ? props.valueKey ? state.selected[props.valueKey] : state.selected : '';
    });
    const computedValue = computed(() => {
      return props.modelValue || props.value;
    });
    watch(() => computedValue.value, value => {
      var _props$rules;

      state.selected = value;
      !state.focused && errorState.isDirty && ((_props$rules = props.rules) === null || _props$rules === void 0 ? void 0 : _props$rules.length) && validateValue();
    }, {
      immediate: true
    });

    if (fields !== null && fields !== void 0 && fields.value && (_props$rules2 = props.rules) !== null && _props$rules2 !== void 0 && _props$rules2.length) {
      fields.value.push(validateValue);
    }

    function validateValue() {
      var _props$rules3;

      return ((_props$rules3 = props.rules) === null || _props$rules3 === void 0 ? void 0 : _props$rules3.length) && validate(computedInputValue.value);
    }

    function toggleState() {
      state.focused = !state.focused;
    }

    function onBlur() {
      setTimeout(() => {
        requestAnimationFrame(validateValue);
        toggleState();
        emit('blur');
      });
    }

    function onClick() {
      dirty();
      update(errorState.innerError);
      toggleState();
      emit('focus');
    }

    function onClear() {
      state.selected = '';
      requestAnimationFrame(validateValue);
    }

    function selectItem(item) {
      state.selected = item;
      emit('select', item);
      emit('update:value', item);
      emit('update:modelValue', item);
    }

    function genInput() {
      const propsData = {
        value: computedInputValue.value,
        disabled: props.disabled,
        readonly: props.readonly && !props.typeable,
        class: 'v-select__input',
        onClick
      };
      return h('input', setTextColor(props.dark ? 'white' : base, propsData));
    }

    function genSelectList() {
      const propsData = {
        items: props.items,
        valueKey: props.valueKey,
        idKey: props.idKey,
        active: state.focused,
        color: props.dark ? 'white' : base,
        listColor: props.listColor || 'white',
        onSelect: item => selectItem(item)
      };
      return h(VSelectList, propsData);
    }

    function genMenu() {
      return h(VMenu, {
        openOnClick: true,
        maxHeight: 240,
        onClose: onBlur
      }, {
        default: () => genSelectList()
      });
    }

    function genSelect() {
      const propsData = {
        class: classes.value
      };
      return h('div', propsData, [genInput(), genMenu()]);
    }

    onBeforeUnmount(() => {
      if (fields !== null && fields !== void 0 && fields.value) {
        fields.value = fields.value.filter(v => v !== validateValue);
      }
    });
    return () => {
      const propsData = {
        label: props.label,
        focused: state.focused,
        hasState: !!computedInputValue.value,
        hasError: errorState.innerError,
        dark: props.dark,
        color: validationState.value,
        disabled: props.disabled,
        isDirty: !!errorState.isDirty,
        message: errorState.innerErrorMessage,
        clearable: props.clearable,
        onClear,
        ...attrs
      };
      return h(VInput, propsData, {
        select: () => genSelect()
      });
    };
  }

});
//# sourceMappingURL=VSelect.js.map