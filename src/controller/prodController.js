import jsend from 'jsend';
import db from '../database/models/index.js';

async function registration(req, res) {
  // A seller should be able to Create/Add a product

  try {
    // receive body & Validate user input
    const {
      name, description, price, Instock, available, vendorid,
    } = req.body;
    if (
      !name
      || !description
      || !price
      || !Instock
      || !available
      || !vendorid
    ) {
      return res.status(400).send('Invalid input');
    }

    // verify the user is a seller
    const isSeller = await db.User.findOne({
      where: {
        id: vendorid,
        roleId: 1,
      },
    });
    if (!isSeller) {
      return res
        .status(401)
        .json(jsend.fail({ message: 'Invalid User😥', id: vendorid }));
    }
    // verify the product is not sold by the seller
    const productExists = await db.Product.findOne({
      where: {
        vendor_id: vendorid,
        name,
      },
    });
    if (productExists) {
      return res
        .status(409)
        .json(
          jsend.fail({
            message: 'Seller already sells this product😥',
            product: name,
          }),
        );
    }

    // save product
    const product = await db.Product.create({
      name,
      description,
      price,
      Instock,
      available,
      vendor_id: vendorid,
    });

    // send response
    return res.status(200).json(
      jsend.success({
        message: 'Product added to collection.',
        id: product.id,
      }),
    );
  } catch (error) {
    // Handle database errors
    console.error(error);
    res.json(jsend.error('Failed to save product'));
  }
  // Default return statement
  return undefined;
}

async function showcase(req, res) {
  // A seller should be able to create & viewing a list of available product in my collection

  try {
    // Retrieve available products
    const products = await db.Product.findAll({ where: { available: true } });

    // Send response
    res.json(jsend.success({ products }));
  } catch (err) {
    // Handle database errors
    console.error(err);
    res.json(jsend.error('Failed to retrieve products'));
  }
  // Default return statement
  return undefined;
}

export { registration, showcase };
