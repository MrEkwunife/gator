import { eq, and } from "drizzle-orm";
import { db } from "..";
import { users, feedsFollow, feeds } from "../schema";

export async function createUser(name: string) {
  const [result] = await db.insert(users).values({ name: name }).returning();
  return result;
}

export async function getUser(name: string) {
  const [result] = await db.select().from(users).where(eq(users.name, name));
  return result;
}

export async function getAllUsers() {
  const result = await db.select().from(users);
  return result;
}

export async function deleteAllUsers() {
  await db.delete(users);
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

export async function getFeedFollowForUser(id: string) {
  const result = await db
    .select()
    .from(feedsFollow)
    .innerJoin(feeds, eq(feedsFollow.feedId, feeds.id))
    .where(eq(feedsFollow.userId, id));

  return result;
}

export async function deleteFeedFollowForUser(userId: string, feedId: string) {
  const _ = await db
    .delete(feedsFollow)
    .where(and(eq(feedsFollow.userId, userId), eq(feedsFollow.feedId, feedId)));
}
