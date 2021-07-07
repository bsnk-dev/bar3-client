import store from '@/store';
import {GitHubRelease} from '@/types';

export default async function checkForUpdates(): Promise<GitHubRelease | boolean> {
  const res = await fetch('https://api.github.com/repos/bsnk-dev/bar3-server/releases').catch((e) => {
    console.error(e);
    return null;
  });
  if (!res || res.status != 200) throw new Error('Github not responding to tag request.');

  const json: GitHubRelease[] = await res.json();
  if (!json) throw new Error('Cannot parse JSON releases from GitHub.');

  json.filter((el) => (!el.prerelease))

  if (json[0]?.tag_name != store.getters.serverVersion) {
    return json[0];
  }

  return false;
}