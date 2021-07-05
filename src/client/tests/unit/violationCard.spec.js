import { shallowMount } from "@vue/test-utils";
import ViolationCard from "@/components/cards/ViolationCard.vue";

describe("ViolationCard", () => {
  let wrapper;

  it("renders correctly", () => {
    // shallow mounting the main component
    // Stub card component replacing with its template to load slotted component
    wrapper = shallowMount(ViolationCard, {
      global: {
        stubs: {
          Card: {
            template: '<div class="card-body"><slot></slot></div>',
          },
        },
      },
      props: {
        badge: "11/23/2017, 15:14:17",
        leftTitle: "Speed",
        leftValue: 52,
        mainTitle: "Catharijnesingel",
        rightTitle: "Allowed Speed",
        rightValue: 45,
      },
    });

    expect(wrapper.element).toMatchSnapshot();
  });
});
