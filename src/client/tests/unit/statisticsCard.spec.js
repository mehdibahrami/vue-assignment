import { shallowMount } from "@vue/test-utils";
import StatisticsCard from "@/components/cards/StatisticsCard.vue";

describe("StatisticsCard", () => {
  let wrapper;

  it("renders correctly", () => {
    // shallow mounting the main component
    // Stub card component replacing with its template to load slotted component
    wrapper = shallowMount(StatisticsCard, {
      global: {
        stubs: {
          Card: {
            template: '<div class="card-body"><slot></slot></div>',
          },
        },
      },
      props: {
        title: "Energy",
        statistic: 53.2,
        unit: "kW",
      },
    });

    expect(wrapper.find("div.statistic").text()).toBe("53.2kW");
    expect(wrapper.element).toMatchSnapshot();
  });
});
