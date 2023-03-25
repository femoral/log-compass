import { Transform } from "stream";

export const createJsonParserTransform = () => {
  return new Transform({
    transform(line, encoding, callback) {
      try {
        if (!line.trim()) return;

        const json = JSON.parse(cleanNonJsonData(line));
        json._parsed = true;
        this.push(json);
      } catch (error) {
        this.push({ _raw: line, _parsed: false, _parseError: error.message });
      } finally {
        callback();
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
