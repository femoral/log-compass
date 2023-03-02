import { Transform } from "stream";

export const createJsonParserTransform = () => () => {
  return new Transform({
    transform(chunk, encoding, callback) {
      try {
        if (!chunk.trim()) return;

        const json = JSON.parse(cleanNonJsonData(chunk));
        callback(null, json);
      } catch (error) {
        console.error("failed to parse JSON log", error);
        callback(null, { _raw: chunk, _parsed: false });
      }
    },
    decodeStrings: false,
    readableObjectMode: true,
  });
};

const cleanNonJsonData = (data) => {
  const jsonStart = data.indexOf("{");
  const jsonEnd = data.lastIndexOf("}");
  if (jsonStart === -1 || jsonEnd === -1) {
    throw new Error("JSON data not found");
  }
  return data.substring(jsonStart, jsonEnd + 1);
};
