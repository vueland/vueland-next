import { h, defineComponent } from 'vue'
import { mount, VueWrapper } from '@vue/test-utils'
import { VModal } from '../VModal'
import 'regenerator-runtime/runtime'

const OVERLAY_TIMEOUT = 100

const delay = () => new Promise(res => setTimeout(res, OVERLAY_TIMEOUT))

const WrapComponentFunction = props =>
  defineComponent({
    setup() {
      return () =>
        h(
          'div',
          {},
          h(VModal, props, {
            default: () => 'slot content',
          }),
        )
    },
  })

describe('VModal', () => {
  let mountFunction: (options?: object) => VueWrapper<any>

  beforeEach(() => {
    mountFunction = (options = {}) => mount(VModal, { ...options })
  })

  it('should mount component and match snapshot', () => {
    const cmp = mountFunction()
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set scaleIn transition and match snapshot', () => {
    const props = {
      transition: 'scaleIn',
    }
    const cmp = mountFunction({ props })

    expect(cmp.props().transition).toBe('scaleIn')
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set overlay to true', () => {
    const props = {
      overlay: true,
    }
    const wrap = mountFunction({ props })

    expect(wrap.props().overlay).toBe(true)
  })

  it('should set overlay color and match snapshot', async () => {
    const props = {
      overlay: true,
      overlayColor: '#ffffff',
      modelValue: true,
    }
    const wrap = mount(WrapComponentFunction(props))
    await delay()

    expect(wrap.find('.v-overlay').exists()).toBe(true)
    expect(wrap.find('.v-overlay').attributes().style).toContain(
      'background-color: rgb(255, 255, 255); border-color: #ffffff;',
    )
    expect(wrap.html()).toMatchSnapshot()
  })

  it('should open modal and match snapshot', async () => {
    const props = {
      overlay: true,
      modelValue: true,
    }
    const wrap = mount(WrapComponentFunction(props))
    await delay()

    expect(wrap.find('.v-overlay').exists()).toBe(true)
    expect(wrap.html()).toMatchSnapshot()
  })

  it('should close modal and match snapshot', async () => {
    const props = {
      overlay: true,
      modelValue: false,
    }
    const wrap = mount(WrapComponentFunction(props))
    await delay()

    expect(wrap.find('.v-overlay').exists()).toBe(false)
    expect(wrap.find('.v-modal').attributes().style).toContain('display: none;')
    expect(wrap.html()).toMatchSnapshot()
  })
})
