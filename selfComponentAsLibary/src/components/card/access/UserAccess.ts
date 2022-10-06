import { GET_FAVORITE, GET_USERS, SAVE_FAVORITE } from '@/store/modules/Favorite/const.Favorite'
import { IAccess, IFavoriteItem, IUser } from '@/types'
import { Prop, Component, Vue, Watch } from 'vue-property-decorator'

import UserModal from '@/components/modal/userModal/UserModal.vue'

@Component({
  components: {UserModal}
})
export default class UserAccess extends Vue {
  @Prop({type: String, default: '9b20f72f-644d-4ff0-ac2b-e1953633ea99'}) favId!: string
  @Prop( {type: Object}) sendSnackBar?: any

  access: IAccess = {
    editors: [],
    readers: [],
    removers: []
  }

  mode: string = 'editors'

  accessCheck: string | null = null

  saveData: IFavoriteItem | null = null

  loading: boolean = true
  dialogUser: boolean = false

  created() {
    this.$store.dispatch(GET_USERS)
    this.getFavoriteData()
  }

  get canISave(): boolean {
    return JSON.stringify(this.access) === this.accessCheck
  }

  get users(): IUser[] {
    return this.$store.getters.getUsers
  }

  getFavoriteData() {
    this.loading = true
    this.$store.dispatch(GET_FAVORITE, this.favId)
      .then((res) => {
        if (res.data.items && res.data.items.length) {
          this.saveData = res.data.items[0]
          const favoriteData = res.data.items[0].data
          this.access.editors = favoriteData.editors
          this.access.readers = favoriteData.readers
          this.access.removers = favoriteData.removers

          this.accessCheck = JSON.stringify(this.access)

          this.loading = false
        }
      })
  }

  openModal(mode: string) {
    this.mode = mode
    this.dialogUser = true
  }

  saveAccess() {
    if (!this.saveData) {
      return
    }
    this.$store.dispatch(SAVE_FAVORITE, {
      ...this.saveData,
      attributes: {
        ...this.saveData.data,
        editors: this.access.editors,
        removers: this.access.removers,
        readers: this.access.readers
      }
    })
      .then(() => {
        this.getFavoriteData()
        if (this.sendSnackBar) {
          this.sendSnackBar.success('Успешно сохранено')
        }
      })
      .catch((e) => {
        if (this.sendSnackBar) {
          this.sendSnackBar.serverError(e)
        }
      })
  }
}