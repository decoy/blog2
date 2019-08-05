import { html } from '../../util';
import { Post, Site } from '../..';
import { head, nav, articleMini, footer } from './partials';

export default function generate(site: Site) {
  return html`
    <!DOCTYPE html>
    <html>
      ${head(site)}
      <body class="f4 blue">
        ${nav(site)}
        <main>
          <div class="container row">
            <div class="archive-section-content">
              <h1 class="section-title">Viewing all posts</h1>
              <div class="archive-list">
                ${site.posts.map((p) => post(site, p))}
              </div>
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
