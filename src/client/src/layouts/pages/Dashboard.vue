<template>
  <main class="main">
    <div class="container">
      <!-- Column grid -->
      <div class="grid-cols-1 grid-lg-cols-2">
        <!-- Left column - Map -->
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
            :color="chartColors.speedLineChartColor"
          />
        </Card>
        <!-- Right column - SoC line chart -->
        <Card :title="cardTitles.socLineChart">
          <LineChart
            :type="chartTypes.socLineChart"
            :title="chartTitles.socLineChart"
            :data="{ x: data.time, y: data.soc }"
            :options="socLineChartOptions"
            :interval="socLineChartInterval"
            :color="chartColors.socLineChartColor"
          />
        </Card>
      </div>
      <!-- Column grid -->
      <div class="grid-cols-1 grid-lg-cols-2 grid-sm-cols-2 grid-top-margin">
        <!-- Left column - Speed Violations Card -->
        <ViolationsCard
          :title="cardTitles.speedViolationsCard"
          :data="speedViolation"
        />
        <!-- Right column - Restricted Areas Card -->
        <ViolationsCard
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
  ViolationsCard,
} from "@/components";
import {
  SPEED_LINE_CHART_INTERVAL,
  SOC_LINE_CHART_INTERVAL,
  SPEED_LIMIT,
  MID_CHARGE,
  LOW_CHARGE,
} from "@/constants";
import {
  speedGaugeChartOptions,
  socGaugeChartOptions,
  speedLineChartOptions,
  socLineChartOptions,
} from "@/components/charts/chartsOptions.js";
import styles from "@/assets/scss/_export.scss";

export default {
  name: "Dashboard",
  components: {
    Card,
    LeafletMap,
    GaugeChart,
    StatisticsCard,
    LineChart,
    ViolationsCard,
  },
  props: {
    data: Object,
  },
  data() {
    return {
      speedGaugeChartOptions,
      socGaugeChartOptions,
      speedLineChartOptions,
      socLineChartOptions,
      speedLineChartInterval: SPEED_LINE_CHART_INTERVAL,
      socLineChartInterval: SOC_LINE_CHART_INTERVAL,
      cardTitles: {
        speedGaugeChart: "Speed",
        socGaugeChart: "State of Charge",
        energyStatisticsCard: "Energy",
        odometerStatisticsCard: "Odometer",
        speedLineChart: "Speed (km/h)",
        socLineChart: "State of Charge (%)",
        speedViolationsCard: "Last Three Speed Violations",
        restrictedAreasCard: "Last Three Entry into Restricted Areas",
      },
      chartTitles: {
        speedLineChart: "Speed",
        socLineChart: "SoC",
      },
      cardUnits: {
        energyStatisticsCard: "kW",
        odometerStatisticsCard: "km",
      },
      chartColors: {
        speedLineChartColor: styles.gray,
        socLineChartColor: styles.gray,
      },
      chartTypes: {
        socLineChart: "area",
      },
      speedViolation: {
        mainTitle: "",
        badge: "",
        leftTitle: "Speed",
        leftValue: 0,
        rightTitle: "Allowed Speed",
        rightValue: 0,
      },
      areaViolation: {
        mainTitle: "",
        badge: "Restricted",
        leftTitle: "Entry",
        leftValue: "",
        rightTitle: "Exit",
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
              ...this.speedViolation,
              mainTitle: violation.speed.title,
              badge: new Date(this.data.time)
                .toLocaleString([], {
                  hour12: false,
                })
                .replace(",", ""),
              leftValue: violation.speed.speed,
              rightValue: violation.speed.allowed,
            };
          }
          // If area violation has value change this.areaViolation object values
          if (violation.area) {
            this.areaViolation = {
              ...this.areaViolation,
              mainTitle: violation.area.title,
              leftValue: new Date(violation.area.entry).toLocaleTimeString([], {
                hour12: false,
              }),
              rightValue: new Date(violation.area.exit).toLocaleTimeString([], {
                hour12: false,
              }),
            };
          }
        });
      }
      if (this.data.speed) {
        if (this.data.speed <= SPEED_LIMIT) {
          this.chartColors.speedLineChartColor = styles.green;
        } else {
          this.chartColors.speedLineChartColor = styles.red;
        }
      }
      if (this.data.soc) {
        if (this.data.soc >= MID_CHARGE) {
          this.chartColors.socLineChartColor = styles.green;
        } else if (this.data.soc < MID_CHARGE && this.data.soc >= LOW_CHARGE) {
          this.chartColors.socLineChartColor = styles.orange;
        } else {
          this.chartColors.socLineChartColor = styles.red;
        }
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
