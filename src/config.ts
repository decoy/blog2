import * as path from 'path';

export const config: Config = {
  author: 'Kel Piffner',
  title: "Hi, I'm Kel",
  description: 'Developer of software, processes, and people.',
  keywords: ['Seattle Web Development', 'Kellen Piffner'],

  root: '/',
  url: 'https://kellen.piffner.com/',
  rss: 'atom.xml',

  twitter: 'https://twitter.com/@KellenPiffner',
  github: 'https://github.com/decoy',
  linkedin: 'https://www.linkedin.com/in/kellenpiffner',
  podcast: 'https://gettingappsdone.com',

  latestPodcast: {
    title: 'Feedback is the BEEP!',
    date: '2019.08.08',
    blurb: `Joshua and Kel chat about feedback: what it is, what it’s good for, how critical it is to growth and how it ties to safety and failure.`,
  },

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

  return path.join(year!, month!, day!, end).replace(/\\/g, '/') + '/';
}
