import "../../../src/components/VIcon/VIcon.scss";
import { defineComponent, h, computed } from 'vue';
import { useColors, colorProps } from '../../effects/use-colors';
import { sizeProps } from '../../effects/use-sizes';
import { convertToUnit } from '../../helpers';
import { Sizes } from '../../services/sizes';
export const VIcon = defineComponent({
  name: 'v-icon',
  emits: ['click'],
  props: {
    disabled: Boolean,
    active: Boolean,
    clickable: Boolean,
    size: [String, Number],
    dense: Boolean,
    icon: String,
    iconType: String,
    tag: {
      type: String,
      default: 'i'
    },
    ...colorProps(),
    ...sizeProps()
  },

  setup(props, {
    slots,
    emit
  }) {
    const {
      setTextColor
    } = useColors();
    const iconTag = props.clickable ? 'button' : props.tag;
    const icon = computed(() => {
      return props.icon || slots.default && slots.default()[0].children;
    });
    const classes = computed(() => ({
      'v-icon': true,
      'v-icon--disabled': props.disabled,
      'v-icon--link': props.clickable,
      'v-icon--dense': props.dense,
      'v-icon--clickable': props.clickable,
      [props.iconType]: !!props.iconType,
      [icon.value]: !!icon.value
    }));
    const isMedium = computed(() => {
      return !props.large && !props.small && !props.xLarge && !props.xSmall && !props.size;
    });

    function getSizes() {
      const sizeProps = {
        large: props.large,
        small: props.small,
        xLarge: props.xLarge,
        xSmall: props.xSmall,
        medium: isMedium.value
      };
      const explicitSize = Object.keys(sizeProps).find(key => sizeProps[key]);
      return explicitSize && Sizes[explicitSize] || convertToUnit(props.size);
    }

    function onClick() {
      if (!props.disabled && props.clickable) {
        emit('click');
      }
    }

    function genDataProps() {
      return {
        class: classes.value,
        style: {
          fontSize: getSizes()
        },
        onClick
      };
    }

    return () => h(iconTag, setTextColor(props.color, genDataProps()));
  }

});
//# sourceMappingURL=VIcon.js.map