import { defineAsyncComponent } from "vue";

// Card
const Card = defineAsyncComponent(() =>
  import(/* webpackChunkName: "card" */ "./Card.vue")
);

// Statistics Card
const StatisticsCard = defineAsyncComponent(() =>
  import(/* webpackChunkName: "statistics-card" */ "./StatisticsCard.vue")
);

export { Card, StatisticsCard };
