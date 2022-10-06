import { CHANGE_ITEMS_PER_PAGE } from '@/store/modules/Pagination/const.Pagination'
import { Component, Vue, Prop, Model, Watch } from 'vue-property-decorator'

@Component
export default class Pagination extends Vue {
	// Props
	@Model('change', { type: Object, default: {} }) EPagination!: any
  	@Prop({ type: Number }) totalCount!: number
	@Prop({type: Boolean, default: true}) withSelect? : boolean

	itemsPerPageItems: Array<number> = [10, 20, 30]

	updateItemsPerPage(number: number) {
		this.EPagination.itemsPerPage = number
		this.EPagination.page = 1
		this.$store.dispatch(CHANGE_ITEMS_PER_PAGE, number)
	}

  @Watch('EPagination', { deep: true })
	watchEPagination () {
    setTimeout(() => {
      // @ts-ignore Чиним сломаную компоненту пагинации vuetify
      this.$refs.pagination.maxButtons = 9
    }, 0)
	}
}
