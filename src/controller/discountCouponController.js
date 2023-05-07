import db from "../database/models/index.js";
import { isSeller } from "../middleware/roles.js";

export const createCoupon = async (req, res) => {
    try {
      const { code, discountPercentage, expiresAt, productId } = req.body;
      // Validate request body
      if (!code || !discountPercentage || !expiresAt || !productId) {
        return res.status(400).json({
          status: "fail",
          data: { message: 'Missing required fields' }
        });
      }
  
      // Check if the coupon code already exists
      const existingCoupon = await db.DiscountCoupon.findOne({
        where: { code: code },
      });
      if (existingCoupon) {
        return res.status(400).json({
          status: "fail",
          data: { message: 'Coupon code already exists' }
        });
      }
  
      // Create the new coupon
      const newCoupon = await db.DiscountCoupon.create({
        code,
        discountPercentage,
        expiresAt,
        productId: req.body.productId
      });
  
      return res.status(200).json({
        status: "success",
        data: newCoupon
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        status: "error",
        message: 'Server error'
      });
    }
  };
  

export const getCoupons = async (req, res) => {
  try {
    const coupons = await db.DiscountCoupon.findAll({
        include: [],
    });
    if (!coupons) {
        return res.status(404).json({
            status: "fail",
            code: 404,
            data: {coupons},
            message: "No Coupons Found"
        });
    }
    return res.status(200).json({
        status: "success",
        code: 200,
        data: {coupons},
        message: "These are available coupons",
    })
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: 'Server error' });
  }
};
export const getCouponById = async(req, res) => {
    try {
        const {id} = req.params;

        const coupon = await db.DiscountCoupon.findOne({where: {id: id}});
        if(!coupon) {
            return res.staus(404).json({message: "Coupon not found"});
        }
        return res.status(200).json({
            status: "success",
            code: 200,
            data: {coupon},
            message: "Coupon is available",
        })

        
    } catch (error) {
        
    }
};
export const deleteCouponById = async (req, res) => {
    try {
        const {reason} = req.body;
        const couponId = parseInt(req.params.id);
        if (
            isNaN(couponId) ||
            typeof reason !== "string" ||
            reason.trim() === ""
          ) {
            return res.status(400).json({
              status: "fail",
              data: { message: "Invalid input data" },
            });
          }
        const availableCoupon = await db.Product.findOne({
            where: { id: productId, vendor_id: req.user.id },
          });
        if(!availableCoupon) {
            return res.status(401).json({
                status: "fail",
                data: { message: "Can not find such Coupon in your collection" },
              });
        }
        else {
            // If the product is found, delete it and return a JSend success response with a message indicating the reason for deletion
            await availableCoupon.destroy();
            return res.status(200).json({
              status: "success",
              data: {
                message: `This Coupon has been removed because of the following reason: ${reason}.`,
              },
            });
          }
        
    } catch (error) {
        
    }
}

export default { createCoupon, getCoupons, getCouponById, deleteCouponById };
