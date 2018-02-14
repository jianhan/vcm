import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import { createFlashStore } from 'vuex-flash'

Vue.use(Vuex)
export default new Vuex.Store({
  modules: {
    auth
  },
  plugins: [
    createFlashStore()
  ]
})
