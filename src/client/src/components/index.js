import { defineAsyncComponent } from "vue";

// Card
const Card = defineAsyncComponent(() =>
  import(/* webpackChunkName: "card" */ "./cards/Card.vue")
);

// Statistics Card
const StatisticsCard = defineAsyncComponent(() =>
  import(/* webpackChunkName: "statistics-card" */ "./cards/StatisticsCard.vue")
);

// Violations Card
const ViolationsCard = defineAsyncComponent(() =>
  import(/* webpackChunkName: "violations-card" */ "./cards/ViolationsCard.vue")
);

// Leaflet Map
const LeafletMap = defineAsyncComponent(() =>
  import(/* webpackChunkName: "leaflet-map" */ "./maps/LeafletMap.vue")
);

// Gauge Chart
const GaugeChart = defineAsyncComponent(() =>
  import(/* webpackChunkName: "gauge-chart" */ "./charts/GaugeChart.vue")
);

// Line Chart
const LineChart = defineAsyncComponent(() =>
  import(/* webpackChunkName: "line-chart" */ "./charts/LineChart.vue")
);

export {
  Card,
  StatisticsCard,
  LeafletMap,
  GaugeChart,
  LineChart,
  ViolationsCard,
};
