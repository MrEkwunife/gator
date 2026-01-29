import { CommandRegistry } from "./types.js";
import {
  registerCommand,
  runCommand,
} from "./command_handlers/command_utils.js";

import { handlerReset } from "./command_handlers/reset.js";
import { handlerAgg } from "./command_handlers/aggregate.js";
import {
  handlerGetUsers,
  handlerLogin,
  handlerRegister,
} from "./command_handlers/users.js";
import { handlerAddfeed, handlerFeeds } from "./command_handlers/feeds.js";

async function main() {
  const [cmdName, ...args] = process.argv.slice(2);
  if (!cmdName) {
    console.log("Not enough argument");
    process.exit(1);
  }

  const registry: CommandRegistry = {};
  registerCommand(registry, "login", handlerLogin);
  registerCommand(registry, "register", handlerRegister);
  registerCommand(registry, "reset", handlerReset);
  registerCommand(registry, "users", handlerGetUsers);
  registerCommand(registry, "agg", handlerAgg);
  registerCommand(registry, "addfeed", handlerAddfeed);
  registerCommand(registry, "feeds", handlerFeeds);

  try {
    await runCommand(registry, cmdName, ...args);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log(err);
    }

    process.exit(1);
  }

  process.exit(0);
}

await main();
