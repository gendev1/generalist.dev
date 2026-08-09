// Cross-post a newly merged blog post to dev.to and X.
// Usage: node .github/scripts/syndicate.mjs content/blog/<slug>.md
// Each platform is skipped (not failed) when its secrets are absent,
// so platforms can be enabled one at a time.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

// www is the canonical host — the apex 308-redirects to it, and dev.to's
// image proxy does not follow redirects
const SITE = "https://www.generalist.dev";

const file = process.argv[2];
if (!file) {
  console.error("usage: node syndicate.mjs <path-to-post.md>");
  process.exit(1);
}

const { data, content: rawContent } = matter(fs.readFileSync(file, "utf8"));
const slug = path.basename(file, ".md");
const canonicalUrl = `${SITE}/blog/${slug}`;
// Root-relative image/link paths resolve against dev.to's domain and 404 —
// rewrite them to absolute URLs before sending anywhere.
const content = rawContent.replace(/\]\(\//g, `](${SITE}/`);

function skip(platform, why) {
  console.log(`- ${platform}: skipped (${why})`);
}

function fail(platform, detail) {
  console.error(`- ${platform}: FAILED — ${detail}`);
  process.exitCode = 1;
}

// APIs behind bot walls / redirects return HTML; parsing it as JSON must fail
// with a diagnostic, not crash the whole run.
async function readJson(res) {
  const text = await res.text();
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(
      `non-JSON response ${res.status} from ${res.url}: ${text.slice(0, 160)}`,
    );
  }
}

async function postToDevTo() {
  if (!process.env.DEVTO_API_KEY) return skip("dev.to", "no DEVTO_API_KEY");
  // idempotency: a re-run after a partial failure must not double-post —
  // update the existing article instead (also how content fixes propagate)
  const mine = await fetch(
    "https://dev.to/api/articles/me/published?per_page=1000",
    { headers: { "api-key": process.env.DEVTO_API_KEY } },
  );
  if (mine.ok) {
    const canonicals = [canonicalUrl, canonicalUrl.replace("://www.", "://")];
    const existing = (await readJson(mine)).find((a) =>
      canonicals.includes(a.canonical_url),
    );
    if (existing) {
      const upd = await fetch(`https://dev.to/api/articles/${existing.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.DEVTO_API_KEY,
        },
        body: JSON.stringify({
          article: { body_markdown: content, canonical_url: canonicalUrl },
        }),
      });
      if (!upd.ok)
        return fail("dev.to update", `${upd.status} ${await upd.text()}`);
      console.log(`- dev.to: updated ${existing.url}`);
      return;
    }
  }
  const res = await fetch("https://dev.to/api/articles", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.DEVTO_API_KEY,
    },
    body: JSON.stringify({
      article: {
        title: data.title,
        body_markdown: content,
        published: true,
        description: data.summary,
        canonical_url: canonicalUrl,
      },
    }),
  });
  if (!res.ok) return fail("dev.to", `${res.status} ${await res.text()}`);
  const json = await readJson(res);
  console.log(`- dev.to: ${json.url}`);
}

// X Articles API (POST /2/articles/draft + /2/articles/{id}/publish) takes a
// DraftJS content_state, not markdown — flatten markdown into typed blocks.
// ponytail: inline styles/links are flattened to plain text; entities [] until
// something needs real rich text.
function stripInline(s) {
  return s
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, "$1 ($2)")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1");
}

function mdToContentState(md) {
  const blocks = [];
  const lines = md.split("\n");
  let paragraph = [];
  const flush = () => {
    if (paragraph.length) {
      blocks.push({ text: paragraph.join(" "), type: "unstyled" });
      paragraph = [];
    }
  };
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith("```")) {
      flush();
      const code = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```"))
        code.push(lines[i++]);
      blocks.push({ text: code.join("\n"), type: "code-block" });
      continue;
    }
    const heading = line.match(/^(#{1,6}) (.*)/);
    if (heading) {
      flush();
      blocks.push({
        text: stripInline(heading[2]),
        type: heading[1].length <= 2 ? "header-two" : "header-three",
      });
      continue;
    }
    const bullet = line.match(/^\s*[-*] (.*)/);
    if (bullet) {
      flush();
      blocks.push({
        text: stripInline(bullet[1]),
        type: "unordered-list-item",
      });
      continue;
    }
    const ordered = line.match(/^\s*\d+\. (.*)/);
    if (ordered) {
      flush();
      blocks.push({ text: stripInline(ordered[1]), type: "ordered-list-item" });
      continue;
    }
    if (line.startsWith("> ")) {
      flush();
      blocks.push({ text: stripInline(line.slice(2)), type: "blockquote" });
      continue;
    }
    if (line.trim() === "") {
      flush();
      continue;
    }
    paragraph.push(stripInline(line));
  }
  flush();
  return { blocks, entities: [] };
}

// OAuth 2.0 with a confidential client. Access tokens live ~2h, so every run
// mints one from the refresh token. X ROTATES refresh tokens on use: the new
// one lands in .x-refresh-token and the workflow must persist it back to the
// X_REFRESH_TOKEN secret, or the next run's refresh is rejected.
async function xAccessToken(env) {
  // one refresh per workflow run, even when syndicating several posts
  if (fs.existsSync(".x-access-token"))
    return fs.readFileSync(".x-access-token", "utf8");
  const refreshToken = fs.existsSync(".x-refresh-token")
    ? fs.readFileSync(".x-refresh-token", "utf8")
    : env.X_REFRESH_TOKEN;
  const res = await fetch("https://api.x.com/2/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${env.X_CLIENT_ID}:${env.X_CLIENT_SECRET}`,
      ).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      client_id: env.X_CLIENT_ID,
    }),
  });
  if (!res.ok)
    throw new Error(`token refresh: ${res.status} ${await res.text()}`);
  const json = await readJson(res);
  if (json.refresh_token)
    fs.writeFileSync(".x-refresh-token", json.refresh_token);
  fs.writeFileSync(".x-access-token", json.access_token);
  return json.access_token;
}

async function postToX() {
  const env = process.env;
  if (!env.X_CLIENT_ID || !env.X_CLIENT_SECRET || !env.X_REFRESH_TOKEN)
    return skip("x", "no X_CLIENT_ID / X_CLIENT_SECRET / X_REFRESH_TOKEN");
  let token;
  try {
    token = await xAccessToken(env);
  } catch (error) {
    return fail("x", error.message);
  }
  const contentState = mdToContentState(content);
  contentState.blocks.push({
    text: `Originally published at ${canonicalUrl}`,
    type: "unstyled",
  });

  const draftRes = await fetch("https://api.x.com/2/articles/draft", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title: data.title, content_state: contentState }),
  });
  if (!draftRes.ok)
    return fail("x draft", `${draftRes.status} ${await draftRes.text()}`);
  const draft = await readJson(draftRes);

  const pubRes = await fetch(
    `https://api.x.com/2/articles/${draft.data.id}/publish`,
    {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  if (!pubRes.ok)
    return fail("x publish", `${pubRes.status} ${await pubRes.text()}`);
  const pub = await readJson(pubRes);
  console.log(
    `- x: article ${draft.data.id} published as post ${pub.data?.post_id}`,
  );
}

console.log(`syndicating ${slug} (canonical: ${canonicalUrl})`);
// one platform blowing up must not stop the others (or crash before the
// rotated X refresh token gets written back)
for (const [name, post] of [
  ["dev.to", postToDevTo],
  ["x", postToX],
]) {
  try {
    await post();
  } catch (error) {
    fail(name, error.message);
  }
}
