import { mount, VueWrapper } from '@vue/test-utils'
import { VInput } from '../index'
import 'regenerator-runtime/runtime'

describe('VInput', () => {
  let mountFunction: (options?: any) => VueWrapper<any>

  beforeEach(() => {
    mountFunction = (options = {}) => mount(VInput, {
      ...options,
      global: {
        provide: {
          $options: null,
        },
      },
    })
  })

  it('should mount component and match snapshot', () => {
    const cmp = mountFunction()
    expect(cmp.html()).toMatchSnapshot()
  })
})
