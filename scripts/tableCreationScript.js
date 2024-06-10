import { CreateTableCommand, DynamoDBClient } from "@aws-sdk/client-dynamodb";
import dotenv from "dotenv";

dotenv.config();

const my_AWSAccessKeyId = process.env.ACCESS_KEY;
const my_AWSSecretKey = process.env.SECRET_KEY;
const aws_region = process.env.REGION;

// const client = new DynamoDBClient({
//   region: aws_region,
//   credentials: {
//     accessKeyId: my_AWSAccessKeyId,
//     secretAccessKey: my_AWSSecretKey,
//   },
// });

const client = new DynamoDBClient({
  region: aws_region,
  endpoint: "http://localhost:8000",
  credentials: {
    accessKeyId: "lhch4c",
    secretAccessKey: "ov40b",
  },
});

const tables = [
  {
    TableName: "dev-users",
    AttributeDefinitions: [
      { AttributeName: "id", AttributeType: "N" },
      { AttributeName: "email", AttributeType: "S" },
      { AttributeName: "password", AttributeType: "S" },
    ],
    KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
    GlobalSecondaryIndexes: [
      {
        IndexName: "UserIdIndex",
        KeySchema: [
          {
            AttributeName: "email",
            KeyType: "HASH",
          },
          {
            AttributeName: "password",
            KeyType: "RANGE",
          },
        ],
        Projection: {
          ProjectionType: "ALL",
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  },
  {
    TableName: "dev-wishlist",
    AttributeDefinitions: [
      { AttributeName: "id", AttributeType: "N" },
      { AttributeName: "userId", AttributeType: "N" },
      { AttributeName: "productId", AttributeType: "N" },
    ],
    KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
    GlobalSecondaryIndexes: [
      {
        IndexName: "WishlistIdIndex",
        KeySchema: [
          {
            AttributeName: "userId",
            KeyType: "HASH",
          },
          {
            AttributeName: "productId",
            KeyType: "RANGE",
          },
        ],
        Projection: {
          ProjectionType: "ALL",
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  },
  {
    TableName: "dev-products",
    AttributeDefinitions: [
      { AttributeName: "id", AttributeType: "N" },
      { AttributeName: "name", AttributeType: "S" },
      { AttributeName: "price", AttributeType: "N" },
    ],
    KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
    GlobalSecondaryIndexes: [
      {
        IndexName: "ProductIdIndex",
        KeySchema: [
          {
            AttributeName: "name",
            KeyType: "HASH",
          },
          {
            AttributeName: "price",
            KeyType: "RANGE",
          },
        ],
        Projection: {
          ProjectionType: "ALL",
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5,
        },
      },
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5,
    },
  },
];

export const main = async () => {
  const resArray = [];

  for (const table of tables) {
    try {
      const command = new CreateTableCommand(table);
      const response = await client.send(command);
      resArray.push(response);
      console.log(response);
    } catch (error) {
      console.error(`Error creating table ${table.TableName}:`, error);
    }
  }

  return resArray;
};

main();
