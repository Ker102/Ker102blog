import { writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const HASHNODE_GQL_ENDPOINT = "https://gql.hashnode.com";
const BLOG_DIR = join(
  import.meta.dirname ?? new URL(".", import.meta.url).pathname.replace(/^\/([A-Z]:)/, "$1"),
  "..",
  "src",
  "content",
  "blog"
);

const PUBLICATION_HOST =
  process.env.HASHNODE_PUBLICATION_HOST || "blog.kaelux.dev";

const FETCH_POSTS_QUERY = `
  query FetchPosts($host: String!, $first: Int!) {
    publication(host: $host) {
      title
      posts(first: $first) {
        edges {
          node {
            title
            brief
            slug
            url
            publishedAt
            updatedAt
            coverImage { url }
            tags { name }
          }
        }
      }
    }
  }
`;

const FETCH_PAGES_QUERY = `
  query FetchPages($host: String!) {
    publication(host: $host) {
      title
      staticPages(first: 20) {
        edges {
          node {
            title
            slug
            url
            content { markdown }
          }
        }
      }
    }
  }
`;

const slugify = (value) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const fetchFromHashnode = async (query, variables) => {
  const response = await fetch(HASHNODE_GQL_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw new Error(`Hashnode API error: ${response.status} ${response.statusText}`);
  }

  const json = await response.json();

  if (json.errors) {
    throw new Error(`Hashnode GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  return json.data;
};

const cleanBrief = (brief, title) => {
  if (!brief) return "";
  // Hashnode's brief field sometimes starts with the title — strip it
  let cleaned = brief;
  if (cleaned.startsWith(title)) {
    cleaned = cleaned.slice(title.length);
  }
  // Collapse whitespace and newlines into single spaces
  cleaned = cleaned.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim();
  // Truncate to 250 chars
  if (cleaned.length > 250) {
    cleaned = cleaned.slice(0, 247) + "...";
  }
  return cleaned;
};

const generateFrontmatter = ({ title, description, pubDate, updatedDate, externalUrl, source }) => {
  const lines = ["---", `title: ${JSON.stringify(title)}`];

  if (description) {
    lines.push(`description: ${JSON.stringify(description)}`);
  }

  if (pubDate) {
    lines.push(`pubDate: '${pubDate}'`);
  }

  if (updatedDate) {
    lines.push(`updatedDate: '${updatedDate}'`);
  }

  if (externalUrl) {
    lines.push(`externalUrl: '${externalUrl}'`);
  }

  if (source) {
    lines.push(`source: '${source}'`);
  }

  lines.push("---", "");
  return lines.join("\n");
};

const generatePostBody = ({ title, brief, url }) => {
  const lines = [];

  if (brief) {
    lines.push(brief);
    lines.push("");
  }

  lines.push(`**[Read the full article on Hashnode →](${url})**`);
  lines.push("");

  return lines.join("\n");
};

const formatDate = (isoDate) => {
  const d = new Date(isoDate);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return `${months[d.getUTCMonth()]} ${String(d.getUTCDate()).padStart(2, "0")} ${d.getUTCFullYear()}`;
};

const main = async () => {
  console.log(`Fetching posts from Hashnode publication: ${PUBLICATION_HOST}`);

  const data = await fetchFromHashnode(FETCH_POSTS_QUERY, {
    host: PUBLICATION_HOST,
    first: 50,
  });

  const publication = data?.publication;
  if (!publication) {
    console.error(`Publication not found for host: ${PUBLICATION_HOST}`);
    process.exit(1);
  }

  const posts = publication.posts?.edges?.map((e) => e.node) || [];
  console.log(`Found ${posts.length} posts on "${publication.title}"`);

  let created = 0;
  let skipped = 0;

  for (const post of posts) {
    const slug = `hn-${post.slug || slugify(post.title)}`;
    const filePath = join(BLOG_DIR, `${slug}.mdx`);

    if (existsSync(filePath)) {
      console.log(`  ⏭  Skipping "${post.title}" (already exists)`);
      skipped++;
      continue;
    }

    const pubDate = post.publishedAt ? formatDate(post.publishedAt) : undefined;
    const updatedDate = post.updatedAt ? formatDate(post.updatedAt) : undefined;
    const description = cleanBrief(post.brief, post.title);

    const frontmatter = generateFrontmatter({
      title: post.title,
      description,
      pubDate,
      updatedDate,
      externalUrl: post.url,
      source: "hashnode",
    });

    const body = generatePostBody({
      title: post.title,
      brief: description,
      url: post.url,
    });

    const content = `${frontmatter}${body}`;

    writeFileSync(filePath, content, "utf-8");
    console.log(`  ✅ Created "${post.title}" → ${slug}.mdx`);
    created++;
  }

  console.log(`\nDone! Created: ${created}, Skipped: ${skipped}`);
};

main().catch((error) => {
  console.error("Hashnode sync failed:", error);
  process.exit(1);
});
