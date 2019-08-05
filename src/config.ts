import * as path from 'path';

export const config: Config = {
  author: 'Kel Piffner',
  title: "Hi, I'm Kel",
  description: 'Developer of software, processes, and people.',

  root: '/',
  url: 'https://kellen.piffner.com/',
  rss: 'atom.xml',

  twitter: 'https://twitter.com/@KellenPiffner',
  github: 'https://github.com/decoy',
  linkedin: 'https://www.linkedin.com/in/kellenpiffner',
  podcast: 'https://gettingappsdone.com',

  pronouns: 'https://pronoun.is/they/.../themself',

  outputDir: './dist/',
  postFiles: './contents/posts/',
  staticFiles: './contents/static/',
};

// TODO: this probably should somehow be part of the theme.
export function makePostPath(file: string) {
  const parts = path.basename(file, '.md').split('-');
  const year = parts.shift();
  const month = parts.shift();
  const day = parts.shift();
  const end = parts.join('-').trim();

  return path.join(year!, month!, day!, end).replace(/\\/g, '/');
}
