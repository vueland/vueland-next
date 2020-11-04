import "../../../src/components/VModal/VModal.scss";
import { defineComponent, h, watch, withDirectives, vShow } from 'vue';
import { overlayProps, useOverlay } from '../../effects/use-overlay';
import { transitionProps, useTransition } from '../../effects/use-transition';
import { toggleProps, useToggle } from '@/effects/use-toggle';
const vModalProps = {
  width: {
    type: [String, Number],
    default: 400
  },
  show: Boolean,
  ...overlayProps(),
  ...transitionProps(),
  ...toggleProps()
};
export const VModal = defineComponent({
  name: 'v-modal',
  props: vModalProps,

  setup(props, {
    slots,
    emit
  }) {
    const {
      isActive
    } = useToggle(props);

    if (props.overlay) {
      const overlay = useOverlay(props, 'v-modal');
      watch(() => isActive.value, to => {
        to && overlay.createOverlay();
        !to && overlay.removeOverlay();
      });
    }

    const genContent = () => h('div', {
      class: {
        'v-modal__content': true
      }
    }, slots.default && slots.default());

    const genModal = () => h('div', {
      class: {
        'v-modal': true
      },
      'onUpdate:modelValue': val => emit('update:modelValue', val)
    }, [content]);

    const content = genContent();
    let modal = genModal();

    if (!!props.transition) {
      const transitionedModal = useTransition(props, modal);
      modal = transitionedModal();
    }

    return () => withDirectives(h(modal), [[vShow, isActive.value]]);
  }

});
//# sourceMappingURL=VModal.js.map