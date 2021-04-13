import { mount } from '@vue/test-utils'
import { VDataTable } from '../VDataTable'
import { cols, rows } from './mocks'
import 'regenerator-runtime/runtime'

describe('VDataTable', () => {
  let mountFunction: (options?: any) => any

  beforeEach(() => {
    mountFunction = (options = {}) => mount(VDataTable, { ...options })
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
  })

  it('should test column filter and match snapshot', async () => {
    cols[0].filterable = true

    const cmp = mountFunction({
      props: { cols, rows, stateOut: true },
    })

    const filterBtn = cmp.find('.v-data-table-col__actions-filter')

    expect(filterBtn.exists()).toBe(true)

    await filterBtn.trigger('click')
    const filter = cmp.find('.v-data-table-col__filter')
    const textField = cmp.find('.v-text-field__input')

    expect(textField.exists()).toBe(true)

    // await textField.trigger('input', 'Al')
    //
    // expect(cmp.emitted().filter).toHaveLength(1)
    expect(filter.exists()).toBe(true)
    expect(filter.isVisible()).toBe(true)
    // expect(cmp.find('.v-data-table__row').text()).toContain('Alex')
    expect(cmp.html()).toMatchSnapshot()
  })
})
