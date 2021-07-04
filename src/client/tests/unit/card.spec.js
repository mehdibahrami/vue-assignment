import { shallowMount } from "@vue/test-utils";
import Card from "@/components/cards/Card.vue";

describe("Card", () => {
  let wrapper;

  it("renders correctly", () => {
    // shallow mounting the main component
    wrapper = shallowMount(Card, {
      props: {
        title: "Speed",
      },
    });

    expect(wrapper.find("h3").text()).toBe("Speed");
    expect(wrapper.element).toMatchSnapshot();
  });
});
