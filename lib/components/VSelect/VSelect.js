import "../../../src/components/VSelect/VSelect.scss";
import { h, ref, reactive, computed, defineComponent, watch } from 'vue';
import { colorProps, useColors } from '../../effects/use-colors';
import { useTheme } from '../../effects/use-theme';
import { activatorProps } from '../../effects/use-activator';
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
    value: {
      default: null
    },
    modelValue: {
      default: null
    },
    ...colorProps(),
    ...activatorProps()
  },
  emits: ['input', 'blur', 'focus', 'select', 'update:modelValue', 'update:value'],

  setup(props, {
    emit,
    attrs
  }) {
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
    const inputRef = ref(null);
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
    watch(() => computedValue.value, to => state.selected = to, {
      immediate: true
    });

    function toggleState() {
      state.focused = !state.focused;
    }

    function onBlur() {
      setTimeout(() => {
        toggleState();
        emit('blur');
      });
    }

    function onClick() {
      toggleState();
      emit('focus');
    }

    function onClear() {
      state.selected = '';
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
        ref: inputRef,
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
        activator: inputRef,
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

    return () => {
      const propsData = {
        label: props.label,
        focused: state.focused,
        hasState: !!computedInputValue.value,
        dark: props.dark,
        disabled: props.disabled,
        clearable: props.clearable,
        rules: props.rules,
        value: computedInputValue.value,
        color: props.color,
        onClear,
        ...attrs
      };
      return h(VInput, propsData, {
        textField: () => genSelect()
      });
    };
  }

});
//# sourceMappingURL=VSelect.js.map