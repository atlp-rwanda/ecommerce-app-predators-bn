import models from './../database/models/index.js';


const Coupon=models.DiscountCoupon;
const applyCoupon= async(req,res)=>{
const { code } = req.body;
  const coupons = await Coupon.findAll({ where: { code } });

  if (coupons.length === 0) {
    res.status(404).send({
      message: "Your coupon is invalid",
    });
  } else {

    res.status(200).json({
      message: "This coupon is valid",
      coupon: coupons[0],
    });
  }}

export {applyCoupon}