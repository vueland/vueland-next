import "../../../src/components/VField/VField.scss";
import { defineComponent, computed, h, watch, ref } from 'vue';
const fieldProps = {
  value: [Number, String],
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  valid: {
    type: Boolean
  },
  isDirty: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
};
export const VField = defineComponent({
  name: 'v-field',
  props: fieldProps,

  setup(props, ctx) {
    const search = ref('');
    watch(() => props.value, to => {
      search.value = to;
    });
    const classes = computed(() => ({
      'v-field': true,
      'v-field--required': props.required,
      'v-field--disabled': props.disabled,
      'v-field--dirty': props.isDirty,
      'v-field--valid': props.isDirty && props.required && !!props.valid,
      'v-field--not-valid': props.isDirty && props.required && !props.valid
    }));

    const genField = () => {
      return h('input', {
        type: props.type,
        placeholder: props.placeholder,
        disabled: props.disabled,
        required: props.required,
        value: search.value,
        class: { ...classes.value
        },
        modelValue: search.value,
        'onUpdate:modelValue': val => ctx.emit('update:modelValue', val)
      });
    };

    return () => h(genField());
  }

});
//# sourceMappingURL=VField.js.map