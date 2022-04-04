<template>
  <v-app>
    <v-card-title class="justify-content-between blue darken-2">
      <h1 class="white--text font-weight-light display-1">Behind the curve</h1>

      <v-btn large icon absolute right class="blue darken-2 white--text">
        <v-icon large>info</v-icon>
      </v-btn>
    </v-card-title>

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

    <AppForm></AppForm>

    <Info></Info>

    <v-btn large icon absolute right class="blue darken-2 white--text add-example" @click="formDialog.isOpen = true">
      <v-icon large>add</v-icon>
    </v-btn>
  </v-app>
</template>

<script>
  import {mapState, mapMutations} from 'vuex';
  import CardInfoWindow from './components/CardInfoWindow'
  import AppForm from './components/AppForm'
  import Info from './components/Info'

  export default {
    name: 'App',

    components: {
      CardInfoWindow, AppForm, Info
    },

    computed: {
      ...mapState(['examples', 'infoWindow', 'formDialog'])
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

.add-example {
  bottom: 20px;
}
</style>
