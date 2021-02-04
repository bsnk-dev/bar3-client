import { Config } from '../types';
import store from '@/store';

export default async function sendConfig(config: Config) {
  let error;

  const response = await fetch(`${store.getters.serverIP}/api/setConfig`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      config: config
    })
  }).catch((e) => {
    error = e;
    console.error(e);
  });

  if (!response) return error;

  if (response.status != 204) {
    return new Error('Unexpected response code: '+response.status);
  }

  return true;
}