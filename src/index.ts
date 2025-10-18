import { argv, exit } from "node:process";

import type { CommandRegistry } from "./types";
import { runCommand } from "./lib/utils/run";
import { handlerLogin } from "./commands/login";

const commandRegiter: CommandRegistry = {
  login: handlerLogin,
};

function main() {
  const [usrCmd, ...args] = argv.slice(2);

  try {
    runCommand(commandRegiter, usrCmd, ...args);
  } catch (e) {
    console.log((e as Error).message);
    exit(1);
  }
}

main();
