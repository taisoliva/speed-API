import httpStatus from "http-status";
import { unauthorizedError } from "../errors/unauthorized.error.js";
import userRepository from "../repositories/user/index.js";

export async function authValidation (req,res, next) {

    const authHeader = req.header('Authorization');

    if(!authHeader) return generateUnauthorizedResponse(res)

    const token = authHeader.split(' ')[1];
    if(!token) return generateUnauthorizedResponse(res)

    const session = await userRepository.getSession(token)
    if(!session) return generateUnauthorizedResponse(res)

    res.locals.session = session

    return next()

}

function generateUnauthorizedResponse(res) {
    res.status(httpStatus.UNAUTHORIZED).send(unauthorizedError());
  }