import { createOrder } from "../services/order.service.js";

export const placeOrderFromCart = async (req, res, next) => {
  const userId = req.user.id;
  const { addressId } = req.body;

  try {
    const order = await createOrder(userId, addressId);

    if (order.error) {
      return res.status(400).json({ message: order.error });
    }

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    next(error);
  }
};
