import { mount } from '@vue/test-utils'
import { VRow } from '../'

describe('VRow', () => {
  const mountFunction = (options = {}) =>
    mount(VRow, {
      ...options,
    })

  it('should test "align-start" prop and match snapshot', () => {
    const wrapper = mountFunction({
      props: {
        alignXl: 'center',
      },
    })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should test "justify-center" props and match snapshot', () => {
    const wrapper = mountFunction({
      props: {
        justifyXl: 'start',
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
