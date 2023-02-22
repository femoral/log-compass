const cleanNonJsonData = (data) => {
  const jsonStart = data.indexOf("{");
  const jsonEnd = data.lastIndexOf("}");
  if (jsonStart === -1 || jsonEnd === -1) {
    throw new Error("JSON data not found");
  }
  return data.substring(jsonStart, jsonEnd + 1);
};

export const createJsonParser = () => (data) => {
  return JSON.parse(cleanNonJsonData(data));
};
