import type {Request, Response} from 'express'
import * as bookmarkService from '../services/bookmarkService.js'
import { isUrlValid } from '../utils/helperMethods.js'

export async function addBookmark(req: Request, res:Response){
    try{
        const {title, url} = req.body
        if(!isUrlValid(url)) return res.status(400).json({message: 'Invalid URL format. Please provide a valid URL.', enteredUrl: url})
        const bookmark = await bookmarkService.createBookmark(title,url)
        res.status(201).json({
            message: 'Bookmark added successfully',
            addedBookmark: {...bookmark},
            updatedBookmarkList: await bookmarkService.getAllBookmarks('asc')
        })
    } catch(error){
        console.log('Error in addBookmark: ', error);
        res.status(500).json({message: 'Internal server error. Check addBookmark'})
    }
}

export async function modifyBookmark(req:Request, res:Response){
    if(!req.params.id) return res.status(400).json({message: 'Bookmark id is required'})

    try{
        const id = Number(req.params.id)
        const body = req.body
        if(!isUrlValid(body.url)) return res.status(400).json({message: 'Invalid URL format. Please provide a valid URL.', enteredUrl: body.url})
        const modifiedBookmark = await bookmarkService.modifyBookmark(id,body)
        res.status(200).json({
            message: 'Bookmark modified successfully',
            modifiedBookmark: {...modifiedBookmark},
            updatedBookmarkList: await bookmarkService.getAllBookmarks('desc')
        })
 
    } catch(error){
        console.log('Error in modifyBookmark: ', error);
        res.status(500).json({message: 'Internal server error. Check modifyBookmark'})
    }
}

export async function getAllBookmarks(req: Request, res:Response){
    try{
        const bookmarks = await bookmarkService.getAllBookmarks()
        res.status(200).json(bookmarks)
    } catch(error){
        console.log('Error in getAllBookmarks: ', error);
        res.status(500).json({message: 'Internal server error. Check getAllBookmarks'})
    }
}

export async function deleteBookmark(req:Request, res: Response){
    if(!req.params.id) return res.status(400).json({message: 'ID is required'})
    try{
        const id = Number(req.params.id)
        const deleted = await bookmarkService.deleteBookmark(id)
        res.status(200).json(deleted)
    } catch(error){
        console.log('Error occured in deleteBookmark: ',error);
        res.status(500).json({message: 'Internal server error. Check deleteBookmark'})
    }
}