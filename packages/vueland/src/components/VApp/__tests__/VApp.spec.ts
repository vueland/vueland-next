import { mount } from '@vue/test-utils'
import { defineComponent, inject } from 'vue'
import { VApp } from '../index'
import { breakpoints } from '../../../services/breakpoints'
import 'regenerator-runtime'

const THROTTLING_TIMEOUT = 20

describe('VApp', () => {
  let bp

  const global = {
    innerWidth: breakpoints.sm,
  }

  const onResize = (width) => {
    global.innerWidth = width
  }

  const mountComponent = (options = { props: { global } }) => mount(VApp, {
    ...options,
    slots: {
      default: defineComponent({
        setup() {
          bp = inject('$v_breakpoints')
        },
        template: `
          <div></div>`,
      }),
    },
  })

  it('should mount component and match snapshot', () => {
    const wrapper = mountComponent()

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should test "sm" size', () => {
    mountComponent()

    expect(bp.current).toEqual('sm')
    expect(bp.smAndLess).toBe(true)
  })

  it('should test "md" size', () => {
    global.innerWidth = breakpoints.md
    mountComponent()

    expect(bp.current).toEqual('md')
    expect(bp.mdAndLess).toBe(true)
  })

  it('should test "lg" size', () => {
    global.innerWidth = breakpoints.lg
    mountComponent()

    expect(bp.current).toEqual('lg')
    expect(bp.lgAndLess).toBe(true)
  })

  it('should test "xl" size', () => {
    global.innerWidth = breakpoints.xl
    mountComponent()

    expect(bp.current).toEqual('xl')
    expect(bp.xlAndLess).toBe(true)
  })

  it('should test resize listener', async () => {
    mountComponent()
    const event = new Event('resize')
    let arg = breakpoints.lg

    window.addEventListener('resize', () => onResize(arg))
    window.dispatchEvent(event)

    await new Promise(res => setTimeout(res, THROTTLING_TIMEOUT, true))

    expect(bp.current).toEqual('lg')

    arg = breakpoints.md

    window.addEventListener('resize', () => onResize(arg))
    window.dispatchEvent(event)

    await new Promise(res => setTimeout(res, THROTTLING_TIMEOUT, true))

    expect(bp.current).toEqual('md')

    arg = breakpoints.sm

    window.addEventListener('resize', () => onResize(arg))
    window.dispatchEvent(event)

    await new Promise(res => setTimeout(res, THROTTLING_TIMEOUT, true))

    expect(bp.current).toEqual('sm')
  })
})
