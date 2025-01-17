const testSchema1 = {
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

const testSchema2 = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://example.com/product.schema.json",
  title: "Product",
  description: "A product from Acme's catalog",
  type: "object",
  properties: {
    productId: {
      description: "The unique identifier for a product",
      type: "integer",
      minimum: 1,
      maximum: 1000,
    },
    productName: {
      description: "Name of the product",
      type: "string",
      minLength: 5,
      maxLength: 15,
    },
    price: {
      description: "The price of the product",
      type: "number",
      minimum: 0.01,
      maximum: 1000,
    },
    tags: {
      description: "Tags for the product",
      type: "array",
      items: {
        type: "string",
        minLength: 3,
        maxLength: 10,
      },
      minItems: 1,
      maxItems: 5,
      uniqueItems: true,
    },
    dimensions: {
      type: "object",
      properties: {
        length: { type: "number", minimum: 1, maximum: 50 },
        width: { type: "number", minimum: 1, maximum: 50 },
        height: { type: "number", minimum: 1, maximum: 50 },
      },
      required: ["length", "width", "height"],
    },
    availability: {
      description: "Whether the product is available",
      type: "boolean",
    },
    category: {
      description: "Product category",
      type: "string",
      enum: ["Electronics", "Clothing", "Furniture", "Toys"],
    },
  },
  required: ["productId", "productName", "price", "category"],
};

module.exports = { testSchema1, testSchema2 };
