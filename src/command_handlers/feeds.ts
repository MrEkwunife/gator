import { readConfig } from "../config";
import { getUser } from "../lib/db/queries/user";
import { createFeed } from "../lib/db/queries/feeds";
import type { User, Feed } from "../lib/db/schema";

export async function handlerAddfeed(_: string, ...args: string[]) {
  if (args.length !== 2) {
    throw new Error(`addfeed expects 2 args but got ${args.length}`);
  }

  const usernameFromConfig = readConfig().currentUserName;
  const user = await getUser(usernameFromConfig);
  const { id } = user;
  const [name, url] = args;
  const feed = await createFeed(name, url, id);

  printFeed(feed, user);
}

export function printFeed(feed: Feed, user: User) {
  console.log(`FeedId: ${feed.id}`);
  console.log(`FeedName: ${feed.name}`);
  console.log(`FeedURL: ${feed.url}`);
  console.log(`FeedOwner: ${feed.user_id}`);

  console.log("===================================");

  console.log(`UserId: ${user.id}`);
  console.log(`UserName: ${user.name}`);
}
