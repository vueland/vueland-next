import { mount } from '@vue/test-utils';
import { VList } from '../VList';
describe('VList', () => {
  let mountFunction;
  beforeEach(() => {
    mountFunction = (options = {}) => mount(VList, { ...options
    });
  });
  it('should mount component and match snapshot', () => {
    const cmp = mountFunction();
    expect(cmp.html()).toMatchSnapshot();
  });
});
//# sourceMappingURL=VList.spec.js.map