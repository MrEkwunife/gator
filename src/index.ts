import { argv, exit } from "node:process";

import type { CommandRegistry } from "./types";
import { runCommand } from "./lib/utils/run";
import { handlerLogin } from "./commands/login";
import { handlerRegister } from "./commands/register";
import { handlerReset } from "./commands/reset";
import { getUsers } from "./commands/users";

const commandRegiter: CommandRegistry = {
  login: handlerLogin,
  register: handlerRegister,
  reset: handlerReset,
  users: getUsers,
};

async function main() {
  const [usrCmd, ...args] = argv.slice(2);

  try {
    await runCommand(commandRegiter, usrCmd, ...args);
  } catch (e) {
    console.log((e as Error).message);
    exit(1);
  }
  exit(0);
}

main();
