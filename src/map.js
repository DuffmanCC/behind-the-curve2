import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

export default Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyATCHSJzpr543qqLrSp-zJPXGV15ajWwAc",
    libraries: "geometry,places,drawing",
  },
})
