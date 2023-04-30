import db from "../database/models/index.js"; 

//create new cart
export default class Cart {

    static cartItem = async (cartData) => {
        try {  
            const Carts = await db.Cart_items.findOne({
                where:{
                    User_id:cartData.User_id,
                    product_id:cartData.product_id
                }
            });
             
            if (!Carts) { 
                 cartData.amount = cartData.quantity *cartData.amount;
                let CartsItem = await db.Cart_items.create(cartData);
                return CartsItem;
            }else{ 
                Carts.quantity=Carts.quantity+cartData.quantity;
                Carts.amount = Carts.quantity *cartData.amount
                let CartsItem = await Carts.save();
                return CartsItem;
            }
           
        } catch (error) {
           return false
        }
    };


    static getCartItems = async (user) => {
        try {
 
            const Carts = await db.Cart_items.findAll({
                where:{
                    User_id:user
                },
                include:'product'
            });
           
            if (!Carts) {
               return null;
            } 
            let sum = 0;
            {total:Carts.forEach(cartPrice => { 
                return sum = sum +cartPrice.amount;
            })};    
            Carts.push({total:sum});
        return Carts 
        } catch (error) { 
           return false
        }
    };

    static clearCart = async (cartData) => {
      
        try {  
            const Carts = await db.Cart_items.findOne({
                where:{
                    User_id:cartData.User_id,
                    product_id:cartData.product_id
                }
            });
             
            if (!Carts) {  
                return false;
            } 
            const ClearCart= Carts.destroy();
           
        } catch (error) {
           return error
        }
    };


    

}