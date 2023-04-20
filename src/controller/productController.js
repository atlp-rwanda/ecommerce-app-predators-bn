export const deleteSpecificProduct = async (req, res) =>{
    try {
        const {reason} = req.body
        const productId = req.params.id;
        const isAvailable = await db.Product.findOne({where:{id: productId}});
        
        if(isAvailable === null){
            // If the product doesn't exist, return a JSend fail response with an appropriate message
            return res.status(404).json({
                status: "fail",
                data: { message: "Please choose a product to delete!" }
            });
        }

        if(!isAvailable){
            // If the product is not found in the collection, return a JSend fail response with an appropriate message
            return res.status(401).json({
                status: "fail",
                data: { message: "Can not find such product in your collection" }
            });
        }
        else {
            // If the product is found, delete it and return a JSend success response with a message indicating the reason for deletion
            await isAvailable.destroy();
            return res.status(200).json({
                status: "success",
                data: { message: `This product has been removed because of the following reason: ${reason}.` }
            });
        }
    } catch (error) {
        // If there's any error, return a JSend error response with an appropriate message
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Oops, something went wrong on the server side. Please try again later."
        });
    }
}
export const deleteSpecificProduct = async (req, res) =>{
    try {
        const {reason} = req.body
        const productId = req.params.id;
        const isAvailable = await db.Product.findOne({where:{id: productId}});
        
        if(isAvailable === null){
            // If the product doesn't exist, return a JSend fail response with an appropriate message
            return res.status(404).json({
                status: "fail",
                data: { message: "Please choose a product to delete!" }
            });
        }

        if(!isAvailable){
            // If the product is not found in the collection, return a JSend fail response with an appropriate message
            return res.status(401).json({
                status: "fail",
                data: { message: "Can not find such product in your collection" }
            });
        }
        else {
            // If the product is found, delete it and return a JSend success response with a message indicating the reason for deletion
            await isAvailable.destroy();
            return res.status(200).json({
                status: "success",
                data: { message: `This product has been removed because of the following reason: ${reason}.` }
            });
        }
    } catch (error) {
        // If there's any error, return a JSend error response with an appropriate message
        console.error(error);
        return res.status(500).json({
            status: "error",
            message: "Oops, something went wrong on the server side. Please try again later."
        });
    }
}
