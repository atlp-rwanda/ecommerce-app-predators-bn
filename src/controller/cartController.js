import jsend from "jsend";
import Cart from "../services/cartItem.services";
import productDetail from "../services/product.services";
import Jwt from "../utils/jwt"; 
export default class cartController {
    static addCartItem = async (req, res) => {
        try { 
                                               
            let product_id= req.body.product_id;
            let quantity=req.body.quantity;
            
            const authHeader=req.headers["authorization"];
            if(!authHeader) 
                return res
                    .status(401)
                    .json(jsend.fail({ message: "You need to be logged" }));
                const token = await authHeader.split(" ")[1];
                const {id,name,email,roleId}= await Jwt.verifyToken(token); 
                
                const product = await productDetail.getProductById(product_id); 
                if (!product) { 
                    return res.status(404).send(jsend.fail({
                            code: 404,
                            message:  "Product not found",
                            data: false
                        })); 
                    }
                const cartData = {product_id:product.id,quantity:quantity,User_id:id}
                
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
                        message:  "unexpected error",
                        data: error
                    })); 
        }

        
    }
}