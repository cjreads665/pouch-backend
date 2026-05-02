import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import prisma from '../db/prisma.js'

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'
const SALT_ROUNDS = 10

export async function registerUser(email:string, password:string) {
    //check if user exists
     const existing = await prisma.user.findUnique({ where: { email:email } }); //was complianing earlier since email has to be unique before using this findunique
    if(existing) throw new Error('User already exists with this email')

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS) // what are salt rounds?
    
    //create user logic
    const user = await prisma.user.create({
        data: {email, password: hashedPassword},
    })

    //generate JWT token - why we need to sign and how does it work?
    const token = jwt.sign({userId: user.id}, JWT_SECRET, {expiresIn: '10d'})

    return {token, user}

    }


export async function loginUser(email:string, password:string) {
    const user = await prisma.user.findUnique({where: {email}})
    if (!user) throw new Error('No user found with this email')

    const isPasswordMatch = await bcrypt.compare(password, user.password)
    if(!isPasswordMatch) throw new Error('Invalid email or password')

    const token = jwt.sign({userId: user.id}, JWT_SECRET, {expiresIn: '10d'})
    return {token,user}
    
}

