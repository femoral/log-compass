import { getPrimitivePaths } from "../src/json-utils.js";

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
