import { Site } from '../';
import Main from './layout/main';
import Post from './layout/post';
import { promises } from 'fs';
import { join, dirname } from 'path';
import { createDir } from '../util';

export default async function run(site: Site) {
  await index(site);
  await posts(site);
}

async function index(site: Site) {
  // create the main index
  const content = Main(site);
  await promises.writeFile(join(site.config.output, 'index.html'), content);
}

async function posts(site: Site) {
  // write out all the post contents
  for (let p of site.posts) {
    const content = Post(site, p);
    const path = join(site.config.output, p.link, 'index.html');
    await createDir(dirname(path));
    await promises.writeFile(path, content, {
      encoding: 'utf8',
    });
    console.log(path);
  }
}
