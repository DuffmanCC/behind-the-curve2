import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

let APIkey = ""

if (process.env.NODE_ENV !== 'production') {
   APIkey = "AIzaSyBLcOhJEOIsQkyFzNqQAr-qnzGajW-6tJI";
} else {
   APIkey = "AIzaSyATCHSJzpr543qqLrSp-zJPXGV15ajWwAc"
}

export default Vue.use(VueGoogleMaps, {
  load: {
    key: APIkey,
    libraries: "geometry,places,drawing",
  },
})
