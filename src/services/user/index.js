import userRepository from "../../repositories/user/index.js"
import { invalidEmailPasswordError } from "../../errors/invalidEmailPassword.js"
import {v4 as uuid} from 'uuid';
import { duplicatedEmailError } from "./errors.js";
import bcrypt from "bcrypt"

async function login(email, password){
   
    const user = await userRepository.getUserEmail(email)
    if(!user.rows[0]) throw invalidEmailPasswordError()
   
    const passwordUser = bcrypt.compareSync(password, user.rows[0].password)
    if(!passwordUser) throw invalidEmailPasswordError()

    const token = uuid()
    const result = await userRepository.postSession(user.rows[0].id, token)
    console.log(result)
    return result
}

async function validateEmail(email){
    const userEmail = await userRepository.getUserEmail(email)
    if(userEmail.rows[0]){
        throw duplicatedEmailError()
    }
}

async function register(name, telefone, leaderRg, email, password){

    await validateEmail(email)
    const hasedPassword = await bcrypt.hash(password, 10)
    const result = await userRepository.registerUser(name, telefone, leaderRg, email, hasedPassword)
    return result
}

async function admins(email, password){
    const hasedPassword = await bcrypt.hash(password, 10)
    const result = await userRepository.registerAdmin(email, hasedPassword)
    return result
}

async function professor(email, password){
    const hasedPassword = await bcrypt.hash(password, 10)
    const result = await userRepository.registerProfessor(email, hasedPassword)
    return result
}

const userServices = {
    login,
    register,
    admins,
    professor
}

export default userServices


