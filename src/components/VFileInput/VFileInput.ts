// Vue API
import { h, defineComponent, ref, computed } from 'vue'
// Components
import { VInput } from '../VInput'
import { VChip } from '../VChip'
// Composables
import { useColors } from '../../composable/use-colors'
import { useIcons } from '../../composable/use-icons'
// Helpers
import { mapToValArray } from '../../helpers'
// Types
import { Maybe } from '../../../types/base'

export const VFileInput = defineComponent({
  name: 'v-file-input',
  props: {
    disabled: Boolean,
    multiple: Boolean,
    chipColor: {
      type: String,
      default: 'primary',
    },
    modelValue: {
      type: Array,
      default: null,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const {} = useColors()
    const { icons } = useIcons()

    const inputRef = ref<Maybe<HTMLInputElement>>(null)
    const files = ref<Map<string, File>>(new Map())
    const srcRef = ref<Maybe<HTMLElement>>(null)

    const classes = computed(() => ({
      'v-file-input': true,
      'v-file-input--disabled': props.disabled,
      'v-file-input--multiple': props.multiple,
    }))

    const onChange = (event) => {
      const inputFiles = Array.from(event.target.files) as File[]

      if (!props.multiple) files.value.clear()

      inputFiles.forEach(f => files.value.set(f.name, f))

      event.target.value = ''
      emit('update:modelValue', mapToValArray(files.value))
    }

    const onClose = (file) => {
      files.value.delete(file.name)
      emit('update:modelValue', mapToValArray(files.value))
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
      return mapToValArray(files.value)
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
    }, {
      'text-field': () => genComponent(),
    })
  },
})
