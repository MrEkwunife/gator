import { createUser, getUserByName } from "src/lib/db/queries/users";
import { setUser } from "src/config";

export async function handlerRegister(cmdName: string, ...args: string[]) {
  if (args?.length !== 1) {
    throw new Error(`\t${cmdName} requires 1 arg but got ${args.length}`);
  }

  const userName = args[0];
  const tryGetUser = await getUserByName(userName);

  if (tryGetUser?.name) {
    throw new Error(`\tUsername already exits... 🌚`);
  }

  await createUser(userName);
  setUser(userName);
}
