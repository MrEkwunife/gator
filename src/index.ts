import { argv, exit } from "node:process";

import type { CommandRegistry } from "./types";
import { runCommand } from "./utils/run";
import { handlerLogin } from "./commands/login";
import { handlerRegister } from "./commands/register";
import { handlerReset } from "./commands/reset";
import { getUsers } from "./commands/users";
import { handlerAgg } from "./commands/aggregrate";
import { handlerAddFeed } from "./commands/feeds";
import { handlerListFeeds } from "./commands/feeds";
import { handlerFollow, handlerListFeedFollows } from "./commands/feed_follows";
import { middlewareLoggedIn } from "./utils/middlewares";

const commandRegiter: CommandRegistry = {
  login: handlerLogin,
  register: handlerRegister,
  reset: handlerReset,
  users: getUsers,
  agg: handlerAgg,
  addfeed: middlewareLoggedIn(handlerAddFeed),
  feeds: handlerListFeeds,
  follow: middlewareLoggedIn(handlerFollow),
  following: middlewareLoggedIn(handlerListFeedFollows),
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
