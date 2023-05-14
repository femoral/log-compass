import { getPrimitivePaths, getUsingPath } from "../src/json-utils.js";

describe("getPrimitivePaths", () => {
  const scenarios = [
    { input: null, expected: new Set(), description: "null input" },
    { input: undefined, expected: new Set(), description: "undefined input" },
    { input: "", expected: new Set(), description: "empty string input" },
    { input: 0, expected: new Set(), description: "number input" },
    { input: false, expected: new Set(), description: "boolean input" },
    { input: [], expected: new Set(), description: "empty array input" },
    { input: {}, expected: new Set(), description: "empty object input" },
    {
      input: { a: 1 },
      expected: new Set(["a"]),
      description: "simple object input",
    },
    {
      input: { a: 1, b: { c: 2 } },
      expected: new Set(["a", "b.c"]),
      description: "nested object input",
    },
    {
      input: { a: [1, 2], b: { c: 3 } },
      expected: new Set(["b.c"]),
      description: "object with array input",
    },
    {
      input: [{ a: 1 }, { b: 2 }],
      expected: new Set(["[].a", "[].b"]),
      description: "array of objects input",
    },
    {
      input: [{ a: [1, 2] }, { b: { c: 3 } }],
      expected: new Set(["[].b.c"]),
      description: "array of objects with nested arrays and objects input",
    },
  ];

  scenarios.forEach((scenario) => {
    it(`${scenario.description}`, () => {
      expect(getPrimitivePaths(scenario.input)).toEqual(scenario.expected);
    });
  });
});

describe("getUsingPath", () => {
  const testObject = {
    name: "Juan",
    age: 30,
    address: {
      street: "Calle 123",
      city: "Ciudad de México",
      country: "México",
    },
    friends: [
      {
        name: "Pedro",
        age: 28,
      },
      {
        name: "María",
        age: 32,
      },
    ],
  };

  const scenarios = [
    {
      input: { value: testObject, path: [] },
      expected: new Map(),
      description: "empty path",
    },
    {
      input: { value: testObject, path: ["name"] },
      expected: new Map([["Juan", 1]]),
      description: "simple path",
    },
    {
      input: { value: testObject, path: ["address", "city"] },
      expected: new Map([["Ciudad de México", 1]]),
      description: "nested path",
    },
    {
      input: { value: testObject, path: ["friends", "name"] },
      expected: new Map([
        ["Pedro", 1],
        ["María", 1],
      ]),
      description: "array of objects path, string value",
    },
    {
      input: { value: testObject, path: ["friends", "age"] },
      expected: new Map([
        [28, 1],
        [32, 1],
      ]),
      description: "array of objects path, number value",
    },
  ];

  scenarios.forEach((scenario) => {
    it(`${scenario.description}`, () => {
      expect(getUsingPath(scenario.input.value, scenario.input.path)).toEqual(
        scenario.expected
      );
    });
  });
});
