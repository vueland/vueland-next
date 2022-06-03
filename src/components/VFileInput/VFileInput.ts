// Vue API
import { h, defineComponent, ref, computed, PropType } from 'vue'
// Components
import { VInput } from '../VInput'
import { VChip } from '../VChip'
// Composables
import { useIcons } from '../../composable/use-icons'
import { useInputStates } from '../../composable/use-input-states'
// Helpers
import { uniqueArray } from '../../helpers'
// Types
import { Maybe } from '../../../types/base'

export default defineComponent({
  name: 'v-file-input',
  props: {
    disabled: Boolean,
    multiple: Boolean,
    chipColor: {
      type: String,
      default: 'primary',
    },
    value: {
      type: Array as PropType<Array<File>>,
      default: () => [],
    },
  },
  emits: ['update:value', 'delete'],
  setup(props, { emit, attrs }) {
    const { icons } = useIcons()
    const { isDisabled, isReadonly } = useInputStates(props, { emit, attrs })

    const inputRef = ref<Maybe<HTMLInputElement>>(null)
    const srcRef = ref<Maybe<HTMLElement>>(null)

    const classes = computed(() => ({
      'v-file-input': true,
      'v-file-input--disabled': isDisabled.value,
      'v-file-input--readonly': isReadonly.value,
      'v-file-input--multiple': props.multiple,
    }))

    const onChange = (event) => {
      let files = Array.from(event.target.files) as File[]

      if (props.multiple) {
        files = uniqueArray<File>(props.value.concat(files))
      }

      event.target.value = ''
      emit('update:value', files)
    }

    const onClose = (file) => {
      const files = props.value.filter(it => {
        return file.name !== it.name
      })

      emit('update:value', files)
      emit('delete', file)
    }

    const onClick = ({ srcElement }) => {
      if (srcElement !== srcRef.value) return
      inputRef.value!.click()
    }

    const genFileInput = () => {
      return h('input', {
        class: 'v-file-input__field',
        type: 'file',
        multiple: props.multiple,
        ref: inputRef,
        style: {
          position: 'absolute',
          visibility: 'hidden',
        },
        onChange,
      })
    }

    const genChips = () => {
      return uniqueArray<File>(props.value)
        .map(file => h(VChip, {
            title: file.name,
            class: 'ma-1',
            color: props.chipColor,
            onClose: () => onClose(file),
          }),
        )
    }

    const genChipsContainer = () => {
      return h('div', {
        class: 'v-file-input__container',
        ref: srcRef,
      }, genChips())
    }

    const genComponent = () => h('div', {
      class: classes.value,
      onClick,
    }, [
      genFileInput(),
      genChipsContainer(),
    ])

    return () => h(VInput, {
      prependIcon: icons.$paperclip,
      file: true,
      disabled: isDisabled.value,
    }, {
      'text-field': () => genComponent(),
    })
  },
})
