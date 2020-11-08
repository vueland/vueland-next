import { mount, VueWrapper } from '@vue/test-utils'
import { VResize } from '../VResize'
import { VCard } from '../../VCard'
import { SetupContext } from 'vue'
import 'regenerator-runtime/runtime'

describe('VResize', () => {
  let mountInWrapFunction: (options?: any) => VueWrapper<any>
  let mountFunction: (options?: any) => VueWrapper<any>

  beforeEach(() => {
    mountInWrapFunction = (options = {}) => mount(VCard, {
      slots: {
        default: VResize.setup!(options, {} as SetupContext)
      },
      ...options,
    })
    mountFunction = (options = {}) => mount(VResize, {
      ...options
    })
  })

  it('should mount the component and match snapshot', () => {
    const cmp = mountFunction()

    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set top prop and match snapshot', () => {
    const top = true
    const cmp = mountFunction({ propsData: { top } })

    expect(cmp.find('.v-resize').attributes().class).toContain('v-resize--top')
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set left prop and match snapshot', () => {
    const left = true
    const cmp = mountFunction({ propsData: { left } })

    expect(cmp.find('.v-resize').attributes().class).toContain('v-resize--left')
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set right prop and match snapshot', () => {
    const right = true
    const cmp = mountFunction({ propsData: { right } })

    expect(cmp.find('.v-resize').attributes().class).toContain('v-resize--right')
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set bottom prop and match snapshot', () => {
    const bottom = true
    const cmp = mountFunction({ propsData: { bottom } })

    expect(cmp.find('.v-resize').attributes().class).toContain('v-resize--bottom')
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set top prop and match snapshot', async () => {
    const cmp = mountInWrapFunction({
      top: true
    })
    const resizer = cmp.find('.v-resize')

    await resizer.trigger('mousedown')
    await resizer.trigger('mousemove')

    expect(cmp.html()).toMatchSnapshot()
  })
})
