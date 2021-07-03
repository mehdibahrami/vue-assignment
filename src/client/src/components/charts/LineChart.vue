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
    setColor: {
      type: Function,
    },
  },
  data() {
    return {
      series: [{ name: this.title, data: [] }],
    };
  },
  mounted() {
    // If it is a realtime chart(interval props has value) update the data
    if (this.interval && this.interval > 0) {
      // Updates the data according to the interval time period
      this.setData();

      // Reset data every 5 minutes to prevent memory leak (https://github.com/apexcharts/apexcharts.js/issues/605)
      this.resetData();
    }
  },
  methods: {
    setData: function () {
      setInterval(() => {
        // If the x and y values are not null then check other parameters for update chart series
        if (this.data.x && this.data.y) {
          const dataLength = this.series[0].data.length;

          // If series contains at least one element then check new time value(this.data.x) should be greater than last time in the array
          // If it is not we should reset the chart
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
          if (this.setColor) this.setColor();
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
    resetData: function () {
      setInterval(() => {
        const dataLength = this.series[0].data.length;

        // If series has more than 100 elements delete 70 of the oldest
        if (dataLength > 100) {
          this.series[0].data = this.series[0].data.slice(
            dataLength - 70,
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
