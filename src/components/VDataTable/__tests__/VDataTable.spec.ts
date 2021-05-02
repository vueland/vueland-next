import { mount } from '@vue/test-utils'
import { VDataTable } from '../index'
// @ts-ignore
import { cols, rows } from './mocks.ts'
import 'regenerator-runtime/runtime'

describe('VDataTable', () => {
  let mountFunction: (options?: any) => any

  beforeEach(() => {
    mountFunction = (options = {}) => mount(VDataTable, {
      ...options,
      global: {
        provide: {
          $options: null,
        },
      },
    })
  })

  it('should mound component and match snapshot', () => {
    const cmp = mountFunction()

    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set cols and match snapshot', () => {
    const cmp = mountFunction({
      props: { cols },
    })

    expect(cmp.find('.v-data-table-col').exists()).toBe(true)
    expect(cmp.get('.v-data-table-col__title').text()).toBe('Name')
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should test column sort and match snapshot', async () => {
    cols[0].sortable = true

    const cmp = mountFunction({
      props: { cols, rows },
    })

    expect(cmp.find('.v-data-table-col__actions-sort').exists()).toBe(true)
    expect(cmp.find('.v-data-table__row').text()).toContain('Ben')

    await cmp.find('.v-data-table-col__actions-sort').trigger('click')

    expect(cmp.find('.v-data-table-col__actions-sort--active').exists()).toBe(
      true,
    )
    expect(cmp.find('.v-data-table__row').text()).toContain('Alex')

    expect(cmp.html()).toMatchSnapshot()
    await cmp.find('.v-data-table-col__actions-sort').trigger('click')
  })

  it('should test column filter and match snapshot', async () => {
    cols[0].filterable = true
    cols[0].sortable = false
    const value = 'Alex'

    const cmp = mountFunction({
      props: { cols, rows },
    })

    const nameColFilterBtn = cmp.find('.v-data-table-col__actions-filter')

    expect(nameColFilterBtn.exists()).toBe(true)

    await nameColFilterBtn.trigger('click')

    const nameColFilter = cmp.find('.v-data-table-col__filter')
    const nameColFilterTextField = cmp.find('.v-text-field__input')

    expect(nameColFilterTextField.exists()).toBe(true)

    nameColFilterTextField.element.value = value

    await nameColFilterBtn.trigger('input')

    // expect(cmp.find('.v-data-table__row').text()).toContain('Alex')
    expect(nameColFilter.exists()).toBe(true)
    expect(nameColFilter.isVisible()).toBe(true)
  })

  it('should test column custom filter and match snapshot', async () => {
    cols[0].filterable = true
    cols[0].sortable = false
    const stub = jest.fn()
    const value = 'John'

    const cmp = mountFunction({
      props: { cols, rows, customFilter: stub },
    })

    const nameColFilterBtn = cmp.find('.v-data-table-col__actions-filter')

    expect(nameColFilterBtn.exists()).toBe(true)

    await nameColFilterBtn.trigger('click')
    const nameColFilter = cmp.find('.v-data-table-col__filter')
    const nameColFilterTextField = cmp.find('.v-text-field__input')

    expect(nameColFilterTextField.exists()).toBe(true)

    nameColFilterTextField.element.value = value

    await nameColFilterTextField.trigger('input')

    expect(stub).toHaveBeenCalledWith({ name: value })
    expect(nameColFilter.exists()).toBe(true)
    expect(nameColFilter.isVisible()).toBe(true)
    expect(cmp.html()).toMatchSnapshot()
  })
})
