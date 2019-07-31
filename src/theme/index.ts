import { Site } from '../';
import Main from './layout/main';
import Post from './layout/post';
import Feed from './layout/feed';
import Tags from './layout/tags';
import Archive from './layout/archive';
import { promises } from 'fs';
import { join, dirname } from 'path';
import { createDir, copyFiles } from '../util';

export default async function run(site: Site) {
  createDir(site.config.outputDir);
  await index(site);
  await posts(site);
  await feed(site);
  await tags(site);
  await archive(site);
  await staticFiles(site);
}

async function index(site: Site) {
  const content = Main(site);
  await promises.writeFile(join(site.config.outputDir, 'index.html'), content);
}

async function posts(site: Site) {
  for (let p of site.posts) {
    const content = Post(site, p);
    const path = join(site.config.outputDir, p.link, 'index.html');
    await createDir(dirname(path));
    await promises.writeFile(path, content, {
      encoding: 'utf8',
    });
    console.log(path);
  }
}

async function feed(site: Site) {
  const content = Feed(site);
  await promises.writeFile(join(site.config.outputDir, site.config.rss), content);
}

async function tags(site: Site) {
  for (let t of Object.keys(site.tags)) {
    const content = Tags(site, t);
    const path = join(site.config.outputDir, 'tags', t.toLowerCase());
    await createDir(path);
    await promises.writeFile(join(path, 'index.html'), content);
  }
}

async function archive(site: Site) {
  const content = Archive(site);
  const dir = join(site.config.outputDir, 'archives');
  await createDir(dir);
  await promises.writeFile(join(dir, 'index.html'), content);
}

async function staticFiles(site: Site) {
  await copyFiles(site.config.staticFiles, site.config.outputDir);
}
