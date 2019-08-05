import { promises } from 'fs';
import * as Markdown from 'markdown-it';

import * as vm from 'vm';
import * as hljs from 'highlight.js';
import { makePostPath } from '../config';

const mdOptions = {
  html: true,
  langPrefix: 'hljs language-',
  highlight: (str: string, lang: string) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        const value = hljs.highlight(lang, str).value;
        return value;
      } catch (err) {
        console.log('an error highlighting', err);
      }
    }
    return ''; // use external default escaping
  },
};

const md = new Markdown(mdOptions);

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
      description: '',
      author: '',
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
  doc.content = md.renderer.render(tokens, mdOptions, {});
  return doc;
}
