import { Router } from 'express'
import { listsController } from '../controllers/lists.controller'

export const listsRouter = Router()

listsRouter.get('/',        listsController.getAll)
listsRouter.get('/:id',    listsController.getOne)
listsRouter.post('/',      listsController.create)
listsRouter.put('/:id',    listsController.update)
listsRouter.delete('/:id', listsController.remove)