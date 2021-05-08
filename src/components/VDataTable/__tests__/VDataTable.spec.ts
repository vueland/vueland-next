import { mount } from '@vue/test-utils'
import { VDataTable } from '../index'
// @ts-ignore
import { cols, rows } from './mocks.ts'
import 'regenerator-runtime/runtime'

describe('VDataTable', () => {
  let mountFunction: (options?: any) => any

  beforeEach(() => {
    mountFunction = (options = {}) =>
      mount(VDataTable, {
        ...options,
        global: {
          provide: {
            $options: null,
          },
        },
      })
  })

  it('should mount component and match snapshot', () => {
    const cmp = mountFunction()

    expect(cmp.html()).toMatchSnapshot()
  })

  it('should test color prop and match snapshot', () => {
    const cmp = mountFunction({
      props: { color: 'grey darken-3' },
    })

    expect(cmp.attributes().class).toContain('grey darken-3')
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should test dark prop and match snapshot', () => {
    cols[0].filterable = true
    const cmp = mountFunction({
      props: { cols, rows, dark: true },
    })

    const filter = cmp.find('.v-data-table-col__filter')

    expect(cmp.find('.v-data-table__cell').classes()).toContain('white--text')
    expect(filter.find('.v-input__field-slot').classes()).toContain(
      'white--text'
    )
    expect(filter.find('.v-icon').classes()).toContain('white--text')
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should test align center and match snapshot', () => {
    const cmp = mountFunction({
      props: { cols, rows, align: 'center' },
    })

    expect(cmp.find('.v-data-table__cell-content').classes()).toContain(
      'text-align--center'
    )
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should test align left and match snapshot', () => {
    const cmp = mountFunction({
      props: { cols, rows, align: 'left' },
    })

    expect(cmp.find('.v-data-table__cell-content').classes()).toContain(
      'text-align--left'
    )
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should test align left and match snapshot', () => {
    const cmp = mountFunction({
      props: { cols, rows, align: 'right' },
    })

    expect(cmp.find('.v-data-table__cell-content').classes()).toContain(
      'text-align--right'
    )
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should test cols prop and match snapshot', () => {
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

    const sortBtn = cmp.find('.v-data-table-col__actions-sort')

    expect(sortBtn.exists()).toBe(true)

    await sortBtn.trigger('click')

    const firstRow = rows[0]
    const lastRow = rows[rows.length - 1]

    expect(cmp.find('.v-data-table-col__actions-sort--active').exists()).toBe(
      true
    )
    expect(cmp.find('.v-data-table__row').text()).toContain(firstRow.name)

    // reverse sort
    await sortBtn.trigger('click')

    expect(cmp.find('.v-data-table__row').text()).toContain(lastRow.name)
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should test custom column sort', async () => {
    cols[0].sortable = true
    cols[0].sort = jest.fn()

    const cmp = mountFunction({
      props: { cols, rows },
    })

    expect(cmp.get('.v-data-table-col__actions-sort').exists()).toBe(true)
    const sortBtn = cmp.find('.v-data-table-col__actions-sort')

    await sortBtn.trigger('click')

    expect(cols[0].sort).toBeCalled()
    expect(cols[0].sort).toBeCalledWith(rows[1], rows[0])
  })

  it('should test table filter and match snapshot', async () => {
    cols[0].filterable = true
    cols[0].sortable = false

    const cmp = mountFunction({
      props: { cols, rows },
    })

    const nameColFilterBtn = cmp.find('.v-data-table-col__actions-filter')

    expect(nameColFilterBtn.exists()).toBe(true)

    await nameColFilterBtn.trigger('click')

    const nameColFilterTextField = cmp.find('.v-text-field__input')

    expect(nameColFilterTextField.exists()).toBe(true)

    nameColFilterTextField.element.value = 'Ben'

    await nameColFilterTextField.trigger('input')

    const tableRows = cmp.findAll('.v-data-table__row')

    expect(tableRows.length).toBe(1)
    expect(tableRows[0].text()).toContain('Ben')
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should test table custom filter and match snapshot', async () => {
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
    expect(nameColFilter.isVisible()).toBe(true)
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should test column custom filter', async () => {
    cols[0].filterable = true
    cols[0].filter = jest.fn()

    const cmp = mountFunction({
      props: { cols, rows },
    })

    const nameColFilterBtn = cmp.find('.v-data-table-col__actions-filter')
    expect(nameColFilterBtn.exists()).toBe(true)

    await nameColFilterBtn.trigger('click')

    const nameColFilter = cmp.find('.v-data-table-col__filter')
    const nameColFilterTextField = cmp.find('.v-text-field__input')

    expect(nameColFilterTextField.exists()).toBe(true)
    expect(nameColFilter.isVisible()).toBe(true)

    nameColFilterTextField.element.value = 'Alex'
    await nameColFilterTextField.trigger('input')

    expect(cols[0].filter).toHaveBeenCalledWith({ value: 'Alex', col: cols[0] })
  })

  it('should test show-sequence prop', () => {
    const cmp = mountFunction({
      props: { cols, rows, showSequence: true },
    })

    expect(cmp.find('.v-data-table-col__number').exists()).toBe(true)
    expect(cmp.findAll('.v-data-table__row-number')[0].text()).toContain('1')
    expect(cmp.findAll('.v-data-table__row-number')[1].text()).toContain('2')
  })

  it('should test show-checkbox prop', async () => {
    const cmp = mountFunction({
      props: { cols, rows, showCheckbox: true },
    })

    expect(cmp.find('.v-data-table-col__checkbox').exists()).toBe(true)
    expect(cmp.find('.v-data-table__row-checkbox').exists()).toBe(true)

    const row = cmp.find('.v-data-table__row')
    await row.find('.v-checkbox').trigger('click')

    expect(row.find('.v-checkbox').classes()).toContain('v-checkbox--checked')
  })

  it('should test header props to set color', () => {
    const headerProps = {
      contentColor: 'grey',
      color: 'red',
    }

    const cmp = mountFunction({
      props: {
        cols,
        rows,
        headerProps,
      },
    })

    const header = cmp.find('.v-data-table__header')

    expect(cmp.props().headerProps).toEqual(headerProps)
    expect(header.classes()).toContain(headerProps.color)
    expect(header.find('.v-data-table__cell').classes()).toContain(`grey--text`)
  })

  it('should test header props to set dark mode', () => {
    const headerProps = {
      dark: true,
    }

    const cmp = mountFunction({
      props: {
        cols,
        rows,
        headerProps,
      },
    })

    const header = cmp.find('.v-data-table__header')

    expect(header.find('.v-data-table__cell').classes()).toContain(
      'white--text'
    )
  })

  it('should test header props priority over table dark mode and color', () => {
    const headerProps = {
      contentColor: 'grey',
      color: 'red',
    }
    const cmp = mountFunction({
      props: {
        cols,
        rows,
        headerProps,
        dark: true,
        color: 'green',
      },
    })

    const header = cmp.find('.v-data-table__header')

    expect(cmp.props().headerProps).toEqual(headerProps)
    expect(header.classes()).toContain(headerProps.color)
    expect(header.find('.v-data-table__cell').classes()).toContain(
      `${headerProps.contentColor}--text`
    )
  })
})
