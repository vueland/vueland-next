import { mount } from '@vue/test-utils'
import { VApp } from '../'

describe('VApp', () => {
  test('should mount component and match snapshot', () => {
    const wrap = mount(VApp, {
      inject: {

      },
      slots: {
        default: '<div class="default"></div>'
      }
    })

    expect(wrap.find('.default').exists()).toBe(true)
    expect(wrap.html()).toMatchSnapshot()
  })
})
