import { mount } from "@vue/test-utils";
import GaugeChart from "@/components/charts/GaugeChart.vue";
import { speedGaugeChartOptions } from "@/components/charts/chartsOptions.js";

describe("GaugeChart", () => {
  let wrapper;

  it("renders correctly", () => {
    // shallow mounting the main component
    wrapper = mount(GaugeChart, {
      props: {
        options: speedGaugeChartOptions,
        data: 4,
      },
    });

    expect(wrapper.findComponent({ name: "apexchart" }).exists()).toBeTruthy();
    expect(wrapper.find(".vue-apexcharts").exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });
});
