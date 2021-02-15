import { mount } from '@vue/test-utils'
import { VDataTable } from '../VDataTable'
import 'regenerator-runtime/runtime'

// const cols = [
//
// ]
//
//
// const rows: [
//
// ]

describe('VDataTable', () => {
  let mountFunction: (options?: any) => any

  beforeEach(() => {
    mountFunction = (options = {}) => mount(VDataTable, { ...options })
  })

  it('should mound component and match snapshot', () => {
    const cmp = mountFunction()

    expect(cmp.html()).toMatchSnapshot()
  })
})
