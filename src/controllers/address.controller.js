import {
  addAddress,
  deleteAddressById,
  getAddressSingle,
  getAllAddress,
  updateAddressbyId,
} from "../services/address.service.js";

export const createNewAddress = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const addressData = req.body;
    const { street, city, state, postal_code, country, address_type } =
      addressData;
    if (
      !street ||
      !city ||
      !state ||
      !postal_code ||
      !country ||
      !address_type
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const addnewAddress = await addAddress(userId, {
      street,
      city,
      state,
      postal_code,
      country,
      address_type,
    });
    res
      .status(201)
      .json({ message: "Address added successfully", data: addnewAddress });
  } catch (error) {
    next(error);
  }
};

export const getAllAddressController = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const addresses = await getAllAddress(userId);
    res
      .status(200)
      .json({ message: "Addresses fetched successfully", data: addresses });
  } catch (error) {
    next(error);
  }
};

export const getOneAddress = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const addressId = parseInt(req.params.id);
    const address = await getAddressSingle(userId, addressId);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    res
      .status(200)
      .json({ message: "Address fetched successfully", data: address });
  } catch (error) {
    next(error);
  }
};

export const deleteAddress = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const addressId = parseInt(req.params.id);
    const address = await getAddressSingle(userId, addressId);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    const deletedAddress = await deleteAddressById(userId, addressId);
    res
      .status(200)
      .json({ message: "Address deleted successfully", data: deletedAddress });
  } catch (error) {
    next(error);
  }
};

export const updateAddress = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const addressId = parseInt(req.params.id);
    const updateData = req.body;
    if (!updateData || Object.keys(updateData).length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "No fields provided to update" });
    }
    const updatedAddress = await updateAddressbyId(
      userId,
      addressId,
      updateData,
    );
    if (!updatedAddress) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }
    res.status(200).json({ success: true, data: updatedAddress });
  } catch (error) {
    next(error);
  }
};
