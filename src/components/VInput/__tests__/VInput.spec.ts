import { mount, VueWrapper } from '@vue/test-utils'
import { VInput } from '../VInput'

describe('VInput', () => {
  let mountFunction: (options?: any) => VueWrapper<any>

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
})