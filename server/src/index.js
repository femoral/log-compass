import { bootstrap } from "./bootstrap.js";
import { getArgs } from "./config/args.js";

(async () => {
  const { command, port } = await getArgs();
  const { server, startChildProcess } = await bootstrap(
    command[0],
    command.slice(1) || []
  );

  server.listen(port, async () => {
    console.log(`Server started at http://localhost:${port}`);
    startChildProcess();
  });
})();
