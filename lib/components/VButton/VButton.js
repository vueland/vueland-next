import "../../../src/components/VButton/VButton.scss";
import { defineComponent, h, computed } from 'vue';
import { useColors } from '../../effects/use-colors';
import { elevationProps, useElevation } from '../../effects/use-elevation';
import { usePosition } from '../../effects/use-position';
import { VProgressCircular } from '../VProgressCircular';
import { convertToUnit } from '../../helpers';
export const VButton = defineComponent({
  name: 'v-button',
  props: {
    disabled: Boolean,
    outlined: Boolean,
    rounded: Boolean,
    round: Boolean,
    absolute: Boolean,
    loading: Boolean,
    left: Boolean,
    right: Boolean,
    text: Boolean,
    dark: Boolean,
    label: String,
    width: [String, Number],
    color: {
      type: String,
      default: 'grey lighten-1'
    },
    ...elevationProps()
  },
  emits: ['click'],

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
    const isLoadable = computed(() => {
      return !props.text && !props.outlined && props.loading;
    });
    const isElevetable = computed(() => {
      return !isLoadable.value && !props.disabled;
    });
    const classes = computed(() => {
      const elevations = isElevetable.value ? elevationClasses.value : {};
      return {
        'v-button': true,
        'v-button--text': props.text || props.outlined,
        'v-button--outlined': props.outlined,
        'v-button--rounded': !props.round && props.rounded,
        'v-button--round': props.round,
        'v-button--disabled': props.disabled || isLoadable.value,
        'v-button--loading': props.loading,
        ...elevations,
        ...positionClasses.value
      };
    });

    function genLoader() {
      return h('span', {
        class: 'v-button__loader'
      }, slots.loading && slots.loading() || h(VProgressCircular, {
        indeterminate: true,
        size: 23,
        width: 2
      }));
    }

    function genLabel() {
      const propsData = {
        class: 'v-button__label'
      };
      return h('span', propsData, props.label);
    }

    function genContent() {
      return h('div', {
        class: 'v-button__content'
      }, [props.label && genLabel(), slots.default && slots.default()]);
    }

    return () => {
      const setColor = isFlat.value ? setTextColor : setBackground;
      const width = props.width || 40;
      const propsData = {
        class: classes.value,
        style: {
          width: (props.width || props.round) && convertToUnit(width),
          height: props.round && convertToUnit(width)
        },
        onClick: () => !props.disabled && emit('click')
      };
      return h('button', props.color && !isLoadable.value && !props.disabled ? setColor(props.color, propsData) : propsData, [genContent(), props.loading && genLoader()]);
    };
  }

});
//# sourceMappingURL=VButton.js.map