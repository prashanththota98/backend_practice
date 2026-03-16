import {
  addToCart,
  checkProductStock,
  deleteCartItem,
  getCartItems,
} from "../services/cart.service.js";

export const addToCartController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    await checkProductStock(productId, quantity);
    const cartItem = await addToCart(userId, productId, quantity);
    res.status(200).json({ cartItem });
  } catch (err) {
    next(err);
  }
};

export const getCartItemsController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const cartItems = await getCartItems(userId);
    const formattedCart = cartItems.map((item) => ({
      cartId: item.cart_id,
      productId: item.product_id,
      name: item.name,
      price: item.price,
      imageUrl: item.image_url,
      quantity: item.quantity,
      subtotal: parseFloat(item.price * item.quantity).toFixed(2),
    }));
    res.status(200).json({ cart: formattedCart });
  } catch (error) {
    next(error);
  }
};

export const deleteCartItemController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const productId = parseInt(req.params.id);
    const deletedItem = await deleteCartItem(userId, productId);
    if (!deletedItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    res
      .status(200)
      .json({ message: "Cart item deleted successfully", deletedItem });
  } catch (error) {
    next(error);
  }
};
