import { spawn } from "child_process";
import split from "split2";

export const createStartChildProcess =
  ({ command, args, logStore, jsonParserTransform }) =>
  () => {
    const childProcess = spawn(command, args);
    childProcess.stdout
      .pipe(split())
      .pipe(jsonParserTransform())
      .on("data", (data) => logStore.add(data));
  };
