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
    dark: Boolean,
    color: String
  } as any,

  setup(props) {
    const key = ref<number>(0)

    function genModalTitle() {
      return h(VCardTitle, {
        class: props.dark ? 'white--text' : ''
      }, {
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
        f.props.dark = props.dark
        f.props.label = f.key
        if (f.isSelect) f.props.listColor = props.color
        return h(fieldComponent(f) as any, f.props)
      })
    }

    function genModalContent() {
      return h(VCardContent, {}, {
        default: () => genFields(),
      })
    }

    function modalActionsHandler(it, validate) {
      if (it.validate) {
        return validate()
          .then(it.onClick)
          .then(() => setTimeout(() => key.value += 1, 200))
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
        color: props.color
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
