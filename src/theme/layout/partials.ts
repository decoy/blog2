import { html, formatDate } from '../../lib/util';

export function head(
  site: Site,
  title: string,
  description: string,
  author: string,
  keywords: string[],
  url?: string,
  image?: string
) {
  return html`
    <head>
      <meta lang="en" />
      <meta charset="utf-8" />
      <meta name="author" content="${author}" />
      <meta name="title" content="${title}" />
      <meta name="description" content="${description}" />
      <meta name="keywords" content="${keywords.join(', ')}" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:creator" content="${site.config.twitterNick}" />
      <meta property="og:url" content="${url ? url : site.config.url}" />
      <meta property="og:title" content="${title}" />
      <meta property="og:description" content="${description}" />
      <!-- <meta property="og:image" content="${image}" /> -->
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>${title}</title>
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

export function meta(site: Site, description: string, url: string, title: string, image: string) {
  return html``;
}

export function nav(site: Site, page?: Post) {
  return html`
    <header class="dotted-bottom">
      <nav class="nav">
        <div class="container">
          <ul class="row-med center">
            <li class="col col-1-5"><a href="${site.config.root}">home</a></li>
            <li class="col col-1-5"><a href="${site.config.root}#about">about</a></li>
            <li class="col col-1-5"><a href="${site.config.root}#blog">blog</a></li>
            <li class="col col-1-5"><a href="${site.config.root}#podcast">podcast</a></li>
            <li class="col col-1-5"><a href="${site.config.root}#contact">contact</a></li>
          </ul>
          <div class="arrow"></div>
        </div>
      </nav>
    </header>
  `;
}

export function articleMini(post: Post, site: Site) {
  const date = new Date(post.meta.date);

  return html`
    <article class="article-mini clear-after">
      <header>
        <h2 class="article-title">${post.meta.title}</h2>
        <time class="article-date">${formatDate(date)}</time>
      </header>
      <p>
        ${post.meta.blurb}
      </p>
      <footer>
        <div class="section-link"><a href="${site.config.root + post.link}">Read more</a></div>
      </footer>
    </article>
  `;
}

export function footer(site: Site) {
  return html`
    <footer class="color-invert">
      <div class="container row spaced-section-sm">
        <section id="contact" class="col col-1-2">
          <div class="section-content">
            <h1 class="section-title">Get In Touch</h1>
            <p>
              If any of this sounds interesting to you or your organization, or if you’d just like to chat about the
              latest buzzwords, <a href="${site.config.root}#contact">send me a message!</a>
            </p>
          </div>
        </section>
        <section id="contact-connect" class="col col-1-2">
          <div class="section-content">
            <h1 class="section-title">Let's Connect</h1>
            <div class="social-connect social-short">
              ${social(site)}
            </div>
          </div>
        </section>
      </div>
    </footer>
  `;
}

export function createTagLink(site: Site, tag: string) {
  return 'tags/' + tag.toLowerCase() + '/';
}

export function tag(site: Site, tag: string, count: number) {
  const link = site.config.root + createTagLink(site, tag);
  return html`
    <a href="${link}" class="tag">${tag}</a>
  `;
}

export function social(site: Site) {
  return html`
    <span class="social-link">
      <a title="Twitter" target="_blank" rel="noopener" href="${site.config.twitter}">
        <span class="social-icon">${socialIcons.twitter}</span>
        <span class="social-title">Twitter</span>
      </a>
    </span>
    <span class="social-link">
      <a title="GitHub" target="_blank" rel="noopener" href="${site.config.github}">
        <span class="social-icon">${socialIcons.github}</span>
        <span class="social-title">Github</span>
      </a>
    </span>
    <span class="social-link">
      <a title="LinkedIn" target="_blank" rel="noopener" href="${site.config.linkedin}">
        <span class="social-icon">${socialIcons.linkedin}</span>
        <span class="social-title">LinkedIn</span>
      </a>
    </span>
    <span class="social-link">
      <a title="Podcast" target="_blank" rel="noopener" href="${site.config.podcast}">
        <span class="social-icon">${socialIcons.podcast}</span>
        <span class="social-title">Podcast</span>
      </a>
    </span>
    <span class="social-link">
      <a title="RSS" target="_blank" rel="noopener" href="${site.config.root + site.config.rss}">
        <span class="social-icon">${socialIcons.rss}</span>
        <span class="social-title">Feed</span>
      </a>
    </span>
  `;
}

export const socialIcons = {
  twitter:
    '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Twitter icon</title><path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z"/></svg>',
  github:
    '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>GitHub icon</title><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>',
  linkedin:
    '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>LinkedIn icon</title><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>',
  podcast:
    '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Podcasts icon</title><path d="M11.93 24s2.633 0 2.633-7.794c0-1.451-1.18-2.633-2.633-2.633s-2.634 1.182-2.634 2.633C9.296 24 11.93 24 11.93 24zm3.23-2.656c.115-.447.205-.896.275-1.351l.053-.36c.115-.05.23-.098.346-.15 1.828-.828 3.367-2.243 4.348-3.993.447-.803.777-1.67.973-2.572.227-1.008.285-2.059.166-3.088-.105-.963-.361-1.904-.77-2.787-.465-1.039-1.111-1.986-1.924-2.784-.828-.827-1.807-1.505-2.875-1.972-1.098-.496-2.303-.752-3.52-.782-1.22-.03-2.438.166-3.582.603-1.098.419-2.106 1.037-2.979 1.834-.827.752-1.534 1.67-2.046 2.678-.437.858-.736 1.776-.902 2.723-.166.979-.166 1.986-.016 2.98.135.872.391 1.73.768 2.543.888 1.881 2.393 3.444 4.258 4.394.226.104.451.21.692.314.015.121.046.256.06.392.075.438.166.889.271 1.325-.406-.136-.813-.287-1.204-.468-2.152-.976-3.972-2.662-5.101-4.754-.512-.947-.873-1.955-1.098-3.01-.257-1.158-.302-2.377-.15-3.566.15-1.112.466-2.211.933-3.22.556-1.188 1.339-2.286 2.271-3.204.916-.916 2.06-1.684 3.31-2.211C9.02.311 10.42.018 11.828.001c1.412-.015 2.824.24 4.139.758 1.266.498 2.434 1.238 3.43 2.166.965.895 1.76 1.962 2.346 3.139.496.993.842 2.076 1.008 3.175.18 1.144.18 2.317-.016 3.446-.166 1.053-.512 2.091-.979 3.053-1.053 2.122-2.799 3.868-4.92 4.922-.527.256-1.084.481-1.655.661l-.021.023zm.52-4.295l.01-.47c0-.316 0-.632-.046-.943-.015-.121-.045-.226-.075-.346.557-.451 1.023-1.023 1.369-1.67.256-.481.451-1.008.557-1.551.121-.602.15-1.233.061-1.865-.074-.557-.227-1.098-.451-1.61-.285-.616-.677-1.188-1.158-1.67-.497-.481-1.054-.872-1.686-1.159-.692-.3-1.445-.48-2.197-.496-.752-.015-1.52.121-2.227.392-.632.256-1.219.617-1.73 1.083-.513.466-.934 1.008-1.235 1.624-.257.496-.436 1.024-.542 1.58-.105.572-.119 1.159-.045 1.73.075.557.226 1.099.451 1.609.346.768.857 1.445 1.49 2.002l-.091.406c-.06.316-.045.617-.045.947v.422c-1.054-.646-1.927-1.58-2.513-2.663-.347-.617-.587-1.279-.723-1.972-.166-.768-.195-1.564-.09-2.347.09-.707.286-1.399.572-2.032.346-.781.857-1.504 1.459-2.121.617-.617 1.339-1.113 2.121-1.459.873-.391 1.82-.602 2.769-.632.964-.016 1.927.15 2.813.497.813.315 1.551.781 2.197 1.368.631.587 1.174 1.278 1.564 2.047.316.632.557 1.309.678 2.001.121.723.15 1.459.045 2.182-.09.707-.285 1.399-.588 2.046-.586 1.31-1.594 2.438-2.828 3.176l.114-.106zm-3.75-9.575c1.465 0 2.654 1.188 2.654 2.656 0 1.473-1.189 2.662-2.654 2.662-1.467 0-2.655-1.189-2.655-2.648s1.188-2.649 2.655-2.649v-.021z"/></svg>',
  rss:
    '<svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>RSS icon</title><path d="M19.199 24C19.199 13.467 10.533 4.8 0 4.8V0c13.165 0 24 10.835 24 24h-4.801zM3.291 17.415c1.814 0 3.293 1.479 3.293 3.295 0 1.813-1.485 3.29-3.301 3.29C1.47 24 0 22.526 0 20.71s1.475-3.294 3.291-3.295zM15.909 24h-4.665c0-6.169-5.075-11.245-11.244-11.245V8.09c8.727 0 15.909 7.184 15.909 15.91z"/></svg>',
};
