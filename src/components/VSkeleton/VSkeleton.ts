import { defineComponent, h, computed } from 'vue'
import { convertToUnit } from '../../helpers'
import { colorProps, useColors } from '../../composables/use-colors'

export default defineComponent({
  name: 'v-skeleton',
  props: {
    tag: {
      type: String,
      default: 'div',
    },
    width: {
      type: [ Number, String ],
      default: null,
    },
    height: {
      type: [ Number, String ],
      default: 20,
    },
    radius: {
      type: [ Number, String ],
      default: 5,
    },
    origin: {
      type: String,
      default: 'left',
      validator: (val) => ['left', 'center', 'right'].includes(val as string)
    },
    dynamic: Boolean,
    ...colorProps('grey lighten-2')
  },
  setup(props: any) {
    const {
      setTextClassNameColor,
      setTextCssColor
    } = useColors()

    const classes = computed(() => ({
      'v-skeleton': true,
      'v-skeleton--dynamic': props.dynamic,
      [`v-skeleton--${ props.origin }`]: true,
      ...(props.color ? setTextClassNameColor(props.color) : '')
    }))

    const styles = computed(() => ({
      width: props.width && convertToUnit(props.width),
      flexBasis: props.width && convertToUnit(props.width) || '100%',
      height: convertToUnit(props.height),
      borderRadius: convertToUnit(props.radius),
      ...(props.color ? setTextCssColor(props.color) : '')
    }))

    return () => h(props.tag, {
      class: classes.value,
      style: styles.value
    })
  },
})
