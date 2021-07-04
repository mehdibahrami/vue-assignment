import { shallowMount } from "@vue/test-utils";
import Header from "@/layouts/header/Header.vue";

describe("Header", () => {
  let wrapper;

  beforeEach(() => {
    // shallow mounting the main component
    wrapper = shallowMount(Header);
  });

  it("renders correctly", () => {
    expect(
      wrapper.findComponent({ name: "HorizontalNavbarMenu" }).exists()
    ).toBeTruthy();
    expect(
      wrapper.findComponent({ name: "VerticalNavbarMenu" }).exists()
    ).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it("checks logo image exists", () => {
    const logo = wrapper.findAll("img.logo");
    expect(logo.length).toBe(1);
  });

  it("by default, the menu should be closed", () => {
    expect(wrapper.vm.isMenuOpen).toBe(false);
  });

  it("opens menu when pressing the menu button", () => {
    const menuButton = wrapper.find(".mobile-menu-button");
    menuButton.trigger("click");
    expect(wrapper.vm.isMenuOpen).toBe(true);
  });

  it("closes menu when the menu is open and pressing menu button", async () => {
    await wrapper.setData({ isMenuOpen: true });
    const menuButton = wrapper.find(".mobile-menu-button");
    menuButton.trigger("click");
    expect(wrapper.vm.isMenuOpen).toBe(false);
  });
});
