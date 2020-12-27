import "../../../src/components/VButton/VButton.scss";
import { defineComponent, h, computed } from 'vue';
import { colorProps, useColors } from '../../effects/use-colors';
import { elevationProps, useElevation } from '../../effects/use-elevation';
import { positionProps, usePosition } from '../../effects/use-position';
export const VButton = defineComponent({
  name: 'v-button',
  emits: ['click'],
  props: {
    disabled: Boolean,
    outlined: Boolean,
    absolute: Boolean,
    left: Boolean,
    right: Boolean,
    text: Boolean,
    label: String,
    ...colorProps(),
    ...elevationProps(),
    ...positionProps()
  },

  setup(props, {
    slots,
    emit
  }) {
    const {
      setTextColor,
      setBackground
    } = useColors();
    const {
      elevationClasses
    } = useElevation(props);
    const {
      positionClasses
    } = usePosition(props);
    const isFlat = computed(() => {
      return props.text || props.outlined;
    });
    const classes = computed(() => ({
      'v-button': true,
      'v-button--disabled': props.disabled,
      'v-button--text': props.text || props.outlined,
      'v-button--outlined': props.outlined,
      ...elevationClasses.value,
      ...positionClasses.value
    }));

    function genLabel() {
      const propsData = {
        class: {
          'v-button__label': true
        }
      };
      return h('span', propsData, props.label);
    }

    return () => {
      const setColor = isFlat.value ? setTextColor : setBackground;
      const content = [];
      const propsData = {
        class: classes.value,
        onClick: () => !props.disabled && emit('click')
      };
      props.label && content.push(genLabel());
      slots.default && content.push(slots.default());
      return h('button', props.color && !props.disabled ? setColor(props.color, propsData) : propsData, content);
    };
  }

});
//# sourceMappingURL=VButton.js.map