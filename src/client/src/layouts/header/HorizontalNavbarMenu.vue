<template>
  <div class="navbar-horizontal-menu">
    <!-- Menu Items -->
    <div
      v-for="(item, index) in items"
      :key="index"
      class="navbar-horizontal-items"
    >
      <a :href="item.url" class="navbar-horizontal-selected-button">
        {{ item.title }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HorizontalNavbarMenu",
  props: {
    items: { type: Array, required: true },
  },
};
</script>

<style scoped lang="scss">
.navbar-horizontal-menu {
  display: none;
}

.navbar-horizontal-items {
  margin-left: 2.5rem;
  display: flex;
}

.navbar-horizontal-selected-button {
  background-color: $green-dark;
  color: $white;
  padding: 0.5rem 0.75rem 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: $font-size-sm;
  line-height: 1.25rem;
}

.navbar-horizontal-selected-button:hover {
  background-color: $green-darker;
}

@media (min-width: 768px) {
  .navbar-horizontal-menu {
    display: block;
  }
}
</style>
