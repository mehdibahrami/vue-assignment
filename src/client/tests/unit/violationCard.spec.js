import { shallowMount } from "@vue/test-utils";
import ViolationsCard from "@/components/cards/ViolationsCard.vue";

describe("ViolationsCard", () => {
  let wrapper;

  beforeEach(() => {
    // shallow mounting the main component
    // Stub card component replacing with its template to load slotted component
    wrapper = shallowMount(ViolationsCard, {
      global: {
        stubs: {
          Card: {
            template: '<div class="card-body"><slot></slot></div>',
          },
        },
      },
      props: {
        title: "Last Three Speed Violations",
      },
    });
  });

  it("renders correctly", async () => {
    await wrapper.setProps({
      data: {
        badge: "11/23/2017, 15:14:17",
        leftTitle: "Speed",
        leftValue: 52,
        mainTitle: "Catharijnesingel",
        rightTitle: "Allowed Speed",
        rightValue: 45,
      },
    });

    expect(wrapper.find("div.main-title").text()).toBe("Catharijnesingel");
    expect(wrapper.find("span.badge-title").text()).toBe(
      "11/23/2017, 15:14:17"
    );
    expect(wrapper.find("div.value-box-title").text()).toBe("Speed:");
    expect(wrapper.find("div.value-box-margin").text()).toBe("52");
    expect(
      wrapper.find("div.value-box.value-box-margin>div.value-box-title").text()
    ).toBe("Allowed Speed:");
    expect(
      wrapper.find("div.value-box.value-box-margin>div.value-box-margin").text()
    ).toBe("45");
    expect(wrapper.element).toMatchSnapshot();
  });

  it("renders placeholder when data props is empty", async () => {
    expect(wrapper.find("div.empty-box").exists()).toBeTruthy();
  });
});
