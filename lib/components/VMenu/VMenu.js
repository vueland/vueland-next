import "../../../src/components/VMenu/VMenu.scss";
import { h, defineComponent, withDirectives, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { autoPositionProps, useAutoPosition } from '../../effects/use-auto-position';
import { activatorProps, useActivator } from '../../effects/use-activator';
import { useDetach } from '../../effects/use-detach';
import { useTransition } from '../../effects/use-transition';
import { useElevation } from '../../effects/use-elevation';
import { useToggle } from '../../effects/use-toggle';
import { positionProps } from '../../effects/use-position';
import { convertToUnit } from '../../helpers';
import { clickOutside, resize } from '../../directives';
import { vShow } from 'vue';
export const VMenu = defineComponent({
  name: 'v-menu',
  props: {
    maxHeight: {
      type: [Number, String],
      default: 200
    },
    width: {
      type: [Number, String],
      default: 0
    },
    zIndex: {
      type: [String, Number],
      default: 10
    },
    parent: {
      type: Object,
      default: null
    },
    inputActivator: {
      type: String,
      default: null
    },
    openOnHover: Boolean,
    openOnClick: Boolean,
    openOnContextmenu: Boolean,
    closeOnContentClick: {
      type: Boolean,
      default: true
    },
    closeOnClick: {
      type: Boolean,
      default: true
    },
    elevation: {
      type: [Number, String],
      default: 10
    },
    modelValue: Boolean,
    ...positionProps(),
    ...autoPositionProps(),
    ...activatorProps()
  },
  emits: ['open', 'close'],

  setup(props, {
    emit,
    slots
  }) {
    const {
      elevationClasses
    } = useElevation(props);
    const {
      isActive
    } = useToggle(props);
    const {
      contentRef,
      setDimensions,
      dimensions
    } = useAutoPosition(props);
    const {
      setDetached,
      removeDetached
    } = useDetach();
    const {
      activatorRef,
      getActivator,
      genActivatorListeners,
      addActivatorEvents,
      removeActivatorEvents
    } = useActivator(props);
    const handlers = {
      click: e => {
        setDimensions(getActivator(e)).then(() => {
          requestAnimationFrame(() => isActive.value = true);
        });
      },
      mouseenter: () => isActive.value = true,
      mouseleave: () => isActive.value = false,
      contextmenu: () => isActive.value = true
    };
    const listeners = genActivatorListeners(props, handlers);
    const directive = computed(() => {
      return isActive.value ? {
        handler: () => isActive.value = false,
        closeConditional: props.closeOnContentClick
      } : undefined;
    });
    const calcWidth = computed(() => {
      return props.width || +dimensions.content.width;
    });
    watch(() => isActive.value, to => {
      to && emit('open');
      !to && emit('close');
    });
    watch(() => [props.positionY, props.positionX], () => setDimensions(activatorRef.value));
    watch(() => props.modelValue, to => {
      isActive.value = false;
      requestAnimationFrame(() => isActive.value = to);
    });

    function genActivatorSlot() {
      if (slots.activator) {
        const slotContent = slots.activator({
          on: listeners
        });

        if (typeof slotContent[0].type === 'object') {
          return h('div', {
            ref: activatorRef
          }, h(slotContent[0]));
        }

        return h(slotContent[0], {
          ref: activatorRef
        });
      }

      return null;
    }

    function genContentSlot() {
      const propsData = {
        ref: contentRef,
        class: {
          'v-menu__content': true,
          ...elevationClasses.value
        },
        style: {
          maxHeight: convertToUnit(props.maxHeight),
          width: convertToUnit(calcWidth.value),
          top: convertToUnit(dimensions.content.top),
          left: convertToUnit(dimensions.content.left),
          zIndex: props.zIndex
        },
        onClick: () => {
          isActive.value = !props.closeOnContentClick;
        }
      };
      const content = h('div', propsData, [slots.default && slots.default()]);
      const directives = [[vShow, isActive.value], [resize, onResize]];
      if (props.closeOnClick) directives.push([clickOutside, directive.value]);
      return withDirectives(content, directives);
    }

    onMounted(() => {
      activatorRef.value = getActivator();
      addActivatorEvents();
      setDetached(contentRef.value);
    });
    onBeforeUnmount(() => {
      removeActivatorEvents();
      removeDetached(contentRef.value);
    });

    function onResize() {
      if (!isActive.value) return;
      requestAnimationFrame(() => setDimensions(activatorRef));
    }

    return () => [h('div', {
      class: {
        'v-menu': true
      }
    }), slots.activator && genActivatorSlot(), useTransition(genContentSlot(), 'fade')];
  }

});
//# sourceMappingURL=VMenu.js.map