import { mount } from '@vue/test-utils'
import { VBadge } from '../VBadge'


describe('VBadge', () => {
  let mountFunction: (options?: any) => any

  beforeEach(() => {
    mountFunction = (options = {}) => mount(VBadge, { ...options })
  })

  it('should mound component and match snapshot', () => {
    const cmp = mountFunction()
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set badge slot and match snapshot', () => {

  })
})
