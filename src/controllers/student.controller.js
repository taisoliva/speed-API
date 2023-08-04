import httpStatus from "http-status"
import studentServices from "../services/student/index.js"

export async function student(req, res){

    const userId = res.locals.session.userId

    try {
        const result = await studentServices.student(userId)
        return res.status(httpStatus.OK).send(result)
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
    }

}