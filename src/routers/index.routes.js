import { Router } from "express";
import  userRouter  from "./user.routes.js";
import classesRouter from "./classes.routes.js";

const router = Router()

router.use(userRouter)
router.use(classesRouter)

export default router