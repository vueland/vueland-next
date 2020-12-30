import "../../../src/components/VModal/VModal.scss";
import { h, ref, watch, withDirectives, defineComponent, vShow, onMounted } from 'vue';
import { overlayProps, useOverlay } from '../../effects/use-overlay';
import { transitionProps, useTransition } from '../../effects/use-transition';
import { useToggle } from '../../effects/use-toggle';
export const VModal = defineComponent({
  name: 'v-modal',
  props: {
    modelValue: Boolean,
    ...overlayProps(),
    ...transitionProps()
  },

  setup(props, {
    slots,
    emit
  }) {
    const {
      isActive
    } = useToggle(props);
    const modalRef = ref(null);
    onMounted(() => {
      if (props.overlay) {
        const {
          createOverlay,
          removeOverlay
        } = useOverlay(props, modalRef.value);
        isActive.value && createOverlay();
        watch(() => isActive.value, to => {
          to && createOverlay();
          !to && removeOverlay();
        });
      }
    });

    function genContent() {
      const propsData = {
        class: 'v-modal__content'
      };
      return h('div', propsData, slots.default && slots.default());
    }

    function genModal() {
      const propsData = {
        class: 'v-modal',
        ref: modalRef,
        ['onUpdate:modelValue']: val => emit('update:modelValue', val)
      };
      return withDirectives(h('div', propsData, genContent()), [[vShow, isActive.value]]);
    }

    return () => useTransition(genModal(), props.transition);
  }

});
//# sourceMappingURL=VModal.js.map