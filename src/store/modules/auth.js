import { SET_USER, DELETE_USER, SET_IS_AUTHENTICATING, SET_AUTHENTICATION_MSG } from '../mutation-types'
import _ from 'lodash'

const state = {
  user: null,
  isAuthenticating: false,
  authenticationMsg: null
}

// getters
const getters = {
  username: state => {
    return _.get(state, 'user.name', '')
  },
  hasAuthenticationMsg: state => {
    return state.authenticationMsg !== null
  }
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
  },
  [SET_IS_AUTHENTICATING] (state, value) {
    state.isAuthenticating = value
  },
  [SET_AUTHENTICATION_MSG] (state, value) {
    state.authenticationMsg = value
  }
}

export default {
  namespace: true,
  state,
  getters,
  actions,
  mutations
}
