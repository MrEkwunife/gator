import { setUser } from "src/config";
import { getUserByName } from "src/lib/db/queries/users";

export async function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(`\t${cmdName} expects 1 arg but got ${args.length}`);
  }

  const username = args[0];
  if (!(await getUserByName(username))?.name) {
    throw new Error("Username not Found! 🌚");
  }

  setUser(username);
  console.log(`Username: ${username} set! 🎉`);
}
