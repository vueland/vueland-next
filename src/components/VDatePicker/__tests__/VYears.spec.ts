import { mount, VueWrapper } from '@vue/test-utils'
import { VYears } from '../VYears'


describe('VYears', () => {
  let mountFunction: (options?: any) => VueWrapper<any>

  beforeEach(() => {
    mountFunction = (options = {}) => mount(VYears, { ...options })
  })

  it('should mount component and match snapshot', () => {
    const cmp = mountFunction()

    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set year prop and match snapshot', () => {
    const props = {
      year: 2020,
    }

    const cmp = mountFunction({ props })

    expect(cmp.props().year).toEqual(2020)
    expect(cmp.html()).toMatchSnapshot()
  })
})