import fs from "fs";
import os from "os";
import path from "path";
import { inflate } from "zlib";

const CONFIG_FILE_NAME = ".gatorconfig.json";

export type Config = {
  dbUrl: string;
  currentUserName: string;
};

export function setUser(username: string) {
  const storedConfig = readConfig();

  const config: Config = {
    dbUrl: storedConfig.dbUrl,
    currentUserName: username,
  };

  writeConfig(config);
}

export function readConfig(): Config {
  const file: string = getConfigFilePath();
  const configFileObject = JSON.parse(
    fs.readFileSync(file, { encoding: "utf-8" }),
  );

  if (!configFileObject.db_url || typeof configFileObject.db_url !== "string") {
    throw new Error(
      "Databse String Error: No database string found in config file",
    );
  }

  const config: Config = {
    dbUrl: configFileObject.db_url,
    currentUserName: configFileObject.current_user_name ?? "",
  };

  return config;
}

function getConfigFilePath() {
  const filePath = path.join(os.homedir(), CONFIG_FILE_NAME);
  return filePath;
}

function writeConfig(cfg: Config): void {
  const configObj = {
    db_url: cfg.dbUrl,
    current_user_name: cfg.currentUserName,
  };
  const file = getConfigFilePath();
  fs.writeFileSync(file, JSON.stringify(configObj));
}
