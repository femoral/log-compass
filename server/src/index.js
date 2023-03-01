import { bootstrap } from "./bootstrap.js";

(async () => {
  const command = process.argv.slice(2);
  if (command) {
    const { server, startChildProcess } = await bootstrap(
      command[0],
      command.slice(1) || []
    );

    server.listen(3000, async () => {
      console.log(`Server started at http://localhost:3000`);
      startChildProcess();
    });
  } else {
    process.exitCode = 1;
    console.error("Must provide a command to run");
  }
})();
