<template>
  <!-- Leaflet map -->
  <l-map
    class="map"
    :zoom="zoom"
    :center="currentLocation"
    :options="mapOptions"
  >
    <!-- Tile layer -->
    <l-tile-layer :url="tileUrl" />
    <!-- Marker -->
    <l-marker :lat-lng="currentLocation" :icon="icon"></l-marker>
  </l-map>
</template>

<script>
import { latLng, icon } from "leaflet";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

export default {
  name: "LeafletMap",
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  props: {
    lat: Number,
    lng: Number,
  },
  data() {
    return {
      zoom: 15,
      tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      icon: icon({
        iconUrl: require("@/assets/img/marker.png"),
        iconSize: [32, 46],
        iconAnchor: [16, 46],
      }),
      mapOptions: {
        scrollWheelZoom: false,
      },
    };
  },
  computed: {
    currentLocation: function () {
      // Update current location when received a new location props
      return latLng(this.lat, this.lng);
    },
  },
};
</script>

<style scoped lang="scss">
.map {
  min-height: 20rem;
}

@media (min-width: 1024px) {
  .map {
    height: 100%;
  }
}
</style>
