import jsend from "jsend";
import Cart from "../services/cartItem.services.js";
import productDetail from "../services/product.services.js";
import Jwt from "../utils/jwt.js"; 
export default class cartController {
    static addCartItem = async (req, res) => {
        try {
                                               
            let product_id= req.body.product_id;
            let quantity=req.body.quantity;
            let id = req.user.dataValues.id;
                
            const product = await productDetail.getProductById(product_id); 
            if (!product) { 
                return res.status(404).send(jsend.fail({
                        code: 404,
                        message:  "Product not found",
                        data: false
                    })); 
                }
            const cartData = {product_id,quantity,User_id:id}
            
            const cartItem = await Cart.cartItem(cartData);
            if (!cartItem) {
                return res.status(500)
                    .send(jsend.fail({
                        code: 500,
                        message:  "unexpected error",
                        data: error
                    }));   
            }
            return res.status(200).send(jsend.success({
                code: 200,
                message:  "Product added ",
                data: cartItem
            })); 
                

        } catch (error) {
            return res.status(500)
                    .send(jsend.fail({
                        code: 500,
                        message:  "unexpected errors",
                        data: error
                    })); 
        }

        
    }
}