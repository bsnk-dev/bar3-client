import store from '@/store';
import getCampaigns from './getAnalyticalCampaigns';

export default async function createNewCampaign(name: string) {
  let error;

  const response = await fetch(`${store.getters.serverIP}/analytics/newCampaign`, {
    method: 'POST',
    headers: [['Content-Type', 'application/json']],
    body: JSON.stringify({
      name,
    }),
  })
    .catch((e) => {
      error = e;
      console.error(e);
    });

  if (!response) return error;

  if (response.status != 200) {
    return new Error('Unexpected response code: '+response.status);
  }

  await getCampaigns();
}