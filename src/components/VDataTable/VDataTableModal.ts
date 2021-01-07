// Styles

// Vue API
import { h, ref, defineComponent } from 'vue'

// Components
import { VModal } from '../VModal'
import { VTextField } from '../VTextField'
import { VSelect } from '../VSelect'
import { VDatePicker } from '../VDatePicker'
import { VCard, VCardTitle, VCardActions, VCardContent } from '../VCard'
import { VForm } from '../VForm'
import { VButton } from '../VButton'

export const VDataTableModal = defineComponent({
  name: 'v-data-table-modal',
  props: {
    form: Object,
  } as any,

  setup(props) {
    const key = ref<number>(0)

    function genModalTitle() {
      return h(VCardTitle, {}, {
        default: () => props.form.title,
      })
    }

    function fieldComponent(field) {
      if (field.isTextField) return VTextField
      if (field.isSelect) return VSelect
      if (field.isDate) return VDatePicker
      return undefined
    }

    function genForm() {
      return h(VForm, {
        key: key.value,
      }, {
        default: ({ validate }) => genModal(validate),
      })
    }

    function genFields() {
      return props.form.fields.map(f => {
        f.props['onUpdate:value'] = $value => f.props.value = $value
        return h(fieldComponent(f) as any, f.props)
      })
    }

    function genModalContent() {
      return h(VCardContent, {}, {
        default: () => genFields(),
      })
    }

    function genModalActions(validate) {
      return h(VCardActions, {}, {
        default: () => props.form.actions.map(it => {
          return h(VButton, {
            color: it.type,
            label: it.label,
            elevation: 3,
            onClick: () => {
              validate()
                .then(res => {
                  if (res) {
                    res && it.onClick()
                    key.value += 1
                  }
                })
            },
          })
        }),
      })
    }

    function genModal(validate) {
      return h(VCard, {
        width: 400,
        elevation: 15,
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
