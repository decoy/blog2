import { html } from '../../util';
import { Post, Site } from '../..';

export function nav(site: Site, page?: Post) {
  return html`
    <header class="">
      <nav>
        <ul class="">
          <li><a href="#">home</a></li>
          <li><a href="#about">about</a></li>
          <li><a href="#blog">blog</a></li>
          <li><a href="#podcast">podcast</a></li>
          <li><a href="#contact">contact</a></li>
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
      <link rel="alternative" href="${site.config.rss}" title="${site.config.title}" type="application/atom+xml" />
      <link rel="icon" href="${site.config.favicon}" />
      <link rel="stylesheet" href="${site.config.root}index.css" type="text/css" />
    </head>
  `;
}
