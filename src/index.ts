import { getFiles } from './lib/util';
import Theme from './theme';
import { config } from './config';
import { loadMarkdownFile } from './lib/markdown';

async function loadPosts(dir: string) {
  const files = await getFiles(dir);
  const posts = [];
  for await (const f of files) {
    const doc = await loadMarkdownFile(f);
    posts.push(doc);
  }
  return posts;
}

export async function loadSite(dir: string) {
  const site: Site = {
    config: config,
    tags: {},
    posts: [],
  };

  site.posts = await loadPosts(config.postFiles);

  site.posts = site.posts.sort((b, a) => a.path.localeCompare(b.path));

  // collate tags
  for (let p of site.posts) {
    for (let t of p.meta.tags!) {
      if (!site.tags[t]) {
        site.tags[t] = 0;
      }
      site.tags[t]++;
    }
  }

  return site;
}

loadSite(__dirname)
  .then(Theme)
  .catch((err) => console.log(err));
