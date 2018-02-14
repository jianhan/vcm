import {SET_USER, DELETE_USER} from '../mutation-types'
import _ from 'lodash'

const state = {
  user: null
}

// getters
const getters = {

}

// actions
const actions = {

}

// mutations
const mutations = {
  [SET_USER] (state, user) {
    if (_.isObject(user)) {
      state.user = user
    }
  },
  [DELETE_USER] (state) {
    state.user = null
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
