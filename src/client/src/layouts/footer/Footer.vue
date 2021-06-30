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
  padding: 1.5rem 1rem 1.5rem 1rem;
  overflow: hidden;
}

.footer-text {
  text-align: center;
  font-size: $font-size-base;
  color: $gray;
}

@media (min-width: 640px) {
  .footer {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .footer {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
</style>
