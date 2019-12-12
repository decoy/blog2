import { html } from '../../lib/util';
import { head, nav, articleMini, social, tag } from './partials';

function hero() {
  return html`
    <section class="hero dotted-bottom">
      <h1 class="hero-title">Hi, I'm Kel.</h1>
    </section>
  `;
}

function about(site: Site) {
  return html`
    <div class="dotted-bottom">
      <div class="container row spaced-section">
        <section id="about" class="col col-1-2">
          <div class="section-content">
            <h1 class="section-title">Technical Consultant</h1>
            <p>
              I create, and help others create, software and process solutions to complex problems. I have a wide range
              of technology and industry experiences that help me guide clients to the right approach.
            </p>
            <p>
              I’m particularly fond of (but not limited to) C#, Typescript and general web technologies.
            </p>
            <footer>
              <div class="section-link"><a href="${site.config.root}#contact">Contact me</a></div>
            </footer>
          </div>
        </section>
        <section id="about-help" class="col col-1-2">
          <div class="section-content">
            <h1 class="section-title">Some ways I can help</h1>
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
          </div>
        </section>
      </div>
    </div>
  `;
}

function blog(site: Site) {
  const posts = site.posts.slice(0, 2);

  return html`
    <div class="dotted-bottom">
      <div class="container row spaced-section">
        <section id="blog" class="col col-1-2">
          <div class="section-content">
            <h1 class="section-title">My latest blog posts</h1>
            ${posts.map((p) => articleMini(p, site))}
          </div>
        </section>
        <section id="blog-tags" class="col col-1-2">
          <div class="section-content">
            <h1 class="section-title">Read about</h1>
            <p>
              ${Object.keys(site.tags).map((t) => tag(site, t, site.tags[t]))}
            </p>
            <footer>
              <div class="section-link"><a href="${site.config.root}archives">Read all</a></div>
            </footer>
          </div>
        </section>
      </div>
    </div>
  `;
}

function podcast(site: Site) {
  return html`
    <div class="">
      <div class="container row spaced-section">
        <section id="podcast" class="col col-1-2">
          <div class="section-content">
            <h1 class="section-title">Getting Apps Done</h1>
            <p>
              <img src="img/microphone.svg" class="gad-icon" alt="Getting Apps Done logo" /> I cohost the
              <a href="${site.config.podcast}" target="_blank">Getting Apps Done</a> podcast, with Joshua Graham, where
              we discuss subjects like interviewing, motivation, working remotely, learning to code, best practices, and
              what it means to be a software developer in today’s world.
            </p>
            <p>Check out our <a href="${site.config.podcast}/slack" target="_blank">Slack community</a>!</p>
          </div>
        </section>
        <section id="podcast-latest" class="col col-1-2">
          <div class="section-content">
            <h1 class="section-title">Our Latest Episode</h1>
            <article class="article-mini">
              <header>
                <h2 class="article-title">${site.config.latestPodcast.title}</h2>
                <time class="article-date">${site.config.latestPodcast.date}</time>
              </header>
              <p>${site.config.latestPodcast.blurb}</p>
              <footer>
                <div class="section-link"><a href="${site.config.podcast}" target="_blank">Listen now</a></div>
              </footer>
            </article>
          </div>
        </section>
      </div>
    </div>
  `;
}

function footer(site: Site) {
  return html`
    <footer class="color-invert">
      <div class="container row spaced-section">
        <section id="contact" class="col col-1-2">
          <div class="section-content">
            <h1 class="section-title">Get In Touch</h1>
            <p>
              If any of this sounds interesting to you or your organization, or if you’d just like to chat about the
              latest buzzwords, send me a message!
            </p>
            <p>P.S. I use <a target="_blank" href="${site.config.pronouns}">they/them pronouns</a> :)</p>
            <form action="https://formspree.io/contact@piffner.com" method="POST">
              <input type="text" name="name" required placeholder="Name *" />
              <input type="text" name="pronouns" required placeholder="Pronouns" />
              <input type="email" name="email" required placeholder="Email Address *" />
              <input type="text" name="phone" placeholder="Phone Number" />
              <textarea name="phone" required placeholder="Message *"></textarea>
              <div class="controls">
                <button type="submit">Send Message</button>
              </div>
            </form>
          </div>
        </section>
        <section id="contact-connect" class="col col-1-2">
          <div class="section-content social-long">
            <h1 class="section-title">Let's Connect</h1>
            <div class="social-connect">
              ${social(site)}
            </div>
          </div>
        </section>
      </div>
    </footer>
  `;
}

export default function generate(site: Site) {
  return html`
    <!DOCTYPE html>
    <html>
      ${head(site, site.config.title, site.config.description, site.config.author, site.config.keywords)}
      <body class="f4 blue">
        ${nav(site)}
        <main>
          ${hero()} ${about(site)} ${blog(site)} ${podcast(site)} ${footer(site)}
        </main>
      </body>
    </html>
  `;
}
