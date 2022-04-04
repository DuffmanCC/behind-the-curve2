<template>
  <v-dialog
    v-model="formDialog.isOpen"
    width="400"
  >
    <v-card class="p-5">
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="formDialog.isOpen = false">
          <v-icon>close</v-icon>
        </v-btn>

        <v-toolbar-title>
          <h2 class="font-weight-light headline">Add another example</h2>
        </v-toolbar-title>
      </v-toolbar>

      <v-card-text>
        <v-form method="POST" action="https://formspree.io/carlosor@gmail.com">
          <span>FROM:</span>

          <v-text-field
            v-model="fromPlace"
            name="fromPlace"
            label="Place"
            autofocus
            clearable
            placeholder="Santa Marta - Colombia"
            :rules="rules.text"
          >    
          </v-text-field>

          <v-text-field
            v-model="fromDescription"
            name="fromDescription"
            label="Description"
            clearable
            placeholder="Edificio Almirante"
            :rules="rules.text"
          >    
          </v-text-field>

          <v-text-field
            v-model="fromHeight"
            name="fromHeight"
            label="Height of observer"
            placeholder="70"
            suffix="m"
            :rules="rules.heigh"
          >
          </v-text-field>

          <v-text-field
            v-model="fromlatLng"
            name="fromlatLng"
            label="lat, lng"
            clearable
            placeholder="11.235, -74.218"
            :rules="rules.latLng"
          >
          </v-text-field>

          <span>TO:</span>

          <v-text-field
            v-model="toPlace"
            name="toPlace"
            label="Place"
            clearable
            placeholder="Barranquilla - Colombia"
            :rules="rules.text"
          >
          </v-text-field>  

          <v-text-field
            v-model="toDescription"
            name="toDescription"
            label="Description"
            clearable
            placeholder="Edificio Mirage 57"
            :rules="rules.text"
          >
          </v-text-field>  

          <v-text-field
            v-model="toHeight"
            name="toHeight"
            label="Height of object"
            clearable
            suffix="m"
            placeholder="162"
            :rules="rules.heigh"
          >     
          </v-text-field>

          <v-text-field
            v-model="tolatLng"
            name="tolatLng"
            label="lat, lng"
            clearable
            placeholder="11.006, -74.800"
            :rules="rules.latLng"
          >
          </v-text-field>

          <v-text-field
            v-model="image"
            name="image"
            label="Image URL"
            clearable
            placeholder="https://www.domain.com/my-image.jpg"
            :rules="rules.url"
          >     
          </v-text-field>

          <v-btn type="submit" class="blue darken-2 white--text">submit</v-btn>        
        </v-form>       
      </v-card-text>
    </v-card>
  </v-dialog>  
</template>

<script>
   import { mapState } from 'vuex';

   export default {
      data() {
         return {
            fromPlace: '',
            fromDescription: '',
            fromHeight: '',
            fromlatLng: '',
            toPlace: '',
            toDescription: '',
            toHeight: '',
            tolatLng: '',
            image: '',
            rules: {
              text: [
                v => !!v || 'This field is required',
              ],
              latLng: [
                v => !!v || 'This field is required',
                // eslint-disable-next-line no-useless-escape
                v => /^(\-?\d{1,2}(\.\-?\d{1,3})?)(\,\s?)(\-?\d{1,2}(\.\-?\d{1,3})?)$/.test(v) || 'wrong format, the format should be "11.006, -74.800"'
              ],
              heigh: [
                v => !!v || 'This field is required',
                // eslint-disable-next-line no-useless-escape
                v => /^\d{1,4}$/.test(v) || "That's too hight! Mount Everest is only 8848 meters"
              ],
              url: [
                v => !!v || 'This field is required',
                // eslint-disable-next-line no-useless-escape
                v => /^https?:\/\/[a-zA-Z0-9@:%._\+~#=]+$/.test(v) || "That's not a URL"
              ]
            },
         }
      },

      computed: {
         ...mapState(['formDialog'])
      },

      methods: {

      }
   }
</script>