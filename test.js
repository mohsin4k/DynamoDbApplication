//This file is to independently test any function or api

import client from "./dbConfig.js";
import {
  GetItemCommand,
  UpdateTableCommand,
  QueryCommand,
  CreateTableCommand,
} from "@aws-sdk/client-dynamodb";
import bcrypt from "bcrypt";

// const queryByEmail = async (email) => {
//   const command = new QueryCommand({
//     TableName: "dev-users",
//     IndexName: "EmailIndex",
//     KeyConditionExpression: "email = :email",
//     ExpressionAttributeValues: {
//       ":email": { S: email },
//     },
//   });

//   try {
//     const response = await client.send(command);
//     console.log("Query result:", response.Items);
//     return response.Items;
//   } catch (error) {
//     console.error("Error querying table:", error);
//   }
// };

// queryByEmail("d@example.com");

// export const getUserByEmail = async (email, password) => {
//   const command = new GetItemCommand({
//     TableName: "dev-users",
//     Key: {
//       email: { S: email },
//       password: { S: password },
//     },
//   });

//   const response = await client.send(command);
//   return response;
// };

// console.log(await getUserByEmail("d1@example.com", "123456"));

// const addGSI = async () => {
//   const command = new UpdateTableCommand({
//     TableName: "dev-users",
//     AttributeDefinitions: [{ AttributeName: "email", AttributeType: "S" }],
//     GlobalSecondaryIndexUpdates: [
//       {
//         Create: {
//           IndexName: "EmailIndex",
//           KeySchema: [{ AttributeName: "email", KeyType: "HASH" }],
//           Projection: {
//             ProjectionType: "ALL", // Include all attributes in the query result
//           },
//           ProvisionedThroughput: {
//             ReadCapacityUnits: 5,
//             WriteCapacityUnits: 5,
//           },
//         },
//       },
//     ],
//   });
//   try {
//     const response = await client.send(command);
//     console.log("GSI added:", response);
//   } catch (error) {
//     console.error("Error adding GSI:", error);
//   }
// };

// addGSI();

// const createTable = async () => {
//   // Define the table schema
//   const command = new CreateTableCommand({
//     TableName: "dev-user-token",
//     AttributeDefinitions: [{ AttributeName: "id", AttributeType: "N" }],
//     KeySchema: [
//       { AttributeName: "id", KeyType: "HASH" }, // Partition key
//     ],
//     ProvisionedThroughput: {
//       ReadCapacityUnits: 5,
//       WriteCapacityUnits: 5,
//     },
//   });

//   try {
//     // Send the command to create the table
//     const response = await client.send(command);
//     console.log("Table created successfully:", response);
//   } catch (error) {
//     console.error("Error creating table:", error);
//   }
// };

// createTable();

// export const getTokenUserById = async (id) => {
//   const command = new GetItemCommand({
//     TableName: "dev-user-token",
//     Key: {
//       id: { N: id },
//     },
//   });

//   const response = await client.send(command);
//   return response.Item;
// };

// console.log(await getTokenUserById(1));

const fetchWishlistItemsByUserId = async (userId) => {
  const params = {
    TableName: "dev-wishlist",
    IndexName: "WishlistIdIndex",
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": { N: userId }, // Convert userId to Number type
    },
  };

  try {
    const command = new QueryCommand(params);
    const response = await client.send(command);
    console.log("Wishlist items for user ID:", userId, response.Items);
    return response.Items;
  } catch (error) {
    console.error("Error fetching wishlist items:", error);
    throw error; // Optionally handle or rethrow the error
  }
};

fetchWishlistItemsByUserId(746);
