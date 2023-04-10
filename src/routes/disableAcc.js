import { Router } from "express";
import disableAcc from "../controller/disableFunction.js"
<<<<<<< HEAD

const router = Router();

router.get ("/disableUser/:id", disableAcc.disableUser);
router.get ("/users", disableAcc.getUserProfile)
=======
import disableAcc from "../controller/disable.acount.controller.js"

const router = Router();

router.post("/disableUser", disableAcc.disableUser);
router.get ("/users", disableAcc.getUserProfile)
router.post ("/disableEnableUsers", disableAcc.disableEnableUsers)
>>>>>>> 0667552e2152458c394c990fd9043f382991c121


export default router