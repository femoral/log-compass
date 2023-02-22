import { createStartChildProcess } from "./capture/child-process.js";
import { createLogStore } from "./logs/log.store.js";
import {
  createGetLogsController,
  createStreamLogsController,
} from "./logs/log.controller.js";
import { createLogRouter } from "./routes/log.routes.js";
import { createObserver } from "./utils/observer.js";
import { createServer } from "./server.js";
import { createJsonParser } from "./parser/json.parser.js";

export const bootstrap = async (command, args) => {
  const parse = createJsonParser();
  const observers = createObserver();
  const logStore = createLogStore({ observers });
  const startChildProcess = createStartChildProcess({
    command,
    args,
    logStore,
    parse,
  });
  const getLogsController = createGetLogsController({ logStore });
  const streamLogsController = createStreamLogsController({ observers });
  const logRouter = createLogRouter({
    getLogsController,
    streamLogsController,
  });
  const server = await createServer({ logRouter });
  return { server, startChildProcess };
};
