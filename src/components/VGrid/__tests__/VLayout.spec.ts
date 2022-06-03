import { mount } from '@vue/test-utils'
import { VLayout } from '../'

describe('VLayout', () => {
  const mountFunction = (options = {}) =>
    mount(VLayout, {
      ...options,
    })

  it('should test "column" prop and match snapshot', () => {
    const wrapper = mountFunction({
      props: {
        column: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should test "wrap" prop and match snapshot', () => {
    const wrapper = mountFunction({
      props: {
        wrap: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
