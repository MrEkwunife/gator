import { createFeed, getFeeds } from "../lib/db/queries/feeds";
import { createFeedFollow } from "../lib/db/queries/user";
import type { User, Feed } from "../lib/db/schema";

export async function handlerAddfeed(_: string, user: User, ...args: string[]) {
  if (args.length !== 2) {
    throw new Error(`addfeed expects 2 args but got ${args.length}`);
  }

  const { id } = user;
  const [name, url] = args;
  const feed = await createFeed(name, url, id);
  const __ = await createFeedFollow(user.id, feed.id);

  printFeed(feed, user);
}

export async function handlerFeeds(_: string) {
  const feeds = await getFeeds();
  feeds.forEach((feed) => {
    console.log(`Feed name: ${feed.feeds.name}`);
    console.log(`Feed name: ${feed.feeds.url}`);
    console.log(`Feed name: ${feed.users.name}`);

    console.log("\n===================================\n");
  });
}

export function printFeed(feed: Feed, user: User) {
  console.log(`Feed: ${feed.name} followed by **${user.name}**`);
}
