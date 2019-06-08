import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import examples from './examples.json'

export default new Vuex.Store({
  state: {
    examples: examples,
    infoWindow: {
      options: {
        pixelOffset: {
          width: 0,
          height: -26,
        },
      },
      position: null,
      isOpened: false,
      image: '',
      link: null,
      title: '',
      from: {},
      to: {},
      distance: ''
    }
  },

  mutations: {
    toggleInfowindow(state, payload) {
      state.infoWindow.isOpened = false;

      state.infoWindow.position = {
        lat: payload.from.lat, 
        lng: payload.from.lng
      };

      if (payload.isInstagram) {
        state.infoWindow.link = payload.image

        window.axios.get('https://api.instagram.com/oembed?url=' + payload.image)
          .then(response => {
            state.infoWindow.image = response.data.thumbnail_url;
          });
      }

      if (!payload.isInstagram) {
        state.infoWindow.image = payload.image;
        state.infoWindow.link = payload.image;
      }

      state.infoWindow.title = payload.from.place;
      state.infoWindow.from = payload.from;
      state.infoWindow.to = payload.to;

      state.infoWindow.distance = window.geo.getDistanceFromTwoPoints(payload.from.lat, payload.from.lng, payload.to.lat, payload.to.lng)
      state.infoWindow.isOpened = true
    }
  },

  actions: {

  }
})
