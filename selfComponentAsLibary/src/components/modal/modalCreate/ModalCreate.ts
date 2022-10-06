import { CREATE_FAVORITE } from '@/store/modules/Favorite/const.Favorite'
import { Prop, Component, Vue, Watch } from 'vue-property-decorator'


@Component({})
export default class ModalCreate extends Vue {
	@Prop(Boolean) dialog!: boolean

    favoriteName: string = ''

	closeModal(bool: boolean) {
        if (bool) {
            this.$store.dispatch(CREATE_FAVORITE, this.favoriteName)
                .then((res) => {
                    setTimeout(() => {
                        this.$emit('modalClose', true)

                    }, 400)
                })
                .catch(() => {
                    this.$emit('modalClose', false)
                })
        } else {
            this.$emit('modalClose', bool)
        }
        this.favoriteName = ''
	}
}
