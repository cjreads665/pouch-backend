import {Router} from 'express'
import { getArticle } from '../controllers/articleController.js'

const router = Router()

router.get('/article',getArticle)

export default router