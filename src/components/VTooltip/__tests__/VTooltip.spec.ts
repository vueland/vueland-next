import { mount, VueWrapper } from '@vue/test-utils'
import { VTooltip } from '../VTooltip'
import 'regenerator-runtime/runtime'


describe('VTooltip', () => {
  let mountFunction: (options?: any) => VueWrapper<any>

  beforeEach(() => {
    mountFunction = (options = {}) => mount(VTooltip, options)
  })

  it('should mount component and match snapshot', () => {
    const cmp = mountFunction()

    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set activator and match snapshot', () => {
    const slots = {
      activator: '<div class="activator"></div>',
    }

    const cmp = mountFunction({ slots })

    expect(cmp.html()).toMatchSnapshot()
  })
})
