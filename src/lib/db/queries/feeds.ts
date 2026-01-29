import { db } from "..";
import { feeds, users } from "../schema";
import { eq } from "drizzle-orm";

export async function createFeed(name: string, url: string, user_id: string) {
  const [feed] = await db
    .insert(feeds)
    .values({ name, url, user_id })
    .returning();

  return feed;
}

export async function getFeeds() {
  const result = await db
    .select()
    .from(users)
    .innerJoin(feeds, eq(users.id, feeds.user_id));

  return result;
}
