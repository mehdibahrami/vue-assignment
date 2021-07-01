import { defineAsyncComponent } from "vue";

// Card
const Card = defineAsyncComponent(() =>
  import(/* webpackChunkName: "card" */ "./Card.vue")
);

export { Card };
