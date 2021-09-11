import "../../../src/components/VIcon/VIcon.scss";
import { defineComponent, h, inject, computed } from 'vue';
import { useColors, colorProps } from '../../effects/use-colors';
import { sizeProps } from '../../effects/use-sizes';
import { convertToUnit } from '../../helpers';
import { Sizes } from '../../services/sizes';
export const VIcon = defineComponent({
  name: 'v-icon',
  props: {
    disabled: Boolean,
    active: Boolean,
    clickable: Boolean,
    size: [String, Number],
    icon: String,
    tag: {
      type: String,
      default: 'i'
    },
    ...colorProps(),
    ...sizeProps()
  },
  emits: ['click'],

  setup(props, {
    slots,
    emit
  }) {
    const {
      setTextColor
    } = useColors();
    const iconTag = props.clickable ? 'button' : props.tag;
    const options = inject('$options');
    const icon = computed(() => {
      return props.icon || slots.default && slots.default()[0].children;
    });
    const classes = computed(() => ({
      'v-icon': true,
      'v-icon--disabled': props.disabled,
      'v-icon--link': props.clickable,
      'v-icon--clickable': props.clickable,
      [options === null || options === void 0 ? void 0 : options.icons]: !!(options !== null && options !== void 0 && options.icons),
      [icon.value]: !(options !== null && options !== void 0 && options.icons) && !!icon.value
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

    return () => {
      const propsData = {
        class: classes.value,
        style: {
          fontSize: getSizes()
        },
        onClick
      };
      return h(iconTag, setTextColor(props.color, propsData), options !== null && options !== void 0 && options.icons ? icon.value : '');
    };
  }

});
//# sourceMappingURL=VIcon.js.map