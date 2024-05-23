import express from "express";
import {
  addUserHandler,
  deleteUserByIdHandler,
  getAllUsersHandler,
  getUserByIdHandler,
} from "../controllers/userController.js";

let router = express.Router();
router.get("/get-all-users", getAllUsersHandler);
router.post("/add-user", addUserHandler);
router.get("/:id", getUserByIdHandler);
router.delete("/delete/:id", deleteUserByIdHandler);

export default router;
