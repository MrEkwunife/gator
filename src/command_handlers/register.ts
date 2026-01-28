import { createUser } from "../lib/db/queries/user";
import { setUser } from "../config";

export async function handlerRegister(_cmdName: string, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error(`register expects 1 arg but got ${args.length}`);
  }

  try {
    const user = await createUser(args[0]);
    setUser(user.name);
    console.log(`${user.name} created and logged in`);
  } catch (error: any) {
      throw new Error("username already exists");
  }
}
