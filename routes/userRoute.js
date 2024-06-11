import express from "express";
import {
  addUserHandler,
  addWishlistHandler,
  deleteUserByIdHandler,
  deleteWishlistHandler,
  getAllUsersHandler,
  getUserByIdHandler,
  getWishlistHandler,
  loginCognitoHandler,
  loginHandler,
  logoutHandler,
  verifyUser,
} from "../controllers/userController.js";

let router = express.Router();

//Here all the routes are defined according to them the services are called

// AUTHENTICATION API
router.post("/logout", logoutHandler);
router.post("/login", loginHandler);
router.post("/signup", addUserHandler);

// AUTHENTICATION USING COGNITO
router.post("/verify", verifyUser);
router.post("/cog-service/login", loginCognitoHandler);
// USERS API
router.get("/:id", getUserByIdHandler);
router.delete("/delete/:id", deleteUserByIdHandler);
router.get("/get-all-users", getAllUsersHandler);

// WISHLIST API
router.get("/get/wish-list", getWishlistHandler);
router.post("/add-wishlist", addWishlistHandler);
router.delete("/delete-wishlist/:id", deleteWishlistHandler);

export default router;
