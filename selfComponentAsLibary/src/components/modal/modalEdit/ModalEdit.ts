import { CREATE_FAVORITE, UPDATE_FAVORITE } from '@/store/modules/Favorite/const.Favorite'
import { IFavoriteItem } from '@/types'
import { Prop, Component, Vue, Watch } from 'vue-property-decorator'


@Component({})
export default class ModalEdit extends Vue {
	@Prop(Boolean) dialog!: boolean
	@Prop(String) fileToEdit!: string
	@Prop( {type: Object}) sendSnackBar?: any

	favoriteName: string = ''

	get favoriteList(): IFavoriteItem[] {
    return this.$store.getters.getFavoritesList
  }

	@Watch('fileToEdit')
	onNewFileEdit(value: string) {
		const item = this.favoriteList.find((fav: IFavoriteItem) => fav.objectId === value)
		if (item && item.data) {
			this.favoriteName = item.data.shortTitle
		} else {
			this.favoriteName = ''
		}
	}

	closeModal(bool: boolean) {
		if (bool) {
			const favoriteData = this.favoriteList.find((fav: IFavoriteItem) => fav.objectId === this.fileToEdit)

			if (favoriteData) {
				this.$store.dispatch(UPDATE_FAVORITE, {
					...favoriteData,
					type: 'FavoritesMdl',
					attributes: {
						shortTitle: this.favoriteName
					}
				})
					.then((res) => {
						setTimeout(() => {
							this.$emit('modalClose', true)

						}, 400)
					})
					.catch((e) => {
						this.$emit('modalClose', false)
						if (this.sendSnackBar) {
							this.sendSnackBar.serverError(e)
						}
					})
			}
		} else {
			this.$emit('modalClose', bool)
		}
		this.favoriteName = ''
	}
}
