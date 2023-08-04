import joi from "joi"
import { isValidEmail, isValidMobilePhone } from "@brazilian-utils/brazilian-utils";

const mobilePhoneValidationSchema = joi.string().min(14).max(15).custom(joiMobilePhoneValidation).required();
const emailValidationSchema = joi.string().custom(joiEmailValidation).required()

export const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required().min(6)
})

export const registerSchema = joi.object({
    name: joi.string().required(),
    phone: mobilePhoneValidationSchema,
    leaderRg: joi.string(),
    email: emailValidationSchema,
    password: joi.string().required().min(6)
})

export const adminSchema = joi.object({
  email: emailValidationSchema,
  password:joi.string().required().min(6)
})

function joiMobilePhoneValidation(value, helpers) {
  if (!value) return value;

  if (!isValidMobilePhone(value)) {
    return helpers.error('any.invalid');
  }

  return value;
}

function joiEmailValidation(value, helpers) {
  if (!value) return value;

  if (!isValidEmail(value)) {
    return helpers.error('any.invalid');
  }

  return value;
}