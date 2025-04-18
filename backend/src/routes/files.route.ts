import Router from 'express'
import { createFile, deleteFiles, getFile, showFiles } from '../controllers/files.controller.js'

const router = Router()

router.route('/create').post(createFile)
router.route('/delete').post(deleteFiles)
router.route('/show/:id').get(getFile)

export default router