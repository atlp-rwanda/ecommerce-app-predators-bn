import db from "../database/models/index.js"; 

//create new cart
export default class Cart {

    static cartItem = async (cartData) => {
        try {
 
            const Carts = await db.Cart_items.findOne({
                where:{
                    User_id:cartData.User_id,
                    product_id:cartData.product
                }
            });
            
            if (!Carts) {
                let CartsItem = await db.Cart_items.create(cartData);
                return CartsItem;
            }else{ 
                Carts.quantity=cartData.quantity;
                let CartsItem = await Carts.save().then((result) =>{ 
                    return result;
              
                });
            }
           
        } catch (error) {
           return false
        }
    };

}