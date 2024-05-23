import express from "express";
import dotenv from "dotenv";
import { addProduct } from "./services/productService.js";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});

//A testing api
app.get("/", (req, res) => {
  res.status(200).json({ result: "Hello you are in my app" });
});

//Here I am defining the routes

app.use("/users", userRoute);
app.use("/products", productRoute);
