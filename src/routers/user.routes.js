import { Router } from "express";
import validateSchema from "../middlewares/validateSchema-middleware.js";
import { adminSchema, loginSchema, registerSchema } from "../schemas/user.schema.js";
import { admins, login, register } from "../controllers/users.controller.js";

const userRouter = Router()

userRouter.post('/login', validateSchema(loginSchema), login)
userRouter.post('/register', validateSchema(registerSchema), register )
userRouter.post('/admin', validateSchema(adminSchema), admins)

export default userRouter