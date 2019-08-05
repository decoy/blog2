import { html, formatDate } from '../../lib/util';
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

        <div class="container">
          <div class="post-section-content">
            <article class="post-content">
              <h1 class="section-title">${post.meta.title}</h1>
              <p class="post-meta">${author} - <time class="article-date">${date}</time></p>
              ${post.content}
              <div class="post-tags clear-after">
                ${post.meta.tags.map((t) => tag(site, t, 0))}
              </div>
            </article>
          </div>
        </div>

        ${footer(site)}
      </body>
    </html>
  `;
}
