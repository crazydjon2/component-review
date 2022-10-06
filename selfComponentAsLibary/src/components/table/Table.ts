import { CREATE_FAVORITE, DELETE_FAVORITE, GET_FAVORITES_LIST } from '@/store/modules/Favorite/const.Favorite'
import { FavoriteListResponse, IFavoriteItem, IPagination, ISort, ITableHeaders } from '@/types'
import { Prop, Component, Vue, Watch } from 'vue-property-decorator'

import Pagination from '../pagination/Pagination.vue'
import ModalDelete from '@/components/modal/modalDelete/ModalDelete.vue'
import ModalCreate from '@/components/modal/modalCreate/ModalCreate.vue'
import ModalEdit from '@/components/modal/modalEdit/ModalEdit.vue'
import { formatDate } from '@/utils/docs.utils'
import { getFiltersArr } from '@/utils/filters.utils'

let timer : any = null

@Component({
  components: {
    Pagination,
    ModalDelete,
    ModalCreate,
    ModalEdit
  }
})
export default class Table extends Vue {
  @Prop( {type: Object}) sendSnackBar?: any
  @Prop({type: Array, default: () => []}) filters!: any[]
  @Prop({ type: Boolean, default: false }) isAdmin?: boolean
	@Prop({}) isAccess: any
  @Prop({ type: Boolean, default: false }) searchTrigger?: boolean
  @Prop({type: String, default: '5cb0b0f8-aea8-4426-805e-c2337e851e8d'}) userId!: string

  formatDate = formatDate
  getFiltersArr = getFiltersArr

  EPagination: IPagination = {
    page: 1,
    itemsPerPage: 10,
    sortBy: ['date'],
    sortDesc: [true],
    filters: '',
    criterias: [],
    groupBy: [],
    groupDesc: [],
    multiSort: false
  }

  selected: IFavoriteItem[] = []

  totalCount: number = 1

  headers: ITableHeaders[] = [
    {
      value:'count',
      text: '№',
      width: 40,
      sortable: false
    },
    {
      value: 'data.shortTitle',
      text: 'Наименование'
    },
    {
      value: 'data.number',
      text: 'Номер'
    },
    {
      value: 'data.author',
      text: 'Автор'
    },
    {
      value: 'date',
      text: 'Дата'
    },
    {
      value: 'action',
      text: '',
      align: 'end'
    }
  ]

  itemForDelete: IFavoriteItem | null = null
  dialogDelete: boolean = false
  dialogCreate: boolean = false
  dialogEdit: boolean = false

  sortObject: ISort = {
    sortBy: 'date',
    desc: true
  }

  fileToEdit: string = ''

  @Watch('EPagination', {deep: true})
  onPaginationChange() {
    this.getFavoritesList()
  }

  @Watch('searchTrigger')
  searchCalled () {
    this.getFavoritesList()
  }

  created() {
    this.getFavoritesList()
  }

  get favoriteList(): IFavoriteItem[] {
    return this.$store.getters.getFavoritesList
  }

  getFavoritesList() {
    clearTimeout(timer)
    timer = setTimeout(() => {
      const paramSearch: FavoriteListResponse = {
        page: this.EPagination.page,
        pageSize: this.EPagination.itemsPerPage,
        sort: this.sortObject.sortBy,
        order: this.sortObject.desc ? 'desc' : 'asc',
        searches: {
          filters: [
            {
              predicates: [
                {
                  fields: ['data.readers'],
                  operator: 'LIKE',
                  values: [this.userId]
                }
              ]
            }
          ]
        }
      }
      if (this.filters.length) {
        paramSearch.search = {}
        paramSearch.search.predicates = []
        paramSearch.search.operand = 'AND'
        paramSearch.search!.predicates!.push(...this.getFiltersArr(this.filters))
      }

      this.$store.dispatch(GET_FAVORITES_LIST, paramSearch)
        .then((res) => {
          if (res.data.totalPages) {
            this.totalCount = res.data.totalPages
          }
        })
    }, 10)
  }

  openModal(item: IFavoriteItem) {
    this.dialogDelete = true
    this.itemForDelete = item
  }

  async deleteFavorite(bool: boolean) {
    this.dialogDelete = false
    if (bool && this.itemForDelete) {
      this.$store.dispatch(DELETE_FAVORITE, this.itemForDelete.objectId)
        .then(() => {
          this.EPagination.page = 1
          if (this.sendSnackBar) {
            this.sendSnackBar.success('Успешно удалено')
          }
          this.getFavoritesList()
        })
    }
  }

  onCreateClose(bool: boolean) {
    this.dialogCreate = false
    if (bool) {
      this.EPagination.page = 1
      this.getFavoritesList()
      if (this.sendSnackBar) {
        this.sendSnackBar.success('Подборка создана')
      }
    }
  }

  onRowDClick(mouse: any, {item}: {item: IFavoriteItem}) {
    this.$emit('favDClick', item)
  }

  onSort(event: any) {
    this.sortObject.sortBy = event
    this.EPagination.sortBy = [event]
    this.getFavoritesList()
  }

  onDescChange(event: any) {
    this.sortObject.desc = event
    this.EPagination.groupDesc = [event]
    this.getFavoritesList()
  }

  addFileToEdit(id: string) {
    this.fileToEdit = id
    this.dialogEdit = true
  }

  onEditClose(bool: boolean) {
    this.dialogEdit = false
    if (bool) {
      this.EPagination.page = 1
      this.getFavoritesList()
      if (this.sendSnackBar) {
        this.sendSnackBar.success('Название изменено')
      }
    }
  }
  clearFilters () {
    this.EPagination.criterias = []
    this.EPagination.page = 1
    this.$emit('clear-filters')
  }

  cantDelete(fav: IFavoriteItem) {
    if (fav.data) {
      return !!fav.data.removers.find((id: string) => id === this.userId)
    }
  }

  cantEdit(fav: IFavoriteItem) {
    if (fav.data) {
      return !! fav.data.editors.find((id: string) => id === this.userId)
    }
  }
}
