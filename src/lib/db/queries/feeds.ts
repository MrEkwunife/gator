import { db } from "..";
import { feeds, users, feedsFollow } from "../schema";
import { eq } from "drizzle-orm";

export async function createFeed(name: string, url: string, user_id: string) {
  const [feed] = await db
    .insert(feeds)
    .values({ name, url, user_id })
    .returning();

  return feed;
}

export async function createFeedFollow(userId: string, feedId: string) {
  const [newFollow] = await db
    .insert(feedsFollow)
    .values({ userId, feedId })
    .returning();

  const [result] = await db
    .select({
      id: feedsFollow.id,
      createdAt: feedsFollow.createdAt,
      updatedAt: feedsFollow.updatedAt,
      userId: feedsFollow.userId,
      feedId: feedsFollow.feedId,
      userName: users.name,
      feedName: feeds.name,
    })
    .from(feedsFollow)
    .innerJoin(users, eq(feedsFollow.userId, users.id))
    .innerJoin(feeds, eq(feedsFollow.feedId, feeds.id))
    .where(eq(feedsFollow.id, newFollow.id));

  return result;
}

export async function getFeeds() {
  const result = await db
    .select()
    .from(users)
    .innerJoin(feeds, eq(users.id, feeds.user_id));

  return result;
}

export async function getFeedByURL(url: string) {
  const [result] = await db.select().from(feeds).where(eq(feeds.url, url));
  return result;
}

export async function getFeedFollowForUser(id: string) {
  const result = await db
    .select()
    .from(feedsFollow)
    .innerJoin(feeds, eq(feedsFollow.feedId, feeds.id))
    .where(eq(feedsFollow.userId, id));

  return result;
}
