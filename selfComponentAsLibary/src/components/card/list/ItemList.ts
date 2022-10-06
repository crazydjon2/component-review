import { DOWNLOAD_FILE, GET_FAVORITES_ITEM, REMOVE_OBJECTS_FROM_FAVORITE } from '@/store/modules/Favorite/const.Favorite'
import { Prop, Component, Vue, Watch } from 'vue-property-decorator'

import ModalDelete from '@/components/modal/modalDelete/ModalDelete.vue'
import Pagination from '@/components/pagination/Pagination.vue'

import ResizableColumns from '@/mixins/ResizableColumns'
import { mixins } from 'vue-class-component'

import copy from 'copy-to-clipboard'
import { formatDate } from '@/utils/docs.utils'
import {FavoriteListResponse, IFavoriteDocument, IPagination, ISort, ITableHeaders} from '@/types'

import { getFiltersArr, convertFiltersToRSHB } from '@/utils/filters.utils'

let timer: any = null

@Component({
  components: {
    Pagination,
    ModalDelete
  }
})
export default class ItemList extends mixins(ResizableColumns) {
  @Prop({type: String, default: '903c856e-4e27-4fb1-b3f1-051582bfffb6'}) favId!: string
  @Prop( {type: Object}) sendSnackBar?: any
  @Prop({type: Array, default: () => []}) filters!: any[]
  @Prop({ type: Boolean, default: false }) searchTrigger?: boolean
  @Prop({type: String, default: '5cb0b0f8-aea8-4426-805e-c2337e851e8d'}) userId!: string

  formatDate = formatDate
  getFiltersArr = getFiltersArr
  convertFiltersToRSHB = convertFiltersToRSHB

  EPagination: IPagination = {
    page: 1,
    itemsPerPage: 10,
    sortBy: ['date'],
    sortDesc: [true]
  }

  sortObject: ISort = {
    sortBy: 'date',
    desc: true
  }

  selected: IFavoriteDocument[] = []

  totalCount: number = 0

  headers: ITableHeaders[] = [
    {
      value:'count',
      text: '№',
      sortable: false,
      width: 40
    },
    {
      value: 'shortTitle',
      text: 'Наименование'
    },
    {
      value: 'file',
      text: '',
      sortable: false,
      width: 40
    },
    {
      value: 'type',
      text: 'Тип карточки'
    },
    {
      value: 'createdBy',
      text: 'Автор'
    },
    {
      value: 'date',
      text: 'Дата'
    }
  ]

  dialogDelete: boolean = false

  get favoritesItems(): IFavoriteDocument[] {
    return this.$store.getters.getFavoritesItems
  }

  @Watch('EPagination', {deep: true})
  onPaginationChange() {
    this.getFavoritesItems()
  }

  @Watch('searchTrigger')
  searchCalled () {
    this.getFavoritesItems()
  }

  created() {
    this.getFavoritesItems()
  }

  getFavoritesItems() {
    clearTimeout(timer)
    timer = setTimeout(() => {

      const paramSearch: FavoriteListResponse = {
        page: this.EPagination.page,
        pageSize: this.EPagination.itemsPerPage,
        sort: this.sortObject.sortBy,
        order: this.sortObject.desc ? 'desc' : 'asc'
      }
      if (this.filters.length) {
        paramSearch.search = {}
        paramSearch.search.predicates = []
        paramSearch.search.operand = 'AND'
        paramSearch.search!.predicates!.push(...this.getFiltersArr(this.filters))
      }

      this.$store.dispatch(GET_FAVORITES_ITEM, {id: this.favId, body: paramSearch})
        .then((res) => {
          this.totalCount = res.data.totalPages
        })
    }, 10)
  }

  removeObjectsFormFavorite(bool: boolean) {
    if (bool) {
      this.$store.dispatch(REMOVE_OBJECTS_FROM_FAVORITE, { favoriteId: this.favId, ids: this.selected.map((item: IFavoriteDocument) => item.id) })
        .then((res) => {
          this.selected = []
          this.getFavoritesItems()
          if (this.sendSnackBar) {
            this.sendSnackBar.success('Успешно удалено')
          }
        })
        .catch((e) => {
          if (this.sendSnackBar) {
            this.sendSnackBar.serverError(e)
          }
        })
    }
    this.EPagination.page = 1
    this.dialogDelete = false
  }

  downloadFiles() {
    this.$store.dispatch(DOWNLOAD_FILE, this.selected.map((item: IFavoriteDocument) => item.id))
      .catch((e) => {
        if (this.sendSnackBar) {
          this.sendSnackBar.serverError(e)
        }
      })
  }

  async copyFullLinkToClipboard () {
		const curLink = window.location.href.split('?')[0]
		this.copyToClipboard(curLink)
    if (this.sendSnackBar) {
      this.sendSnackBar.success('Ссылка скопирована')
    }
	}

  copyToClipboard (text:string) {
		copy(text)
	}

  // Emit происходит при двойном нажатии на элемент списка, $event - сам элемент
  onRowDClick(mouse: any, data: any) {
    this.$emit('itemDClick', data.item)
  }

  onSort(event: any) {
    this.sortObject.sortBy = event
    this.EPagination.sortBy = [event]
    this.getFavoritesItems()
  }

  onDescChange(event: any) {
    this.sortObject.desc = event
    this.EPagination.groupDesc = [event]
    this.getFavoritesItems()
  }

  clearFilters () {
    this.EPagination.page = 1
    this.$emit('clear-filters')
  }
}
