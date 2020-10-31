import { mount, VueWrapper } from '@vue/test-utils'
// @ts-ignore
import { VModal } from '../VModal'

describe('VModal', () => {
  let mountFunction: (options?: object) => VueWrapper<any>

  beforeEach(() => {
    mountFunction = (options = {}) => mount(VModal, { ...options })
  })

  it('should mount component and match snapshot', () => {
    const cmp = mountFunction()

    expect(cmp.html()).toMatchSnapshot()
  })
})
