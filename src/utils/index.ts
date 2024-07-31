import path from "node:path";
import fs from "node:fs";
import { UserConfig } from "../types";
// import { pathToFileURL } from "node:url";

export const getConfig = async (): Promise<UserConfig> => {
  const jsConfigPath = path.resolve(process.cwd(), "cover.config.js");
  const tsConfigPath = path.resolve(process.cwd(), "cover.config.ts");
  const configPath = fs.existsSync(jsConfigPath) ? jsConfigPath : tsConfigPath;

  if (!fs.existsSync(configPath)) {
    throw new Error("cover.config.js or cover.config.ts not found");
  }

  const config = await import(configPath);
  return config.default;

  // console.log(fs.existsSync(configPath));
  // const code = fs.readFileSync(path.resolve(process.cwd(), "cover.config.ts"), {
  //   encoding: "utf-8",
  // });

  // const fileBase = `cover.timestamp-${Date.now()}-${Math.random()
  //   .toString(16)
  //   .slice(2)}`;

  // const fileNameTmp = `${fileBase}.mjs`;
  // const fileUrl = `${pathToFileURL(fileBase)}.mjs`;
  // await fs.writeFileSync(fileNameTmp, code);
  // try {
  //   const config = await import(fileUrl);
  //   return config;
  // } finally {
  //   fs.unlink(fileNameTmp, () => {}); // Ignore errors
  // }
};
