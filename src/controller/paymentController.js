/* eslint-disable camelcase */
import Stripe from 'stripe';
import jsend from 'jsend';
import db from '../database/models/index.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); // Initialize stripe with SECRET_KEY

async function getOrderItems(id) {
  /**
   * get the order items inside products_info
   * using the user's id.
   */

  try {
    const order = await db.Order.findOne({ where: { user_id: id } });
    if (!order || !order.products_info) {
      return null; // Return null if order is null.
    }
    return order.products_info;
  } catch (error) {
    console.log(error); // If error, return the error.
    return null; // Return null.
  }
}

export const makePayment = async (req, res) => {
  try {
    const { id } = req.user; // Get the buyer id
    const order = await getOrderItems(id); // get the order contents using the id
    console.log(order);
    if (!order) {
      return res.status(400).send({ error: 'User has no pending orders' });
    }

    // Create a new checkout session using the `session.create` method.
    const session = await stripe.checkout.sessions.create({
      line_items: order.map((product) => {
        const unit_price = product.subtotal / product.quantity; // Calculate the price per unit.
        console.log(unit_price);
        return {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.name,
              description: product.description,
            },
            unit_amount: unit_price * 100,
          },
          quantity: product.quantity,
        };
      }),
      mode: 'payment',
      success_url: `${process.env.DOMAIN_URL}/api/pay/success/?id=${id}`,
      cancel_url: `${process.env.DOMAIN_URL}/api/pay/cancel`,
    });
    // redirect to the STRIPE checkout page
    return res.status(200).json(jsend.success({ url: session.url }));
  } catch (error) {
    console.error(error);
    return res.status(500).json(jsend.error('Failed to make payment'));
  }
};

export const confirmPayment = async (req, res) => {
  try {
    // update order status
    const user_id = req.query.id;
    await db.Order.update({ status: 'complete' }, { where: { user_id } });

    // send confirmation to the frontend
    res.status(200).json(jsend.success({ message: 'Payment completed' }));
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json(jsend.error('Failed to update order & send confirmation'));
  }
};

export const cancelPayment = async (req, res) => {
  res.status(200).json(jsend.error(' Payment Cancelled'));
};
