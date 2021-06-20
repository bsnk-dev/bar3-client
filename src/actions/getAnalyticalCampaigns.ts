import { AnalyticalCampaign } from '@/interfaces/analytics';
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

  const campaigns: AnalyticalCampaign[] = await response.json();

  // TODO
  campaigns[0].messagePixel.readCount = 16;
  campaigns[0].messagePixel.readHistory = [1624233330619,1624362930619,1624492530619,1624544370619,1624622130619,1624751730619,1624777650619,1624855410619,1624933170619,1624985010619,1625010930619,1625088690619,1625114610619,1625166450619,1625244210619,1625373810619];

  campaigns[0].links.push({
    readCount: 5,
    url: 'https://discord.com/oauth2/authorize?client_id=728319724706070738&scope=bot&permissions=67128320',
    readHistory: [1624214540524,1624292300524,1624395980524,1624421900524,1624525580524,1624603340524,1624629260524,1624681100524,1624732940524,1624784780524,1624888460524,1624940300524,1624992140524],
    id: 'hi',
    auth: '...'
  });
    
  store.commit('analytics/setCampaigns', campaigns);
}