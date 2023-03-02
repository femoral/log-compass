import { createStartChildProcess } from "./capture/child-process.js";
import { createLogStore } from "./logs/log.store.js";
import {
  createGetLogsController,
  createStreamLogsController,
} from "./logs/log.controller.js";
import { createLogRouter } from "./routes/log.routes.js";
import { createObserver } from "./utils/observer.js";
import { createServer } from "./server.js";
import { createJsonParserTransform } from "./parser/json-parser.transform.js";

export const bootstrap = async (command, args) => {
  const jsonParserTransform = createJsonParserTransform();
  const observers = createObserver();
  const logStore = createLogStore({ observers });
  const startChildProcess = createStartChildProcess({
    command,
    args,
    logStore,
    jsonParserTransform,
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
