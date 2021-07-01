import { defineAsyncComponent } from "vue";

// Card
const Card = defineAsyncComponent(() =>
  import(/* webpackChunkName: "card" */ "./cards/Card.vue")
);

// Statistics Card
const StatisticsCard = defineAsyncComponent(() =>
  import(/* webpackChunkName: "statistics-card" */ "./cards/StatisticsCard.vue")
);

// Leaflet Map
const LeafletMap = defineAsyncComponent(() =>
  import(/* webpackChunkName: "leaflet-map" */ "./maps/LeafletMap.vue")
);

export { Card, StatisticsCard, LeafletMap };
