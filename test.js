const {
  generateRandomData,
  getRandomObject,
  getRandomString,
  getRandomNumber,
  getRandomArray,
  getRandomBoolean,
  getRandomInteger,
} = require("./main");

/**
 * Groups related tests under a single description.
 * @param {string} description - The description of the test group.
 * @param {Function} callback - The function containing the tests.
 */
const describe = (description, callback) => {
  console.log(`\n${description}`);
  callback();
};

/**
 * Defines an individual test case.
 * @param {string} description - The description of the test.
 * @param {Function} callback - The function containing the test logic.
 */
const test = (description, callback) => {
  try {
    callback();
    console.log(`✅ ${description}`);
  } catch (error) {
    console.error(`❌ ${description}`);
    console.error(`${error.message}`);
  }
};

/**
 * Provides assertion methods for testing values.
 * @param {*} value - The value to test.
 * @returns {Object} - An object containing assertion methods.
 */
const expect = (value) => ({
  /**
   * Asserts that the value equals the expected value.
   * @param {*} expected - The expected value.
   */
  toBe: (expected) => {
    if (value !== expected) {
      throw new Error(`Expected ${value} to be ${expected}`);
    }
  },

  /**
   * Asserts that the value is greater than or equal to the specified minimum.
   * @param {number} min - The minimum value.
   */
  toBeGreaterThanOrEqual: (min) => {
    if (value < min) {
      throw new Error(
        `Expected ${value} to be greater than or equal to ${min}`
      );
    }
  },

  /**
   * Asserts that the value is less than the specified maximum.
   * @param {number} max - The maximum value.
   */
  toBeLessThan: (max) => {
    if (value >= max) {
      throw new Error(`Expected ${value} to be less than ${max}`);
    }
  },

  /**
   * Asserts that the value is of the specified type.
   * @param {string} type - The expected type.
   */
  toBeTypeOf: (type) => {
    if (typeof value !== type) {
      throw new Error(`Expected ${value} to be of type ${type}`);
    }
  },

  /**
   * Asserts that the value is an array.
   */
  toBeArray: () => {
    if (!Array.isArray(value)) {
      throw new Error(`Expected ${value} to be an array`);
    }
  },
});

/**
 * Test suite for random data generation functions
 */
describe("Random Data Generator Functions", () => {
  describe("getRandomInteger", () => {
    test("generates an integer within the specified range", () => {
      const result = getRandomInteger(10, 20);
      expect(result).toBeGreaterThanOrEqual(10);
      expect(result).toBeLessThan(20);
    });
  });

  describe("getRandomNumber", () => {
    test("generates a floating-point number within the specified range", () => {
      const result = parseFloat(getRandomNumber(5.5, 10.5));
      expect(result).toBeGreaterThanOrEqual(5.5);
      expect(result).toBeLessThan(10.5);
    });
  });

  describe("getRandomString", () => {
    test("generates a string with a length within the specified range", () => {
      const result = getRandomString(5, 10);
      expect(result.length).toBeGreaterThanOrEqual(5);
      expect(result.length).toBeLessThan(11);
    });
  });

  describe("getRandomBoolean", () => {
    test("generates a random boolean value", () => {
      const result = getRandomBoolean();
      expect(result).toBeTypeOf("boolean");
    });
  });

  describe("getRandomArray", () => {
    test("generates an array matching the schema", () => {
      const schema = {
        type: "array",
        items: { type: "integer" },
        minItems: 1,
        maxItems: 5,
        uniqueItems: true,
      };

      const result = getRandomArray(schema);

      expect(result).toBeArray();
      expect(result.length).toBeGreaterThanOrEqual(schema.minItems);
      expect(result.length).toBeLessThan(schema.maxItems + 1);
    });
  });

  describe("getRandomObject", () => {
    test("generates an object with required properties", () => {
      const schema = {
        type: "object",
        properties: {
          a: { type: "integer", minimum: 1, maximum: 5 },
          b: { type: "string", minLength: 2, maxLength: 4 },
        },
        required: ["a"],
      };

      const result = getRandomObject(schema);

      expect(result).toBeTypeOf("object");
      expect(result.a).toBeGreaterThanOrEqual(1);
      expect(result.a).toBeLessThan(6);

      if (result.b !== undefined) {
        expect(result.b.length).toBeGreaterThanOrEqual(2);
        expect(result.b.length).toBeLessThan(5);
      }
    });
  });

  describe("generateRandomData", () => {
    test("generates data matching the given schema", () => {
      const schema = {
        type: "object",
        properties: {
          id: { type: "integer", minimum: 1, maximum: 100 },
          name: { type: "string", minLength: 3, maxLength: 10 },
          active: { type: "boolean" },
          tags: {
            type: "array",
            items: { type: "string", minLength: 2, maxLength: 5 },
            minItems: 2,
            maxItems: 4,
          },
        },
        required: ["id", "name"],
      };

      const result = generateRandomData(schema);

      expect(result).toBeTypeOf("object");
      expect(result.id).toBeGreaterThanOrEqual(1);
      expect(result.id).toBeLessThan(101);
      expect(result.name.length).toBeGreaterThanOrEqual(3);
      expect(result.name.length).toBeLessThan(11);

      if (result.active !== undefined) {
        expect(result.active).toBeTypeOf("boolean");
      }

      if (result.tags !== undefined) {
        expect(result.tags).toBeArray();
        expect(result.tags.length).toBeGreaterThanOrEqual(2);
        expect(result.tags.length).toBeLessThan(5);

        result.tags.forEach((tag) => {
          expect(tag.length).toBeGreaterThanOrEqual(2);
          expect(tag.length).toBeLessThan(6);
        });
      }
    });
  });
});
