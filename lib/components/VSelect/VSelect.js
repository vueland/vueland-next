import "../../../src/components/VSelect/VSelect.scss";
import { h, reactive, computed, defineComponent, withDirectives, watch, inject, onBeforeUnmount } from 'vue';
import { validateProps, useValidate } from '../../effects/use-validate';
import { colorProps, useColors } from '../../effects/use-colors';
import { useTheme } from '../../effects/use-theme';
import { VInput } from '../VInput';
import { VSelectList } from './VSelectList';
import { clickOutside } from '../../directives';
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
    modelValue: [Array, String, Object, Number],
    ...validateProps(),
    ...colorProps()
  },
  emits: ['input', 'blur', 'focus', 'select', 'update:modelValue', 'update:value'],

  setup(props, {
    emit
  }) {
    var _props$rules2;

    const state = reactive({
      selected: null,
      focused: false,
      isMenuActive: false
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
    const directive = computed(() => {
      return state.focused ? {
        handler: onBlur,
        closeConditional: true
      } : undefined;
    });
    const classes = computed(() => ({
      'v-select': true,
      'v-select--disabled': props.disabled,
      'v-select--readonly': props.readonly && !props.typeable,
      'v-select--focused': state.focused,
      'v-select--typeable': props.typeable
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
      state.isMenuActive = !state.isMenuActive;
    }

    function onBlur() {
      toggleState();
      requestAnimationFrame(validateValue);
      emit('blur');
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

    function selectItem(it) {
      state.selected = it;
      emit('select', it);
      emit('update:value', it);
      emit('update:modelValue', it);
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
        active: state.isMenuActive,
        color: props.dark ? 'white' : base,
        listColor: props.listColor || 'white',
        onSelect: it => selectItem(it)
      };
      return h(VSelectList, propsData);
    }

    function genSelect() {
      const selectVNode = h('div', {
        class: classes.value
      }, [genInput(), props.items && genSelectList()]);
      return withDirectives(selectVNode, [[clickOutside, directive.value]]);
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
        onClear
      };
      return h(VInput, propsData, {
        select: () => genSelect()
      });
    };
  }

});
//# sourceMappingURL=VSelect.js.map