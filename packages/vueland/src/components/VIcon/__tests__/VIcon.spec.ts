import { mount, VueWrapper } from '@vue/test-utils'
import { VIcon } from '../index'

describe('VForm', () => {
  let mountFunction: (options?: any) => VueWrapper<any>

  beforeEach(() => {
    mountFunction = (options = {}) => mount(VIcon, {
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
