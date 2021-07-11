<template>
  <!-- Card -->
  <div :class="cardClasses">
    <!-- Card header -->
    <div v-if="title" class="card-header">
      <h3>{{ title }}</h3>
    </div>
    <!-- Card body -->
    <div class="card-body">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    title: {
      type: String,
    },
    hasPadding: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    cardClasses: function () {
      let classes = "card";

      // Set card classes based on hasPadding prop
      if (this.hasPadding === true) {
        classes += ` card-padding`;
      }

      return classes.trim();
    },
  },
};
</script>

<style scoped lang="scss">
.card {
  width: 100%;
  background-color: $white;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.card-padding {
  padding: 1rem;
}

.card-header {
  font-size: $font-size-lg;
  line-height: 1.5rem;
  font-weight: $font-weight-medium;
  margin-bottom: 0.75rem;
  color: $gray-dark;
}

.card-body {
  height: 100%;
}
</style>
