import { html } from '../../util';
import { Post, Site } from '../..';
import { head, nav } from './partials';

export default function generate(site: Site, post: Post) {
  return html`
    <!DOCTYPE html>
    <html>
      ${head(site, post)}
      <body class="">
        ${nav(site)}
        <main>
          <h1>${post.meta.title}</h1>
          <time>${post.meta.date}</time>
          ${post.content}
        </main>
      </body>
    </html>
  `;
}
