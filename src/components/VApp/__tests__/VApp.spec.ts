import { shallowMount } from '@vue/test-utils'
import { VApp } from '../'

describe('VApp', () => {
  test('should mount component and match snapshot', () => {
    const wrap = shallowMount(VApp, {
      slots: {
        default: '<div class="default"></div>'
      }
    })

    expect(wrap.find('.default').exists()).toBe(true)
    expect(wrap.html()).toMatchSnapshot()
  })
})
