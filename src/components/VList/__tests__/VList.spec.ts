import { mount, VueWrapper } from '@vue/test-utils'
import { VList, VListGroup, VListItem } from '../index'
import { h } from 'vue'

describe('VList', () => {
  let mountFunction: (options?: any) => VueWrapper<any>

  beforeEach(() => {
    mountFunction = (options = {}) => mount(VList, {
      ...options,
      slots: {
        default: h(VListGroup, {
          color: 'primary'
        }, [h(VListItem, 'first'), h(VListItem, 'second')])
      }
    })
  })

  it('should mount component and match snapshot', () => {
    const cmp = mountFunction()

    expect(cmp.html()).toMatchSnapshot()
  })
})
