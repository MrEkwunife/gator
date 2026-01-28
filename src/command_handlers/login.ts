import { setUser } from "../config.js";
import { getUser } from "../lib/db/queries/user.js";

export async function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(`Login expects 1 arg, got ${args.length}`);
  }

  const username = args[0];
  const user = await getUser(username);
  if (!user) {
    throw new Error(`${username} does not exist in our database`);
  }

  setUser(username);
  console.log(`User: ${username} is set`);
}
