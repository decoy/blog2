import { promises } from 'fs';
import * as path from 'path';
import * as Markdown from 'markdown-it';
import { getFiles } from './util';
import Theme from './theme';
import { config, Config } from './config';

export interface PostMeta {
  title: string;
  date: string;
  blurb: string;
  tags: string[];
}

export interface Post {
  path: string;
  link: string;
  meta: PostMeta;
  content: string;
}

export interface Site {
  config: Config;
  tags: { [tag: string]: number };
  posts: Post[];
}

import * as vm from 'vm';

const md = new Markdown({ html: true });

export async function loadMarkdownFile(path: string): Promise<Post> {
  const data = await promises.readFile(path, 'utf8');
  const tokens = md.parse(data, {});
  const link = makePostPath(path);
  const doc = {
    path,
    link,
    meta: {
      title: '',
      date: '',
      blurb: '',
      tags: [],
    },
    content: '',
  };

  // loads the json front matter
  if (tokens[0] && tokens[0].type == 'fence') {
    const front = tokens.shift()!; // remove it
    if (front.info == 'json') {
      doc.meta = JSON.parse(front!.content);
    } else if (front.info == 'js') {
      doc.meta = vm.runInNewContext(front.content, {});
    }
    if (doc.meta.blurb) {
      // the blurbs are all in md.
      doc.meta.blurb = md.render(doc.meta.blurb);
    }
  }

  // build the actual markdown
  doc.content = md.renderer.render(tokens, {}, {});
  return doc;
}

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

function makePostPath(file: string) {
  const parts = path.basename(file, '.md').split('-');
  const year = parts.shift();
  const month = parts.shift();
  const day = parts.shift();
  const end = parts.join('-').trim();

  return path.join(year!, month!, day!, end).replace(/\\/g, '/');
}

loadSite(__dirname)
  .then(Theme)
  .catch((err) => console.log(err));
