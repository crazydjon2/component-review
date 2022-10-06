import Vue from 'vue'
import Vuetify from 'vuetify'
import vuetify from './plugins/vuetify'
import Favorite from './App.vue'
import VueI18n from 'vue-i18n'
import store from './store/Index'
import {messages, numberFormats} from './locale/_index'
import 'vuetify/dist/vuetify.min.css'
import vueCustomElement from 'vue-custom-element'
import AppDevContainer from '../src/devContainer/AppDevContainer.vue'

//для запуска локально
if (process.env.NODE_ENV === 'development') {
  Vue.use(Vuetify)
  Vue.use(VueI18n)

  const i18n = new VueI18n({
    locale: 'ru-RU',
    messages,
    numberFormats
  })

  Vue.config.productionTip = false

  new Vue({
    vuetify,
    i18n,
    store,
    render: h => h(AppDevContainer),
  }).$mount('#app')
}

//для создания веб-компоненты
if (process.env.NODE_ENV === 'production') {
  Vue.use(Vuetify)
  Vue.use(vueCustomElement)
  Vue.customElement('favorite', (Favorite as any).options)
}
