export interface PostMeta {
  title?: string;
  date?: string;
  blurb?: string;
}

export interface Post {
  path: string;
  meta: PostMeta;
  content: string;
}

export interface Site {
  config: {
    author: string;
    title: string;
    root: string;
    description: string;
    favicon: string;
    rss: string;
  };
  tags: string[];
  posts: Post[];
}

import { promises } from 'fs';
import { layout } from './theme/layout';
import * as Markdown from 'markdown-it';
import { getFiles } from './util';

const md = new Markdown();

export async function loadMarkdownFile(path: string): Promise<Post> {
  const data = await promises.readFile(path, 'utf8');
  const tokens = md.parse(data, {});
  const doc = {
    path,
    meta: {},
    content: '',
  };
  // loads the json front matter
  if (tokens[0] && tokens[0].type == 'fence' && tokens[0].info == 'json') {
    const front = tokens.shift(); // remove it
    doc.meta = JSON.parse(front!.content);
  }
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
  console.log(dir);
  const config = {
    posts: './contents/posts',
  };

  const site: Site = {
    config: {
      author: 'Kel Piffner',
      title: "Hi, I'm Kel",
      root: '/',
      description: '',
      favicon: '',
      rss: '',
    },
    tags: ['tag1', 'tag2'],
    posts: [],
  };

  site.posts = await loadPosts(config.posts);

  return site;
}

loadSite(__dirname).then(async (s) => {
  const page = layout(s);
  await promises.writeFile('./dist/index.html', page);
  for (let p of s.posts) {
  }
});
