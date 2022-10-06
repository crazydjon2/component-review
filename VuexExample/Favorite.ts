import { IFavItem, IFavoriteState } from "@/App/types";
import axios from "axios";
import { ADD_OBJECTS_TO_FAVORITE, CREATE_FAVORITE, GET_FAVORITES, SET_FAVORITES_LIST } from "./const.Favorite";

const state: IFavoriteState = {
	favoriteList: []
}

const getters = {
	getFavList: (state: IFavoriteState) => state.favoriteList
}

const actions = {
	[GET_FAVORITES]: async ({ commit }: { commit: any }, data: any) => {
		return new Promise((resolve, reject) => {
			axios.post('/api/favorites/list', data)
				.then((res: any) => {
					commit(SET_FAVORITES_LIST, res.data.items)
					resolve(res)
				})
				.catch((e) => {
					reject(e)
				})
		})
	},
	[CREATE_FAVORITE]: async ({ commit }: { commit: any }, name: string) => {
		const postData: any = {
			type: 'FavoritesMdl'
		}

		if (name) {
			postData.attributes = {}
			postData.attributes.shortTitle = name
		}
		return new Promise((resolve, reject) => {
			axios.post(`/api/favorites`, postData)
				.then((res: any) => {
					resolve(res)
				})
				.catch((e: any) => {
					reject(e)
				})
		})
	},
	[ADD_OBJECTS_TO_FAVORITE]: async ({ commit, dispatch }: { commit: any, dispatch: any }, { favoriteId, ids } : {favoriteId: string, ids: string[]}) => {
    return new Promise((resolve, reject) => {
      axios.post(`/api/favorites/${favoriteId}/link`, ids)
        .then((res) => {
          resolve(res)
        })
        .catch((e) => {
          reject(e)
        })
    })
  },
}

const mutations = {
	[SET_FAVORITES_LIST]: (state: IFavoriteState, list: IFavItem[]) => {
		state.favoriteList = list
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}
