import store from '@/store';

export default async function sendMessage(messageHTML: string, nationDetails: {nationName: string; nationID: string; leaderName: string}) {
  let error;

  const response = await fetch(`${store.getters.serverIP}/api/sendMessage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      messageHTML: messageHTML,
      nationID: parseInt(nationDetails.nationID),
      nationName: nationDetails.nationName,
      leaderName: nationDetails.leaderName,
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