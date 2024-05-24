import express from "express";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import productRoute from "./routes/productRoute.js";
import cors from "cors";

dotenv.config();
const app = express();

//This middleware is for enabling cross origin security
app.use(
  cors({
    credentials: true,
    origin: "*", //this enables every url to access the end-point
  })
);

const PORT = process.env.PORT || 3000;

//this middleware to make json understand to node
app.use(express.json());

//A testing api
app.get("/", (req, res) => {
  res.status(200).json({ result: "Hello you are in my app" });
});

//Here I am defining the routes

app.use("/users", userRoute);
app.use("/products", productRoute);

//express way of setting up http server
app.listen(PORT, () => {
  console.log(`server running on port: ${PORT}`);
});
