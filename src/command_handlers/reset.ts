import { deleteAllUsers } from "../lib/db/queries/user";

export async function handlerReset() {
  try {
    await deleteAllUsers();
    console.log("⚠️ All users deleted! ⚠️");
  } catch (error) {
    throw new Error("Unable to delete all users!");
  }
}
