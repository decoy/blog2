import { html } from '../../lib/util';
import { head, nav, articleMini, footer } from './partials';

export default function generate(site: Site, tag: string) {
  const posts = site.posts.filter((p) => p.meta.tags.includes(tag));
  return html`
    <!DOCTYPE html>
    <html>
      ${head(site)}
      <body class="f4 orange">
        ${nav(site)}
        <main>
          <div class="container row">
            <div class="section-content">
              <h1 class="section-title">Posts for tag: ${tag}</h1>
              ${posts.map((p) => post(site, p))}
            </div>
          </div>
        </main>
        ${footer(site)}
      </body>
    </html>
  `;
}

function post(site: Site, post: Post) {
  return html`
    <div class="archive-list-entry dotted-bottom">
      ${articleMini(post, site)}
    </div>
  `;
}
