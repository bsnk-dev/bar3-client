import store from '@/store';
import {GitHubTag} from '@/types';

export default async function checkForUpdates(): Promise<GitHubTag | Error | boolean> {
  // FIXME: put bar3-server
  const res = await fetch('https://api.github.com/repos/bsnk-dev/bar3-server/tags').catch((e) => {
    console.error(e);
    return null;
  });
  if (!res || res.status != 200) throw new Error('Github not responding to tag request.');

  const json: GitHubTag[] = await res.json();
  if (!json) throw new Error('Cannot parse JSON tags from GitHub.');

  if (json[0]?.name != store.getters.serverVersion) {
    return json[0];
  }

  return false;
}