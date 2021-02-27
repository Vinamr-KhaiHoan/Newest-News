import express from 'express'
import { execute } from '../controller/crawl-controller'

const router = express.Router()

router.get('/craw', execute)

export { router }