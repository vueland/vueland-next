import { mount, VueWrapper } from '@vue/test-utils'
import { VModal } from '../VModal'
import 'regenerator-runtime/runtime'

describe('VModal', () => {
  let mountFunction: (options?: object) => VueWrapper<any>

  beforeEach(() => {
    mountFunction = (options = {}) => mount(VModal, { ...options })
  })

  it('should mount component and match snapshot', () => {
    const cmp = mountFunction()
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set overlay and match snapshot', () => {
    const overlay = true
    const props = { overlay }
    const cmp = mountFunction({ props })

    expect(cmp.props().overlay).toBe(true)
    expect(cmp.find('.v-overlay').exists()).toBe(true)
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set overlay color and match snapshot', () => {
    const overlayColor = 'red darken-2'
    const props = { overlayColor, overlay: true }
    const cmp = mountFunction({ props })

    expect(cmp.find('.v-overlay').attributes().class).toContain(overlayColor)
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set transition and match snapshot', () => {
    const transition = 'fade'
    const props = { transition }
    const cmp = mountFunction({ props })

    expect(cmp.props().transition).toBe(transition)
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set modelValue prop to true and match snapshot', async () => {
    const modelValue = true
    const props = { modelValue, overlay: true }
    const cmp = mountFunction({ props })

    // Waiting for next tick
    await new Promise(res => setTimeout(res))

    expect(cmp.find('.v-overlay').attributes().class).toContain('v-overlay--active')
    expect(cmp.html()).toMatchSnapshot()
  })
})
