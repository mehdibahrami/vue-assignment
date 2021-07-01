import { defineAsyncComponent } from "vue";

// Card
const Card = defineAsyncComponent(() =>
  import(/* webpackChunkName: "card" */ "./cards/Card.vue")
);

// Statistics Card
const StatisticsCard = defineAsyncComponent(() =>
  import(/* webpackChunkName: "statistics-card" */ "./cards/StatisticsCard.vue")
);

export { Card, StatisticsCard };
