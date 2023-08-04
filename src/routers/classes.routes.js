import { Router } from "express";
import { authValidation } from "../middlewares/authValidation.middlewares.js";
import { student } from "../controllers/student.controller.js";

const classesRouter = Router()

classesRouter.get('/speed', authValidation, student)

export default classesRouter