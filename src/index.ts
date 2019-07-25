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

import { resolve } from 'path';
import { promises, writeFile } from 'fs';
import { layout } from './theme';
import * as Markdown from 'markdown-it';

const md = new Markdown();

/**
 * Gets all files recursively in a folder
 *
 * @param dir the path to search
 */
export async function* getFiles(dir: string): AsyncIterable<string> {
  const dirents = await promises.readdir(dir, { withFileTypes: true });
  for (const dirent of dirents) {
    const res = resolve(dir, dirent.name);
    if (dirent.isDirectory()) {
      yield* getFiles(res);
    } else {
      yield res;
    }
  }
}

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

  const files = await getFiles(config.posts);
  for await (const f of files) {
    const doc = await loadMarkdownFile(f);
    site.posts.push(doc);
  }
  return site;
}

loadSite(__dirname).then(async (s) => {
  for (let p of s.posts) {
    const page = layout(p, s);
    await promises.writeFile('./dist/index.html', page);
  }
});

// sitemap, feed, whatever.
