import { v4 as uuid } from "uuid";

//todo: move to config & calculate based on max log size
const MAX_LOGS_LENGTH = 10000;

export const createLogStore = ({ observers }) => {
  const logs = [];
  return {
    add: (data) => {
      const log = { _id: uuid(), data };

      if (logs.length >= MAX_LOGS_LENGTH) {
        logs.shift();
      }

      logs.push(log);
      observers.notify(log);
    },
    get: () => logs,
  };
};
