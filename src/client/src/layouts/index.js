import { defineAsyncComponent } from "vue";

// Header
const Header = defineAsyncComponent(() =>
  import(/* webpackChunkName: "header" */ "./header/Header.vue")
);
const HorizontalNavbarMenu = defineAsyncComponent(() =>
  import(
    /* webpackChunkName: "horizontal-navbar-menu" */ "./header/HorizontalNavbarMenu.vue"
  )
);
const VerticalNavbarMenu = defineAsyncComponent(() =>
  import(
    /* webpackChunkName: "vertical-navbar-menu" */ "./header/VerticalNavbarMenu.vue"
  )
);

export { Header, HorizontalNavbarMenu, VerticalNavbarMenu };
