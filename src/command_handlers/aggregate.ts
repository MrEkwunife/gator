import { getNextFeedToFetch, markFeedFetched } from "../lib/db/queries/feeds";
import { Feed, NewPost } from "../lib/db/schema";
import { createPost } from "../lib/db/queries/posts";
import { fetchFeed } from "../lib/rss";

export async function handlerAgg(_: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(`agg expects 1 arg but got ${args.length}`);
  }

  const timeBetweenRequests = parseDuration(args[0]);
  console.log(`Collecting feeds every ${timeBetweenRequests}ms`);

  scrapeFeeds().catch(handleError);

  const interval = setInterval(() => {
    scrapeFeeds().catch(handleError);
  }, timeBetweenRequests);

  await new Promise<void>((resolve) => {
    process.on("SIGINT", () => {
      console.log("\nShutting down feed aggregator...");
      clearInterval(interval);
      resolve();
    });
  });
}

export async function scrapeFeeds() {
  const feed = await getNextFeedToFetch();
  if (!feed) {
    console.log("No feeds to fetch.");
    return;
  }

  console.log(`Fetching feed: ${feed.name} (${feed.url})`);

  try {
    await markFeedFetched(feed.id);
    const feedData = await fetchFeed(feed.url);
    for (let item of feedData.channel.item) {
      console.log(`Found post: %s`, item.title);

      const now = new Date();

      await createPost({
        url: item.link,
        feedId: feed.id,
        title: item.title,
        createdAt: now,
        updatedAt: now,
        description: item.description,
        publishedAt: new Date(item.pubDate),
      } satisfies NewPost);
    }
    console.log(
      `✓ Feed ${feed.name} collected, ${feedData.channel.item.length} posts found`,
    );
  } catch (error) {
    console.error(
      `✗ Failed to fetch ${feed.name} (${feed.url}):`,
      error instanceof Error ? error.message : error,
    );
  }
}

export function parseDuration(durationStr: string) {
  const regex = /^(\d+)(ms|s|m|h)$/;
  const match = durationStr.match(regex);
  if (!match) return;

  if (match.length !== 3) return;

  const value = parseInt(match[1], 10);
  const unit = match[2];
  switch (unit) {
    case "ms":
      return value;
    case "s":
      return value * 1000;
    case "m":
      return value * 60 * 1000;
    case "h":
      return value * 60 * 60 * 1000;
    default:
      return;
  }
}

function handleError(err: unknown) {
  console.error(
    `Error scraping feeds: ${err instanceof Error ? err.message : err}`,
  );
}
