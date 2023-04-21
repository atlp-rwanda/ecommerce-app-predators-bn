import db from '../database/models/index.js';
import Joi from 'joi';
// getting all products

export const getAllProducts = async (req, res) => {
  try {
    const products = await db.Product.findAll({
      include: [],
    });

    if (!products) {
      return res.status(404).json({
        status: 'fail',
        code: 404,
        data: { products },
        message: 'No product found',
      });
    }
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: { products },
      message: 'Products retreived successfully',
    });
  } catch (error) {
    return res.status(500).json({
      status: 'server error',
      code: 500,
      data: { message: 'Server error!!' },
    });
  }
};

// Getting Product by Id

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await db.Product.findOne({
      where: { id },
    });

    if (!product) {
      return res.status(404).json({
        status: 'fail',
        code: 404,
        data: { product },
        message: 'There is no item found',
      });
    }

    return res.status(200).json({
      status: 'success',
      code: 200,
      data: { product },
      message: 'Product retrieved Successfully',
    });
  } catch (err) {
    return res.status(500).json({
      status: 'server error',
      code: 500,
      data:
       { message: 'Server error . Try again later' },
    });
  }
};
export const updateProduct = async (req, res) => {
  const { itemId } = req.params;
  const inputData = req.body;
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().positive().required(),
    expiryDate: Joi.date().iso().required(),
    images: Joi.array().items(Joi.string()),
    quantity: Joi.number().integer().positive().required(),
  });
  const { error } = schema.validate(inputData);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const item = await db.Product.findOne({ where: { id: itemId, vendor_id: req.user.id } });
  if (!item) return res.status(404).json({ error: 'Item not found in seller\'s collection' });

  Object.assign(item, inputData);
  await item.save();

  const { id, name, description, price, images, quantity, expiryDate } = item;
  return res.json({
    status: 200,
    message: 'Item updated successfully',
    item: { id, name, description, price, images, quantity, expiryDate },
  });
};

export const deleteSpecificProduct = async (req, res) =>{
  try {
      // Validate input data
      const {reason} = req.body;
      const productId = parseInt(req.params.id);
      if (isNaN(productId) || typeof reason !== "string" || reason.trim() === "") {
          return res.status(400).json({
              status: "fail",
              data: { message: "Invalid input data" }
          });
      }

      const isAvailable = await db.Product.findOne({ where: { id: itemId, vendor_id: req.user.id } });
      if(!isAvailable){
          // If the product is not found in the collection, return a JSend fail response with an appropriate message
          return res.status(401).json({
              status: "fail",
              data: { message: "Can not find such product in your collection" }
          });
      }
      else {
          // If the product is found, delete it and return a JSend success response with a message indicating the reason for deletion
          await isAvailable.destroy();
          return res.status(200).json({
              status: "success",
              data: { message: `This product has been removed because of the following reason: ${reason}.` }
          });
      }
  } catch (error) {
      // If there's any error, return a JSend error response with an appropriate message
      console.error(error);
      return res.status(500).json({
          status: "error",
          data: { message: "Oops, something went wrong on the server side. Please try again later."}
      });
  }
}


export default { getAllProducts, getProductById, updateProduct, deleteSpecificProduct };
