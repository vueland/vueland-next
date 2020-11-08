// Styles
import './VListGroup.scss'

// Vue API
import {
  h,
  ref,
  computed,
  inject,
  defineComponent,
} from 'vue'

// Effects
import { useColors } from '../../effects/use-colors'

// Components
import { VListItem } from './VListItem'

const vListGroupProps = {
  activeClass: {
    type: String,
    default: '',
  },
  appendIcon: String,
  color: {
    type: String,
    default: 'primary',
  },
  disabled: Boolean,
  group: String,
  noAction: Boolean,
  prependIcon: String,
  subGroup: Boolean,
}

export const VListGroup = defineComponent({
  name: 'v-list-group',
  props: vListGroupProps,

  setup(props) {
    const { setTextColor } = useColors()

    const refGroup = ref(null)
    const isActive = ref(false)

    const groups: any = inject('groups')

    const clickHandler = () => {
      groups.listClick(refGroup)
    }

    groups.register({
      ref: refGroup,
      activator: isActive
    })

    // const genPrependIcon = () => {
    // }
    // const genAppendIcon = () => {
    // }

    const classes = computed(() => ({
      'v-list-group': true,
      'v-list-group--active': isActive.value
    }))

    const genGroupHeader = () => {
      return h(VListItem, {}, {
        default: props.group
      })
    }

    const genDataProps = () => {
      return {
        class: classes.value,
        ref: refGroup,
        onClick: clickHandler,
      }
    }

    return () => h(
      'div',
      setTextColor(props.color, genDataProps()),
      [genGroupHeader()]
    )
  },
})
