import { readConfig, setUser } from "./config.js";

function main() {
  setUser("Lane");
  console.log(readConfig());
}

main();
