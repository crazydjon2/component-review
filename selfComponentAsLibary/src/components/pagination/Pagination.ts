
import { Component, Vue, Prop, Model, Watch } from 'vue-property-decorator'

@Component
export default class Pagination extends Vue {
	// Props
	@Model('change', { type: Object, default: {} }) EPagination!: any
  @Prop({ type: Number }) totalCount!: number

	itemsPerPageItems: Array<number> = [10, 20, 30]

	updateItemsPerPage(number: number) {
		this.EPagination.itemsPerPage = number
		this.EPagination.page = 1
	}

  @Watch('EPagination', { deep: true, immediate: true })
	watchEPagination (value1:any,value2:any) {
    setTimeout(() => {
      // @ts-ignore Чиним сломаную компоненту пагинации vuetify
      this.$refs.pagination.maxButtons = this.totalCount >= 7 ? this.totalCount : 7
    }, 0)
	}
}
