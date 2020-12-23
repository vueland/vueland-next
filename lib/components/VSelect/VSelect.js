import "../../../src/components/VSelect/VSelect.scss";
import { h, reactive, computed, defineComponent, withDirectives, watch, inject, onBeforeUnmount } from 'vue';
import { validateProps, useValidate } from '../../effects/use-validate';
import { colorProps, useColors } from '../../effects/use-colors';
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
    modelValue: [Array, String, Object],
    ...validateProps(),
    ...colorProps()
  },

  setup(props, {
    emit,
    attrs
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
      validate,
      dirty,
      update,
      errorState,
      validateClasses,
      validationState
    } = useValidate(props);
    const fields = inject('fields');

    const validateValue = () => {
      var _props$rules;

      return ((_props$rules = props.rules) === null || _props$rules === void 0 ? void 0 : _props$rules.length) && validate(state.selected || props.modelValue);
    };

    const directive = computed(() => {
      return state.focused ? {
        handler: onBlur,
        closeConditional: true
      } : undefined;
    });
    const classes = computed(() => ({
      'v-select': true,
      'v-select--disabled': props.disabled,
      'v-select--focused': state.focused,
      ...validateClasses.value
    }));
    watch(() => props.modelValue, value => state.selected = value, {
      immediate: true
    });

    if ((fields === null || fields === void 0 ? void 0 : fields.value) && ((_props$rules2 = props.rules) === null || _props$rules2 === void 0 ? void 0 : _props$rules2.length)) {
      fields.value.push(validateValue);
    }

    function toggleState() {
      state.focused = !state.focused;
      state.isMenuActive = !state.isMenuActive;
    }

    function onBlur() {
      requestAnimationFrame(validateValue);
      setTimeout(toggleState, 50);
      emit('blur');
    }

    function onClick() {
      dirty();
      update(errorState.innerError);
      toggleState();
      emit('focus');
    }

    function selectItem(it) {
      state.selected = it;
      emit('select', it);
      emit('update:modelValue', it);
    }

    function genInput() {
      const selectedValue = typeof state.selected === 'string' ? state.selected : state.selected[props.valueKey];
      const color = props.dark ? 'white' : '';
      const propsData = {
        value: selectedValue,
        disabled: props.disabled,
        readonly: props.readonly,
        class: {
          'v-select__input': true
        },
        ...attrs,
        onClick
      };
      return h('input', setTextColor(color, propsData));
    }

    function genSelectList() {
      const propsData = {
        items: props.items,
        valueKey: props.valueKey,
        idKey: props.idKey,
        active: state.isMenuActive,
        color: props.dark ? 'white' : '',
        listColor: props.listColor,
        onSelect: it => selectItem(it)
      };
      return h(VSelectList, propsData);
    }

    function genSelect() {
      const selectVNode = h('div', {
        class: classes.value
      }, [genInput(), genSelectList()]);
      return withDirectives(selectVNode, [[clickOutside, directive.value]]);
    }

    onBeforeUnmount(() => {
      if (fields.value) {
        fields.value = fields.value.filter(v => v !== validateValue);
      }
    });
    return () => {
      const propsData = {
        label: props.label,
        focused: state.focused,
        hasState: !!state.selected,
        hasError: errorState.innerError,
        dark: !!props.dark,
        color: validationState.value,
        disabled: !!props.disabled,
        isDirty: !!errorState.isDirty,
        message: errorState.innerErrorMessage
      };
      return h(VInput, propsData, {
        select: () => {
          var _props$items;

          return ((_props$items = props.items) === null || _props$items === void 0 ? void 0 : _props$items.length) ? genSelect() : null;
        }
      });
    };
  }

});
//# sourceMappingURL=VSelect.js.map