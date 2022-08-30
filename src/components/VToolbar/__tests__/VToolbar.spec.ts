import { mount } from '@vue/test-utils'
import { h } from 'vue'
import { VToolbar, VToolbarNavBtn, VToolbarLogo, VToolbarItems, VToolbarContent } from '../index'

describe('VToolbar', () => {
  const mountFunction = (options = {}) => mount(VToolbar, {
    ...options,
    global: {
      provide: {
        $v: {},
      },
    },
    slots: {
      default: () => h(VToolbarContent, {},
        {
          default: () => [ h(VToolbarNavBtn), h(VToolbarLogo), h(VToolbarItems) ]
        }
      )
    }
  })

  it('should mount component and match snapshot', () => {
    const wrapper = mountFunction()

    expect(wrapper.html()).toMatchSnapshot()
  })
})
