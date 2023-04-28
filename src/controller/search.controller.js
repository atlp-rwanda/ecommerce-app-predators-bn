import { Op } from "sequelize";
import models from "../database/models";
export const searchProducts = async (req, res, next) => {
  try {
    const { name, category, description, price, keyword, page = 1, limit = 10 } = req.query;
    let query = {};
    // Search by keyword or phrase
    if (keyword) {
      query = {
        [Op.or]: [
          { name: { [Op.iLike]: `%${keyword}%` } },
          { description: { [Op.iLike]: `%${keyword}%` } },
        ],
      };
    }
    // Search by name
    if (name) {
      query["$Product.Name$"] = { [Op.like]: name };
    }
    // search by  description
    if(description){
      query["$Product.description$"] = {[Op.like]: description};
    }
    // Search by category
    if (category) {
      query["$Category.name$"] = { [Op.eq]: category };
    }
    // Search by price
    if (price) {
      query.price = { [Op.eq]: price };
    }
    const offset = (page - 1) * limit;
    const products = await models.Product.findAndCountAll({
      where: query,
      limit,
      offset,
    });
    if (products.count <= 0) {
      res.status(404).json({
        status: "fail",
        message: ":no_entry_sign: Oops...no product found at the moment.",
      });
    } else {
      res.status(200).json({
        status: "success",
        message: `:rocket:${products.count} Products Found Successfully.:rocket:`,
        data: products.rows.map((product) => ({
          id: product.id,
          name: product.name,
          category_id:product.category_id,
          price: product.price,
          picture_urls: product.picture_urls,
          description: product.description,
        })),
        pagination: {
          page,
          totalPages: Math.ceil(products.count / limit),
        },
        user: req.user, // Add the user object to the response
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "fail", message: error.message });
  }
};
export default searchProducts;