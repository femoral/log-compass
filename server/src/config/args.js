import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";

export const getArgs = async () => {
  const { _, port } = await yargs(hideBin(process.argv)).option("port", {
    alias: "p",
    type: "number",
    default: 56428,
  }).argv;

  return { command: _, port };
};
