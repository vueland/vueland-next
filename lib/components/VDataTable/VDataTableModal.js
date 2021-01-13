import { h, defineComponent } from 'vue';
import { VCard, VCardTitle, VCardActions, VCardContent } from '../VCard';
import { VModal } from '../VModal';
export const VDataTableModal = defineComponent({
  name: 'v-data-table-modal',
  props: {
    dark: Boolean,
    color: String,
    show: Boolean
  },

  setup(props, {
    slots
  }) {
    function genModalTitle() {
      return h(VCardTitle, {
        class: props.dark ? 'white--text' : ''
      }, {
        default: () => slots.title && slots.title()
      });
    }

    function genModalContent() {
      return h(VCardContent, {}, {
        default: () => slots.content && slots.content()
      });
    }

    function genModalActions() {
      return h(VCardActions, {}, {
        default: () => slots.actions && slots.actions()
      });
    }

    function genModal() {
      return h(VCard, {
        width: 400,
        elevation: 15,
        color: props.color
      }, {
        default: () => [slots.title && genModalTitle(), slots.content && genModalContent(), slots.actions && genModalActions()]
      });
    }

    function genTableModal() {
      return h(VModal, {
        overlay: true,
        transition: 'scale-in',
        modelValue: props.show
      }, {
        default: () => genModal()
      });
    }

    return () => genTableModal();
  }

});
//# sourceMappingURL=VDataTableModal.js.map