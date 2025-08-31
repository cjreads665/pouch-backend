import {Router} from 'express'
import { addBookmark, getAllBookmarks, deleteBookmark,modifyBookmark } from '../controllers/bookmarkController.js'
import { validateUrl } from '../middlewares/validateUrl.js'

const router = Router() 

router.post('/',validateUrl, addBookmark)
router.put('/:id',validateUrl, modifyBookmark)
router.get('/', getAllBookmarks)
router.delete('/:id', deleteBookmark)

export default router