import { mount } from "@vue/test-utils";
import LineChart from "@/components/charts/LineChart.vue";
import {
  speedLineChartOptions,
  setSpeedLineChartColor,
} from "@/components/charts/chartsOptions.js";
import { SPEED_LINE_CHART_INTERVAL } from "@/constants";

describe("LineChart", () => {
  let wrapper;

  it("renders correctly", () => {
    // shallow mounting the main component
    wrapper = mount(LineChart, {
      props: {
        title: "Speed",
        data: { x: 1511436339000, y: 4 },
        options: speedLineChartOptions,
        interval: SPEED_LINE_CHART_INTERVAL,
        setColor: setSpeedLineChartColor,
      },
    });

    expect(wrapper.findComponent({ name: "apexchart" }).exists()).toBeTruthy();
    expect(wrapper.find(".vue-apexcharts").exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });
});
