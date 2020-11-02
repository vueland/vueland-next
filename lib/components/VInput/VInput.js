import "../../../src/components/VInput/VInput.scss";
import { defineComponent, h, computed } from 'vue';
import { VField } from '../VField';
import { VLabel } from '../VLabel';
import { validateProps, useValidate } from '../../effects/use-validate';
const inputProps = {
  label: String,
  height: [String, Number],
  type: {
    type: String,
    default: 'text'
  },
  placeholder: String,
  disabled: Boolean,
  required: {
    type: Boolean,
    default: false
  },
  valid: {
    type: Boolean
  },
  ...validateProps()
};
export const VInput = defineComponent({
  name: 'v-input',
  props: inputProps,

  setup(props, ctx) {
    const {
      validate,
      focused,
      validState
    } = useValidate(props);
    const classes = computed(() => {
      return {
        'v-input': true
      };
    });
    const computedColor = computed(() => {
      if (validState.innerError) return 'red darken-1';
      return 'blue darken-2';
    });

    const focusHandler = () => {
      focused();
      ctx.emit('focus');
    };

    const blurHandler = () => {
      ctx.emit('blur');
    };

    const inputHandler = e => {
      props.required && validate(e.target.value);
      ctx.emit('input', e.target.value);
      ctx.emit('update:modelValue', e.target.value);
    };

    const genLabel = () => {
      VLabel.props = {
        absolute: true,
        color: computedColor.value
      };
      return h(VLabel.setup(props, ctx), VLabel.props, props.label);
    };

    const genField = () => {
      const fieldProps = {
        type: props.type,
        disabled: props.disabled,
        required: props.required,
        placeholder: props.placeholder,
        isDirty: validState.isDirty
      };
      return h(VField.setup(fieldProps, ctx), {
        onFocus: focusHandler,
        onBlur: blurHandler,
        onInput: inputHandler
      });
    };

    const genDataProps = () => {
      return {
        class: { ...classes.value
        }
      };
    };

    const genInput = () => {
      return h('div', genDataProps(), [genLabel(), genField()]);
    };

    return () => genInput();
  }

});
//# sourceMappingURL=VInput.js.map