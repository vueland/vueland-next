import { mount } from '@vue/test-utils'
import { VButton } from '../VButton'

describe('VButton', () => {
  let mountFunction: (options?: any) => any

  beforeEach(() => {
    mountFunction = (options = {}) => mount(VButton, { ...options })
  })

  it('should mount component and match snapshot', () => {
    const cmp = mountFunction()
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set color and match snapshot', () => {
    const color = 'red darken-3'
    const cmp = mountFunction({ propsData: { color } })

    expect(cmp.attributes().class).toContain(color)
    expect(cmp.html()).toMatchSnapshot()
  })
})
