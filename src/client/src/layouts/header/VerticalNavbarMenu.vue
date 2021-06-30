<template>
  <div v-if="isOpen" class="navbar-vertical-menu">
    <!-- Menu Items -->
    <div
      v-for="(item, index) in items"
      :key="index"
      class="navbar-vertical-items"
    >
      <a :href="item.url" class="navbar-vertical-selected-button">
        {{ item.title }}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "VerticalNavbarMenu",
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    items: { type: Array, required: true },
  },
};
</script>

<style scoped lang="scss">
.navbar-vertical-menu {
  border-bottom-width: 1px;
  border-color: $green-dark;
}

.navbar-vertical-items {
  padding: 0.75rem 0.5rem 0.75rem 0.5rem;
}

.navbar-vertical-selected-button {
  background-color: $green-dark;
  color: $white;
  display: block;
  padding: 0.5rem 0.75rem 0.5rem 0.75rem;
  border-radius: 0.375rem;
  font-size: $font-size-base;
}

@media (min-width: 640px) {
  .navbar-vertical-items {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
  }
}

@media (min-width: 768px) {
  .navbar-vertical-menu {
    display: none;
  }
}
</style>
