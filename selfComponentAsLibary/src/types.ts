export type Operator =
	'IN' | 'NOT_IN' | 'EQUALS' | 'NOT_EQUALS' | 'LIKE' | 'START_WITH' | 'END_WITH' | 'GREATER_OR_EQUALS' | 'LESS_OR_EQUALS'

export interface IPagination {
	criterias?: Array<any> | any
	sortBy?: any
	descending?: boolean
	page: number
	itemsPerPage: number // 1000 max
	filters?: string
	parentId?: any
	withDeleted?: boolean
	totalItems?: number
	sortDesc?: any // array [boolean],
	groupDesc?: boolean[]
	groupBy?: string[],
	multiSort?: boolean
}

export interface IFavoriteItem {
	objectId: string,
	versionId: string,
	type: string,
	classPath: string,
	data?: {
		number: string,
		creator: string,
		readers: string[],
		removers: string[],
		editors: string[]
		shortTitle: string,
	},
	date: string,
	deleted: boolean,
	createdBy: string,
	versionNumber: number
}

export interface FilterArrayItemInterface {
	fields: Array<string>,
	operator: Operator,
	values?: Array<string | boolean | number>
	value?: string | Array<string>
}

export interface FavoriteParamSearchPredicate {
	predicates?: Array<FilterArrayItemInterface>,
	operand?: string
}

export interface FavoriteListResponse {
	page: number,
	pageSize: number,
	sort?: string,
	order?: string,
	search?: FavoriteParamSearchPredicate,
	searches?: {
		filters?: Array<FavoriteParamSearchPredicate>,
		operand?: string
	}
}

export interface IUserAuthState {
	status: string;
	token: string;
	username: string;
	hasLoadedOnce: boolean;
}

export interface ISort {
	sortBy: string,
	desc: boolean
}

export interface IAccess {
	editors: string[],
	readers: string[],
	removers: string[]
}

export interface IUser {
	classPath: string,
	createdBy: string,
	data: {
		login: string,
		roles: any[],
		shortTitle: string
	},
	date: string,
	deleted: boolean,
	objectId: string,
	type: string,
	versionId: string,
	versionNumber: number
}

export interface IFavoriteDocument {
	classPath: string,
	createdBy: string | null,
	id: string,
	data: {
		codeBusinessProcess: any[],
		documentClass: string,
		documentDate: string,
		documentNumber: string,
		msId: string,
		msIdSystemId: any[],
		regionalBranches: any,
		responsible: string,
		shortTitle: string
	}
	date: string,
	deleted: boolean,
	objectId: string,
	type: string,
	versionId: string,
	versionNumber: number
}

export interface ITableHeaders {
	value: string,
	sortable?: false,
	text?: string,
	width?: number,
	align?: string
}
