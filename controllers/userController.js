import {
  getUser,
  addUser,
  deleteUser,
  fetchAllUsersData,
  login,
  logout,
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
export const addUserHandler = async (req, res) => {
  try {
    const userObject = req.body;
    let result = await addUser(userObject);
    res.status(200).json(result);
  } catch (err) {
    console.log("Error Occured", err);
  }
};

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
