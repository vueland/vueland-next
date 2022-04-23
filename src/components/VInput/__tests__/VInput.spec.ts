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
          $options: null
        }
      }
    })
  })

  test('should mount component and match snapshot', () => {
    const wrapper = mountFunction()
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should test "focused" prop and match snapshot', () => {
    const wrapper = mountFunction({
      props: {
        focused: true,
      }
    })

    expect(wrapper.attributes().class).toContain('v-input--focused')
    expect(wrapper.attributes().class).toContain('v-input--dirty')
    expect(wrapper.html()).toMatchSnapshot()
  })
})
