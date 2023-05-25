import db from '../database/models/index.js';
import jsend from 'jsend';


export const addReview = async(req, res) => {
    // pass the product id as a parameter

    try {
        const product_id=req.params.id;
        const product = await db.Product.findOne({
            where: { id: product_id },
        });
        if (!product) {
            return res.status(404).json(
                jsend.fail({
                    message: 'sorry, product not found😥',
                }),
            );
        }
        // check if the buyer has bought the product
        const order = await db.Order.findOne({
            where: { user_id: req.user.id },
        });

        if (!order) {
            return res.status(404).json(
                jsend.fail({
                    message: 'sorry, you are not allowed to provide a review😥',
                }),
            );
        }
       
        // check if the order is completed
        if (order.status !== 'completed') {
            return res.status(401).json(
                jsend.fail({
                    message: 'you have to complete your Order before you provide a review😥',
                }),
            );
        }

        // receive body & Validate user input
        const { rating, feedback } = req.body;
        if (!rating) {
            return res.status(400).json(jsend.fail({ message: 'Invalid Input😥' }));
        }
        // save review
        const review = await db.Review.create({
            buyer_id: req.user.id,
            product_id:product_id,
            rating,            
            feedback
        });
        // send response
        return res.status(200).json(
            jsend.success({
                message: 'Thank you for your Review.',
            }),
        );
    } catch (error) {
        // Handle database errors
        console.error(error);
        return res.status(500).json(jsend.error('Failed to save review'));
    }// end of addReview
}

// //get all reviews
export const getReviews = async (req, res) => {
    try {
        
        const review = await db.Review.findAll({   
           
        });
        const totalReview = review.length;
        if (!review) {
            return res.status(404).json({
                status: "fail",
                code: 404,
                data: { review },
                message: "No review found",
            });
        }
        return res.status(200).json({
            status: "success",
            code: 200,
            message: `total review: ${totalReview}`,
            data: { review },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "server error",
            code: 500,
            data: { message: "Server error!!" },
        });
    }
}

// // delete review fucntion
export const deleteReview = async (req, res) => {
    try {
        // only seller can delete review
        if (req.user.roleId !== 1) {
            return res.status(401).json(
                jsend.fail({
                    message: 'you are not allowed to delete this review😥',
                }),
            );
        }
            
        const review = await db.Review.findOne({
            where: { id: req.params.id },
        });
        if (!review) {
            return res.status(404).json({
                status: "fail",
                code: 404,
                data: { review },
                message: "No review found",
            });
        }
        await db.Review.destroy({
            where: { id: req.params.id },
        });
        return res.status(200).json({
            status: "success",
            code: 200,
            message: "review deleted successfully",
            data: { review },
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: "server error",
            code: 500,
            data: { message: "Server error!!" },
        });
    }
}

export default { addReview, getReviews, deleteReview };

