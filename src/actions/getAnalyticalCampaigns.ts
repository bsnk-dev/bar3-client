import store from '@/store';

export default async function getCampaigns() {
  let error;

  const response = await fetch(`${store.getters.serverIP}/analytics/campaigns`)
      .catch((e) => {
        error = e;
        console.error(e);
      });

  if (!response) return error;

  if (response.status != 200) {
    return new Error('Unexpected response code: '+response.status);
  }

  const campaigns = await response.json();

  store.commit('analytics/setCampaigns', campaigns);
}