import "../../../src/components/VAutocomplete/VAutocomplete.scss";
import { h, ref, reactive, computed, defineComponent, withDirectives, watch, inject, onBeforeUnmount } from 'vue';
import { validateProps, useValidate } from '../../effects/use-validate';
import { colorProps, useColors } from '../../effects/use-colors';
import { VInput } from '../VInput';
import { VAutocompleteList } from './VAutocompleteList';
import { clickOutside } from '../../directives';
export const VAutocomplete = defineComponent({
  name: 'v-select',
  emits: ['input', 'blur', 'focus', 'select', 'update:modelValue', 'update:value'],
  props: {
    label: String,
    items: Array,
    dark: Boolean,
    valueKey: String,
    idKey: String,
    listColor: String,
    disabled: Boolean,
    modelValue: [Array, String, Object, Number],
    ...validateProps(),
    ...colorProps()
  },

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
    const inputTemplateRef = ref(null);
    const {
      validate,
      dirty,
      update,
      errorState,
      validateClasses,
      validationState
    } = useValidate(props);
    const fields = props.rules && inject('fields');
    const directive = computed(() => {
      return state.isMenuActive && !state.focused ? {
        handler: clickOutsideHandler,
        closeConditional: true
      } : undefined;
    });
    const classes = computed(() => ({
      'v-autocomplete': true,
      'v-autocomplete--disabled': props.disabled,
      'v-autocomplete--focused': state.focused,
      ...validateClasses.value
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

    function clickOutsideHandler() {
      state.focused = false;
      state.isMenuActive = false;
      requestAnimationFrame(validateValue);
    }

    function onClick() {
      state.isMenuActive = true;
      dirty();
      update(errorState.innerError);
    }

    function onFocus() {
      state.focused = true;
      emit('focus');
    }

    function onBlur() {
      state.focused = false;
      emit('blur');
    }

    function onInput(e) {
      setUpdatedValue(e.target.value);
      emit('input', state.selected);
    }

    function onClear() {
      setUpdatedValue('');
      requestAnimationFrame(validateValue);
    }

    function selectItem(it) {
      state.selected = it;
      emit('select', it);
      emit('update:modelValue', it);
      emit('update:value', it);
    }

    function setUpdatedValue(value) {
      if (props.valueKey && state.selected) {
        state.selected[props.valueKey] = value;
      } else {
        state.selected = value;
      }

      emit('update:modelValue', state.selected);
      emit('update:value', state.selected);
    }

    function genInput() {
      const color = props.dark ? 'white' : '';
      const propsData = {
        value: computedInputValue.value,
        disabled: props.disabled,
        readonly: props.readonly && !props.typeable,
        ref: inputTemplateRef,
        class: {
          'v-autocomplete__input': true
        },
        onClick,
        onInput,
        onFocus,
        onBlur
      };
      return h('input', setTextColor(color, propsData));
    }

    function genAutocompleteList() {
      const propsData = {
        items: props.items,
        valueKey: props.valueKey,
        idKey: props.idKey,
        active: state.isMenuActive,
        color: props.dark ? 'white' : '',
        listColor: props.listColor,
        onSelect: it => selectItem(it)
      };
      return withDirectives(h(VAutocompleteList, propsData), [[clickOutside, directive.value]]);
    }

    function genAutocomplete() {
      return h('div', {
        class: classes.value
      }, [genInput(), props.items && genAutocompleteList()]);
    }

    onBeforeUnmount(() => {
      if (fields !== null && fields !== void 0 && fields.value) {
        fields.value = fields.value.filter(v => v !== validateValue);
      }
    });
    return () => {
      const propsData = {
        label: props.label,
        focused: state.focused || state.isMenuActive,
        hasState: !!computedInputValue.value,
        hasError: errorState.innerError,
        dark: !!props.dark,
        color: validationState.value,
        disabled: !!props.disabled,
        isDirty: !!errorState.isDirty,
        message: errorState.innerErrorMessage,
        onClear
      };
      return h(VInput, propsData, {
        select: () => genAutocomplete()
      });
    };
  }

});
//# sourceMappingURL=VAutocomplete.js.map