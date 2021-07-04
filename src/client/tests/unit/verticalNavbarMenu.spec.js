import { shallowMount } from "@vue/test-utils";
import VerticalNavbarMenu from "@/layouts/header/VerticalNavbarMenu.vue";

describe("VerticalNavbarMenu", () => {
  let wrapper;

  beforeEach(() => {
    // shallow mounting the main component
    wrapper = shallowMount(VerticalNavbarMenu, {
      props: {
        isOpen: true,
        items: [
          {
            url: "/",
            title: "Dashboard",
          },
        ],
      },
    });
  });

  it("renders correctly", () => {
    expect(
      wrapper.find("a.navbar-vertical-selected-button").attributes(["href"])
    ).toBe("/");
    expect(wrapper.find("a.navbar-vertical-selected-button").text()).toBe(
      "Dashboard"
    );
    expect(wrapper.element).toMatchSnapshot();
  });

  it("should be displayed when isOpen prop is true", () => {
    expect(wrapper.find(".navbar-vertical-menu").exists()).toBeTruthy();
  });

  it("should not be displayed when isOpen prop is false", async () => {
    await wrapper.setProps({ isOpen: false });

    expect(wrapper.find(".navbar-vertical-menu").exists()).toBe(false);
  });
});
