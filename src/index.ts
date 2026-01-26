import { CommandRegistry } from "./types.js";
import { registerCommand, runCommand } from "./command_utils.js";
import { handlerLogin } from "./login.js";

function main() {
  const [cmdName, ...args] = process.argv.slice(2);
  if (!cmdName) {
    console.log("Not enough argument");
    process.exit(1);
  }

  const registry: CommandRegistry = {};
  registerCommand(registry, "login", handlerLogin);
  try {
    runCommand(registry, cmdName, ...args);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    } else {
      console.log(err);
    }

    process.exit(1);
  }
}

main();
