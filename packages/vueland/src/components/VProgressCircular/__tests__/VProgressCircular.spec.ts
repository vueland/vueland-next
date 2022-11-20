import { mount } from '@vue/test-utils'
import { VProgressCircular } from '../index'

describe('VProgressCircular', () => {
  const mountFunction = (options = {}) => mount(VProgressCircular, { ...options })

  it('should mount component and match snapshot', () => {
    const cmp = mountFunction()

    expect(cmp.html()).toMatchSnapshot()
  })
})
