/**
 * Метод парсит массив в фильтры для запроса
 * @param filters - массив фильтров которые надо распарсить
 * @return - массив фильтров для запросов
 */
export function getFiltersArr(filters: Array<any>): Array<any> {
	let filterArr: Array<any> = []
	for (const item of filters) {
		switch (item.filterType) {
			case 'input': {
				filterArr.push(inputFilterArr(item))
				break
			}
			case 'dateTime': {
				filterArr = filterArr.concat(dateTimeFilterArr(item))
				break
			}
			case 'dictionary': {
				filterArr.push(dictionaryFilterArr(item))
				break
			}
			case 'constants':
				filterArr = filterArr.concat(constantsFilterArr(item))
				break
			default: {
				const field = {
					fields: [item.attributeName],
					operator: item.operation && item.operation.value,
					value: item.value
				}
				filterArr.push(field)
				break
			}
		}
	}
	return filterArr
}

function inputFilterArr(item: any): any {
	const operator = item.value.length > 1
		? item.operation.value === 'NOT_EQUALS' ? 'NOT_IN' : 'IN'
		: item.operation.value
	return {
		fields: [item.attributeName],
		...(item.value.length > 1 ? {values: item.value} : {values: [item.value.join('')]}),
		operator,
	}
}

function dateTimeFilterArr(item: any): Array<any> {
	const filters = []
	if (item.value.from) {
		filters.push({
			fields: [item.attributeName],
			operator: 'GREATER_OR_EQUALS',
			value: item.value.from
		})
	}
	if (item.value.to) {
		filters.push({
			fields: [item.attributeName],
			operator: 'LESS_OR_EQUALS',
			value: item.value.to
		})
	}
	return filters
}

function dictionaryFilterArr(item: any): any {
	return {
		fields: [item.attributeName],
		operator: item.operation && item.operation.value === 'EQUALS' ? 'IN' : 'NOT_IN',
		values: item.value.map((option: any) => option.value)
	}
}

function constantsFilterArr(item: any): any {
	const hasFields = item.value.find((selected: any) => Object.keys(selected).includes('fields'))
	if (!hasFields) {
		return [{
			fields: [item.attributeName],
			operator: item.operation && item.operation.value === 'EQUALS' ? 'IN' : 'NOT_IN',
			values: item.value.map((option: any) => option.value)
		}]
	} else {
		return item.value.map((filter: any) => {
			const newFilter = {
				fields: filter.fields ? filter.fields : [],
				operator: 'EQUALS',
				values: (filter.value as string).split(',')
			}
			return newFilter
		})
	}
}

export type ShortenOperator = 'EQ' | 'GTE' | 'LTE'
export type Operator =
	'IN' | 'NOT_IN' | 'EQUALS' | 'NOT_EQUALS' | 'LIKE' | 'START_WITH' | 'END_WITH' | 'GREATER_OR_EQUALS' | 'LESS_OR_EQUALS'


export interface FilterArrayItemInterface {
	fields: Array<string>,
	operator: Operator,
	values?: Array<string | boolean | number>
	value?: string | Array<string>
}

export interface RshbFilterInterface {
	field: string,
	value?: Array<string | boolean | number>,
	values?: Array<string | boolean | number>,
	operation: string
}


export function convertFiltersToRSHB(filters: Array<FilterArrayItemInterface>): Array<RshbFilterInterface> {
	return filters.map((filter: FilterArrayItemInterface) => {
		const values: Array<string | boolean | number> | undefined =  filter.values ? filter.values : undefined
		const value: Array<string | boolean | number> | undefined =  filter.value
			? Array.isArray(filter.value) ? filter.value : [filter.value]
			: undefined
		return {
			field: filter.fields[0],
			...(values ? {values: values} : {value: value}),
			operation: mapOperator(filter.operator)
		}
	})
}

function mapOperator(operator: Operator): ShortenOperator {
	const operators: {[key: string]: ShortenOperator} = {
		'EQUALS': 'EQ',
		'IN': 'EQ',
		'GREATER_OR_EQUALS': 'GTE',
		'LESS_OR_EQUALS': 'LTE',
	}
	return operators[operator]
}

