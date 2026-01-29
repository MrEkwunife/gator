import { getUser } from "../lib/db/queries/user";
import { readConfig } from "../config";
import type { UserCommandHandler } from "../types";

export function loginMiddleWare(handler: UserCommandHandler) {
  return async (cmdName: string, ...args: string[]): Promise<void> => {
    const user = await getUser(readConfig().currentUserName);
    if (!user) {
      throw new Error("User not Found");
    }

    await handler(cmdName, user, ...args);
  };
}
