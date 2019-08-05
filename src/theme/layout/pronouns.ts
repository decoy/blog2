import { html } from '../../lib/util';
import { head, nav, footer } from './partials';

export default function generate(site: Site) {
  return html`
    <!DOCTYPE html>
    <html>
      ${head(site)}
      <body class="f4 orange">
        ${nav(site)}
        <main>
          <div class="container row"></div>
        </main>
      </body>
    </html>
  `;
}
