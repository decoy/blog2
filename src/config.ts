export interface Config {
  author: string;
  title: string;
  description: string;

  root: string;
  url: string;
  rss: string;

  twitter: string;
  github: string;
  linkedin: string;
  podcast: string;

  pronouns: string;

  outputDir: string;
  postFiles: string;
  staticFiles: string;
}

export const config: Config = {
  author: 'Kel Piffner',
  title: "Hi, I'm Kel",
  description: '',

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
