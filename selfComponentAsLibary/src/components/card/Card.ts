import { Prop, Component, Vue, Watch } from 'vue-property-decorator'

import ItemList from './list/ItemList.vue'
import UserAccess from './access/UserAccess.vue'

@Component({
    components: {
        ItemList,
        UserAccess
    }
})
export default class Card extends Vue {
  @Prop({type: String, default: 'list'}) tab!: string
  @Prop({type: String, default: '903c856e-4e27-4fb1-b3f1-051582bfffb6'}) favId!: string
  @Prop( {type: Object}) sendSnackBar?: any
  @Prop({type: Array, default: () => []}) cardFilters!: any[]
  @Prop({ type: Boolean, default: false }) cardSearchTrigger?: boolean
  @Prop({type: String, default: '5cb0b0f8-aea8-4426-805e-c2337e851e8d'}) userId!: string

  clearFilters () {
    this.$emit('clear-filters')
  }
}
