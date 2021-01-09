// Vue API
import { h, ref, defineComponent } from 'vue'

// Components
import { VCard, VCardTitle, VCardActions, VCardContent } from '../VCard'
import { VButton } from '../VButton'

export const VDataTableModal = defineComponent({
  name: 'v-data-table-modal',
  props: {
    dark: Boolean,
    color: String,
  } as any,

  setup(props, { slots }) {
    const key = ref<number>(0)

    function genModalTitle() {
      return h(VCardTitle, {
        class: props.dark ? 'white--text' : '',
      }, {
        default: () => props.form.title,
      })
    }

    function genModalContent() {
      return h(VCardContent, {}, {
        default: () => slots.default && slots.default(),
      })
    }

    function modalActionsHandler(it, validate) {
      if (it.validate) {
        return validate()
          .then(() => {
            it.onClick()
            key.value += 1
          })
          .catch(() => false)
      }

      it.onClick()
      key.value += 1
    }

    function genModalActions(validate) {
      return h(VCardActions, {}, {
        default: () => props.form.actions.map(it => {
          return h(VButton, {
            color: it.color,
            label: it.label,
            elevation: 3,
            style: { marginRight: '10px' },
            onClick: () => modalActionsHandler(it, validate),
          })
        }),
      })
    }

    function genModal(validate) {
      return h(VCard, {
        width: 400,
        elevation: 15,
        color: props.color,
      }, {
        default: () => [
          genModalTitle(),
          genModalContent(),
          genModalActions(validate),
        ],
      })
    }

    function genTableModal() {
      return h(VModal, {
        overlay: true,
      }, {
        default: () => genForm(),
      })
    }

    return () => genTableModal()
  },
})