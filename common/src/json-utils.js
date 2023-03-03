export const getPrimitivePaths = (obj, paths = new Set(), currentKey = "") => {
  if (typeof obj === "object" && obj !== null) {
    if (Array.isArray(obj)) {
      obj.forEach((item) => {
        getPrimitivePaths(item, paths, `${currentKey}[]`);
      });
    } else {
      for (let key in obj) {
        const newKey = currentKey ? `${currentKey}.${key}` : key;
        if (typeof obj[key] !== "object" || obj[key] === null) {
          paths.add(newKey);
        }
        getPrimitivePaths(obj[key], paths, newKey);
      }
    }
  }
  return paths;
};

export const isPrimitive = (value) => {
  return (
    value === undefined ||
    value === null ||
    typeof value === "boolean" ||
    typeof value === "number" ||
    typeof value === "string"
  );
};
