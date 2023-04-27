/* eslint-disable camelcase */
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import db from '../database/models/index.js';

// import all the ROLES from './index.js' file. 描述如何从文件中;
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
    console.log(error);
    return res.status(500).json({
      status: 'server error',
      code: 500,
      data: { message: 'Server error!!' },
    });
  }
};

// Getting Product by Id
export const getProductById = async (req, res) => {
  try {
    const { itemId } = req.params;

    // Validate token and check user role
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        status: 'fail',
        code: 401,
        data: { error: 'You have to be loggen in to perform an action' },
      });
    }

    const token = authHeader.split(' ')[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        status: 'fail',
        code: 401,
        data: { error: 'You have to be loggen in to perform an action' },
      });
    }
    const isSeller = decoded.roleId === 1;

    // Check if item exists and retrieve details
    const item = await db.Product.findOne({ where: { id: itemId } });

    if (!item) {
      return res.status(404).json({
        status: 'fail',
        code: 404,
        data: {
          error: 'Item not found',
        },
      });
    }

    // Handle seller scenario
    if (isSeller) {
      if (item.vendor_id !== decoded.roleId) {
        return res.status(403).json({
          status: 'fail',
          code: 403,
          data: {
            error: 'Sorry, you do not have access to this item as you are not the owner of this item',
          },
        });
      }

      return res.status(200).json({
        status: 'success',
        code: 200,
        data: {
          message: 'Item retrieved successfully', item,
        },

      });
    }

    // Handle buyer scenario
    if (item.available) {
      return res.status(200).json({
        status: 'success',
        code: 200,
        data: { item },
        message: 'Item retrieved successfully',
      });
    }
    return res.status(404).json({
      status: 'fail',
      code: 404,
      error: 'Item not found',
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({
      status: 'server error',
      code: 500,
      error: 'Server error, try again later',
    });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'id is required' });
  }
  const inputData = req.body;
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().positive().required(),
    expiryDate: Joi.date().iso().required(),
    picture_urls: Joi.array().items(Joi.string()),
    instock: Joi.number().integer().positive().required(),
    available: Joi.string().valid('yes', 'no').required(),
  });
  const { error } = schema.validate(inputData);
  if (error) return res.status(400).json({ error: error.details[0].message });
  const item = await db.Product.findOne({
    where: { id, vendor_id: req.user.id },
  });

  if (!item) {
    return res
      .status(404)
      .json({ error: "Item not found in seller's collection" });
  }

  Object.assign(item, inputData);
  await item.save();

  const {
    name,
    description,
    price,
    picture_urls,
    Instock,
    available,
    expiryDate,
  } = item;
  return res.json({
    status: 200,
    message: 'Item updated successfully',
    item: {
      id,
      name,
      description,
      price,
      picture_urls,
      Instock,
      available,
      expiryDate,
    },
  });
};
export default { getAllProducts, getProductById, updateProduct };
