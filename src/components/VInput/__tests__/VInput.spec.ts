import { mount, VueWrapper } from '@vue/test-utils'
import { VInput } from '../VInput'
import 'regenerator-runtime/runtime'


describe('VInput', () => {
  let mountFunction: (options?: any) => VueWrapper<any>
  let modelValue = ''
  const rules = [val => !!val && val.length > 4 || 'required']

  beforeEach(() => {
    mountFunction = (options = {}) => mount(VInput, { ...options })
  })

  it('should mount component and match snapshot', () => {
    const cmp = mountFunction()
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set label and match snapshot', () => {
    const label = 'email'
    const cmp = mountFunction({ propsData: { label } })
    expect(cmp.find('.v-label').text()).toBe(label)
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set dirty state and match snapshot', async () => {
    const cmp = mountFunction()
    const input = cmp.find('.v-input__field')

    await input.trigger('focus')

    expect(cmp.attributes().class).toContain('v-input--dirty')
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set color and match snapshot',  () => {
    const color = 'blue darken-2'
    const cmp = mountFunction({ propsData: { color } })
    const input = cmp.find('.v-input__field')

    expect(input.attributes().class).toContain('blue--text text--darken-2')
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set v-input--not-valid class name and match snapshot', async () => {
    const rules = [val => !!val && val.length > 4]
    const modelValue = 's'
    const cmp = mountFunction({ propsData: { rules, modelValue } })
    const input = cmp.find('.v-input__field')

    await input.trigger('input')
    await input.trigger('blur')

    expect(cmp.find('.v-input').attributes().class).toContain('v-input--not-valid')
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set danger--text label and match snapshot', async () => {
    modelValue = 's'
    const cmp = mountFunction({ propsData: { rules, modelValue } })
    const input = cmp.find('.v-input__field')

    await input.trigger('input')
    await input.trigger('blur')

    expect(cmp.find('.v-label').attributes().class).toContain('danger--text')
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set error status message and match snapshot', async () => {
    const cmp = mountFunction({ propsData: { rules, modelValue } })
    const input = cmp.find('.v-input__field')

    await input.trigger('input')
    await input.trigger('blur')

    expect(cmp.find('.v-input__status-message').text()).toEqual('required')
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set valid value and match snapshot', async () => {
    modelValue = 'five symbols'
    const cmp = mountFunction({ propsData: { rules, modelValue } })
    const input = cmp.find('.v-input__field')

    await input.trigger('input')
    await input.trigger('blur')

    expect(cmp.find('.v-label').attributes().class).toContain('success--text')
    expect(cmp.html()).toMatchSnapshot()
  })
})
