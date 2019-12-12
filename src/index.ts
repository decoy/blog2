import { getFiles } from './lib/util';
import Theme from './theme';
import { config } from './config';
import { loadMarkdownFile } from './lib/markdown';

const includeDrafts = process.argv.some((arg) => arg == '--include-drafts');

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

  let posts = await loadPosts(config.postFiles);
  posts = posts.sort((b, a) => a.path.localeCompare(b.path));

  if (includeDrafts) {
    let drafts = await loadPosts(config.draftFiles);
    drafts = drafts.sort((b, a) => a.path.localeCompare(b.path));
    site.posts.push(...drafts);
  }

  site.posts.push(...posts);

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
