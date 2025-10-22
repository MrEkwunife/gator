import { User } from "src/lib/db/schema";
import { deleteFeedFollow } from "src/lib/db/queries/feed_follows";
import { getFeedByURL } from "src/lib/db/queries/feeds";

export async function handlerDeleteFollow(
  cmdName: string,
  user: User,
  ...args: string[]
) {
  if (args.length !== 1) {
    throw new Error(`\tUsage: ${cmdName} <url>`);
  }

  const feed = await getFeedByURL(args[0]);
  if (!feed) {
    throw new Error("\tNo feed with URL found");
  }

  await deleteFeedFollow(user.id, feed.id);
}
