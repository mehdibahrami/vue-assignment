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
    <l-marker :lat-lng="currentLocation" :icon="markerIcon"></l-marker>
  </l-map>
</template>

<script>
import { latLng, icon } from "leaflet";
import { LMap, LTileLayer, LMarker } from "@vue-leaflet/vue-leaflet";
import { MID_CHARGE, LOW_CHARGE } from "@/constants";
import "leaflet/dist/leaflet.css";

export default {
  name: "LeafletMap",
  components: {
    LMap,
    LTileLayer,
    LMarker,
  },
  props: {
    lat: {
      type: Number,
      require: true,
    },
    lng: {
      type: Number,
      require: true,
    },
    soc: {
      type: Number,
    },
  },
  data() {
    return {
      zoom: 15,
      tileUrl: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
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
    markerIcon: function () {
      // Set default marker icon for when soc value is null or out of range
      let iconUrl = require("@/assets/img/marker-gray.png");
      // If SoC value is not null
      if (this.soc) {
        if (this.soc > MID_CHARGE) {
          // Marker icon for a situation where the vehicle charge is in the hgih range
          iconUrl = require("@/assets/img/marker-green.png");
        } else if (this.soc < MID_CHARGE && this.soc > LOW_CHARGE) {
          // Marker icon for a situation where the vehicle charge is in the medium range
          iconUrl = require("@/assets/img/marker-orange.png");
        } else if (this.soc < LOW_CHARGE && this.soc >= 0) {
          // Marker icon for a situation where the vehicle charge is in the low range
          iconUrl = require("@/assets/img/marker-red.png");
        }
      }
      return icon({
        iconUrl: iconUrl,
        iconSize: [32, 46],
        iconAnchor: [16, 46],
      });
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
