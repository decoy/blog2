import { html } from '../../util';
import { Post, Site } from '../..';
import { head, nav, articleMini } from './partials';

function hero() {
  return html`
    <section class="">
      <h1 class="">Hi, I'm Kel.</h1>
    </section>
  `;
}

function about() {
  return html`
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
}

export function tag(site: Site, tag: string, count: number) {
  const link = site.config.root + 'tags/' + tag.toLowerCase() + '/';
  return html`
    <a href="${link}" class="tag">${tag}</a>
  `;
}

function blog(site: Site) {
  return html`
    <div class="row dotted-bottom">
      <section id="blog" class="col c6">
        <h1>My latest blog posts</h1>
        ${site.posts.map((p) => articleMini(p, site))}
      </section>
      <section id="blog-tags" class="col c6">
        <h1>Read about</h1>
        <p>
          ${Object.keys(site.tags).map((t) => tag(site, t, site.tags[t]))}
        </p>
      </section>
    </div>
  `;
}

export default function generate(site: Site) {
  return html`
    <!DOCTYPE html>
    <html>
      ${head(site)}
      <body class="w-100 helvetica bg-white">
        ${nav(site)}
        <main>
          ${hero()} ${about()} ${blog(site)}
        </main>
      </body>
    </html>
  `;
}
