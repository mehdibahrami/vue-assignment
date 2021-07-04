import { shallowMount } from "@vue/test-utils";
import App from "@/App.vue";

describe("App", () => {
  let wrapper;

  beforeEach(() => {
    // set env values
    process.env = {
      VUE_APP_WEBSOCKET_URL: "ws://localhost:3000",
    };
  });
  afterAll((done) => {
    done();
  });

  it("renders correctly", () => {
    // shallow mounting the main component
    wrapper = shallowMount(App);

    expect(wrapper.findComponent({ name: "Header" }).exists()).toBeTruthy();
    expect(wrapper.findComponent({ name: "Dashboard" }).exists()).toBeTruthy();
    expect(wrapper.findComponent({ name: "Footer" }).exists()).toBeTruthy();
    expect(wrapper.element).toMatchSnapshot();
  });

  it("connects to websocket", () => {
    // mocking websocket using jest
    const connectToWebsocket = jest.spyOn(App.methods, ["connectToWebsocket"]);
    // shallow mounting the main component
    shallowMount(App);

    expect(connectToWebsocket).toHaveBeenCalledTimes(1);
  });
});
