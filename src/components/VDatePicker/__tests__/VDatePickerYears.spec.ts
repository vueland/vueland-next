import { mount, VueWrapper } from '@vue/test-utils'
import { VDatePickerYears } from '../VDatePickerYears'
import 'regenerator-runtime/runtime'

describe('VYears', () => {
  let mountFunction: (options?: any) => VueWrapper<any>

  beforeEach(() => {
    mountFunction = (options = {}) => mount(VDatePickerYears, { ...options })
  })

  it('should mount component and match snapshot', () => {
    const cmp = mountFunction()

    expect(cmp.html()).toMatchSnapshot()
  })

  it('should set year prop and match snapshot', () => {
    const cmp = mountFunction({
      props: {
        year: 2020,
      },
    })
    const cells = cmp.findAll('.v-date-picker-years__cell')

    expect(cmp.props().year).toEqual(2020)
    expect(cells.length).toEqual(20)
    expect(cmp.html()).toMatchSnapshot()
  })

  it('should test year update event', async () => {
    const stub = jest.fn()
    const cmp = mountFunction({
      props: {
        year: 2021,
        ['onUpdate:year']: stub,
      },
    })

    const cells = cmp.findAll('.v-date-picker-years__cell')
    await cells[1].trigger('click')

    expect(stub).toBeCalledTimes(1)
    expect(stub).toBeCalledWith(2022)
  })
})
