import jsend from "jsend";
import Cart from "../services/cartItem.services.js";
import productDetail from "../services/product.services.js";
import Jwt from "../utils/jwt.js"; 
export default class cartController {
    static addCartItem = async (req, res) => {
        try { 
                                               
            let product_id= req.body.product_id;
            let quantity=req.body.quantity; 
            const product = await productDetail.getProductById(product_id); 
                if (!product) { 
                    return res.status(404).send(jsend.fail({
                            code: 404,
                            message:  "Product not found",
                            data: false
                        })); 
                    }
                const cartData = {amount:product.price,product_id:product.id,quantity:quantity,User_id:req.user.id}
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

    static getCartItems = async (req,res)=>{
        try {  
            const cartItems = await Cart.getCartItems(req.user.id);
            if(!cartItems) {
                 return res.status(404)
                    .send(jsend.fail({
                        code: 404,
                        message:  "Cart is empty",
                        data: "Cart is empty"
                    }));
            }
             return res.status(200)
                    .send(jsend.fail({
                        code: 200,
                        message:  "Cart items",
                        data: cartItems
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

      static updateCartItem = async (req, res) => {
        try { 
                                               
            let product_id= req.params.id;;
            let quantity=req.body.quantity;
              
                const product = await productDetail.getProductById(product_id); 
               
                if (!product) { 
                    return res.status(404).send(jsend.fail({
                            code: 404,
                            message:  "item not found",
                            data: false
                        })); 
                    }
                const cartData = {amount:product.price,product_id:product.id,quantity:quantity,User_id:req.user.id}
                const cartItem = await Cart.updatecartItem(cartData); 

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
                    message:  "item updated ",
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