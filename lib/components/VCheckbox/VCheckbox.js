import "../../../src/components/VCheckbox/VCheckbox.scss";
import { h, ref, watch, computed, defineComponent, inject } from 'vue';
import { useValidate } from '../../effects/use-validate';
import { useIcons } from '../../effects/use-icons';
import { VIcon } from '../VIcon';
import { VLabel } from '../VLabel';
import { warning } from '../../helpers';
export const VCheckbox = defineComponent({
  name: 'v-checkbox',
  props: {
    onIcon: {
      type: String
    },
    offIcon: {
      type: String
    },
    dark: Boolean,
    label: String,
    disabled: Boolean,
    validate: Boolean,
    modelValue: [Array, Boolean],
    value: {
      default: null
    },
    color: {
      type: String,
      default: 'primary'
    }
  },
  emits: ['checked', 'update:modelValue'],

  setup(props, {
    emit
  }) {
    const isChecked = ref(false);
    const fields = props.validate && inject('fields');
    const {
      validate,
      validationState
    } = useValidate(props);
    const {
      icons,
      iconSize
    } = useIcons('l');
    const isArray = computed(() => Array.isArray(props.modelValue));
    const isValueSet = computed(() => props.value !== null);
    const classes = computed(() => ({
      'v-checkbox': true,
      'v-checkbox--disabled': props.disabled,
      'v-checkbox--checked': isChecked.value,
      'v-validatable': props.validate
    }));
    watch(() => props.modelValue, () => {
      if (isArray.value) {
        if (isValueSet.value) {
          isChecked.value = props.modelValue.includes(props.value);
        } else {
          warning('v-checkbox: set the "value" prop');
        }
      } else {
        isChecked.value = !!props.modelValue;
      }
    }, {
      immediate: true
    });

    if (fields !== null && fields !== void 0 && fields.value) {
      fields.value.push(validateValue);
    }

    function validateValue() {
      return validate(isChecked.value);
    }

    function genLabel() {
      const propsData = {
        absolute: false,
        color: props.dark ? 'white' : '',
        disabled: props.disabled,
        class: 'v-checkbox__label'
      };
      return h(VLabel, propsData, {
        default: () => props.label
      });
    }

    function genIcon() {
      const onIcon = props.onIcon || icons.$checkOn;
      const offIcon = props.offIcon || icons.$checkOff;
      const icon = isChecked.value ? onIcon : offIcon;
      const propsData = {
        icon,
        size: iconSize,
        color: validationState.value,
        disabled: props.disabled
      };
      return h(VIcon, propsData);
    }

    function genCheckbox() {
      const propsData = {
        class: 'v-checkbox__square'
      };
      return h('div', propsData, genIcon());
    }

    function computeValue() {
      if (isArray.value) {
        let modelValue = [...props.modelValue];
        isChecked.value = !modelValue.includes(props.value);

        if (!isChecked.value) {
          modelValue = modelValue.filter(it => it !== props.value);
        } else {
          modelValue.push(props.value);
        }

        return modelValue;
      }

      return isChecked.value = !isChecked.value;
    }

    function onClick() {
      if (props.disabled) return;
      const value = computeValue();
      props.validate && validateValue();
      emit('update:modelValue', value);
      emit('checked', value);
    }

    return () => {
      const dataProps = {
        class: classes.value,
        onClick
      };
      return h('div', dataProps, [genCheckbox(), props.label && genLabel()]);
    };
  }

});
//# sourceMappingURL=VCheckbox.js.map