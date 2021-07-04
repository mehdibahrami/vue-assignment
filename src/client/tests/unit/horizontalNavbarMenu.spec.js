import { shallowMount } from "@vue/test-utils";
import HorizontalNavbarMenu from "@/layouts/header/HorizontalNavbarMenu.vue";

describe("HorizontalNavbarMenu", () => {
  let wrapper;

  it("renders correctly", () => {
    // shallow mounting the main component
    wrapper = shallowMount(HorizontalNavbarMenu, {
      props: {
        items: [
          {
            url: "/",
            title: "Dashboard",
          },
        ],
      },
    });

    expect(
      wrapper.find("a.navbar-horizontal-selected-button").attributes(["href"])
    ).toBe("/");
    expect(wrapper.find("a.navbar-horizontal-selected-button").text()).toBe(
      "Dashboard"
    );
    expect(wrapper.element).toMatchSnapshot();
  });
});
