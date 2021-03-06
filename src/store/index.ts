import { GitHubRelease } from '@/types';
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import analytics from './modules/analytics';

export default new Vuex.Store({
  state: {
    isApplicationOn: false,
    // serverIP: 'http://'+location.hostname+':'+location.port,
    serverIP: 'http://'+location.hostname+':'+(Vue.config.devtools ? '8055': location.port),
    sentMessages: [],
    lastRefreshed: 0,
    packageVersion: process.env.PACKAGE_VERSION || '0',
    serverVersion: '',
    apiDetails: {
      used: 0,
      max: 0,
    },
    newUpdate: null as null | GitHubRelease,
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

    serverVersion: (state) => {
      return state.serverVersion;
    },

    apiDetails: (state) => {
      return state.apiDetails;
    },

    lastRefreshed: (state) => {
      return state.lastRefreshed;
    },

    newUpdate: (state) => {
      return state.newUpdate;
    }
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

    setLastRefreshed: (state, time: number) => {
      state.lastRefreshed = time;
    },

    setNewUpdate(state, update: GitHubRelease) {
      state.newUpdate = update;
    },

    setServerVersion(state, newServerVersion: string) {
      state.serverVersion = newServerVersion;
    }
  },
  actions: {
  },
  modules: {
    analytics
  }
})
