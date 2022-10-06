import { CREATE_FAVORITE } from '@/store/modules/Favorite/const.Favorite'
import { IAccess, IPagination, IUser } from '@/types'
import { Prop, Component, Vue, Watch, Model } from 'vue-property-decorator'

import Pagination from '@/components/pagination/Pagination.vue'

@Component({
	components: {
		Pagination
	}
})
export default class UserModal extends Vue {
	@Prop(Boolean) dialog!: boolean
	@Model('change') access!: IAccess
	@Prop(String) mode!: string

	search: string = ''

	pagination: IPagination = {
		page: 1,
		itemsPerPage: 10
	}

	get users(): IUser[] {
		if (this.search) {
			return this.$store.getters.getUsers
				.filter((user: IUser) => user.data.login && user.data.login.toLowerCase().includes(this.search.toLowerCase()))
		} else {
			return this.$store.getters.getUsers
		}
	}

	get totalCount(): number {
		return Math.ceil(this.users.length / this.pagination.itemsPerPage)
	}

	get usersToShow(): IUser[] {
		const startIndex = this.pagination.itemsPerPage * (this.pagination.page - 1)
		return this.users.slice(startIndex, startIndex + this.pagination.itemsPerPage)
	}

	checkInclude(user: IUser) {
		return this.access[this.mode as keyof IAccess].find((id: string) => id === user.objectId)
	}

	addUser(user: IUser) {
		if (this.checkInclude(user)) {
			this.access[this.mode as keyof IAccess] = this.access[this.mode as keyof IAccess].filter((id: string) => id !== user.objectId)
		} else {
			this.access[this.mode as keyof IAccess].push(user.objectId)
		}
	}
}

