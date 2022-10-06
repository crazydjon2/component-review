import { Prop, Component, Vue, Watch } from 'vue-property-decorator'


@Component({})
export default class ModalDelete extends Vue {
	@Prop(Boolean) dialog!: boolean
	@Prop(String) title?: string

	closeModal(bool: boolean) {
		this.$emit('modalClose', bool)
	}
}
