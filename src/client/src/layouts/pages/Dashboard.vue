<template>
  <main class="main">
    <div class="container">
      <!-- Column grid -->
      <div class="grid-cols-1 grid-lg-cols-2">
        <!-- Left column -->
        <div class="grid-cols-1">
          <Card :hasPadding="false">
            <LeafletMap
              :lat="data.gps.lat"
              :lng="data.gps.lng"
              :soc="data.soc"
            />
          </Card>
        </div>
        <!-- Right column -->
        <div class="grid-cols-1">
          <!-- Column grid -->
          <div class="grid-cols-1 grid-lg-cols-2 grid-sm-cols-2">
            <!-- Left column - Speed -->
            <Card title="Speed">
              <GaugeChart
                :data="data.speed"
                :colors="speedGaugeChartColors"
                label="km/h"
              />
            </Card>
            <!-- Right column - SoC -->
            <Card title="State of Charge">
              <GaugeChart
                :data="data.soc"
                :colors="socGaugeChartColors"
                label="%"
              />
            </Card>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { Card, LeafletMap, GaugeChart } from "@/components";
import { MID_CHARGE, LOW_CHARGE, SPEED_LIMIT } from "@/constants";

export default {
  name: "Dashboard",
  components: {
    Card,
    LeafletMap,
    GaugeChart,
  },
  props: {
    data: Object,
  },
  computed: {
    speedGaugeChartColors: function () {
      // Set speed guage chart color based on speed value
      return [
        function ({ value }) {
          if (value <= SPEED_LIMIT) {
            return "#7ca363";
          } else {
            return "#AD6D6D";
          }
        },
      ];
    },
    socGaugeChartColors: function () {
      // Set soc guage chart color based on soc value
      return [
        function ({ value }) {
          if (value <= LOW_CHARGE) {
            return "#AD6D6D";
          } else if (value > LOW_CHARGE && value <= MID_CHARGE) {
            return "#C38540";
          } else {
            return "#7ca363";
          }
        },
      ];
    },
  },
};
</script>

<style scoped lang="scss">
.main {
  margin-top: -6rem;
}

.container {
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 3rem;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .container {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
</style>
