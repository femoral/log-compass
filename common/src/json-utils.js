export const getPrimitivePaths = (obj, currentKey = "", paths = new Set()) => {
  if (typeof obj === "object" && obj !== null) {
    if (Array.isArray(obj)) {
      obj.forEach((item) => {
        getPrimitivePaths(item, `${currentKey}[]`, paths);
      });
    } else {
      for (let key in obj) {
        const newKey = currentKey ? `${currentKey}.${key}` : key;
        if (typeof obj[key] !== "object" || obj[key] === null) {
          paths.add(newKey);
        }
        getPrimitivePaths(obj[key], newKey, paths);
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
