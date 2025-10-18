import { getAllUsers } from "src/lib/db/queries/users";
import { readConfig } from "src/config";

export async function getUsers(_: string) {
  const users = await getAllUsers();
  const currentUser = readConfig().currentUserName;
  users.forEach((user) => {
    let isCurrentUser = user.name === currentUser;
    console.log(`* ${user.name}${isCurrentUser ? " (current)" : ""}`);
  });
}
