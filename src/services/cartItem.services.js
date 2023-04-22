import db from "../database/models/index.js"; 

//create new cart
export default class Cart {

    static cartItem = async (cartData,product_id) => {
         
        try { 
            const Carts = await db.Cart_items.findOne({
                where:{
                    User_id:cartData.user_id,
                    product_id:product_id
                }
            }); 
 
             let Data = {price:cartData.price*cartData.quantity,quantity:cartData.quantity,product_id:product_id,User_id:cartData.user_id}
               
            if (!Carts) {  
                let CartsItem = await db.Cart_items.create(Data);
                return CartsItem;
            }else{   
               Carts.quantity=Carts.quantity+Data.quantity;
                Carts.price= Carts.quantity*cartData.price;
                let CartsItem = await Carts.save();
                return true;
            }
           
        } catch (error) {  
           return false;
        }
    };

}