import Joi from 'joi';
import db from "../database/models/index.js";

const billingSchema = Joi.object({
    country: Joi.string().required(),
    street_address: Joi.string().required(),
    town: Joi.string().required(),
    state: Joi.string().required(),
    post_code: Joi.string().required(),
    email: Joi.string().email().required(),
  });


const get_discount = async (cart_item) => {
    let product = await db.Product.findOne({where: {id: cart_item.product_id}});
    const {name, description, price} = product;
    let { quantity } = cart_item;
    if(product.instock < quantity) {
        quantity = product.instock;
    }
    if(cart_item.coupon == "0") {
        product.instock -= quantity;
        await product.save();
        return { name, description, quantity, subtotal: (quantity * price) };
    }
    const { discountPercentage } = await db.DiscountCoupon.findOne({where: {code: cart_item.coupon}});
    const discount = (price * discountPercentage)/100;
    const subtotal = (quantity * (price - discount));
    product.instock -= quantity;
    await product.save();
    return { name, description, quantity, subtotal };
}

export const checkout = async (req, res) => {
    try {
        const user_id = req.user.dataValues.id;
        const { error, value } = billingSchema.validate(req.body);
        if (error) {
            res.status(400).send({ message: error.message });
        }

        const { country, street_address, town, state, post_code, email } = value;

        let billing_info = { country, street_address, town, state, post_code, email };

        const user_cart = await db.Cart_items.findAll({where: {User_id: user_id}});
        let products_info = [];

        for(const item of user_cart) {
            const product_details = await get_discount(item);
            products_info.push(product_details);
        }

        let total = 0;
        products_info.forEach(item => {
            total += item.subtotal;
        })
        const status = "pending";
        const new_order = await db.Order.create({
            user_id,
            products_info,
            total,
            status,
            billing_info,
        })
        res.status(200).send({status:"success", data: { order: new_order}});
    } catch (error) {
        console.log(error);
        res.status(400).send({status: "fail", data: {error}});
    }
}