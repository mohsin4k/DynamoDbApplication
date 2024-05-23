import express from "express";
import {
  addUserHandler,
  deleteUserByIdHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  loginHandler,
  logoutHandler,
} from "../controllers/userController.js";

let router = express.Router();

//Here all the routes are defined according to them the services are called
router.post("/logout", logoutHandler);
router.post("/login", loginHandler);
router.get("/get-all-users", getAllUsersHandler);
router.post("/signup", addUserHandler);
router.get("/:id", getUserByIdHandler);
router.delete("/delete/:id", deleteUserByIdHandler);

export default router;
