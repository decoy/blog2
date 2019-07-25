import { html } from '../util';
import { Post, Site } from '../';

// the main page of the theme

export const head = (site: Site, page?: Post) => {
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
      <link rel="stylesheet" href="${site.config.root}css/index.css" type="text/css" />
    </head>
  `;
};

export const nav = () => html`
  <header class="dotted-bottom">
    <nav>
      <ul>
        <li><a href="#">home</a></li>
        <li><a href="#about">about</a></li>
        <li><a href="#blog">blog</a></li>
        <li><a href="#podcast">podcast</a></li>
        <li><a href="#contact">contact</a></li>
      </ul>
    </nav>
  </header>
`;

export const hero = () => html`
  <section class="row hero dotted-bottom">
    <p class="center title">Hi, I'm Kel.</p>
  </section>
`;

export const about = () => html`
  <div class="row dotted-bottom">
    <section id="about" class="col c6">
      <h1>Technical Consultant</h1>
      <p>
        I create, and help others create, software and process solutions to complex problems. I have a wide range of
        technology and industry experiences that help me guide clients to the right approach.
      </p>
      <p>
        I’m particularly fond of (but not limited to) C#, Typescript and general web technologies.
      </p>
    </section>
    <section id="about-help" class="col c6">
      <h1>Some ways I can help</h1>
      <ul class="fancy">
        <li>Continuous integration and delivery</li>
        <li>Test automation</li>
        <li>Security</li>
        <li>Clean, maintainable code guidelines</li>
        <li>Planning software lifecycles</li>
        <li>Choosing the right developer candidates</li>
        <li>Choosing the right technologies</li>
        <li>Brainstorming sessions</li>
        <li>Project reviews and retrospectives</li>
        <li>Adapting agile methodologies to your teams</li>
        <li>Working with remote teams</li>
        <li>Updating legacy software (refactoring/rewriting strategies)</li>
      </ul>
    </section>
  </div>
`;

const article = (post: Post, site: Site) => html`
  <article class="article-mini">
    <header>
      <h2>${post.meta.title}</h2>
      <time class="article-date">${post.meta.date}</time>
    </header>
    <p>
      ${post.meta.blurb}
    </p>
    <footer>
      <a href="#">Read more</a>
    </footer>
  </article>
`;

export const tag = (site: Site, tag: string) => html`
  <a href="#" class="tag">${tag}</a>
`;

export const blog = (site: Site) => html`
  <div class="row dotted-bottom">
    <section id="blog" class="col c6">
      <h1>My latest blog posts</h1>
      ${site.posts.map((p) => article(p, site))}
    </section>
    <section id="blog-tags" class="col c6">
      <h1>Read about</h1>
      <p>
        ${site.tags.map((t) => tag(site, t))}
      </p>
    </section>
  </div>
`;

export function layout(post: Post, site: Site) {
  return html`
    <!DOCTYPE html>
    <html>
      ${head(site)}
      <body>
        ${nav()}
        <main>
          ${hero()} ${about()} ${blog(site)}
        </main>
      </body>
    </html>
  `;
}

export function body(post: Post) {
  return post.content;
}
