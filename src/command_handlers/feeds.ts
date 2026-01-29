import {
  createFeed,
  getFeeds,
  getFeedByURL,
  createFeedFollow,
  getFeedFollowForUser,
} from "../lib/db/queries/feeds";
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

export async function handlerFollowFeed(
  _: string,
  user: User,
  ...args: string[]
) {
  if (args.length !== 1) {
    throw new Error(`follow expects 1 arg but got ${args.length}`);
  }

  const [url] = args;
  const feed = await getFeedByURL(url);
  if (!feed) {
    throw new Error("User or Feed not found!");
  }

  const __ = await createFeedFollow(user.id, feed.id);
  printFeed(feed, user);
}

export async function handlerFollowing(_: string, user: User) {
  const feedFollows = await getFeedFollowForUser(user.id);
  if (feedFollows.length === 0) {
    console.log("Not Following any Feed");
    return;
  }

  console.log(`\nFeeds ${user.name} follow`);
  console.log("===============================");
  feedFollows.forEach((feed, i) => {
    console.log(`${i}. ${feed.feeds.name}`);
  });
}

export function printFeed(feed: Feed, user: User) {
  console.log(`Feed: ${feed.name} followed by **${user.name}**`);
}
