<template>
  <!-- Apex Gauge Chart -->
  <apexchart type="radialBar" :options="options" :series="series"></apexchart>
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
    options: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
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
