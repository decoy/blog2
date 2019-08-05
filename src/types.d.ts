interface PostMeta {
  title: string;
  date: string;
  author: string;
  description: string;
  blurb: string;
  tags: string[];
}

interface Post {
  path: string;
  link: string;
  meta: PostMeta;
  content: string;
}

interface Site {
  config: Config;
  tags: { [tag: string]: number };
  posts: Post[];
}

interface Config {
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