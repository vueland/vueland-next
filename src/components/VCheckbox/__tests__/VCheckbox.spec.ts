import { mount, VueWrapper } from '@vue/test-utils'
import { VCheckbox } from '../VCheckbox'
import 'regenerator-runtime/runtime'

describe('VCheckbox', () => {
  let mountFunction: (options?: any) => VueWrapper<any>

  beforeEach(() => {
    mountFunction = (options = {}) => mount(VCheckbox, options)
  })

  it('should mount component and match snapshot', () => {
    const cmp = mountFunction()

    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set disabled and match snapshot', () => {
    const disabled = true
    const cmp = mountFunction({ propsData: { disabled } })

    expect(cmp.attributes().class).toContain('v-checkbox--disabled')
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set label and match snapshot', () => {
    const label = 'checkbox label'
    const cmp = mountFunction({ propsData: { label } })

    expect(cmp.find('.v-label').text()).toContain(label)
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set validate and match snapshot', () => {
    const validate = true
    const cmp = mountFunction({ propsData: { validate } })

    expect(cmp.attributes().class).toContain('v-validatable')
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should emit events when clicked', async () => {
    const modelValue = false
    const props = { modelValue }
    const cmp = mountFunction({ props })

    await cmp.trigger('click')

    expect((cmp.emitted().checked as any)[0][0]).toBe(true)
    expect((cmp.emitted()['update:modelValue'] as any)[0][0]).toBe(true)
    expect(cmp.attributes().class).toContain('v-checkbox--checked')
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should return true when clicked', async () => {
    const stub = jest.fn()
    const modelValue = false
    const props = { modelValue, onChecked: stub }
    const cmp = mountFunction({ props })

    await cmp.trigger('click')

    expect(stub).toBeCalledTimes(1)
    expect(stub).toBeCalledWith(true)
  })

  it('should add value to array when clicked', async () => {
    const modelValue = []
    const value = { name: 'John' }
    const props = { modelValue, value }
    const cmp = mountFunction({ props })

    await cmp.trigger('click')

    expect(modelValue).toContain(value)
  })

  it('should remove value from array when toggled off', async () => {
    const stub = jest.fn()
    const value = { name: 'John' }
    const modelValue = [value]
    const props = { modelValue, value, onChecked: stub }
    const cmp = mountFunction({ props })

    await cmp.trigger('click')

    expect(stub).toHaveBeenCalledWith([])
  })

  it('should set "on" and "off" icon and match snapshot', async () => {
    const onIcon = 'foo'
    const offIcon = 'bar'
    const props = { onIcon, offIcon }
    const cmp = mountFunction({ props })

    await cmp.trigger('click')
    expect(cmp.find('.foo').exists()).toBe(true)

    await cmp.trigger('click')
    expect(cmp.find('.bar').exists()).toBe(true)
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set validate and match snapshot', async () => {
    const validate = true
    const props = { validate, modelValue: false }
    const cmp = mountFunction({ props })

    await cmp.trigger('click')
    await cmp.trigger('click')

    expect(cmp.find('.v-icon').attributes().class).toContain('danger--text')
    expect(cmp.html()).toMatchSnapshot()
  })
})
