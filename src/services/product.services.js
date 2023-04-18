import db from "../database/models/index.js";

//getProductById
export default class productDetail {
    static getProductById = async (id) => {
        try { 
             const Product = await db.Product.findOne({
                        where: {
                            id: id
                        },
                    });
            if (!Product) {
               return false
            }
        return Product; 
        } catch (error) {
           return false
        }
    };

}


