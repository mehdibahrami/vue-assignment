<template>
  <Card :title="title" :hasPadding="hasPadding">
    <!-- Statistic -->
    <div class="statistic">
      {{ statisticValue }}
      <!-- Statistic unit -->
      <span v-if="unit" class="statistic-unit">{{ unit }}</span>
    </div>
  </Card>
</template>

<script>
import { Card } from "@/components";

export default {
  name: "StatisticsCard",
  components: {
    Card,
  },
  props: {
    title: {
      type: String,
    },
    unit: {
      type: String,
    },
    statistic: {
      type: [Number, String],
      required: true,
    },
    hasPadding: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    statisticValue: function () {
      // Check the statistic prop if it is not null pass the value otherwise pass -
      return this.statistic ? this.statistic : "-";
    },
  },
};
</script>

<style scoped lang="scss">
.statistic {
  display: flex;
  align-items: baseline;
  font-size: $font-size-2xl;
  line-height: 2rem;
  font-weight: $font-weight-semibold;
  color: $secondary;
}

.statistic-unit {
  margin-left: 0.25rem;
  font-size: $font-size-sm;
  line-height: 1.25rem;
  font-weight: $font-weight-medium;
  color: $gray;
}
</style>
