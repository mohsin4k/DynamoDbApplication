import client from "../repository/dbConfig.js";
import dotenv from "dotenv";
import {
  PutItemCommand,
  GetItemCommand,
  DeleteItemCommand,
  QueryCommand,
} from "@aws-sdk/client-dynamodb";
import { generateRandomNumber, generateToken } from "../utility.js";
import bcrypt from "bcrypt";
import { getProduct } from "./productService.js";

dotenv.config();

//Service to log out the user
export const logout = async (id) => {
  const command = new DeleteItemCommand({
    TableName: "dev-user-token",
    Key: {
      id: { N: id },
    },
  });

  try {
    const response = await client.send(command);
    return response;
  } catch (error) {
    console.error("Error deleting token:", error);
  }
};

//Service to login the user with the help of jwt token
export const login = async (email, password) => {
  let user = await getUserByEmail(email);

  if (!user) {
    return { result: "User not found!" };
  }

  const matched = await bcrypt.compare(password, user[0].password.S);

  if (!matched) {
    return { result: "Incorrect Password!" };
  }

  const jwt_sec_key = process.env.JWT_SECRET_KEY;

  const token = generateToken(user[0].id.N, jwt_sec_key);

  const alreadyLoggedInUser = await getTokenUserById(user[0].id.N);

  if (!alreadyLoggedInUser) {
    const addToken = await addLoginUserToken(user[0].id.N, token);
  }

  const retToken = alreadyLoggedInUser ? alreadyLoggedInUser.token.S : token;

  return { token: retToken };
};

//This method helps in adding token to table so that it can be verified doing further operations
const addLoginUserToken = async (id, token) => {
  try {
    const command = new PutItemCommand({
      TableName: "dev-user-token",
      Item: {
        id: { N: id },
        token: { S: token },
      },
    });

    const response = await client.send(command);
    return response;
  } catch (err) {
    console.error("Error adding user:", err);
  }
};

//This is to get user from token table to see if user exist or not
export const getTokenUserById = async (id) => {
  const command = new GetItemCommand({
    TableName: "dev-user-token",
    Key: {
      id: { N: id },
    },
  });

  const response = await client.send(command);
  return response.Item;
};

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
  const saltRounds = +process.env.SALT_ROUNDS;

  const hashedPassword = await bcrypt.hash(userObject.password, saltRounds);

  const command = new PutItemCommand({
    TableName: "dev-users",
    Item: {
      id: { N: generateRandomNumber(1, 1000) },
      name: { S: userObject.name },
      email: { S: userObject.email },
      password: { S: hashedPassword },
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

//This method helps in getting the user by email
const getUserByEmail = async (email) => {
  const command = new QueryCommand({
    TableName: "dev-users",
    IndexName: "EmailIndex",
    KeyConditionExpression: "email = :email",
    ExpressionAttributeValues: {
      ":email": { S: email },
    },
  });

  try {
    const response = await client.send(command);
    return response.Items;
  } catch (error) {
    console.error("Error querying table:", error);
  }
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

//Service for getting all the items in wishlist for a particular user
export const getWishlist = async (userId) => {
  const token = await getTokenUserById(userId);

  if (!token) {
    return { result: "Not Authorized" };
  }

  const wishList = await fetchWishlistItemsByUserId(userId);
  const allProducts = [];

  //fetching all the product according to product ID
  for (let i = 0; i < wishList.length; i++) {
    const item = wishList[i];
    let pId = item?.productId?.N;
    let product = await getProduct(pId);
    let prodObj = { ...product.Item, wishlistId: item?.id?.N };
    // allProducts.push(product.Item);
    allProducts.push(prodObj);
  }

  return allProducts;
};

//Function to query all the items in wishlist with a particular user Id
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
    return response.Items;
  } catch (error) {
    console.error("Error fetching wishlist items:", error);
    throw error; // Optionally handle or rethrow the error
  }
};

//As the name suggest this service helps in adding an item to wishlist
export const addItemToWishlist = async (productId, userId) => {
  const id = generateRandomNumber(1, 1000);
  const command = new PutItemCommand({
    TableName: "dev-wishlist",
    Item: {
      id: { N: id },
      userId: { N: userId },
      productId: { N: productId },
    },
  });

  const response = await client.send(command);
  return response;
};

export const deleteItemFromWishlist = async (id) => {
  const command = new DeleteItemCommand({
    TableName: "dev-wishlist",
    Key: {
      id: { N: id },
    },
  });

  const response = await client.send(command);
  return response;
};
