import store from '@/store';

export default async function setApplicationState(applicationOn: boolean) {
  let error;

  const response = await fetch(`${store.getters.serverIP}/api/setApplicationState`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      applicationOn: applicationOn
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