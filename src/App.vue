<template>
  <v-app>
    <v-card-title class="justify-center blue darken-2"><h1 class="white--text font-weight-light display-2">Behind the curve</h1></v-card-title>

    <GmapMap
      :center="{lat:0, lng:-30}"
      :zoom="2"
      map-type-id="terrain"
      style="width: 100%; height: 100%"
      :options="{ disableDefaultUI: true }"
    >
      <GmapMarker
        v-for="(example, index) in examples"
        :key="index"
        :position="middlePoint(example)"
        :clickable="true"
        @click="toggleInfowindow(example)"
      />
    </GmapMap>

    <CardInfoWindow></CardInfoWindow>
  </v-app>
</template>

<script>
  import {mapState, mapMutations} from 'vuex';
  import CardInfoWindow from './components/CardInfoWindow'

  export default {
    name: 'App',

    components: {
      CardInfoWindow
    },

    computed: {
      ...mapState(['examples', 'infoWindow'])
    },

    methods: {
      middlePoint(example) {
         return window.geo.middlePoint(example.from.lat, example.from.lng, example.to.lat, example.to.lng)
      },

      ...mapMutations(['toggleInfowindow']),
    }
  }
</script>

<style>
.justify-center {
  justify-content: center;
}
</style>
