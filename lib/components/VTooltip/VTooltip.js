import "../../../src/components/VTooltip/VTooltip.scss";
import { h, ref, reactive, watch, computed, withDirectives, defineComponent, onMounted, vShow } from 'vue';
import { useToggle } from '../../effects/use-toggle';
import { useColors } from '../../effects/use-colors';
import { useActivator } from '../../effects/use-activator';
import { useTransition } from '../../effects/use-transition';
import { elevationProps, useElevation } from '../../effects/use-elevation';
import { positionProps } from '../../effects/use-position';
import { convertToUnit } from '../../helpers';
export const VTooltip = defineComponent({
  name: 'v-tooltip',
  props: {
    openOnHover: {
      type: Boolean,
      default: true
    },
    color: {
      type: String,
      default: 'grey lighten-1'
    },
    zIndex: [Number, String],
    maxWidth: [Number, String],
    minWidth: [Number, String],
    modelValue: Boolean,
    ...elevationProps(),
    ...positionProps()
  },

  setup(props, {
    slots
  }) {
    const tooltip = reactive({});
    const activator = reactive({});
    const tooltipRef = ref(null);
    const {
      isActive
    } = useToggle(props);
    const {
      elevationClasses
    } = useElevation(props);
    const {
      setBackground
    } = useColors();
    const {
      activatorRef,
      getActivatorSizes,
      genActivatorListeners
    } = useActivator();
    const listeners = genActivatorListeners(props, isActive);
    const classes = computed(() => ({
      'v-tooltip': true,
      'v-tooltip--top': props.top,
      'v-tooltip--right': props.right,
      'v-tooltip--left': props.left,
      'v-tooltip--bottom': props.bottom
    }));
    const contentClasses = computed(() => ({
      'v-tooltip__content': true,
      ...elevationClasses.value
    }));
    const computeTopPosition = computed(() => {
      return (props.top ? activator.top - tooltip.height : props.bottom ? activator.top + activator.height : activator.top + (activator.height - tooltip.height) / 2) + +props.offsetY;
    });
    const computeLeftPosition = computed(() => {
      return (props.left ? activator.left - tooltip.width : props.right ? activator.left + activator.width : activator.left + (activator.width - tooltip.width) / 2) + +props.offsetX;
    });
    const styles = computed(() => ({
      top: tooltip.top ? convertToUnit(tooltip.top) : '',
      left: tooltip.top ? convertToUnit(tooltip.left) : '',
      maxWidth: !!props.maxWidth ? `${props.maxWidth}px` : '',
      minWidth: !!props.minWidth ? `${props.minWidth}px` : '',
      zIndex: props.zIndex
    }));

    function genActivator() {
      const slotContent = slots.activator && slots.activator({
        on: listeners
      });
      return h(slotContent[0], {
        ref: activatorRef
      });
    }

    function genContent() {
      const propsData = {
        class: contentClasses.value,
        style: styles.value,
        ref: tooltipRef
      };
      return withDirectives(h('span', setBackground(props.color, propsData), slots.default && slots.default()), [[vShow, isActive.value]]);
    }

    function setTooltipPosition() {
      if (tooltipRef.value) {
        tooltip.width = tooltipRef.value.offsetWidth;
        tooltip.height = tooltipRef.value.offsetHeight;
        tooltip.top = computeTopPosition.value;
        tooltip.left = computeLeftPosition.value;
      }
    }

    onMounted(() => {
      watch(() => isActive.value, to => {
        if (to) {
          const {
            left,
            top,
            height,
            width
          } = getActivatorSizes();
          activator.left = left;
          activator.top = top;
          activator.height = height;
          activator.width = width;
          tooltip.top = 0;
          tooltip.left = 0;
          requestAnimationFrame(setTooltipPosition);
        }
      }, {
        immediate: true
      });
    });
    return () => {
      const content = useTransition(genContent(), isActive.value ? 'scale-in' : 'fade');
      return [h('div', {
        class: classes.value
      }), content, genActivator()];
    };
  }

});
//# sourceMappingURL=VTooltip.js.map