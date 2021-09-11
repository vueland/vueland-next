import "../../../src/components/VProgressCircular/VProgressCircular.scss";
import { h, computed, defineComponent } from 'vue';
import { colorProps, useColors } from '../../effects/use-colors';
import { convertToUnit } from '../../helpers';
export const VProgressCircular = defineComponent({
  name: 'v-progress-circular',
  props: {
    indeterminate: Boolean,
    size: {
      type: [Number, String],
      default: 32
    },
    width: {
      type: [Number, String],
      default: 4
    },
    value: {
      type: [Number, String],
      default: 0
    },
    rotate: {
      type: [Number, String],
      default: 0
    },
    ...colorProps()
  },

  setup(props, {
    slots
  }) {
    const radius = 20;
    const {
      setTextColor
    } = useColors();
    const normalizedValue = computed(() => {
      if (props.value < 0) return 0;
      if (props.value > 100) return 100;
      return parseFloat(props.value);
    });
    const classes = computed(() => {
      return {
        'v-progress-circular': true,
        'v-progress-circular--indeterminate': props.indeterminate
      };
    });
    const circumference = computed(() => {
      return 2 * Math.PI * radius;
    });
    const strokeDashArray = computed(() => {
      return Math.round(circumference.value * 1000) / 1000;
    });
    const strokeDashOffset = computed(() => {
      return (100 - normalizedValue.value) / 100 * circumference.value + 'px';
    });
    const viewBoxSize = computed(() => {
      return radius / (1 - Number(props.width) / +props.size);
    });
    const strokeWidth = computed(() => {
      return Number(props.width) / +props.size * viewBoxSize.value * 2;
    });
    const styles = computed(() => {
      return {
        width: convertToUnit(props.size),
        height: convertToUnit(props.size)
      };
    });
    const svgStyle = computed(() => {
      return {
        transform: `rotate(${+props.rotate}deg)`
      };
    });

    function genCircle(name, offset) {
      return h('circle', {
        class: `v-progress-circular__${name}`,
        fill: 'transparent',
        cx: 2 * viewBoxSize.value,
        cy: 2 * viewBoxSize.value,
        r: radius,
        'stroke-width': strokeWidth.value,
        'stroke-dasharray': strokeDashArray.value,
        'stroke-dashoffset': offset
      });
    }

    function genSvg() {
      const children = [props.indeterminate || genCircle('underlay', 0), genCircle('overlay', strokeDashOffset.value)];
      const propsData = {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: `${viewBoxSize.value} ${viewBoxSize.value} ${2 * viewBoxSize.value} ${2 * viewBoxSize.value}`,
        style: svgStyle.value
      };
      return h('svg', propsData, children);
    }

    function genInfo() {
      const propsData = {
        class: 'v-progress-circular__info'
      };
      return h('div', propsData, slots.default && slots.default());
    }

    return () => {
      const propsData = setTextColor(props.color, {
        class: classes.value,
        style: styles.value
      });
      return h('div', propsData, [genSvg(), genInfo()]);
    };
  }

});
//# sourceMappingURL=VProgressCircular.js.map