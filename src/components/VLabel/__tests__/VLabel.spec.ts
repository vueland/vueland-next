import { mount, VueWrapper } from "@vue/test-utils";
import { VLabel } from "../VLabel";

describe("VLabel", () => {
  let mountFunction: (options?: any) => VueWrapper<any>;

  beforeEach(() => {
    mountFunction = (options = {}) => mount(VLabel, { ...options });
  });

  it("should mount component and match snapshot", () => {
    const cmp = mountFunction();

    expect(cmp.html()).toMatchSnapshot();
  });
});
