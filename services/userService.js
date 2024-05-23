import client from "../dbConfig.js";
import {
  PutItemCommand,
  GetItemCommand,
  DeleteItemCommand,
} from "@aws-sdk/client-dynamodb";
import { generateRandomNumber } from "../utility.js";

//This is to be fetch all user data
export const fetchAllUsersData = async () => {
  let items = [];
  let ExclusiveStartKey = null;

  do {
    const params = {
      TableName: "dev-users",
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
export const addUser = async (userObject) => {
  const command = new PutItemCommand({
    TableName: "dev-users",
    Item: {
      id: { N: generateRandomNumber(1, 1000) },
      name: { S: userObject.name },
      email: { S: userObject.email },
      password: { S: userObject.password },
    },
  });

  const response = await client.send(command);
  return response;
};

//Service logic for getting a user by Id
export const getUser = async (id) => {
  const command = new GetItemCommand({
    TableName: "dev-users",
    Key: {
      id: { N: id },
    },
  });

  const response = await client.send(command);
  return response;
};

//Function which helps in deleting the user by Id
export const deleteUser = async (id) => {
  const command = new DeleteItemCommand({
    TableName: "dev-users",
    Key: {
      id: { N: id },
    },
  });

  const response = await client.send(command);
  return response;
};
