import { getAllUsers, createUser, getUser } from "../lib/db/queries/user";
import { readConfig, setUser } from "../config";

export async function handlerGetUsers(_: string) {
  try {
    const users = await getAllUsers();
    const loggedInUsername = readConfig().currentUserName;

    users.forEach((user) => {
      const username = user.name;
      console.log(
        `${username}${username === loggedInUsername ? " (current)" : ""}`,
      );
    });
  } catch (error) {
    throw new Error("There was an error getting users");
  }
}

export async function handlerRegister(_: string, ...args: string[]) {
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

export async function handlerLogin(_: string, ...args: string[]) {
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
