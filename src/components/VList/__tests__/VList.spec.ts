import { mount, VueWrapper } from "@vue/test-utils";
import { VList } from "../index";

describe("VList", () => {
  let mountFunction: (options?: any) => VueWrapper<any>;

  beforeEach(() => {
    mountFunction = (options = {}) => mount(VList, { ...options });
  });

  it("should mount component and match snapshot", () => {
    const cmp = mountFunction();

    expect(cmp.html()).toMatchSnapshot();
  });
});
