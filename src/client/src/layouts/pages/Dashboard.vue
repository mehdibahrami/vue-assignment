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
            <Card :title="cardTitles.speedGaugeChart">
              <GaugeChart
                :data="data.speed"
                :options="speedGaugeChartOptions"
              />
            </Card>
            <!-- Right column - SoC gauge chart -->
            <Card :title="cardTitles.socGaugeChart">
              <GaugeChart :data="data.soc" :options="socGaugeChartOptions" />
            </Card>
          </div>
          <!-- Column grid -->
          <div class="grid-cols-1 grid-lg-cols-2 grid-sm-cols-2">
            <!-- Left column - Energy -->
            <StatisticsCard
              :title="cardTitles.energyStatisticsCard"
              :statistic="data.energy"
              :unit="cardUnits.energyStatisticsCard"
            />
            <!-- Right column - Odometer -->
            <StatisticsCard
              :title="cardTitles.odometerStatisticsCard"
              :statistic="data.odo"
              :unit="cardUnits.odometerStatisticsCard"
            />
          </div>
        </div>
      </div>
      <!-- Column grid -->
      <div class="grid-cols-1 grid-lg-cols-2 grid-sm-cols-2 grid-top-margin">
        <!-- Left column - Speed line chart -->
        <Card :title="cardTitles.speedLineChart">
          <LineChart
            :title="chartTitles.speedLineChart"
            :data="{ x: data.time, y: data.speed }"
            :options="speedLineChartOptions"
            :interval="speedLineChartInterval"
            :setColor="setSpeedLineChartColor"
          />
        </Card>
        <!-- Right column - SoC line chart -->
        <Card :title="cardTitles.socLineChart">
          <LineChart
            :type="chartTypes.socLineChart"
            :title="chartTitles.socLineChart"
            :data="{ x: data.time, y: data.soc }"
            :options="socLineChartOptions"
            :interval="speedLineChartInterval"
            :setColor="setSocLineChartColor"
          />
        </Card>
      </div>

      <!-- Column grid -->
      <div class="grid-cols-1 grid-lg-cols-2 grid-sm-cols-2 grid-top-margin">
        <!-- Left column - Speed Violations Card -->
        <ViolationCard
          :title="cardTitles.speedViolationsCard"
          :data="speedViolation"
        />
        <!-- Right column - Restricted Areas Card -->
        <ViolationCard
          :title="cardTitles.restrictedAreasCard"
          :data="areaViolation"
        />
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
  ViolationCard,
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
    ViolationCard,
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
      cardTitles: {
        speedGaugeChart: "Speed",
        socGaugeChart: "State of Charge",
        energyStatisticsCard: "Energy",
        odometerStatisticsCard: "Odometer",
        speedLineChart: "Speed (km/h)",
        socLineChart: "State of Charge (%)",
        speedViolationsCard: "Last Speed Violations",
        restrictedAreasCard: "Last Entry into Restricted Areas",
      },
      chartTitles: {
        speedLineChart: "Speed",
        socLineChart: "SoC",
      },
      cardUnits: {
        energyStatisticsCard: "kW",
        odometerStatisticsCard: "km",
      },
      chartTypes: {
        socLineChart: "area",
      },
      speedViolation: {
        mainTitle: "",
        badge: "",
        leftTitle: "",
        leftValue: "",
        rightTitle: "",
        rightValue: "",
      },
      areaViolation: {
        mainTitle: "",
        badge: "",
        leftTitle: "",
        leftValue: "",
        rightTitle: "",
        rightValue: "",
      },
    };
  },
  watch: {
    data() {
      // If this.data.violations is not null then push the value to variables
      if (this.data.violations) {
        this.data.violations.forEach((violation) => {
          // If speed violation has value change this.speedViolation object values
          if (violation.speed) {
            this.speedViolation = {
              mainTitle: violation.speed.title,
              badge: new Date(this.data.time).toLocaleString([], {
                hour12: false,
              }),
              leftTitle: "Speed",
              leftValue: violation.speed.speed,
              rightTitle: "Allowed Speed",
              rightValue: violation.speed.allowed,
            };
          }
          // If area violation has value change this.speedViolation object values
          if (violation.area) {
            this.areaViolation = {
              mainTitle: violation.area.title,
              badge: "Restricted",
              leftTitle: "Entry",
              leftValue: new Date(violation.area.entry).toLocaleTimeString([], {
                hour12: false,
              }),
              rightTitle: "Departure",
              rightValue: new Date(violation.area.departure).toLocaleTimeString(
                [],
                {
                  hour12: false,
                }
              ),
            };
          }
        });
      }
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
