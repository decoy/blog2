import { html } from '../../util';
import { Post, Site } from '../..';

export function nav(site: Site, page?: Post) {
  return html`
    <header class="">
      <nav>
        <ul class="">
          <li><a href="${site.config.root}#">home</a></li>
          <li><a href="${site.config.root}#about">about</a></li>
          <li><a href="${site.config.root}#blog">blog</a></li>
          <li><a href="${site.config.root}#podcast">podcast</a></li>
          <li><a href="${site.config.root}#contact">contact</a></li>
        </ul>
      </nav>
    </header>
  `;
}

export function head(site: Site, page?: Post) {
  const title = page && page.meta.title ? page.meta.title : site.config.title;
  const description = page && page.meta.blurb ? page.meta.blurb : site.config.description;
  return html`
    <head>
      <meta lang="en" />
      <meta charset="utf-8" />
      <meta name="author" content="${site.config.author}" />
      <meta name="title" content="${title}" />
      <meta name="description" content="${description}" />
      <title>
        ${title}
      </title>
      <link
        rel="alternative"
        href="${site.config.root + site.config.rss}"
        title="${site.config.title}"
        type="application/atom+xml"
      />
      <link rel="icon" href="/favicon.ico" />
      <link rel="stylesheet" href="${site.config.root}index.css" type="text/css" />
    </head>
  `;
}

export function articleMini(post: Post, site: Site) {
  return html`
    <article class="article-mini">
      <header>
        <h2>${post.meta.title}</h2>
        <time class="article-date">${post.meta.date}</time>
      </header>
      <p>
        ${post.meta.blurb}
      </p>
      <footer>
        <a href="${site.config.root + post.link}">Read more</a>
      </footer>
    </article>
  `;
}
