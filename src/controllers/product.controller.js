import {
  createProduct,
  deleteProductById,
  getAllProducts,
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

    if (isNaN(price) || Number(price) <= 0) {
      return res
        .status(400)
        .json({ message: "Price must be a positive number" });
    }

    if (
      stock_quantity &&
      (!Number.isInteger(stock_quantity) || stock_quantity < 0)
    ) {
      return res
        .status(400)
        .json({ message: "Stock must be a non-negative integer" });
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
    if (product.user_id !== Number(req.user.id)) {
      return res
        .status(403)
        .json({ message: "Forbidden: You do not own this product" });
    }

    const deletedProduct = await deleteProductById(productId);
    res.status(200).json({
      success: true,
      message: "Product marked as inactive successfully",
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

    if (product.user_id !== Number(req.user.id)) {
      return res
        .status(403)
        .json({ message: "Forbidden: You do not own this product" });
    }

    const allowedFields = [
      "name",
      "description",
      "category",
      "price",
      "image_url",
      "stock_quantity",
      "features",
    ];

    const sanitizedData = {};
    for (let key in updatedData) {
      if (allowedFields.includes(key)) sanitizedData[key] = updatedData[key];
    }
    if (sanitizedData.price !== undefined) {
      if (isNaN(sanitizedData.price) || Number(sanitizedData.price) <= 0) {
        return res
          .status(400)
          .json({ success: false, message: "Price must be a positive number" });
      }
    }

    if (sanitizedData.stock_quantity !== undefined) {
      if (
        !Number.isInteger(sanitizedData.stock_quantity) ||
        sanitizedData.stock_quantity < 0
      ) {
        return res.status(400).json({
          success: false,
          message: "Stock must be a non-negative integer",
        });
      }
    }
    delete sanitizedData.user_id;

    const updatedProduct = await updateProductById(productId, sanitizedData);
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const allProducts = async (req, res, next) => {
  try {
    const products = await getAllProducts();
    if (!products.length) {
      return res.status(404).json({ message: "No Products Found" });
    }
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    next(error);
  }
};
