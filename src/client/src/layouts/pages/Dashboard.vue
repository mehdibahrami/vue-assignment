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
            <!-- Left column - Speed gauge chart -->
            <Card title="Speed">
              <GaugeChart
                :data="data.speed"
                :options="speedGaugeChartOptions"
              />
            </Card>
            <!-- Right column - SoC -->
            <Card title="State of Charge">
              <GaugeChart :data="data.soc" :options="socGaugeChartOptions" />
            </Card>
          </div>
          <!-- Column grid -->
          <div class="grid-cols-1 grid-lg-cols-2 grid-sm-cols-2">
            <!-- Left column - Energy -->
            <StatisticsCard title="Energy" :statistic="data.energy" unit="kW" />
            <!-- Right column - Odometer -->
            <StatisticsCard title="Odometer" :statistic="data.odo" unit="km" />
          </div>
        </div>
      </div>
      <!-- Column grid -->
      <div class="grid-cols-1 grid-lg-cols-2 grid-sm-cols-2 grid-top-margin">
        <!-- Left column - Speed line chart -->
        <Card title="Speed (km/h)">
          <LineChart
            title="Speed"
            :data="{ x: data.time, y: data.speed }"
            :options="speedLineChartOptions"
            :interval="speedLineChartInterval"
          />
        </Card>
      </div>
    </div>
  </main>
</template>

<script>
import {
  Card,
  LeafletMap,
  GaugeChart,
  StatisticsCard,
  LineChart,
} from "@/components";
import { SPEED_LINE_CHART_INTERVAL } from "@/constants";
import {
  speedGaugeChartOptions,
  socGaugeChartOptions,
  speedLineChartOptions,
} from "@/components/charts/chartsOptions.js";

export default {
  name: "Dashboard",
  components: {
    Card,
    LeafletMap,
    GaugeChart,
    StatisticsCard,
    LineChart,
  },
  props: {
    data: Object,
  },
  data() {
    return {
      speedGaugeChartOptions,
      socGaugeChartOptions,
      speedLineChartOptions,
      speedLineChartInterval: SPEED_LINE_CHART_INTERVAL,
    };
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
  padding-bottom: 2rem;
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
