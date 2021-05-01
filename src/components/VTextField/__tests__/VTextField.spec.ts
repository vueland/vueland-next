import { mount, VueWrapper } from '@vue/test-utils'
import { VTextField } from '../index'

describe('VtextField', () => {
  let mountFunction: (options?: any) => VueWrapper<any>

  beforeEach(() => {
    mountFunction = (options = {}) => mount(VTextField, {
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
