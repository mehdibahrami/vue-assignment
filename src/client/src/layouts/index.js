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

// Footer
const Footer = defineAsyncComponent(() =>
  import(/* webpackChunkName: "footer" */ "./footer/Footer.vue")
);

export { Header, HorizontalNavbarMenu, VerticalNavbarMenu, Footer };
