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
    const props = { disabled: true }
    const cmp = mountFunction({ props })

    expect(cmp.attributes().class).toContain('v-checkbox--disabled')
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set label and match snapshot', () => {
    const props = { label: 'checkbox label' }
    const cmp = mountFunction({ props })

    expect(cmp.find('.v-label').text()).toContain(props.label)
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set validate and match snapshot', () => {
    const props = { validate: true }
    const cmp = mountFunction({ props })

    expect(cmp.attributes().class).toContain('v-validatable')
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should emit events when clicked', async () => {
    const props = { modelValue: false }
    const cmp = mountFunction({ props })

    await cmp.trigger('click')

    expect((cmp.emitted().checked as any)[0][0]).toBe(true)
    expect((cmp.emitted()['update:modelValue'] as any)[0][0]).toBe(true)
    expect(cmp.attributes().class).toContain('v-checkbox--checked')
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should return true when clicked', async () => {
    const stub = jest.fn()
    const props = { modelValue: false, onChecked: stub }
    const cmp = mountFunction({ props })

    await cmp.trigger('click')

    expect(stub).toBeCalledTimes(1)
    expect(stub).toBeCalledWith(true)
  })

  it('should add value to array when clicked', async () => {
    const props = { modelValue: [], value: { name: 'John' } }
    const cmp = mountFunction({ props })

    await cmp.trigger('click')

    expect(props.modelValue).toContain(props.value)
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
    const props = { onIcon: 'foo', offIcon: 'bar' }
    const cmp = mountFunction({ props })

    await cmp.trigger('click')
    expect(cmp.find(`.${ props.onIcon }`).exists()).toBe(true)

    await cmp.trigger('click')
    expect(cmp.find(`.${ props.offIcon }`).exists()).toBe(true)
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set validate and match snapshot', async () => {
    const props = { validate: true, modelValue: false }
    const cmp = mountFunction({ props })

    await cmp.trigger('click')
    await cmp.trigger('click')

    expect(cmp.find('.v-icon').attributes().class).toContain('danger--text')
    expect(cmp.html()).toMatchSnapshot()
  })
})
