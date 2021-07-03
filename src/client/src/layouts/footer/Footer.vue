<template>
  <footer>
    <div class="footer">
      <p class="footer-text">&copy; {{ currentYear }} ViriCiti BV</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  computed: {
    // Get current year
    currentYear: function () {
      return new Date().getFullYear();
    },
  },
};
</script>

<style scoped lang="scss">
.footer {
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  padding: 0.5rem 1rem 0.5rem 1rem;
  overflow: hidden;
}

.footer-text {
  text-align: center;
  font-size: $font-size-base;
  color: $gray;
}
</style>
