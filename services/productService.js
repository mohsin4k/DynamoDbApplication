import client from "../dbConfig.js";
import {
  PutItemCommand,
  GetItemCommand,
  DeleteItemCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
import { generateRandomNumber } from "../utility.js";

//This method helps in fetching all the product data from dev-products table
export const fetchAllProductData = async () => {
  let items = [];
  let ExclusiveStartKey = null;

  do {
    const params = {
      TableName: "dev-products",
      ExclusiveStartKey,
    };

    try {
      const command = new ScanCommand(params);
      const response = await client.send(command);

      if (response.Items) {
        items = items.concat(response.Items);
      }

      ExclusiveStartKey = response.LastEvaluatedKey;
    } catch (error) {
      console.error("Error scanning table:", error);
      break;
    }
  } while (ExclusiveStartKey);

  return items;
};

//this function helps in adding user to users table
export const addProduct = async (prodObj) => {
  try {
    const command = new PutItemCommand({
      TableName: "dev-products",
      Item: {
        id: { N: generateRandomNumber(1, 1000) },
        name: { S: prodObj.name },
        price: { N: prodObj.price },
      },
    });

    const response = await client.send(command);
    return response;
  } catch (err) {
    console.log("Error Occured", err);
  }
};

//Service logic for getting a user by Id
export const getProduct = async (id) => {
  try {
    const command = new GetItemCommand({
      TableName: "dev-products",
      Key: {
        id: { N: id },
      },
    });

    const response = await client.send(command);
    return response;
  } catch (err) {
    console.log("Error Occured", err);
  }
};

//Function which helps in deleting the user by Id
export const deleteProduct = async (id) => {
  try {
    const command = new DeleteItemCommand({
      TableName: "dev-products",
      Key: {
        id: { N: id },
      },
    });

    const response = await client.send(command);
    return response;
  } catch (err) {
    console.log("Error Occured", err);
  }
};
