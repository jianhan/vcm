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
    if (!_.isBoolean(value)) {
      console.warn('SET_IS_AUTHENTICATING is not a valid boolean value: ' + value)
    } else {
      this.isAuthenticating = value
    }
  },
  [SET_AUTHENTICATION_MSG] (state, value) {
    if (!_.isObject(value) || !_.isNull(value)) {
      console.warn('SET_AUTHENTICATION_MSG is not a valid type, must be object or null: ' + value)
    } else {
      if (_.get(value, 'message', false) && _.get(value, 'variant', false)) {
        this.authenticationMsg = value
        return
      }
      console.warn('SET_AUTHENTICATION_MSG is not a valid message : ' + value)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
