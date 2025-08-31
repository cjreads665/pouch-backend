import type {Response, Request, NextFunction} from 'express'
import { isUrlValid } from '../utils/helperMethods.js'

export async function validateUrl(req:Request, res:Response, next:NextFunction){
    const {url} = req.body
    if(url && !isUrlValid(url)){
        return res.status(400).json({message: 'Invalid URL format. Please provide a valid URL.', enteredUrl: url})
    }
}