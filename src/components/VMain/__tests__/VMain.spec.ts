import { mount } from '@vue/test-utils'
import { VMain } from '../'

describe('VMain', () => {
  it('should mount component and match snapshot', () => {
    const wrapper = mount(VMain)

    expect(wrapper.html()).toMatchSnapshot()
  })
})
