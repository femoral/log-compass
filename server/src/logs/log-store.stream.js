import { Writable } from "stream";

export const createLogStoreWritable = (store) => {
  return new Writable({
    write(chunk, encoding, callback) {
      store.add(chunk);
      callback();
    },
    decodeStrings: false,
    objectMode: true,
  });
};
