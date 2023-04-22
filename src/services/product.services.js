import db from "../database/models/index.js";

//getProductById
export default class productDetail {
    static getProductById = async (id) => {
        try { 
             const product = await db.Product.findOne({
                        where: {
                            id: id
                        },
                    });
            if (!product) {  
               return false
            } 
        return product; 
        } catch (error) {
           return false
        }
    };

}


