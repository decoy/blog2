function getContentFiles(path: string) {
  // just loads up all the possible files
}

function parseFrontMatter(file: string) {
  // just pulls that top level token (probably just use a fancy 'end' string for now.  use the open/close strings)
}

// get files
// parse headers
// build out happy hook files to do the rest...

export interface FrontMatter {
  title?: string;
  date?: string;
  blurb?: string;
}

export interface PageStuff {
  path: string;
  front: FrontMatter;
  content: string;
}

export interface Site {
  posts: string[];
}

import { resolve } from 'path';
import { promises } from 'fs';
import { body, layout } from './theme';
import * as Markdown from 'markdown-it';

const md = new Markdown();

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

export async function loadFile(file: string) {
  const data = await promises.readFile(file, 'utf8');
  // TODO parse out the header info if there is any
  return {
    data,
  };
}

(async () => {
  const config = {
    posts: './contents/posts',
  };

  const t = await getFiles(config.posts);
  for await (const f of getFiles(config.posts)) {
    console.log(f);
    const data = await loadFile(f);
    const tokens = md.parse(data.data, {});

    if (tokens[0] && tokens[0].type == 'fence' && tokens[0].info == 'json') {
      const front = tokens.shift();
      const header = JSON.parse(front!.content);
      console.log(header);
    }
    const test = md.renderer.render(tokens, {}, {});
    console.log(test);
    console.log(layout({ front: { title: 'titletitels', blurb: 'blurble' } } as any));
  }
})();

// sitemap, feed, whatever.
