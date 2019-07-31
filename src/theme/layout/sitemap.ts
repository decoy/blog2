import { Post, Site } from '../..';

export default function generate(site: Site) {
  return `
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${site.posts.map((p) => entry(site, p).trim()).join('\n')}
</urlset>
  `.trim();
}

function entry(site: Site, post: Post) {
  const link = site.config.url + post.link;
  const updated = new Date(post.meta.date).toISOString();
  return `<url><loc>${link}</loc><lastmod>${updated}</lastmod></url>`;
}
