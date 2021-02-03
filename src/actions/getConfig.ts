import { Config } from '../types';
import store from '@/store';

export default async function getConfig() {
  let error;

  const response = await fetch(`${store.getters.serverIP}/api/config`)
      .catch((e) => {
        error = e;
        console.error(e);
      });

  if (!response) return error;

  if (response.status != 200) {
    return new Error('Unexpected response code: '+response.status);
  }

  const config: Config | undefined = await response.json().catch((e) => {
    console.error('Could not parse config!');
  });

  if (!config) return false;

  return config;
}