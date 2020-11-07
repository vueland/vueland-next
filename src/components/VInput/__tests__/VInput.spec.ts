import { mount, VueWrapper } from '@vue/test-utils'
import { VInput } from '../VInput'
import 'regenerator-runtime/runtime'


describe('VInput', () => {
  let mountFunction: (options?: any) => VueWrapper<any>

  beforeEach(() => {
    mountFunction = (options = {}) => mount(VInput, { ...options })
  })

  it('should mount component and match snapshot', () => {
    const cmp = mountFunction()
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set label and match snapshot', () => {
    const label = 'email'
    const cmp = mountFunction({ propsData: { label } })
    expect(cmp.find('.v-label').text()).toBe(label)
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set dirty state and match snapshot', () => {
    const cmp = mountFunction()

    expect(cmp.attributes().class).toContain('v-input--dirty')
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set color and match snapshot',  () => {
    const color = 'blue darken-2'
    const cmp = mountFunction({ propsData: { color } })
    const label = cmp.find('.v-label')

    expect(label.attributes().class).toContain('blue--text text--darken-2')
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set ')
})
