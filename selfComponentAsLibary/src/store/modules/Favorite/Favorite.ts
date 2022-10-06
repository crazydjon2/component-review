import { FavoriteListResponse, IFavoriteItem } from "@/types"
import axios from "axios"
import { CREATE_FAVORITE, DELETE_FAVORITE, DOWNLOAD_FILE, GET_FAVORITE, GET_FAVORITES_ITEM, GET_FAVORITES_LIST, GET_USERS, REMOVE_OBJECTS_FROM_FAVORITE, SAVE_FAVORITE, SET_FAVORITES_ITEM, SET_FAVORITES_LIST, SET_USERS, UPDATE_FAVORITE } from "./const.Favorite"

interface IState {
	favoriteList: IFavoriteItem[],
  favoritesItems: any,
  users: any
}

const state: IState = {
  favoriteList: [],
  favoritesItems: [],
  users: []
}

const getters = {
  getFavoritesList: (State: IState) => State.favoriteList,
  getFavoritesItems: (State: IState) => State.favoritesItems,
  getUsers: (state: IState) => state.users
}

const actions = {
  [GET_FAVORITES_LIST]: async ({ commit, dispatch }: { commit: any, dispatch: any }, data: FavoriteListResponse) => {
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
  [CREATE_FAVORITE]: async ({ commit, dispatch }: { commit: any, dispatch: any }, name: string) => {
    return new Promise((resolve,reject) => {
      axios.post(`/api/favorites`, {
        type: 'FavoritesMdl',
        attributes: {
          shortTitle: name
        }
      })
        .then((res: any) => {
          resolve(res)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  },
  [DELETE_FAVORITE]: async ({ commit, dispatch }: { commit: any, dispatch: any }, id: string) => {
    return new Promise((resolve,reject) => {
      axios.delete(`/api/favorites/${id}`)
        .then((res: any) => {
          resolve(res)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  },
  [GET_FAVORITES_ITEM]: async ({ commit, dispatch }: { commit: any, dispatch: any }, {id, body} : {id: string, body: any}) => {
    return new Promise((resolve, reject) => {
      axios.post(`/api/favorites/${id}/items`, {
        ...body,
        objectsType: 'Content'
      })
        .then((res: any) => {
          commit(SET_FAVORITES_ITEM, res.data.items)
          resolve(res)
        })
        .catch((e) => {
          reject(e)
        })
    })
  },
  [REMOVE_OBJECTS_FROM_FAVORITE]: async ({ commit, dispatch }: { commit: any, dispatch: any }, { favoriteId, ids } : {favoriteId: string, ids: string[]}) => {
    return new Promise((resolve, reject) => {
      axios.post(`/api/favorites/${favoriteId}/unlink`, ids)
        .then((res) => {
          resolve(res)
        })
        .catch((e) => {
          reject(e)
        })
    })
  },
  [GET_FAVORITE]: async ({ commit, dispatch }: { commit: any, dispatch: any }, id: string) => {
    return new Promise((resolve, reject) => {
      axios.post('/api/favorites/list' , {
        page: 0,
        pageSize: 1,
        searches: {
          filters: [
            {
              predicates: [
                {
                  fields: ['objectId'],
                  values: [id],
                  operation: 'EQUALS'
                }
              ]
            }
          ]
        },
      })
        .then((res) => {
          resolve(res)
        })
        .catch((e) => {
          reject(e)
        })
    })
  },
  [SAVE_FAVORITE]: async ({ commit, dispatch }: { commit: any, dispatch: any }, data: any) => {
    return new Promise((resolve, reject) => {
      axios.post('/api/favorites', data)
        .then((res) => {
          resolve(res)
        })

    })
  },
  [GET_USERS]: async ({ commit, dispatch }: { commit: any, dispatch: any }, data: any) => {
    return new Promise((resolve, reject) => {
      axios.post('/api/users/list', {
        objectsType: "UsersMdl",
        pageSize: 300
      })
        .then((res) => {
          commit(SET_USERS, res.data.items)
          resolve(res)
        })
        .catch((e) => {
          reject(e)
        })
    })
  },
  [DOWNLOAD_FILE]: async ({ commit, dispatch }: { commit: any, dispatch: any }, ids: string[]) => {
    return new Promise((resolve, reject) => {
      axios.post('/api/files/downloadAll', {
        packageName: 'string',
        entries: ids.map((id: string) => {
          return {
            fileVersionId: id,
            entryPath: 'string'
          }
        })
      })
        .then((res) => {
          resolve(res)
        })
        .catch((e) => {
          reject(e)
        })
    })
  },
  [UPDATE_FAVORITE]: async ({ commit, dispatch }: { commit: any, dispatch: any }, favoriteData: any) => {
    return new Promise((resolve,reject) => {
      axios.post(`/api/favorites`, favoriteData)
        .then((res: any) => {
          resolve(res)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  },
}

const mutations = {
  [SET_FAVORITES_LIST]: (State: IState, favoriteList: IFavoriteItem[]) => {
    State.favoriteList = favoriteList
  },
  [SET_FAVORITES_ITEM]: (State: IState, favoriteItems: any) => {
    State.favoritesItems = favoriteItems.map((item: any) => {
      return {
        ...item,
        id: item.objectId,
        shortTitle: item.data.shortTitle
      }
    })
  },
  [SET_USERS]: (State: IState, users: any) => {
    State.users = users
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
