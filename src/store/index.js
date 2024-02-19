//import Vue from 'vue'
import Vuex from 'vuex'
import core from './modules/core'
import todos from './modules/todos'
import users from './modules/users'
import interests from './modules/interests'
import locations from './modules/locations'


export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    core, todos, users, interests, locations
  }
})