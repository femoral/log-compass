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

export const getUsingPath = (value, path = [], results = new Map()) => {
  if (value === undefined) return results;
  if (path.length === 0 && isPrimitive(value)) {
    const result = results.get(value);
    results.set(value, result ? result + 1 : 1);
    return results;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => {
      getUsingPath(item, path, results);
    });
  }

  if (typeof value === "object" && value !== null) {
    getUsingPath(value[path[0]], path.slice(1), results);
  }

  return results;
};

const addValueToFilter = (path, value, filter) => {
  const isArray = path[0].includes("[]");
  const segment = isArray ? path[0].replace("[]", "") : path[0];

  if (path.length <= 1) {
    filter[segment] = value;
    return;
  }

  const nestedObject = {};
  filter[segment] = isArray ? [nestedObject] : nestedObject;

  addValueToFilter(path.slice(1), value, nestedObject);
};

export const convertValueSearchToLodashFilter = (path, value) => {
  const pathSegments = path.split(".");
  const filter = {};

  addValueToFilter(pathSegments, value, filter);

  return filter;
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
