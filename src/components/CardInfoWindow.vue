<template>
    <v-dialog
        v-model="infoWindow.isOpened"
        style="max-width: 500px"
        width="400"
        hide-overlay 
        transition="dialog-bottom-transition"
    >
        <v-card class="mb-2">
            <v-toolbar dark color="primary">
                <v-btn icon dark @click="infoWindow.isOpened= false">
                  <v-icon>close</v-icon>
                </v-btn>

                <v-toolbar-title><h2 class="font-weight-light headline">{{ infoWindow.from.place }}</h2></v-toolbar-title>
            </v-toolbar>

            <a :href="infoWindow.link" target="_blank">
                <v-img
                :src="infoWindow.image"
                aspect-ratio="1"
                ></v-img>                
            </a>

            <v-card-title><h3>FROM</h3></v-card-title>

            <v-divider></v-divider>

            <v-list dense mb-2>
                <v-list-tile>
                    <v-list-tile-content>Description:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ infoWindow.from.description }}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                    <v-list-tile-content>Place:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ infoWindow.from.place }}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                    <v-list-tile-content>Lat, Lng:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ infoWindow.from.lat +', '+ infoWindow.from.lng }}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                    <v-list-tile-content>Height of observer:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ infoWindow.from.height | m }}</v-list-tile-content>
                </v-list-tile>
            </v-list>

            <v-card-title><h3>TO</h3></v-card-title>

            <v-divider></v-divider>

            <v-list dense>
                <v-list-tile>
                    <v-list-tile-content>Description:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ infoWindow.to.description }}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                    <v-list-tile-content>Place:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ infoWindow.to.place }}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                    <v-list-tile-content>Lat - Lng:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ infoWindow.to.lat +', '+ infoWindow.to.lng }}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                    <v-list-tile-content>Height:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ infoWindow.to.height | m }}</v-list-tile-content>
                </v-list-tile>
            </v-list>

            <v-divider></v-divider>

            <v-list dense>
                <v-list-tile>
                    <v-list-tile-content>Distance:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ infoWindow.distance | km }}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                    <v-list-tile-content>Horizon distance:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ horizonDistance | mToKm | km }}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                    <v-list-tile-content>Under horizon:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ underHorizon | m }}</v-list-tile-content>
                </v-list-tile>

                <v-list-tile>
                    <v-list-tile-content>Visible part:</v-list-tile-content>
                    <v-list-tile-content class="align-end">{{ infoWindow.to.height - underHorizon | m }}</v-list-tile-content>
                </v-list-tile>
            </v-list>
            
            <GmapMap
              :center="middlePoint"
              :zoom="8"
              style="width: 100%; height: 400px"
              :options="{ disableDefaultUI: true }"
            >
                <GmapMarker
                    :position="from"
                    :clickable="false"
                    :draggable="false"
                    style="width: 100%; height: 400px"
                />
                <GmapMarker
                    :position="to"
                    :clickable="false"
                    :draggable="false"
                />
                <GmapPolyline 
                    v-if="line.length > 0" 
                    :path="line" 
                    :editable="false">
                </GmapPolyline>
            </GmapMap>
        </v-card>
    </v-dialog>
</template>

<script>
    import { mapState } from 'vuex';

    export default {
        computed: {
            horizonDistance() {
                return window.geo.distanceToHorizon(this.infoWindow.from.height);
            },

            underHorizon() {
                let observerHeight = this.infoWindow.from.height;
                let distanceToObject = this.infoWindow.distance;

                return window.geo.partObjectUnderHorizon(observerHeight, distanceToObject * 1000)
            },

            line() {
                return [
                    {lat: parseFloat(this.infoWindow.from.lat), lng: parseFloat(this.infoWindow.from.lng)},
                    {lat: parseFloat(this.infoWindow.to.lat), lng: parseFloat(this.infoWindow.to.lng)},
                ]
            },

            from() {
                return {lat: parseFloat(this.infoWindow.from.lat), lng: parseFloat(this.infoWindow.from.lng)}
            },

            to() {
                return {lat: parseFloat(this.infoWindow.to.lat), lng: parseFloat(this.infoWindow.to.lng)}
            },

            middlePoint() {
                return window.geo.middlePoint(this.infoWindow.from.lat, this.infoWindow.from.lng, this.infoWindow.to.lat, this.infoWindow.to.lng)
            },

            ...mapState(['infoWindow'])
        },

        filters: {
            km(value) {
                if (!value) return ''

                return value.toFixed(1) + ' km'
            },

            m(value) {
                if (!value) return ''

                return value.toFixed(1) + ' m'
            },

            mToKm(value) {
                return value / 1000;
            }
        }
    }
</script>

<style>
.align-end {
    align-items: flex-end;
}
</style>