<template>
  <header>
    <!-- Navbar -->
    <nav class="navbar">
      <div class="inner-navbar">
        <div class="container">
          <div class="main-menu">
            <!-- Logo -->
            <img class="logo" :src="logo" alt="ViriCiti" />
            <!-- Horizontal navbar menu -->
            <HorizontalNavbarMenu :items="navbarMenuItems" />
          </div>
          <!-- Mobile menu -->
          <div class="mobile-menu">
            <!-- Mobile menu button -->
            <button
              type="button"
              class="mobile-menu-button"
              @click="isMenuOpen = !isMenuOpen"
            >
              <img
                v-if="!isMenuOpen"
                :src="menuIcon"
                class="mobile-menu-icon"
              />
              <img v-else :src="closeIcon" class="mobile-menu-icon" />
            </button>
          </div>
        </div>
      </div>
      <!-- Vertical navbar menu -->
      <VerticalNavbarMenu :isOpen="isMenuOpen" :items="navbarMenuItems" />
    </nav>
  </header>
</template>

<script>
import { HorizontalNavbarMenu, VerticalNavbarMenu } from "@/layouts";
import navbarMenuItems from "@/layouts/header/navbarMenuItems.js";

export default {
  name: "Header",
  components: {
    HorizontalNavbarMenu,
    VerticalNavbarMenu,
  },
  data() {
    return {
      logo: require("@/assets/img/logo.svg"),
      menuIcon: require("@/assets/img/menu.svg"),
      closeIcon: require("@/assets/img/close.svg"),
      isMenuOpen: false,
      navbarMenuItems,
    };
  },
};
</script>

<style scoped lang="scss">
.navbar {
  background-color: $primary;
  padding-bottom: 8rem;
}

.inner-navbar {
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  padding-left: 1rem;
  padding-right: 1rem;
  border-bottom-width: 1px;
  border-color: $green-dark;
}

.main-menu {
  display: flex;
  align-items: center;
}

.logo {
  height: 2rem;
}

.mobile-menu {
  margin-right: -0.5rem;
  display: flex;
}

.mobile-menu-button {
  background-color: $green-dark;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem;
  border-radius: 0.375rem;
  color: $white;
}

.mobile-menu-button:hover {
  background-color: $green-darker;
}

.mobile-menu-icon {
  display: block;
  height: 1.5rem;
  width: 1.5rem;
}

@media (min-width: 640px) {
  .inner-navbar {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .container {
    padding-left: 0px;
    padding-right: 0px;
  }
}

@media (min-width: 768px) {
  .mobile-menu {
    display: none;
  }
}

@media (min-width: 1024px) {
  .inner-navbar {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
</style>
