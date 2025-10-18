import { eq } from "drizzle-orm";
import { db } from "..";
import { users } from "../schema";

export async function createUser(name: string) {
  name = name.toLowerCase();
  const [result] = await db.insert(users).values({ name: name }).returning();
}

export async function getUserByName(name: string) {
  name = name.toLowerCase();
  const [user] = await db.select().from(users).where(eq(users.name, name));
  return user;
}

export async function getUserById(id: string) {
  const [user] = await db.select().from(users).where(eq(users.id, id));
  return user;
}

export async function deleteAllUser() {
  await db.delete(users);
}

export async function getAllUsers() {
  return await db.select().from(users);
}
