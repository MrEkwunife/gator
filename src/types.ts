import { User } from "./lib/db/schema";

export type CommandHandler = (
  cmdName: string,
  ...args: string[]
) => Promise<void>;
export type CommandRegistry = Record<string, CommandHandler>;

export type UserCommandHandler = (
  cmdName: string,
  user: User,
  ...args: string[]
) => Promise<void> | void;
