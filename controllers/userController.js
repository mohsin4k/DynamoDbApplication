import { loginCognito, signup, verifyCode } from "../repository/Cognito.js";
import {
  getUser,
  addUser,
  deleteUser,
  fetchAllUsersData,
  login,
  logout,
  addItemToWishlist,
  getWishlist,
  deleteItemFromWishlist,
} from "../services/userService.js";
import { getIdFromJwt } from "../utility.js";

//This is a logout handler
export const logoutHandler = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader.substring(7);

    const userId = getIdFromJwt(token);

    const response = await logout(userId);

    res.status(200).json(response);
  } catch (err) {
    console.log("Error Occured", err);
  }
};

//Logining the user with jwt
export const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await login(email, password);
    res.status(200).json(response);
  } catch (err) {
    console.log("Error Occured", err);
  }
};

//Handler to get all user
export const getAllUsersHandler = async (req, res) => {
  try {
    let result = await fetchAllUsersData();
    res.status(200).json(result);
  } catch (err) {
    console.log("Error Occured", err);
  }
};

//This Handler helps in handling request for adding user in db
// export const addUserHandler = async (req, res) => {
//   try {
//     const userObject = req.body;
//     let result = await addUser(userObject);
//     res.status(200).json(result);
//   } catch (err) {
//     console.log("Error Occured", err);
//   }
// };

//This particular handler redirects the request to cognito service, below three Handlers are for Cognito service
export const addUserHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // let result = await addUser(userObject);
    let result = await signup(name, email, password);
    res.status(200).json(result);
  } catch (err) {
    console.log("Error Occured", err);
  }
};

export const verifyUser = async (req, res) => {
  const { email, code } = req.body;
  let result = await verifyCode(email, code);
  res.status(200).json(result);
};

export const loginCognitoHandler = async (req, res) => {
  const { email, password } = req.body;
  let result = await loginCognito(email, password);
  res.status(200).json(result);
};

// -------------> Cognito Handlers End Here ----------------------------<

//This Handler halps in getting user by Id if Id is present in quere params
export const getUserByIdHandler = async (req, res) => {
  try {
    const id = +req.params.id;
    let result = await getUser(id);
    res.status(200).json(result);
  } catch (err) {
    console.log("Error Occured", err);
  }
};

//This Handler helps in deleting the user by Id
export const deleteUserByIdHandler = async (req, res) => {
  try {
    const id = +req.params.id;
    let result = await deleteUser(id);
    res.status(200).json(result);
  } catch (err) {
    console.log("Error Occured", err);
  }
};

//This Handler helps in getting the wishlist of the user which is logged in right now
export const getWishlistHandler = async (req, res) => {
  try {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
      res.status(404).json({ result: "Not Authorized" });
      return;
    }
    const token = authHeader.substring(7);

    const userId = getIdFromJwt(token);

    const result = await getWishlist(userId);

    res.status(200).json(result);
  } catch (err) {
    console.log("Error Occured", err);
  }
};

//This Handler helps in adding an item to wishlist by the user
export const addWishlistHandler = async (req, res) => {
  try {
    const { productId } = req.body;
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      res.status(404).json({ result: "Not Authorized" }); //if user is not logged in it is not authorized
      return;
    }
    const token = authHeader.substring(7);

    const userId = getIdFromJwt(token);

    const result = await addItemToWishlist(productId, userId);

    res.status(200).json(result);
  } catch (err) {
    console.log("Error Occured", err);
  }
};

//This Handler is to delete Items form wishlist
export const deleteWishlistHandler = async (req, res) => {
  try {
    const id = +req.params.id;
    let result = await deleteItemFromWishlist(id);
    res.status(200).json(result);
  } catch (err) {
    console.log("error occored", err);
  }
};
