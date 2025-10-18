import { setUser } from "src/config";

export function handlerLogin(cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(`\t${cmdName} expects 1 arg but got ${args.length}`);
  }

  const username = args[0];
  setUser(username);
  console.log(`Username: ${username} set! 🎉`);
}
