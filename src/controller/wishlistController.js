// Import necessary dependencies
import db from '../database/models/index.js';
// Route to handle the POST request to add an item to the wishlist
export const Wishlist = async (req, res) => {
  try {
   
    // Retrieve the product details from the database
    const product = await db.Product.findByPk(req.body.productId);

    const duplicate = await db.wishlist.findOne({ where: {
      userId: req.user.id,
      productId: req.body.productId
    }})
    if(duplicate) {
      throw Error(`${product.Name} is already in wishlist.`)
    }
    // Add the item to the buyer's wishlist
    await db.wishlist.create({
      userId: req.user.id,
      productId: req.body.productId,
    });
    // Retrieve the updated wishlist for the buyer
    const wishlist = await db.wishlist.findAll({
      where: { userId: req.user.id },
      include: [{ model: db.Product, attributes: ['Name', 'price', "picture_urls"] }],
    });
    // Update the buyer's record in the users table with the new wishlist data
    await db.User.update(
      { wishlist: wishlist.map((item) => item.Product) },
      { where: { id: req.user.id } },
    );
    // Send a confirmation message to the frontend
    res.status(201).json({
      message: `Product ${product.Name} added to wishlist.`,
      wishlist,
    });
  } catch (error) {
    res.status(400).send({status: "fail", message: "Encountered Error", data: { error: error.message}})
  }
};
export default Wishlist;