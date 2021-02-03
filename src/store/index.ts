import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isApplicationOn: false,
    serverIP: 'http://192.168.1.21:8055',
    sentMessages: [],
    packageVersion: process.env.PACKAGE_VERSION || '0',
    apiDetails: {
      used: 750,
      max: 5000,
    },
  },
  getters: {
    applicationOn(state) {
      return state.isApplicationOn;
    },

    serverIP(state) {
      return state.serverIP;
    },

    sentMessages(state) {
      // return state.sentMessages; FIXME

      const twoHours = 7200000;

      return [{
        nation: {
          name: 'One',
          leader: 'One',
        },
        sentTimeMilliseconds: Date.now(),
        successful: true
      },
      {
        nation: {
          name: 'Two',
          leader: 'Two',
        },
        sentTimeMilliseconds: Date.now() + twoHours * 1.5,
        successful: true
      },
      {
        nation: {
          name: 'Three',
          leader: 'Three',
        },
        sentTimeMilliseconds: Date.now() + twoHours * 5,
        successful: true
      },
      {
        nation: {
          name: 'Three',
          leader: 'Three',
        },
        sentTimeMilliseconds: Date.now() + twoHours * 5.2,
        successful: true
      },
      {
        nation: {
          name: 'Three',
          leader: 'Three',
        },
        sentTimeMilliseconds: Date.now() + twoHours * 5.3,
        successful: true
      },
      {
        nation: {
          name: 'Four',
          leader: 'Four',
        },
        sentTimeMilliseconds: Date.now() + twoHours * 7.8,
        successful: false,
        error: 'Nation too new!'
      }];
    },

    appVersion: (state) => {
      return state.packageVersion;
    },

    apiDetails: (state) => {
      return state.apiDetails;
    },
  },
  mutations: {
    setApplicationState(state, isOn) {
      state.isApplicationOn = isOn;
    },

    setSentMessages(state, sentMessagesRefresh) {
      state.sentMessages = sentMessagesRefresh;
    },

    setAPIDetails(state, newAPIDetails: {used: number; max: number}) {
        state.apiDetails = newAPIDetails;
    },
  },
  actions: {
  },
  modules: {
  }
})
