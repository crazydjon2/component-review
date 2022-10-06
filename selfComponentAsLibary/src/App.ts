import { Prop, Component, Vue, Watch } from 'vue-property-decorator'

import vuetify from '@/plugins/vuetify'
import VueI18n from "vue-i18n"

import store from '@/store/Index'
import { messages, numberFormats } from './locale/_index'

import FavoritesTable from './components/table/Table.vue'
import Card from './components/card/Card.vue'
import _ from 'lodash'

Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: 'ru-RU',
  messages,
  numberFormats
})

@Component({
  vuetify,
  store,
  i18n,
  components: {
    FavoritesTable,
    Card
  }
})
export default class App extends Vue {
  @Prop({type: Boolean, default: true}) card!: boolean
  @Prop({type: String, default: 'list'}) tab?: string
  @Prop({type: String, default: '903c856e-4e27-4fb1-b3f1-051582bfffb6'}) favId?: string
  @Prop( {type: Object}) sendSnackBar?: any
  @Prop({type: Array, default: () => []}) filters!: any[]
  @Prop({type: Array, default: () => []}) cardFilters!: any[]
  @Prop({ type: Boolean, default: false }) isAdmin?: boolean
	@Prop({}) isAccess: any
  @Prop({type: String, default: 'ru-RU'}) localCode?: string
  @Prop({}) objectTypesTranslates: any
  @Prop({type: String, default: '5cb0b0f8-aea8-4426-805e-c2337e851e8d'}) userId!: string

  // isAccess() {
  //   return true
  // }
  @Prop({ type: Boolean, default: false }) searchTrigger?: boolean
  @Prop({ type: Boolean, default: false }) cardSearchTrigger?: boolean

  @Watch('objectTypesTranslates', {deep: true})
  translateChanged() {
    this.setTypesTranslates()
  }

  clearFilters(): void {
    this.$emit('clear-filters')
  }

  async setTypesTranslates() {
    const locale = _.cloneDeep(this.$i18n.messages[this.localCode!])
    const typesTranslates = {
      objects: {
        type: this.objectTypesTranslates
      }
    }
    const newLocale = _.merge(locale, typesTranslates)
    this.$i18n.setLocaleMessage(this.localCode!, newLocale)
    console.log(this.localCode, _.cloneDeep(this.$i18n.messages[this.localCode!]))
  }
}
