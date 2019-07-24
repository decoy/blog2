import { html } from '../util';
import { PageStuff } from '../';

// the main page of the theme

const config = {
  author: 'Kel Piffner',
  title: "Hi, I'm Kel",
  root: '/',
  description: '',
  favicon: '',
  rss: '',
};

export function header(page: PageStuff) {
  return html`
    <head>
      <meta charset="utf-8" />
      <meta name="author" content="${config.author}" />
      <meta name="title" content="${page.front.title ? page.front.title : config.title}" />
      <meta name="description" content="${page.front.blurb ? page.front.blurb : config.description}" />
      <title>
        ${page.front.title ? page.front.title : config.title}
      </title>
      <link rel="alternative" href="${config.rss}" title="${config.title}" type="application/atom+xml" />
      <link rel="icon" href="${config.favicon}" />
      <link rel="stylesheet" href="${config.root}css/index.css" type="text/css" />
    </head>
  `;
}

export function layout(page: PageStuff) {
  return html`
    <!DOCTYPE html>
    <html>
      ${header(page)}
      <body>
        <div class="main">
          <div class="container">
            ${body(page)}
          </div>
        </div>
      </body>
    </html>
  `;
}

export function body(page: PageStuff) {
  // can switch between types
  return html``;
}
