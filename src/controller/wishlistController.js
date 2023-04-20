// Import necessary dependencies
import db from '../database/models';
// Route to handle the POST request to add an item to the wishlist
export const Wishlist = async (req, res, next) => {
  try {
   
    // Retrieve the product details from the database
    const product = await db.Product.findByPk(req.body.productId);
    // Add the item to the buyer's wishlist
    await db.wishlist.create({
      userId: req.user.id,
      productId: req.body.productId,
    });
    // Retrieve the updated wishlist for the buyer
    const wishlist = await db.wishlist.findAll({
      where: { userId: req.user.id },
      include: [{ model: db.Product, attributes: ['name', 'price', 'image'] }],
    });
    // Update the buyer's record in the users table with the new wishlist data
    await models.User.update(
      { wishlist: wishlist.map((item) => item.Product) },
      { where: { id: req.user.id } },
    );
    // Send a confirmation message to the frontend
    res.status(201).json({
      message: `Product ${product.name} added to wishlist.`,
      wishlist,
    });
  } catch (error) {
    next(error);
  }
};
export default Wishlist;