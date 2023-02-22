import { spawn } from "child_process";

export const createStartChildProcess =
  ({ command, args, logStore, parse }) =>
  () => {
    const childProcess = spawn(command, args);
    childProcess.stdout.setEncoding("utf8");
    childProcess.stdout.on("data", (data) => {
      try {
        const log = parse(data);
        logStore.add({ ...log, _parsed: true });
      } catch (error) {
        logStore.add({ _raw: data, _parsed: false });
        console.error("failed to parse JSON log", error);
      }
    });
  };
