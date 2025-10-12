import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../db/prisma.js'

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'
const SALT_ROUNDS = 10

export async function registerUser(email:string, password:string) {
    //check if user exists
     const existing = await prisma.user.findUnique({ where: { email:email } }); //was complianing earlier since email has to be unique before using this findunique
}