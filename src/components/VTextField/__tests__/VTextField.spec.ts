import { mount } from '@vue/test-utils'
import { VTextField } from '../index'
import { ref } from 'vue'
import 'regenerator-runtime'

describe('VTextField', () => {
  const val = ref('')
  const onUpdate = (v) => (val.value = v)
  const mountFunction = (options = {}) => mount(VTextField as any, options)

  beforeEach(() => {
    val.value = ''
  })

  it('should mount component and match snapshot', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should test non disabled state', async () => {
    const wrapper = mountFunction({
      props: {
        modelValue: val.value,
        label: 'email',
        rules: [(val) => !!val || 'required input'],
        color: 'orange darken-1',
        textColor: '#fa5a5a',
        ['onUpdate:modelValue']: onUpdate,
      },
      global: {
        provide: {
          form: null,
        },
      },
    })

    await wrapper.find('input').trigger('focus')
    await wrapper.find('input').trigger('blur')

    expect(wrapper.find('.v-input').attributes('class')).toContain(
      'v-input--not-valid'
    )
    expect(wrapper.html()).toMatchSnapshot()

    val.value = 'sss'

    await wrapper.setProps({modelValue: val.value})

    expect(wrapper.find('.v-input--not-valid').exists()).toBeFalsy()

    expect(wrapper.find('label').text()).toContain('email')
    expect(wrapper.find('.v-input').attributes('class')).toContain(
      'orange--text text--darken-1'
    )
    expect(wrapper.find('input').attributes('style')).toContain(
      'color: rgb(250, 90, 90);'
    )
  })

  it('should test disabled state', async () => {
    const wrapper = mountFunction({
      props: {
        label: 'email',
        rules: [(val) => !!val || 'required input'],
        color: 'orange darken-1',
        textColor: '#fa5a5a',
        disabled: true,
      },
      global: {
        provide: {
          form: null,
        },
      },
    })

    expect(wrapper.find('input').attributes('style')).toBeFalsy()
    expect(wrapper.find('input[disabled]').exists()).toBeTruthy()
    expect(wrapper.html()).toMatchSnapshot()

    await wrapper.find('input').trigger('input')

    expect(wrapper.find('.v-input--focused').exists()).toBeFalsy()
  })
})
