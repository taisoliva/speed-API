import httpStatus from "http-status"
import userServices from "../services/user/index.js"

export async function login(req,res){

    const {email, password} = req.body

    try {
        const result = await userServices.login(email, password)
        return res.status(httpStatus.OK).send(result)
    } catch (error) {
        if(error.name === 'InvalidEmailError') {
            return res.status(httpStatus.NOT_FOUND).send(error.message)
        } else {
            return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({message: `Algo Inesperado Aconteceu`})
        }
    }
}

export async function register(req, res){

    const {name, phone, leaderRg, email, password} = req.body
    try {
        const result = await userServices.register(name, phone, leaderRg, email, password)
        return res.status(httpStatus.OK).send(result)
    } catch (error) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
    }
}

export async function admins(req, res){
    
    const {email, password} = req.body

    try {
        await userServices.admins(email,password)
        return res.sendStatus(httpStatus.CREATED)
    } catch (error) {
        return  res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
    }
}

export async function professor(req, res){
    
    const {email, password} = req.body

    try {
        await userServices.professor(email,password)
        return res.sendStatus(httpStatus.CREATED)
    } catch (error) {
        return  res.status(httpStatus.INTERNAL_SERVER_ERROR).send(error)
    }
}