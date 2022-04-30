import { mount } from '@vue/test-utils'
import { VNavigation } from '../VNavigation'
import 'regenerator-runtime'

describe('VNavigation', () => {
  const mountFunction = (options = {}) => mount(VNavigation, {
    ...options
  })

  it('should mount component and match snapshot', () => {
    const wrapper = mountFunction()

    expect(wrapper.element.classList).toContain('v-navigation')
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should test expanded state with default sizes', async () => {
    const wrapper = mountFunction({ props: { expand: true } })

    expect((wrapper.element as HTMLElement).style.width).toEqual('237px')
    expect(wrapper.element.classList).toContain('v-navigation--expanded')

    await wrapper.setProps({ expand: false })
    expect((wrapper.element as HTMLElement).style.width).toEqual('56px')
  })

  it('should test expanded state with custom sizes', async () => {
    const wrapper = mountFunction({
      props: { miniVariantWidth: 60, maxVariantWidth: 260, expand: true }
    })

    expect((wrapper.element as HTMLElement).style.width).toEqual('260px')
    expect(wrapper.element.classList).toContain('v-navigation--expanded')

    await wrapper.setProps({ expand: false })
    expect((wrapper.element as HTMLElement).style.width).toEqual('60px')
  })

  it('should test on hover', async () => {
    const wrapper = mountFunction({
      props: { onHover: true }
    })

    expect((wrapper.element as HTMLElement).style.width).toEqual('56px')

    await wrapper.trigger('mouseenter')

    expect((wrapper.element as HTMLElement).style.width).toEqual('237px')
  })

  it('should test mini variant', async () => {
    const wrapper = mountFunction({
      props: { onHover: true, miniVariant: true }
    })

    expect((wrapper.element as HTMLElement).style.width).toEqual('56px')

    await wrapper.trigger('mouseenter')

    expect((wrapper.element as HTMLElement).style.width).toEqual('56px')
  })

  it('should test color prop', () => {
    const wrapper = mountFunction({
      props: { color: 'red darken-1' }
    })

    expect(wrapper.element.className).toContain('red darken-1')
  })

  it('should test fixed positions', async () => {
    const wrapper = mountFunction({
      props: { fixed: true }
    })

    expect(wrapper.element.className).toContain('v-navigation--fixed')

    await wrapper.setProps({ left: true })
    expect(wrapper.find('.v-navigation').attributes('style')).toContain('left: 0px;')

    await wrapper.setProps({ right: true, left: false })
    expect(wrapper.find('.v-navigation').attributes('style')).toContain('right: 0px;')
  })

  it('should test offset-top in fixed position', async () => {
    const wrapper = mountFunction({
      props: { offsetTop: 75, fixed: true }
    })

    expect(wrapper.find('.v-navigation').attributes('style')).toContain('top: 75px;')
    expect(wrapper.find('.v-navigation').attributes('style')).toContain('height: calc(100vh - 75px);')
  })
})
