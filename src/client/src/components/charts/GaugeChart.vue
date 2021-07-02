<template>
  <!-- Apex Gauge Chart -->
  <apexchart
    type="radialBar"
    :options="chartOptions"
    :series="series"
  ></apexchart>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "GaugeChart",
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    data: {
      type: Number,
      require: true,
    },
    label: {
      type: String,
      required: true,
    },
    colors: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      chartOptions: {
        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 90,
            hollow: {
              size: "65%",
            },
            track: {
              show: true,
              strokeWidth: "20%",
            },
            dataLabels: {
              name: {
                offsetY: 25,
                color: "#6b7280",
                show: true,
              },
              value: {
                offsetY: -10,
                color: "#8a63a3",
                fontSize: "2rem",
                formatter(val) {
                  return `${parseFloat(val)}`;
                },
              },
            },
          },
        },
        chart: {
          sparkline: {
            enabled: true,
          },
        },
        fill: {
          type: "solid",
          colors: this.colors,
        },
        labels: [this.label],
      },
      series: [this.data],
    };
  },
  watch: {
    data: function () {
      // If data is not null change series value
      if (this.data) {
        this.series = [this.data];
      }
    },
  },
};
</script>
