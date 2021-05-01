import { mount, VueWrapper } from '@vue/test-utils'
import { VAutocomplete } from '../index'

describe('VAutocomplete', () => {
  let mountFunction: (options?: any) => VueWrapper<any>

  beforeEach(() => {
    mountFunction = (options = {}) => mount(VAutocomplete, {
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
