import { setUser } from "./config.js";

export function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(`Login expects 1 arg, got ${args.length}`);
  }

  const user = args[0];
  setUser(user);
  console.log(`User: ${user} is set`);
}
