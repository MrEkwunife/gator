import { getAllUsers } from "../lib/db/queries/user";
import { readConfig } from "../config";

export async function handlerGetUsers() {
  try {
    const users = await getAllUsers();
    const loggedInUsername = readConfig().currentUserName;

    users.forEach((user) => {
      const username = user.name;
      console.log(
        `${username}${username === loggedInUsername ? " (current)" : ""}`,
      );
    });
  } catch (error) {
    throw new Error("There was an error getting users");
  }
}
