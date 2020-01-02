import { html } from '../../lib/util';
import { head, nav, articleMini, footer, createTagLink } from './partials';

export default function generate(site: Site, tag: string) {
  const posts = site.posts.filter((p) => p.meta.tags.includes(tag));
  const link = site.config.url + createTagLink(site, tag);
  return html`
    <!DOCTYPE html>
    <html lang="en">
      ${head(site, `All posts for tag: ${tag}`, `Read thoughts about ${tag}`, site.config.author, [tag], link)}
      <body class="f4 orange flx-body">
        ${nav(site)}
        <main class="flx-main">
          <div class="container row">
            <div class="archive-section-content">
              <h1 class="section-title">Posts for tag: ${tag}</h1>
              <div class="archive-list">
                ${posts.map((p) => post(site, p))}
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
