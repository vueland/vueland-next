import { mount, VueWrapper } from '@vue/test-utils'
import { VCheckbox } from '../VCheckbox'

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
})
