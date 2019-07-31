import { html } from '../../util';
import { Post, Site } from '../..';

export default function generate(site: Site) {
  const date = new Date().toISOString();
  return `
    <feed xmlns="http://www.w3.org/2005/Atom">
      <title>${site.config.title}</title>
      <link href="/atom.xml" rel="self" />
      <link href="${site.config.url}" />
      <updated>${date}</updated>
      <id>${site.config.url}</id>
      <author>
        <name>${site.config.author}</name>
      </author>
      ${site.posts.map((p) => entry(site, p).trim()).join('')}
    </feed>
  `;
}

function entry(site: Site, post: Post) {
  const link = site.config.url + post.link;
  const updated = new Date(post.meta.date).toISOString();
  return `
       <entry>
        <title>Mindset</title>
        <link href="${link}" />
        <id>${link}</id>
        <published>${updated}</published>
        <updated>${updated}</updated>
        <content type="html">
          <![CDATA[
            ${post.content}
          ]]>
        </content>
        <summary type="html">
         <![CDATA[
            ${post.meta.blurb}
          ]]>
        </summary>
        ${post.meta.tags.map((t) => `<category term="${t}" scheme="https://kellen.piffner.com/tags/${t}/"/>`)}
      </entry>
      `;
}
