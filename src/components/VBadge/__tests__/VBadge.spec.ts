import { h } from 'vue'
import { mount, VueWrapper } from '@vue/test-utils'
import { VBadge } from '../VBadge'

describe('VBadge', () => {
  let mountFunction: (options?: any) => VueWrapper<any>

  beforeEach(() => {
    mountFunction = (options = {}) => mount(VBadge, { ...options })
  })

  it('should mount component and match snapshot', () => {
    const cmp = mountFunction()

    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set badge slot and match snapshot', () => {
    const slots = {
      badge: () => 'content',
    }
    const cmp = mountFunction({ slots })

    expect(cmp.find('.v-badge__badge-slot').text()).toEqual(slots.badge())
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set content and match snapshot', () => {
    const props = {
      content: '10',
    }
    const cmp = mountFunction({ props })

    expect(cmp.find('.v-badge__badge').text()).toEqual(props.content)
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set color and match snapshot', () => {
    const props = {
      color: 'red darken-3',
    }
    const cmp = mountFunction({ props })

    expect(cmp.find('.v-badge__badge').attributes().class).toContain(
      props.color,
    )
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set border and match snapshot', () => {
    const props = {
      border: true,
    }
    const cmp = mountFunction({ props })

    expect(cmp.find('.v-badge').attributes().class).toContain('v-badge--border')
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set dot style and match snapshot', () => {
    const props = {
      dot: true,
    }
    const cmp = mountFunction({ props })

    expect(cmp.find('.v-badge').attributes().class).toContain('v-badge--dot')
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set avatar style and match snapshot', () => {
    const props = {
      avatar: true,
    }
    const cmp = mountFunction({ props })

    expect(cmp.find('.v-badge').attributes().class).toContain('v-badge--avatar')
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should render default slot and match snapshot', () => {
    const slots = {
      default: () => h('div', 'slot content'),
    }
    const cmp = mountFunction({ slots })

    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set left to true and match snapshot', () => {
    const slots = {
      default: () => h('div', 'slot content'),
    }
    const props = {
      left: true,
      content: '10',
    }
    const cmp = mountFunction({ props, slots })

    expect(cmp.find('.v-badge__badge').attributes().style).toContain(
      'left: -12px;',
    )
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set right to true and match snapshot', () => {
    const props = {
      right: true,
      content: '10',
    }
    const cmp = mountFunction({ props })

    expect(cmp.find('.v-badge__badge').attributes().style).toContain(
      'right: -12px;',
    )
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set top to true and match snapshot', () => {
    const props = {
      top: true,
      content: '10',
    }
    const cmp = mountFunction({ props })

    expect(cmp.find('.v-badge__badge').attributes().style).toContain(
      'top: -12px;',
    )
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set bottom to true and match snapshot', () => {
    const props = {
      bottom: true,
      content: '10',
    }
    const cmp = mountFunction({ props })

    expect(cmp.find('.v-badge__badge').attributes().style).toContain(
      'bottom: -12px;',
    )
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set offset-x and match snapshot', () => {
    const props = {
      right: true,
      content: '10',
      offsetX: 12,
    }
    const cmp = mountFunction({ props })

    expect(cmp.find('.v-badge__badge').attributes().style).toContain(
      'right: -24px;',
    )
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set offset-y and match snapshot', () => {
    const props = {
      top: true,
      content: '10',
      offsetY: -12,
    }
    const cmp = mountFunction({ props })

    expect(cmp.find('.v-badge__badge').attributes().style).toContain(
      'top: 0px;',
    )
    expect(cmp.html()).toMatchSnapshot()
  })
})
