import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { exit } from "node:process";

type Config = {
  dbUrl: string;
  currentUserName: string;
};

/**
 * setUser - sets / writes a Config Object the gator confile
 * file after setting the currentUserName
 */
export function setUser(name: string) {
  const config = readConfig();
  config.currentUserName = name;
  writeConfigFile(config);
}

/**
 * readConfig - reads json from file ~/.gatorConfig and returns a
 * config Object
 */
export function readConfig() {
  try {
    const configFilePath = getConfigFilePath();
    const rawData = fs.readFileSync(configFilePath, "utf-8");

    return validateConfig(JSON.parse(rawData));
  } catch (e) {
    console.log(`Error: ${(e as Error).message}`);
    exit(1);
  }
}

/** Helpers */
function getConfigFilePath() {
  const homeDir = os.homedir();
  const configFilePath = path.join(homeDir, ".gatorconfig.json");

  if (!fs.existsSync(configFilePath)) {
    throw new Error("error reading config file (~/.gataorconfig.json)");
  }

  return configFilePath;
}

function writeConfigFile(cfg: Config): void {
  try {
    const configFilePath = getConfigFilePath();
    const rawConfig = {
      db_url: cfg.dbUrl,
      current_user_name: cfg.currentUserName,
    };
    const data = JSON.stringify(rawConfig);
    fs.writeFileSync(configFilePath, data, { encoding: "utf-8" });
  } catch (e) {
    console.log(`Error: ${(e as Error).message}`);
    exit(1);
  }
}

function validateConfig(rawConfig: any): Config {
  if (!rawConfig.db_url || typeof rawConfig.db_url !== "string") {
    throw new Error("Config file reuires db_url");
  }
  if (
    !rawConfig.current_user_name ||
    typeof rawConfig.current_user_name !== "string"
  ) {
    throw new Error("current_user_name is required in config file");
  }

  const config = {
    dbUrl: rawConfig.db_url,
    currentUserName: rawConfig.current_user_name,
  };

  return config;
}
