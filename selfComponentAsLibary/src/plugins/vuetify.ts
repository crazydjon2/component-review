import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)


export default new Vuetify({
    icons: {
        iconfont: 'md'
    },
    theme: {
        themes: {
          light: {
            primary: process.env.VUE_APP_COLOR ? `#${process.env.VUE_APP_COLOR}`  : '#42AB44',
          },
        },
      },
})
