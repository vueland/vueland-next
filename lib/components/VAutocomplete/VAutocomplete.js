import "../../../src/components/VAutocomplete/VAutocomplete.scss";
import { h, ref, reactive, computed, defineComponent, onBeforeMount } from 'vue';
import { validateProps } from '../../effects/use-validate';
import { useColors } from '../../effects/use-colors';
import { useTheme } from '../../effects/use-theme';
import { VInput } from '../VInput';
import { VSelectList } from '../VSelect';
import { VMenu } from '../VMenu';
import { VProgressLinear } from '../VProgressLinear';
import { getKeyValueFromTarget } from '../../helpers';
export const VAutocomplete = defineComponent({
  name: 'v-autocomplete',
  props: {
    label: String,
    items: Array,
    dark: Boolean,
    valueKey: String,
    idKey: String,
    listColor: String,
    disabled: Boolean,
    typeable: Boolean,
    loading: Boolean,
    modelValue: {
      default: null
    },
    color: {
      type: String,
      default: 'primary'
    },
    ...validateProps()
  },
  emits: ['input', 'blur', 'focus', 'select', 'update:modelValue', 'update:value'],

  setup(props, {
    emit
  }) {
    const state = reactive({
      focused: false,
      isMenuActive: false,
      search: '',
      select: null
    });
    const {
      setTextColor
    } = useColors();
    const {
      base
    } = useTheme();
    const inputRef = ref(null);
    const classes = computed(() => ({
      'v-autocomplete': true,
      'v-autocomplete--disabled': props.disabled,
      'v-autocomplete--focused': state.focused
    }));
    const valueProperty = computed(() => {
      return props.modelValue || props.value;
    });
    const inputValue = computed(() => {
      return props.valueKey && valueProperty.value ? getKeyValueFromTarget(props.valueKey, valueProperty.value) : valueProperty.value;
    });

    function onFocus() {
      state.focused = true;
      state.isMenuActive = true;
      emit('focus');
    }

    function onBlur() {
      if (!valueProperty.value && !state.search) state.search = '';
      if (!state.search && valueProperty.value) state.search = inputValue.value;
      state.focused = false;
      emit('blur');
    }

    function onInput(e) {
      state.search = e.target.value;
      emit('input', e.target.value);
    }

    function onClear() {
      state.search = '';
      state.select = null;
      emit('select', null);
      emit('update:modelValue', null);
      emit('update:value', null);
    }

    function onSelect(it) {
      state.search = props.valueKey ? getKeyValueFromTarget(props.valueKey, it) : it;
      state.select = it;
      emit('select', it);
      emit('update:modelValue', it);
      emit('update:value', it);
    }

    function genInput() {
      const propsData = {
        value: state.search,
        disabled: props.disabled,
        readonly: props.readonly && !props.typeable,
        ref: inputRef,
        class: 'v-autocomplete__input',
        onInput,
        onFocus,
        onBlur
      };
      return h('input', setTextColor(props.dark ? 'white' : base, propsData));
    }

    function genAutocompleteList() {
      const propsData = {
        items: props.items,
        valueKey: props.valueKey,
        idKey: props.idKey,
        active: state.isMenuActive,
        color: props.dark ? 'white' : props.color,
        listColor: props.listColor,
        select: state.select,
        onSelect
      };
      return h(VSelectList, propsData);
    }

    function genMenu() {
      return h(VMenu, {
        activator: inputRef,
        openOnClick: true,
        maxHeight: 240,
        bottom: true,
        onClose: () => state.isMenuActive = state.focused
      }, {
        default: genAutocompleteList
      });
    }

    function genLinearProgress() {
      return h('div', {
        class: {
          'v-autocomplete__loading': true
        }
      }, h(VProgressLinear, {
        height: 2,
        indeterminate: true,
        color: props.color,
        backgroundColor: props.color
      }));
    }

    function genAutocomplete() {
      return h('div', {
        class: classes.value
      }, [genInput(), props.loading && genLinearProgress(), genMenu()]);
    }

    onBeforeMount(() => {
      state.select = valueProperty.value;
      state.search = inputValue.value;
    });
    return () => {
      const propsData = {
        label: props.label,
        focused: state.isMenuActive,
        hasState: !!state.search,
        dark: props.dark,
        disabled: props.disabled,
        clearable: props.clearable,
        color: props.color,
        rules: props.rules,
        value: valueProperty.value || state.search,
        onClear
      };
      return h(VInput, propsData, {
        textField: () => genAutocomplete()
      });
    };
  }

});
//# sourceMappingURL=VAutocomplete.js.map