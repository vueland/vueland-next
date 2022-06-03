import { mount } from '@vue/test-utils'
import { VCol } from '../'

describe('VCol', () => {
  const mountFunction = (options = {}) =>
    mount(VCol, {
      ...options,
    })

  it('should test "grid" and match snapshot', () => {
    const wrapper = mountFunction({
      props: {
        xl: 12,
        lg: 4,
        md: 6,
        sm: 12,
      },
    })
    expect(wrapper.find('.xl-12').exists()).toBe(true)
    expect(wrapper.find('.lg-4').exists()).toBe(true)
    expect(wrapper.find('.md-6').exists()).toBe(true)
    expect(wrapper.find('.sm-12').exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should test "grid order" and match snapshot', () => {
    const wrapper = mountFunction({
      props: {
        orderXl: 2,
        orderLg: 4,
        orderMd: 3,
        orderSm: 1,
      },
    })
    expect(wrapper.find('.order-xl-2').exists()).toBe(true)
    expect(wrapper.find('.order-lg-4').exists()).toBe(true)
    expect(wrapper.find('.order-md-3').exists()).toBe(true)
    expect(wrapper.find('.order-sm-1').exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
