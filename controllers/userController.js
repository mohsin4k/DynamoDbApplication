import {
  getUser,
  addUser,
  deleteUser,
  fetchAllUsersData,
} from "../services/userService.js";

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
