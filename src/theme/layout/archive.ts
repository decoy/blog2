import { html } from '../../util';
import { Post, Site } from '../..';
import { head, nav, articleMini } from './partials';

export default function generate(site: Site) {
  return html`
    <!DOCTYPE html>
    <html>
      ${head(site)}
      <body>
        ${nav(site)}
        <main>
          <h1>Viewing all posts</h1>
          ${site.posts.map((p) => articleMini(p, site))}
        </main>
      </body>
    </html>
  `;
}
