const { testSchema1, testSchema2 } = require("./schemas");

/**
 * Generates random data based on the given JSON Schema.
 * @param {Object} schema - The JSON Schema object.
 * @returns {any} - Randomly generated data matching the schema.
 * @throws {Error} If the schema is invalid or unsupported.
 */
const generateRandomData = (schema) => {
  if (!schema || typeof schema !== "object") {
    throw new Error("Invalid schema: Must be a valid JSON Schema object.");
  }

  // Handle enum constraints by randomly selecting a value from the enum array.
  if (schema.enum) {
    return schema.enum[Math.floor(Math.random() * schema.enum.length)];
  }

  // Handle supported JSON Schema types by delegating to specific functions.
  switch (schema.type) {
    case "integer":
      return getRandomInteger(schema.minimum, schema.maximum);
    case "number":
      return getRandomNumber(schema.minimum, schema.maximum);
    case "string":
      return getRandomString(schema.minLength, schema.maxLength);
    case "boolean":
      return getRandomBoolean();
    case "array":
      return getRandomArray(schema);
    case "object":
      return getRandomObject(schema);
    default:
      throw new Error(`Unsupported type: ${schema.type}`);
  }
};

/**
 * Generates a random integer within the specified range.
 * @param {number} [minimum=0] - The minimum value (inclusive).
 * @param {number} [maximum=100] - The maximum value (exclusive).
 * @returns {number} - A random integer within the range.
 */
const getRandomInteger = (minimum = 0, maximum = 100) => {
  return Math.floor(getRandomNumber(minimum, maximum));
};

/**
 * Generates a random floating-point number within the specified range.
 * @param {number} [minimum=0] - The minimum value (inclusive).
 * @param {number} [maximum=100] - The maximum value (exclusive).
 * @returns {number} - A random floating-point number within the range.
 */
const getRandomNumber = (minimum = 0, maximum = 100) => {
  return (Math.random() * (maximum - minimum) + minimum).toFixed(2);
};

/**
 * Generates a random string with a length within the specified range.
 * @param {number} [minLength=1] - The minimum length of the string.
 * @param {number} [maxLength=20] - The maximum length of the string.
 * @returns {string} - A random string of the specified length.
 */
const getRandomString = (minLength = 1, maxLength = 20) => {
  const stringLength =
    Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  // Build the string character by character.
  for (let i = 0; i < stringLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};

/**
 * Generates a random boolean value.
 * @returns {boolean} - A random boolean (true or false).
 */
const getRandomBoolean = () => Math.random() >= 0.5;

/**
 * Generates a random array based on the schema.
 * @param {Object} schema - The schema defining the array.
 * @returns {Array} - A random array matching the schema.
 */
const getRandomArray = (schema) => {
  const minItems = schema.minItems || 1;
  const maxItems = schema.maxItems || 10;
  const arrayLength = getRandomInteger(minItems, maxItems);
  const randomArray = [];

  // Populate the array with random elements conforming to the items schema.
  for (let i = 0; i < arrayLength; i++) {
    randomArray.push(generateRandomData(schema.items));
  }

  // Ensure uniqueness if the `uniqueItems` constraint is true.
  if (schema.uniqueItems) {
    return [...new Set(randomArray)];
  }

  return randomArray;
};

/**
 * Generates a random object based on the schema.
 * @param {Object} schema - The schema defining the object.
 * @returns {Object} - A random object matching the schema.
 */
const getRandomObject = (schema) => {
  const result = {};
  const randomBoolean = getRandomBoolean();

  // Generate values for all required properties as specified in the schema.
  if (schema.required) {
    schema.required.forEach((key) => {
      if (schema.properties && schema.properties[key]) {
        // Generate random data for the required property and add it to the result object.
        result[key] = generateRandomData(schema.properties[key]);
      }
    });
  }

  // Iterate over all properties in the schema to generate optional properties.
  if (schema.properties) {
    Object.keys(schema.properties).forEach((key) => {
      if (!schema.required || !schema.required.includes(key)) {
        // Randomly include optional properties with a 50% chance.
        if (randomBoolean) {
          result[key] = generateRandomData(schema.properties[key]);
        }
      }
    });
  }

  return result;
};

/**
 * Example usage: Generate random objects based on test schemas.
 */
const randomObject1 = getRandomObject(testSchema1);
console.log("Random Object 1:", randomObject1);

const randomObject2 = getRandomObject(testSchema2);
console.log("Random Object 2:", randomObject2);

module.exports = {
  generateRandomData,
  getRandomObject,
  getRandomString,
  getRandomNumber,
  getRandomArray,
  getRandomBoolean,
  getRandomInteger,
};
