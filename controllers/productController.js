import {
  addProduct,
  deleteProduct,
  fetchAllProductData,
  getProduct,
} from "../services/productService.js";

//This handler helps in getting all the produch from table
export const getAllProductsHandler = async (req, res) => {
  try {
    let result = await fetchAllProductData();
    res.status(200).json(result);
  } catch (err) {
    console.log("Error Occured", err);
  }
};

//This Handler helps in handling request for adding user in db
export const addProductHandler = async (req, res) => {
  try {
    const prodObj = req.body;
    let result = await addProduct(prodObj);
    res.status(200).json(result);
  } catch (err) {
    console.log("Error Occured", err);
  }
};

//This Handler halps in getting user by Id if Id is present in quere params
export const getProductByIdHandler = async (req, res) => {
  try {
    const id = +req.params.id;
    let result = await getProduct(id);
    res.status(200).json(result);
  } catch (err) {
    console.log("Error Occured", err);
  }
};

//This Handler helps in deleting the user by Id
export const deleteProductByIdHandler = async (req, res) => {
  try {
    const id = +req.params.id;
    let result = await deleteProduct(id);
    res.status(200).json(result);
  } catch (err) {
    console.log("Error Occured", err);
  }
};
