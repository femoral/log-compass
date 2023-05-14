import { createStartChildProcess } from "./capture/child-process.js";
import { createLogStore } from "./logs/log.store.js";
import {
  createGetLogsController,
  createStreamLogsController,
} from "./logs/log.controller.js";
import { createLogRouter } from "./routes/log.routes.js";
import { createObserver } from "./utils/observer.js";
import { createServer } from "./server.cjs";
import { createJsonParserTransform } from "./capture/parser/json-parser.stream.js";
import { createLogStoreWritable } from "./logs/log-store.stream.js";

export const bootstrap = async (command, args) => {
  const stringToObjectStream = createJsonParserTransform();
  const observers = createObserver();
  const logStore = createLogStore({ observers });
  const storeStream = createLogStoreWritable(logStore);
  const startChildProcess = createStartChildProcess({
    command,
    args,
    storeStream,
    stringToObjectStream,
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
