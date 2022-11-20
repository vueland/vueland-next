import { mount } from '@vue/test-utils'
import { VMenu } from '../index'

describe('VMenu', () => {
  let mountFunction: (options?: any) => any

  beforeEach(() => {
    mountFunction = (options = {}) => mount(VMenu, { ...options })
  })

  test('should mount component and match snapshot', () => {
    const cmp = mountFunction()

    expect(cmp.html()).toMatchSnapshot()
  })
})
