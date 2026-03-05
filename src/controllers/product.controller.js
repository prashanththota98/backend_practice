import { createProduct } from "../services/product.service.js";

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

// import { createProduct } from "../services/product.service.js";

// export const addNewProduct = async (req, res) => {
//   try {
//     const productData = req.body;
//     const newProduct = await createProduct(productData);
//     res.status(201).json({
//       success: true,
//       message: "Product created successfully",
//       data: newProduct,
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };
