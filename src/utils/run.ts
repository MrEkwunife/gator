import { CommandRegistry } from "src/types";

export function runCommand(
  registry: CommandRegistry,
  cmdName: string,
  ...args: string[]
) {
  if (cmdName?.length <= 0) {
    throw new Error(
      "Error:\n\tUsage: tsx ./src/index.ts <CommandName> [...args]",
    );
  }

  const commandToRun = registry[cmdName];
  if (!commandToRun) {
    throw new Error("Error:\n\tCommand Not Found! 😮‍💨");
  }

  try {
    commandToRun(cmdName, ...args);
  } catch (e) {
    throw new Error(`Error:\n\t${(e as Error).message}`);
  }
}
