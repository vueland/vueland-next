// Styles
import "../../../src/components/VButton/VButton.scss"; // Vue API

import { defineComponent, h, computed } from 'vue'; // Compositions

import { colorProps, useColors } from '../../effects/use-colors';
import { elevationProps, useElevation } from '../../effects/use-elevation';
import { positionProps, usePosition } from '../../effects/use-position';
const buttonProps = {
  disabled: {
    type: Boolean,
    default: false
  },
  outlined: {
    type: Boolean,
    default: false
  },
  absolute: {
    type: Boolean,
    default: false
  },
  left: {
    type: Boolean,
    default: false
  },
  right: {
    type: Boolean,
    default: false
  },
  text: {
    type: Boolean,
    default: false
  },
  label: {
    type: String,
    default: ''
  },
  ...colorProps(),
  ...elevationProps(),
  ...positionProps()
};
export const VButton = defineComponent({
  name: 'v-button',
  props: buttonProps,

  setup(props, {
    slots,
    emit
  }) {
    const {
      setTextColor,
      setBackground
    } = useColors(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      positionClasses
    } = usePosition(props);
    const isFlat = computed(() => {
      return props.text || props.outlined;
    });
    const classes = computed(() => {
      return {
        'v-button': true,
        'v-button--disabled': props.disabled,
        'v-button--text': props.text || props.outlined,
        'v-button--outlined': props.outlined,
        ...elevationClasses.value,
        ...positionClasses.value
      };
    });

    const propsObject = () => {
      return {
        class: { ...classes.value
        },
        onClick: () => emit('click')
      };
    };

    const setColor = isFlat.value ? setTextColor : setBackground;
    const data = props.color ? setColor(props.color, propsObject()) : propsObject();
    const content = [];
    const label = props.label && h('span', {
      class: {
        'v-button__label': true
      }
    }, props.label);
    const slot = slots.default && slots.default();
    label && content.push(label);
    slot && content.push(slot);
    return () => h('button', data, content);
  }

});
//# sourceMappingURL=VButton.js.map