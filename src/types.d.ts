interface PostMeta {
  title: string;
  date: string;
  updated: string;
  author: string;
  description: string;
  blurb: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
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
  keywords: string[];

  latestPodcast: any;

  root: string;
  url: string;
  rss: string;

  image: string;
  imageAlt: string;

  twitter: string;
  twitterNick: string;
  github: string;
  linkedin: string;
  podcast: string;

  pronouns: string;

  outputDir: string;
  postFiles: string;
  draftFiles: string;
  staticFiles: string;
}
