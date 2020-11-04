import "../../../src/components/VLabel/VLabel.scss";
import { defineComponent, h, computed } from 'vue';
import { convertToUnit } from '../../helpers';
import { colorProps, useColors } from '../../effects/use-colors';
const labelProps = {
  absolute: Boolean,
  disabled: Boolean,
  focused: Boolean,
  for: String,
  left: {
    type: [Number, String],
    default: 0
  },
  right: {
    type: [Number, String],
    default: 'auto'
  },
  hasState: Boolean,
  ...colorProps()
};
export const VLabel = defineComponent({
  name: 'v-label',
  props: labelProps,

  setup(props, {
    slots
  }) {
    const {
      setTextColor
    } = useColors();
    const classes = computed(() => {
      return {
        'v-label': true,
        'v-label--active': !!props.hasState || !!props.focused,
        'v-label--is-disabled': !!props.disabled
      };
    });

    const genDataProps = () => {
      return {
        class: { ...classes.value
        },
        style: {
          left: convertToUnit(props.left),
          right: convertToUnit(props.right),
          position: props.absolute ? 'absolute' : 'relative'
        }
      };
    };

    return h('label', setTextColor(props.color, genDataProps()), slots.default && slots.default());
  }

});
//# sourceMappingURL=VLabel.js.map