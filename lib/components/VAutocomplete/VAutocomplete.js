import "../../../src/components/VAutocomplete/VAutocomplete.scss";
import { h, reactive, computed, defineComponent, withDirectives, watch, inject, onBeforeUnmount } from 'vue';
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
    var _props$rules3;

    const state = reactive({
      selected: null,
      input: '',
      focused: false,
      isMenuActive: false
    });
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
    const fields = props.rules && inject('fields');

    const validateValue = () => {
      var _props$rules;

      return ((_props$rules = props.rules) === null || _props$rules === void 0 ? void 0 : _props$rules.length) && validate(state.selected);
    };

    const directive = computed(() => {
      return state.focused ? {
        handler: onBlur,
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
      return state.input ? state.input : state.selected ? props.valueKey ? state.selected[props.valueKey] : state.selected : '';
    });
    const computedValue = computed(() => {
      return props.modelValue || props.value;
    });
    watch(() => computedValue.value, value => {
      var _props$rules2;

      state.selected = value;
      !state.focused && errorState.isDirty && ((_props$rules2 = props.rules) === null || _props$rules2 === void 0 ? void 0 : _props$rules2.length) && validateValue();
    }, {
      immediate: true
    });

    if (fields !== null && fields !== void 0 && fields.value && (_props$rules3 = props.rules) !== null && _props$rules3 !== void 0 && _props$rules3.length) {
      fields.value.push(validateValue);
    }

    function toggleState() {
      state.focused = !state.focused;
      state.isMenuActive = !state.isMenuActive;
    }

    function onBlur() {
      if (!state.selected) state.input = '';
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

    function onInput(e) {
      if (!state.isMenuActive && props.items.length) {
        state.isMenuActive = true;
      }

      state.input = e.target.value;
      emit('input', state.input);
    }

    function onClear() {
      state.input = '';
      state.selected = '';
      requestAnimationFrame(validateValue);
    }

    function selectItem(it) {
      state.input = '';
      state.selected = it;
      emit('select', it);
      emit('update:modelValue', it);
      emit('update:value', it);
    }

    function genInput() {
      const color = props.dark ? 'white' : '';
      const propsData = {
        value: computedInputValue.value,
        disabled: props.disabled,
        readonly: props.readonly && !props.typeable,
        class: {
          'v-autocomplete__input': true
        },
        onClick,
        onInput
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
      return h(VAutocompleteList, propsData);
    }

    function genAutocomplete() {
      const selectVNode = h('div', {
        class: classes.value
      }, [genInput(), props.items && genAutocompleteList()]);
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