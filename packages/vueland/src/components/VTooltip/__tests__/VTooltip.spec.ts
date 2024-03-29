import { mount, VueWrapper } from '@vue/test-utils'
import { VTooltip } from '../index'
import 'regenerator-runtime/runtime'

const activatorSlot = `
        <template v-slot:activator="{ on }">
          <div class="activator" v-on="on">
          </div>
        </template>`

const defaultSlot = '<span>some text</span>'

type MountOptions = InstanceType<typeof VTooltip>;

describe('VTooltip', () => {
  let mountFunction: (options?: any) => VueWrapper<MountOptions>

  beforeEach(() => {
    mountFunction = (options = {}) => mount(VTooltip, {
      ...options,
      attachTo: document.body,
    })
  })

  it('should mount component and match snapshot', () => {
    const slots = {
      activator: activatorSlot,
      default: defaultSlot,
    }

    mountFunction({ slots })

    const el = document.querySelector('.v-tooltip')

    expect(el).toBeTruthy()
    // expect(cmp.find(".v-tooltip").attributes().style).toBe(
    //   "display: none;"
    // );
    expect(document.body).toMatchSnapshot()
  })

  it('should set activator and match snapshot', () => {
    const slots = {
      activator: activatorSlot,
      default: defaultSlot,
    }
    const cmp = mountFunction({ slots })

    expect(cmp.html()).toMatchSnapshot()
  })

  it('should trigger mouseenter event, show tooltip and match snapshot', async () => {
    const slots = {
      activator: activatorSlot,
      default: defaultSlot,
    }
    const cmp = mountFunction({ slots })

    await cmp.find('.activator').trigger('mouseenter')

    // expect(cmp.find(".v-tooltip").attributes().style).toBe(undefined);
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should trigger mouseleave event, hide tooltip and match snapshot', async () => {
    const slots = {
      activator: activatorSlot,
      default: defaultSlot,
    }
    const cmp = mountFunction({ slots })

    const el = document.querySelector('.v-tooltip')! as HTMLElement

    await cmp.find('.activator').trigger('mouseenter')
    await cmp.find('.activator').trigger('mouseleave')

    expect(getComputedStyle(el).display).toEqual('none')
    expect(document.body).toMatchSnapshot()
  })

  it('should render component with top and match snapshot', async () => {
    const slots = {
      activator: activatorSlot,
      default: defaultSlot,
    }
    const props = {
      top: true,
    }
    const cmp = mountFunction({ props, slots })

    const el = document.querySelector('.v-tooltip--top')!

    expect(cmp.props().top).toBe(true)
    expect(el).toBeTruthy()
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should render component with right and match snapshot', () => {
    const slots = {
      activator: activatorSlot,
      default: defaultSlot,
    }
    const props = {
      right: true,
    }
    const cmp = mountFunction({ props, slots })

    const el = document.querySelector('.v-tooltip--right')!

    expect(cmp.props().right).toBe(true)
    expect(el).toBeTruthy()
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should render component with bottom and match snapshot', () => {
    const slots = {
      activator: activatorSlot,
      default: defaultSlot,
    }
    const props = {
      bottom: true,
    }
    const cmp = mountFunction({ props, slots })

    const el = document.querySelector('.v-tooltip--bottom')!

    expect(cmp.props().bottom).toBe(true)
    expect(el).toBeTruthy()
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should render component with left and match snapshot', () => {
    const slots = {
      activator: activatorSlot,
      default: defaultSlot,
    }
    const props = {
      left: true,
    }
    const cmp = mountFunction({ props, slots })

    const el = document.querySelector('.v-tooltip--left')!

    expect(cmp.props().left).toBe(true)
    expect(el).toBeTruthy()
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set z-index and match snapshot', async () => {
    const slots = {
      activator: activatorSlot,
      default: defaultSlot,
    }
    const props = {
      zIndex: 100,
    }
    const cmp = mountFunction({ props, slots })

    const el = document.querySelector('.v-tooltip')! as HTMLElement

    expect(el).toBeTruthy()
    expect(cmp.props().zIndex).toEqual(100)
  })

  it('should set offsetX and match snapshot', () => {
    const slots = {
      activator: activatorSlot,
      default: defaultSlot,
    }
    const props = {
      offsetX: 100,
    }
    const cmp = mountFunction({ props, slots })
    expect(cmp.props().offsetX).toEqual(100)
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set offsetY and match snapshot', () => {
    const slots = {
      activator: activatorSlot,
      default: defaultSlot,
    }
    const props = {
      offsetY: 150,
    }
    const cmp = mountFunction({ props, slots })
    expect(cmp.props().offsetY).toEqual(150)
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set min width and match snapshot', () => {
    const slots = {
      activator: activatorSlot,
      default: defaultSlot,
    }
    const props = {
      minWidth: 150,
    }
    const cmp = mountFunction({ props, slots })

    const el = document.querySelector('.v-tooltip')!

    expect(el).toBeTruthy()
    expect(cmp.props().minWidth).toEqual(150)
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set max width and match snapshot', () => {
    const slots = {
      activator: activatorSlot,
      default: defaultSlot,
    }
    const props = {
      maxWidth: 270,
    }
    const cmp = mountFunction({ props, slots })

    const el = document.querySelector('.v-tooltip')!

    expect(el).toBeTruthy()
    expect(cmp.props().maxWidth).toEqual(270)
    expect(cmp.html()).toMatchSnapshot()
  })
})
