import { deleteAllUser } from "../lib/db/queries/users";

export async function handlerReset(_: string) {
  await deleteAllUser();
  console.log("Database reset successfully! 🤔");
}
