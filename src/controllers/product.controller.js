import {
  createProduct,
  deleteProductById,
  getProductById,
  updateProductById,
} from "../services/product.service.js";

export const addNewProduct = async (req, res, next) => {
  try {
    const {
      name,
      description,
      category,
      price,
      image_url,
      stock_quantity,
      features,
    } = req.body;
    const user_id = req.user.id;

    if (!name || !price) {
      return res.status(400).json({
        success: false,
        message: "Name and price are required",
      });
    }

    const newProduct = await createProduct({
      name,
      description,
      category,
      price,
      image_url,
      stock_quantity,
      features,
      user_id,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (error) {
    next(error);
  }
};

export const getProductByIdController = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await getProductById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const product = await getProductById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.user_id !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Forbidden: You do not own this product" });
    }

    const deletedProduct = await deleteProductById(productId);
    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      data: deletedProduct,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.id;
    const updatedData = req.body;

    const product = await getProductById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.user_id !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Forbidden: You do not own this product" });
    }

    const updatedProduct = await updateProductById(productId, updatedData);
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
