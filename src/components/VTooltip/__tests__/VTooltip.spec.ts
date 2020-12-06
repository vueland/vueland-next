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

  // it('should set activator and match snapshot', async () => {
  //   const stub = jest.fn()
  //   const slots = {
  //     activator: '<div class="activator"></div>',
  //     props: {
  //       on: { mouseenter: stub },
  //     },
  //   }
  //
  //   const props = { 'v-on': slots.props.on }
  //
  //   const cmp = mountFunction({ slots, props })
  //   await cmp.find('.activator').trigger('mouseenter')
  //
  //   expect(cmp.html()).toMatchSnapshot()
  // })
})
