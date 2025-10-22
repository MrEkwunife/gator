import { CommandHandler, UserCommandHandler } from "src/types";
import { readConfig } from "src/config";
import { getUserByName } from "src/lib/db/queries/users";

export function middlewareLoggedIn(
  handler: UserCommandHandler,
): CommandHandler {
  return async (cmdName: string, ...args: string[]): Promise<void> => {
    const config = readConfig();
    const userName = config.currentUserName;
    if (!userName) {
      throw new Error("\tUser not logged in");
    }

    const user = await getUserByName(userName);
    if (!user) {
      throw new Error(`\tUser ${userName} not found`);
    }

    await handler(cmdName, user, ...args);
  };
}
