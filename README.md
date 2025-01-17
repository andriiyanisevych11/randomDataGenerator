# Random Data Generator
  
  This project provides utility functions for generating random data 
  that match predefined schemas. It's designed to work with a variety 
  of data types, including integers, strings, booleans, arrays, and objects.

## Features

- Mock testing framework (`describe`, `test`, and `expect` functions)
- Random data generation utilities:
  - `getRandomInteger` - Generate integers within a range.
  - `getRandomNumber` - Generate floating-point numbers within a range.
  - `getRandomString` - Generate strings of specified length.
  - `getRandomBoolean` - Generate random boolean values.
  - `getRandomArray` - Generate arrays based on a schema.
  - `getRandomObject` - Generate objects based on a schema.
  - `generateRandomData` - Generate data matching complex schemas.
  
## Setup Instructions
1. Clone this repository:
2. Navigate to the project directory:
3. Ensure Node.js is installed. Run the script using:
```bash
  node test.js
```
  
## Example Usage
Open `index.html` or run `node main.js` in the terminal to run the code.

### Schema example
```javascript
  const schema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://example.com/product.schema.json",
  title: "Product",
  description: "A product from Acme's catalog",
  type: "object",
  properties: {
    productId: {
      description: "The unique identifier for a product",
      type: "integer",
    },
    productName: {
      description: "Name of the product",
      type: "string",
    },
    price: {
      description: "The price of the product",
      type: "number",
      exclusiveMinimum: 0,
    },
    tags: {
      description: "Tags for the product",
      type: "array",
      items: {
        type: "string",
      },
      minItems: 1,
      uniqueItems: true,
    },
    dimensions: {
      type: "object",
      properties: {
        length: {
          type: "number",
        },
        width: {
          type: "number",
        },
        height: {
          type: "number",
        },
      },
      required: ["length", "width", "height"],
    },
  },
  required: ["productId", "productName", "price"],
};

 const result = generateRandomData(schema);
 console.log(result);
 ```
  
## Testing Instructions
The included Jest-like mock framework enables running the test suite via:
```bash
 node test.js
 ```
Modify the test cases as needed in the `test.js` file.
