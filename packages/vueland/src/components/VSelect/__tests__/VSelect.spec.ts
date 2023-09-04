import { mount } from '@vue/test-utils'
import { VSelect } from '../index'
import { items } from './mocks'
import 'regenerator-runtime'

describe('VSelect', () => {
  const mountFunction = (options = {}) =>
    mount(VSelect as any, {
      ...options,
      attachTo: document.querySelector('.v-app') as HTMLElement,
    })

  beforeEach(() => (document.body.innerHTML = `<div class="v-app"></div>`))

  it('should mount component and match snapshot', async () => {
    mountFunction({ props: { items, valueKey: 'profession.programmer' } })
    // wait for mounting of selects list
    await new Promise((resolve) => setTimeout(resolve)).then(() => {
      expect(document.body).toMatchSnapshot()
    })
  })

  it('should test displaying of select list', async () => {
    const wrapper = mountFunction({ props: { items, valueKey: 'name' } })
    // wait for mounting of select list
    await new Promise((resolve) => setTimeout(resolve))

    await wrapper.find('.v-input__text-field').trigger('click')
    // wait
    await new Promise((resolve) => setTimeout(resolve, 200))

    const menuContent = document.body.querySelector('.v-menu__content')!
    const contentStyle = menuContent.getAttribute('style')!

    expect(contentStyle.includes('display')).toBeFalsy()
  })

  it('should test "readonly" state', async () => {
    const wrapper = mountFunction({
      props: {
        readonly: true,
      },
    })

    expect(wrapper.find('.v-select').attributes('class')).toContain(
      'v-select--readonly'
    )

    await wrapper
      .find('.v-input')
      .trigger('click')
      .then(() => {
        const menuContent = document.body.querySelector('.v-menu__content')!
        const contentStyle = menuContent.getAttribute('style')!

        expect(contentStyle.includes('display: none;')).toBeTruthy()
      })
  })

  it('should test "disabled" state', async () => {
    const wrapper = mountFunction({
      props: {
        disabled: true,
      },
    })

    expect(wrapper.find('.v-select').attributes('class')).toContain(
      'v-select--disabled'
    )

    await wrapper
      .find('.v-input')
      .trigger('click')
      .then(() => {
        const menuContent = document.body.querySelector('.v-menu__content')!
        const contentStyle = menuContent.getAttribute('style')!

        expect(contentStyle.includes('display: none;')).toBeTruthy()
      })
  })
})
