import { mount, VueWrapper } from "@vue/test-utils";
import { VSelect } from "../index";

describe("VSelect", () => {
  let mountFunction: (options?: any) => VueWrapper<any>;

  beforeEach(() => {
    mountFunction = (options = {}) => mount(VSelect, { ...options });
  });

  it("should mount component and match snapshot", () => {
    const cmp = mountFunction();

    expect(cmp.html()).toMatchSnapshot();
  });
});
