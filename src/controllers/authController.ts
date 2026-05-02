import type { Request, Response } from "express";
import { registerUser, loginUser } from "../services/authService.js";

export async function register(req: Request, res: Response){
    try{
        const {email, password} = req.body;
        const result = await registerUser(email, password);
        res.status(201).json({
            message : "user created successfully",
            user: result.user,
            token: result.token
        })
    } catch(error: any){
        console.error('Error in register controller:', error);
        res.status(400).json({
            error: error.message
        })
    }
    }

export async function login(req:Request, res:Response){
    try{
        const {email,password} = req.body;
        const result = await loginUser(email,password);
        res.status(200).json({
            message: "Login successful",
            user: result.user,
            token: result.token
        })
    } catch(error: any){
        console.error('Error in login controller: ', error);
        res.status(401).json({
            error: error.message
        })
    }
}