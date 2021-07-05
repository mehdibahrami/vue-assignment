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
            <Card :title="constants.speedGaugeChart.cardTitle">
              <GaugeChart
                :data="data.speed"
                :options="speedGaugeChartOptions"
              />
            </Card>
            <!-- Right column - SoC gauge chart -->
            <Card :title="constants.socGaugeChart.cardTitle">
              <GaugeChart :data="data.soc" :options="socGaugeChartOptions" />
            </Card>
          </div>
          <!-- Column grid -->
          <div class="grid-cols-1 grid-lg-cols-2 grid-sm-cols-2">
            <!-- Left column - Energy -->
            <StatisticsCard
              :title="constants.energyStatisticsCard.cardTitle"
              :statistic="data.energy"
              :unit="constants.energyStatisticsCard.cardUnit"
            />
            <!-- Right column - Odometer -->
            <StatisticsCard
              :title="constants.odometerStatisticsCard.cardTitle"
              :statistic="data.odo"
              :unit="constants.odometerStatisticsCard.cardUnit"
            />
          </div>
        </div>
      </div>
      <!-- Column grid -->
      <div class="grid-cols-1 grid-lg-cols-2 grid-sm-cols-2 grid-top-margin">
        <!-- Left column - Speed line chart -->
        <Card :title="constants.speedLineChart.cardTitle">
          <LineChart
            :title="constants.speedLineChart.chartTitle"
            :data="{ x: data.time, y: data.speed }"
            :options="speedLineChartOptions"
            :interval="speedLineChartInterval"
            :setColor="setSpeedLineChartColor"
          />
        </Card>
        <!-- Right column - SoC line chart -->
        <Card :title="constants.socLineChart.cardTitle">
          <LineChart
            :type="constants.socLineChart.chartType"
            :title="constants.socLineChart.chartTitle"
            :data="{ x: data.time, y: data.soc }"
            :options="socLineChartOptions"
            :interval="speedLineChartInterval"
            :setColor="setSocLineChartColor"
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
import {
  SPEED_LINE_CHART_INTERVAL,
  SOC_LINE_CHART_INTERVAL,
} from "@/constants";
import {
  speedGaugeChartOptions,
  socGaugeChartOptions,
  speedLineChartOptions,
  setSpeedLineChartColor,
  socLineChartOptions,
  setSocLineChartColor,
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
      setSpeedLineChartColor,
      socLineChartOptions,
      setSocLineChartColor,
      speedLineChartInterval: SPEED_LINE_CHART_INTERVAL,
      socLineChartInterval: SOC_LINE_CHART_INTERVAL,
      constants: {
        speedGaugeChart: {
          cardTitle: "Speed",
        },
        socGaugeChart: {
          cardTitle: "State of Charge",
        },
        energyStatisticsCard: {
          cardTitle: "Energy",
          cardUnit: "kW",
        },
        odometerStatisticsCard: {
          cardTitle: "Odometer",
          cardUnit: "km",
        },
        speedLineChart: {
          cardTitle: "Speed (km/h)",
          chartTitle: "Speed",
        },
        socLineChart: {
          cardTitle: "State of Charge (%)",
          chartTitle: "SoC",
          chartType: "area",
        },
      },
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
