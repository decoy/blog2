import { html, formatDate } from '../../util';
import { Post, Site } from '../..';
import { head, nav, footer } from './partials';
import { tag } from './main';

export default function generate(site: Site, post: Post) {
  const date = formatDate(new Date(post.meta.date));
  const author = post.meta.author ? post.meta.author : site.config.author;
  return html`
    <!DOCTYPE html>
    <html>
      ${head(site, post)}
      <body class="f4 orange">
        ${nav(site)}
        <main>
          <div class="container">
            <article>
              <div class="post-section-content">
                <header class="post-header">
                  <h1 class="section-title">${post.meta.title}</h1>
                  <p class="post-meta">${author} - <time class="article-date">${date}</time></p>
                </header>
                <div class="post-content">
                  ${post.content}
                </div>
                <div class="post-tags clear-after">
                  ${post.meta.tags.map((t) => tag(site, t, 0))}
                </div>
              </div>
            </article>
          </div>
        </main>
        ${footer(site)}
      </body>
    </html>
  `;
}
