import {Router} from 'express'
import { addBookmark, getAllBookmarks, deleteBookmark,modifyBookmark } from '../controllers/bookmarkController.js'

const router = Router() 

router.post('/', addBookmark)
router.put('/:id', modifyBookmark)
router.get('/',getAllBookmarks)
router.delete('/:id', deleteBookmark)

export default router