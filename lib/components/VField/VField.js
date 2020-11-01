import "../../../src/components/VField/VFIeld.scss";
import { defineComponent, reactive, computed, h } from 'vue';
export const VField = defineComponent({
  name: 'v-field',
  props: {
    value: {
      type: [Object, Array, Number, String]
    },
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
    }
  },

  setup(props) {
    const data = reactive({
      isDirty: false
    });
    const classes = computed(() => ({
      'v-field': true,
      'v-field--required': props.required,
      'v-field--dirty': data.isDirty,
      'v-field--valid': data.isDirty && props.required && !!props.valid,
      'v-field--not-valid': data.isDirty && props.required && !props.valid
    }));

    const focusHandler = () => {
      data.isDirty = true;
    };

    const blurHandler = () => {
      console.log('blur');
    };

    const genField = () => {
      return h('input', {
        type: props.type,
        placeholder: props.placeholder,
        class: { ...classes.value
        },
        onFocus: focusHandler,
        onBlur: blurHandler
      });
    };

    return () => h(genField());
  }

});
//# sourceMappingURL=VField.js.map