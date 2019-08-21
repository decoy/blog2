import { html, formatDate } from '../../lib/util';
import { head, nav, footer, tag } from './partials';

export default function generate(site: Site, post: Post) {
  const date = formatDate(new Date(post.meta.date));
  const author = post.meta.author ? post.meta.author : site.config.author;
  return html`
    <!DOCTYPE html>
    <html>
      ${head(site, post.meta.title, post.meta.description, author, post.meta.tags)}
      <body class="f4 orange">
        ${nav(site)}
        <article class="container post-section-content">
          <h1 class="section-title">${post.meta.title}</h1>
          <p class="post-meta">${author} <time class="article-date">${date}</time></p>
          ${post.content}
        </article>
        <div class="container post-section-content">
          <div class="post-tags clear-after">
            ${post.meta.tags.map((t) => tag(site, t, 0))}
          </div>
        </div>
        ${footer(site)}
      </body>
    </html>
  `;
}
