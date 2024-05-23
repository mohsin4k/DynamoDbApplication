//Utility Functions
import jwt from "jsonwebtoken";

export function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

export const generateToken = (userId, secretKey) => {
  // Create a payload with the user ID
  const payload = { userId };

  // Generate the token
  const token = jwt.sign(payload, secretKey);
  return token;
};

export const getIdFromJwt = (token) => {
  try {
    // Decode the token without verifying (useful if you just want to read the payload)
    const decodedToken = jwt.decode(token);

    // If you need to verify the token, use jwt.verify
    // const decodedToken = jwt.verify(token, secretOrPublicKey);

    // Extract the id from the payload
    const userId = decodedToken.userId;

    console.log("User ID:", userId);
    return userId;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
