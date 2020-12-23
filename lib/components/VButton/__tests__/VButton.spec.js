import { mount } from '@vue/test-utils';
import { VButton } from '../VButton';
describe('VButton', () => {
  let mountFunction;
  beforeEach(() => {
    mountFunction = (options = {}) => mount(VButton, { ...options
    });
  });
  it('should mount component and match snapshot', () => {
    const cmp = mountFunction();
    expect(cmp.html()).toMatchSnapshot();
  });
  it('should set color and match snapshot', () => {
    const color = 'red darken-3';
    const cmp = mountFunction({
      propsData: {
        color
      }
    });
    expect(cmp.attributes().class).toContain(color);
    expect(cmp.html()).toMatchSnapshot();
  });
  it('should set label and match snapshot', () => {
    const label = 'test';
    const cmp = mountFunction({
      propsData: {
        label
      }
    });
    expect(cmp.find('.v-button__label').text()).toContain(label);
    expect(cmp.html()).toMatchSnapshot();
  });
});
//# sourceMappingURL=VButton.spec.js.map