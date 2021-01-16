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
    var _props$rules;

    const state = reactive({
      focused: false,
      isMenuActive: false,
      search: ''
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
    const computedValue = computed(() => {
      return props.modelValue || props.value;
    });
    const inputValue = computed(() => {
      return props.valueKey ? computedValue.value[props.valueKey] : computedValue.value;
    });
    const isListItemsExists = computed(() => {
      return !!props.items && !!props.items.length;
    });
    state.search = computedValue.value ? inputValue.value : '';
    watch(() => isListItemsExists.value, to => {
      if (to && !state.isMenuActive && state.focused) {
        state.isMenuActive = true;
      }
    });

    if (fields !== null && fields !== void 0 && fields.value && (_props$rules = props.rules) !== null && _props$rules !== void 0 && _props$rules.length) {
      fields.value.push(validateValue);
    }

    function validateValue() {
      var _props$rules2;

      return ((_props$rules2 = props.rules) === null || _props$rules2 === void 0 ? void 0 : _props$rules2.length) && validate(state.search);
    }

    function clickOutsideHandler() {
      state.focused = false;
      state.isMenuActive = false;
    }

    function onFocus() {
      state.focused = true;
      state.isMenuActive = isListItemsExists.value;
      dirty();
      update(errorState.innerError);
      emit('focus');
    }

    function onBlur() {
      if (!computedValue.value) {
        state.search = '';
      }

      if (!state.search && computedValue.value) {
        setTimeout(() => {
          state.search = inputValue.value;
          validateValue();
        });
      }

      state.focused = false;
      emit('blur');
    }

    function onInput(e) {
      state.search = e.target.value;
      emit('input', e.target.value);
    }

    function onClear() {
      state.search = '';
      requestAnimationFrame(validateValue);
    }

    function selectItem(it) {
      if (props.valueKey) {
        state.search = it[props.valueKey];
      }

      emit('select', it);
      emit('update:modelValue', it);
      emit('update:value', it);
      requestAnimationFrame(validateValue);
    }

    function genInput() {
      const color = props.dark ? 'white' : '';
      const propsData = {
        value: state.search,
        disabled: props.disabled,
        readonly: props.readonly && !props.typeable,
        ref: inputTemplateRef,
        class: {
          'v-autocomplete__input': true
        },
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
        hasState: !!state.search,
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