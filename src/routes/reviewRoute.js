import {Router} from 'express';
import { addReview, getReviews, deleteReview } from "../controller/reviewController.js";
import { isBuyer, isSeller } from "../middleware/roles.js";

const router = Router();
//pass product id as params
router.post("/review/:id", isBuyer, addReview);
router.get("/review", isBuyer, getReviews);
router.delete("/review/:id", isSeller, deleteReview);


export default router;