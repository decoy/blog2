import { html } from '../../util';
import { Post, Site } from '../..';
import { head, nav, articleMini } from './partials';

export default function generate(site: Site, tag: string) {
  const posts = site.posts.filter((p) => p.meta.tags.includes(tag));

  return html`
    <!DOCTYPE html>
    <html>
      ${head(site)}
      <body>
        ${nav(site)}
        <main>
          <h1>Viewing posts for tag: ${tag}</h1>
          ${posts.map((p) => articleMini(p, site))}
        </main>
      </body>
    </html>
  `;
}
