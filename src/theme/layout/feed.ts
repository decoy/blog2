export default function generate(site: Site) {
  // const date = new Date().toISOString();

  const date = site.posts
    .map((p) => (p.meta.updated ? p.meta.updated : p.meta.date))
    .map((p) => new Date(p))
    .sort((a, b) => b.getTime() - a.getTime())[0]
    .toISOString();

  return `
    <feed xmlns="http://www.w3.org/2005/Atom">
      <title>${site.config.title}</title>
      <link href="${site.config.url}atom.xml" rel="self" />
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
  const published = new Date(post.meta.date).toISOString();
  const updated = new Date(post.meta.updated ? post.meta.updated : post.meta.date).toISOString();
  return `
       <entry>
        <title>${post.meta.title}</title>
        <link href="${link}" />
        <id>${link}</id>
        <published>${published}</published>
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
        ${post.meta.tags.map((t) => `<category term="${t}" scheme="${site.config.url}tags/${t}/"/>`).join('')}
      </entry>
      `;
}
