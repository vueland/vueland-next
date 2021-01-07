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
    color: String,
  } as any,

  setup(props) {
    const key = ref<number>(0)

    function genModalTitle() {
      return h(VCardTitle, {
        class: props.dark ? 'white--text' : '',
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
      return props.form.fields.map(field => {
        field.props['onUpdate:value'] = $value => field.props.value = $value
        field.props.dark = props.dark
        field.props.label = field.key
        if (field.isSelect) field.props.listColor = props.color
        return h(fieldComponent(field) as any, field.props)
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
