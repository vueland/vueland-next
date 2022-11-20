import { mount } from '@vue/test-utils'
import { VInput } from '../index'

describe('EInput', () => {
  const mountFunction = (options = {}) => mount(VInput, {
    ...options
  })

  it('should mount component and match snapshot', () => {
    const wrap = mountFunction()

    expect(wrap.html()).toMatchSnapshot()
  })

  it('should test "disabled" prop', () => {
    const wrapper = mountFunction({
      props: { disabled: true }
    })

    expect(wrapper.classes()).toContain('v-input--disabled')
  })

  // it('should test "focused" prop', () => {
  //   const wrapper = mountFunction({
  //     props: { focused: true }
  //   })
  //
  //   expect(wrapper.classes()).toContain('v-input--focused')
  // })

  it('should test "label"', () => {
    const wrapper = mountFunction({
      props: { label: 'test label' }
    })

    expect(wrapper.find('label').text()).toContain('test label')
  })

  it('should test "color" prop with color class name', () => {
    const wrapper = mountFunction({
      props: { color: 'grey darken-1' }
    })

    expect(wrapper.attributes('class')).toContain('grey--text text--darken-1')
  })

  it('should test "color" prop with css color', () => {
    const wrapper = mountFunction({
      props: { color: '#fa5a5a' }
    })

    expect(wrapper.attributes().style).toContain('color: rgb(250, 90, 90);')
  })

  it('should test css "color" if "disabled" is true', () => {
    const wrapper = mountFunction({
      props: { color: 'orange darken-1', disabled: true }
    })

    expect(
      wrapper.attributes().class.includes('orange--text text--darken-1')
    ).toBeFalsy()
  })

  it('should test prepend-icon prop', () => {
    const wrapper = mountFunction({
      props: { prependIcon: 'fas fa-check' }
    })

    expect(wrapper.find('.v-input--has-prepend-icon').exists()).toBe(true)
  })

  it('should test prepend-icon slot', () => {
    const wrapper = mountFunction({
      slots: {
        ['prepend-icon']: `<i class="fas fa-check"></i>`
      }
    })

    expect(wrapper.find('.v-input--has-prepend-icon').exists()).toBe(true)
  })

  it('should test append-icon prop', () => {
    const wrapper = mountFunction({
      props: { appendIcon: 'fas fa-check' }
    })

    expect(wrapper.find('.v-input--has-append-icon').exists()).toBe(true)
  })

  it('should test append-icon slot', () => {
    const wrapper = mountFunction({
      slots: {
        ['append-icon']: `<i class="fas fa-check"></i>`
      }
    })

    expect(wrapper.find('.v-input--has-append-icon').exists()).toBe(true)
  })

  it('should test "text-color" for "text-field" slot', () => {
    const textField = `
      <template #text-field="{textCssColor, textClassColor}">
        <div  :class="['test', textClassColor]" :style="textCssColor"></div>
      </template>
    `
    const wrapper = mountFunction({
      props: { textColor: '#fa5a5a' },
      slots: {
        ['text-field']: textField
      }
    })

    expect(wrapper.find('.test').attributes('style')).toContain(
      'color: rgb(250, 90, 90)'
    )
  })
})
