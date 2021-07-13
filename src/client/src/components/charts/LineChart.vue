<template>
  <!-- Apex Line Chart -->
  <apexchart
    :type="type"
    :options="this.options"
    ref="chart"
    :series="this.series"
  >
  </apexchart>
</template>

<script>
import VueApexCharts from "vue3-apexcharts";

export default {
  name: "LineChart",
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    title: {
      type: String,
    },
    data: {
      type: Object,
      require: true,
    },
    options: {
      type: Object,
      required: true,
    },
    interval: {
      type: Number,
    },
    type: {
      type: String,
      default: "line",
    },
    color: {
      type: String,
    },
  },
  data() {
    return {
      series: [{ name: this.title, data: [] }],
    };
  },
  mounted() {
    // If it is a realtime chart(interval prop has value) update the data
    if (this.interval && this.interval > 0) {
      // Updates the data according to the interval time period
      this.setData();

      // Free memory every 5 minutes to prevent memory leak (https://github.com/apexcharts/apexcharts.js/issues/605)
      this.freeMemory();
    }
  },
  methods: {
    setData: function () {
      setInterval(() => {
        // If x and y values are not null then check other parameters for update chart series
        if (this.data.x && this.data.y) {
          const dataLength = this.series[0].data.length;

          // If series contains at least one element then check new time value(this.data.x) should be greater than last time in the array
          // If it is not reset the chart
          if (dataLength > 1) {
            const lastData = this.series[0].data[dataLength - 1];
            if (lastData[0] > this.data.x) {
              this.series[0].data = [];
            }
          }

          // Push the new data to series array and update chart
          this.series[0].data.push([this.data.x, this.data.y]);
          this.updateChart();

          // Set chart color based on current value
          if (this.color) this.updateChartColor();
        }
      }, this.interval);
    },
    updateChart: function () {
      // Update chart series
      this.$refs.chart.updateSeries([
        {
          data: this.series[0].data,
        },
      ]);
    },
    updateChartColor: function () {
      this.$refs.chart.updateOptions({
        colors: [this.color],
      });
    },
    freeMemory: function () {
      setInterval(() => {
        const dataLength = this.series[0].data.length;

        // If series has more than 500 elements get the last 200 and delete others
        if (dataLength > 500) {
          this.series[0].data = this.series[0].data.slice(
            dataLength - 200,
            dataLength
          );

          this.$refs.chart.updateSeries([
            {
              data: [this.series[0].data],
            },
          ]);
        }
      }, 300000);
    },
  },
};
</script>
