import { shallowMount } from "@vue/test-utils";
import Dashboard from "@/layouts/pages/Dashboard.vue";

describe("Dashboard", () => {
  let wrapper;

  it("renders correctly", () => {
    // shallow mounting the main component
    // Stub card component replacing with its template to load slotted components
    wrapper = shallowMount(Dashboard, {
      global: {
        stubs: {
          Card: {
            template: '<div class="card-body"><slot></slot></div>',
          },
        },
      },
      props: {
        data: {
          energy: 53.2,
          gps: {
            lat: 52.093448638916016,
            lng: 5.117378234863281,
          },
          odo: 88526.414,
          soc: 72.8,
          speed: 4,
          time: 1511436339000,
        },
      },
    });

    expect(wrapper.findComponent({ name: "LeafletMap" }).exists()).toBeTruthy();
    expect(wrapper.findComponent({ name: "GaugeChart" }).exists()).toBeTruthy();
    expect(
      wrapper.findComponent({ name: "StatisticsCard" }).exists()
    ).toBeTruthy();
    expect(wrapper.findComponent({ name: "LineChart" }).exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });
});
