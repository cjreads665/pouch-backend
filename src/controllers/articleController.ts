import type {Request,Response} from 'express'
import { fetchArticle } from '../services/articleService.js'

export async function getArticle(req:Request, res:Response){
    const url = req.query.url as string // Get the URL from query parameters. but why as string?
    if(!url){
        console.log('No URL found in request: ', req.query);
        return res.status(400).json({error: 'Missing URL from parameters in query'})
    }

    const article = await fetchArticle(url)

    if(!article){
        console.log('Failed to fetch or parse article from URL: ', url);
        console.log('Found article: ', article);
        return res.status(500).json({error: 'unable to fetch or partse article from URL. Please check URL'})
    }

    res.json(article)

}