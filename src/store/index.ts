import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isApplicationOn: false,
    serverIP: 'http://192.168.1.21:8055',
    sentMessages: [],
    packageVersion: process.env.PACKAGE_VERSION || '0',
  },
  getters: {
    applicationOn(state) {
      return state.isApplicationOn;
    },

    serverIP(state) {
      return state.serverIP;
    },

    sentMessages(state) {
      return state.sentMessages;
    },

    appVersion: (state) => {
      return state.packageVersion;
    },
  },
  mutations: {
    setApplicationState(state, isOn) {
      state.isApplicationOn = isOn;
    },

    setSentMessages(state, sentMessagesRefresh) {
      state.sentMessages = sentMessagesRefresh;
    }
  },
  actions: {
  },
  modules: {
  }
})
