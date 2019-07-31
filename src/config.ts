export interface Config {
  author: string;
  title: string;
  description: string;

  root: string;
  url: string;
  favicon: string;
  rss: string;

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
  favicon: '',
  rss: 'atom.xml',

  postFiles: './contents/posts/',
  outputDir: './dist/',
  staticFiles: './contents/static/',
};
