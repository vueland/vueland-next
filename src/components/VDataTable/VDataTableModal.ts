// Styles

// Vue API
import { h, defineComponent } from 'vue'

// Components
import { VModal } from '../VModal'
import { VCard, VCardTitle, VCardActions, VCardContent } from '../VCard'

export const VDataTableModal = defineComponent({
  name: 'v-data-table-modal',
  props: {

  },

  setup() {

    function genTableModal() {
      return h(VModal, {
        overlay: true,
      }, h(VCard, {}))
    }

    return () => h('div')
  },
})
