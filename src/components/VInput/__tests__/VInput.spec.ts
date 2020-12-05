import { mount, VueWrapper } from '@vue/test-utils'
import { VInput } from '../VInput'
import 'regenerator-runtime/runtime'

describe('VInput', () => {
  let mountFunction: (options?: any) => VueWrapper<any>

  beforeEach(() => {
    mountFunction = (options = {}) => mount(VInput, { ...options })
  })

  it('should mount component and match snapshot', () => {
    const cmp = mountFunction()
    expect(cmp.html()).toMatchSnapshot()
  })
})
