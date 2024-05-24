//Utility Functions
import jwt from "jsonwebtoken";

//Function to generate random id's
export function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//Function to generate jwt token
export const generateToken = (userId, secretKey) => {
  // Create a payload with the user ID
  const payload = { userId };

  // Generate the token
  const token = jwt.sign(payload, secretKey);
  return token;
};

//Function to get the userId from the payload of the token
export const getIdFromJwt = (token) => {
  try {
    // Decode the token without verifying (useful if you just want to read the payload)
    const decodedToken = jwt.decode(token);

    // Extract the id from the payload
    const userId = decodedToken.userId;

    return userId;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
