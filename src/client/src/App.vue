<template>
  <Header />
  <Footer />
</template>

<script>
import { Header, Footer } from "@/layouts";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      vehicleStatus: {
        time: 0,
        energy: 0,
        gps: {
          lat: 0,
          lng: 0,
        },
        odo: 0,
        speed: 0,
        soc: 0,
      },
    };
  },
  created() {
    // Connect to WebSocket
    this.connectToWebsocket();
  },
  methods: {
    connectToWebsocket() {
      // Create a new Webscoket
      const connection = new WebSocket(process.env.VUE_APP_WEBSOCKET_URL);
      // WebSocket is open
      connection.onopen = () => {
        console.log("WebSocket is open now.");
      };
      // WebSocket message received
      connection.onmessage = ({ data }) => {
        this.websocketDataParser(data);
      };
      // Error event occurs on the WebSocket
      connection.onerror = (error) => {
        console.log("WebSocket error observed:", error);
      };
    },
    websocketDataParser(data) {
      // Parse the WebSocket data
      const jsonData = JSON.parse(data);
      // Split the GPS data to an array
      const location = jsonData.gps.split("|");
      // Store the parsed data
      this.vehicleStatus = {
        time: parseInt(jsonData.time),
        energy: parseFloat(jsonData.energy),
        gps: {
          lat: parseFloat(location[0]),
          lng: parseFloat(location[1]),
        },
        odo: parseFloat(jsonData.odo),
        speed: parseInt(jsonData.speed),
        soc: parseFloat(jsonData.soc),
      };
    },
  },
};
</script>
