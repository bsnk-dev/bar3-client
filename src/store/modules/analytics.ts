import {AnalyticalCampaign} from "@/interfaces/analytics";

export default {
  namespaced: true,

  state: {
    campaigns: [] as AnalyticalCampaign[],
  },

  getters: {
    campaigns(state: any) {
      return state.campaigns;
    }
  },

  mutations: {
    setCampaigns(state: any, campaigns: AnalyticalCampaign[]) {
      state.campaigns = campaigns;
    },
  }
}