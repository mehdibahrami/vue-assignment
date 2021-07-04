import { shallowMount } from "@vue/test-utils";
import Map from "@/components/maps/LeafletMap.vue";

describe("LeafletMap", () => {
  let wrapper;

  it("renders correctly", () => {
    // shallow mounting the main component
    wrapper = shallowMount(Map, {
      global: {
        renderStubDefaultSlot: true,
      },
      props: {
        lat: 52.093448638916016,
        lng: 5.117378234863281,
        soc: 72.8,
      },
    });

    expect(wrapper.findComponent({ name: "LMap" }).exists()).toBeTruthy();
    expect(wrapper.findComponent({ name: "LTileLayer" }).exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });
});
