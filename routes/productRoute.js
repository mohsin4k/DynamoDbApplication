import express from "express";
import {
  addProductHandler,
  deleteProductByIdHandler,
  getAllProductsHandler,
  getProductByIdHandler,
} from "../controllers/productController.js";

let router = express.Router();

router.get("/get-all-products", getAllProductsHandler);
router.post("/add-product", addProductHandler);
router.get("/:id", getProductByIdHandler);
router.delete("/delete/:id", deleteProductByIdHandler);

export default router;
