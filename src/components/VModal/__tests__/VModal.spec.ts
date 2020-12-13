import { mount, VueWrapper } from '@vue/test-utils'
import { VModal } from '../VModal'
import 'regenerator-runtime/runtime'

describe('VModal', () => {
  let mountFunction: (options?: object) => VueWrapper<any>

  beforeEach(() => {
    mountFunction = (options = {}) => mount(VModal, { ...options })
  })

  it('should mount component and match snapshot', () => {
    const cmp = mountFunction()
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set transition and match snapshot', () => {
    const transition = 'fade'
    const props = { transition }
    const cmp = mountFunction({ props })

    expect(cmp.props().transition).toBe(transition)
    expect(cmp.html()).toMatchSnapshot()
  })
})
