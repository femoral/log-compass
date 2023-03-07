import { spawn } from "child_process";
import split from "split2";

export const createStartChildProcess =
  ({ command, args, storeStream, stringToObjectStream }) =>
  () => {
    const childProcess = spawn(command, args);

    //TODO: switch to stream.pipeline to allow for custom & multiple parsers
    childProcess.stdout
      .pipe(split())
      .pipe(stringToObjectStream)
      .pipe(storeStream);
  };
