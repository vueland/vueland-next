import { mount } from "@vue/test-utils";
import { VButton } from "../VButton";
import "regenerator-runtime/runtime";

describe("VButton", () => {
  let mountFunction: (options?: any) => any;

  beforeEach(() => {
    mountFunction = (options = {}) => mount(VButton, { ...options });
  });

  it("should mount component and match snapshot", () => {
    const cmp = mountFunction();

    expect(cmp.html()).toMatchSnapshot();
  });

  it("should set color and match snapshot", () => {
    const cmp = mountFunction({
      props: {
        color: "red darken-3",
      },
    });

    expect(cmp.attributes().class).toContain("red darken-3");
    expect(cmp.html()).toMatchSnapshot();
  });

  it("should set button width and match snapshot", () => {
    const cmp = mountFunction({
      props: {
        width: 150,
      },
    });

    expect(cmp.attributes().style).toContain("min-width: 150px;");
    expect(cmp.html()).toMatchSnapshot();
  });

  it("should set label and match snapshot", () => {
    const cmp = mountFunction({
      props: {
        label: "test",
      },
    });

    expect(cmp.find(".v-button__label").text()).toContain("test");
    expect(cmp.html()).toMatchSnapshot();
  });

  it("should set disabled and match snapshot", async () => {
    const stub = jest.fn();
    const cmp = mountFunction({
      props: {
        disabled: true,
        onClick: stub,
      },
    });

    await cmp.trigger("click");

    expect(stub).toBeCalledTimes(0);
    expect(cmp.find(".v-button--disabled").exists()).toBe(true);
    expect(cmp.html()).toMatchSnapshot();
  });
});
