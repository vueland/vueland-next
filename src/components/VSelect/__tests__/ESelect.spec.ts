import { mount } from '@vue/test-utils'
import { ESelect } from '../index'
import { items } from './mocks'
import 'regenerator-runtime'

describe('ESelect', () => {
  const mountFunction = (options = {}) => mount(ESelect as any, {
    ...options,
    attachTo: document.querySelector('.e-app') as HTMLElement
  })

  beforeEach(() => document.body.innerHTML = `<div class="e-app"></div>`)

  it('should mount component and match snapshot', async () => {
    mountFunction({ props: { items, valueKey: 'profession.programmer' } })
    // wait for mounting of selects list
    await new Promise(resolve => setTimeout(resolve))
      .then(() => {
        expect(document.body).toMatchSnapshot()
      })
  })

  it('should test displaying of select list', async () => {
    const wrapper = mountFunction({ props: { items, valueKey: 'name' } })
    // wait for mounting of select list
    await new Promise(resolve => setTimeout(resolve))

    await wrapper.find('.e-input__text-field').trigger('click')
    // wait
    await new Promise(resolve => setTimeout(resolve, 100))

    const menuContent = document.body.querySelector('.e-menu__content')!
    const contentStyle = menuContent.getAttribute('style')!

    expect(contentStyle.includes('display')).toBeFalsy()
  })

  it('should test "readonly" state', async () => {
    const wrapper = mountFunction({
      props: {
        readonly: true
      }
    })

    expect(wrapper.find('.e-select').attributes('class')).toContain('e-select--readonly')

    await wrapper.find('.e-input').trigger('click')
      .then(() => {
        const menuContent = document.body.querySelector('.e-menu__content')!
        const contentStyle = menuContent.getAttribute('style')!

        expect(contentStyle.includes('display: none;')).toBeTruthy()
      })
  })

  it('should test "disabled" state', async () => {
    const wrapper = mountFunction({
      props: {
        disabled: true
      }
    })

    expect(wrapper.find('.e-select').attributes('class')).toContain('e-select--disabled')

    await wrapper.find('.e-input').trigger('click')
      .then(() => {
        const menuContent = document.body.querySelector('.e-menu__content')!
        const contentStyle = menuContent.getAttribute('style')!

        expect(contentStyle.includes('display: none;')).toBeTruthy()
      })
  })
})
