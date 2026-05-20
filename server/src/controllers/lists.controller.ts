import type { Request, Response } from 'express'
import { listsService } from '../services/lists.service'

export const listsController = {

  getAll(_req: Request, res: Response): void {
    try {
      const lists = listsService.findAll()
      res.status(200).json({ data: lists })
    } catch {
      res.status(500).json({ error: 'Failed to fetch lists' })
    }
  },

  getOne(req: Request, res: Response): void {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
      if (!id) {
        res.status(400).json({ error: 'id is required' })
        return
      }
      const list = listsService.findById(id)
      if (!list) {
        res.status(404).json({ error: 'List not found' })
        return
      }
      res.status(200).json({ data: list })
    } catch {
      res.status(500).json({ error: 'Failed to fetch list' })
    }
  },

  create(req: Request, res: Response): void {
    try {
      const { title, category, items } = req.body
      if (!title || !category || !items) {
        res.status(400).json({ error: 'title, category and items are required' })
        return
      }
      const list = listsService.create({ title, category, items })
      res.status(201).json({ data: list, message: 'List created' })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to create list'
      res.status(400).json({ error: message })
    }
  },

  update(req: Request, res: Response): void {
    try {
      const { title, category, items } = req.body
      if (!title || !category || !items) {
        res.status(400).json({ error: 'title, category and items are required' })
        return
      }
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
      if (!id) {
        res.status(400).json({ error: 'id is required' })
        return
      }
      const updated = listsService.update(id, { title, category, items })
      if (!updated) {
        res.status(404).json({ error: 'List not found' })
        return
      }
      res.status(200).json({ data: updated, message: 'List updated' })
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to update list'
      res.status(400).json({ error: message })
    }
  },

  /** DELETE /api/v1/lists/:id */
  remove(req: Request, res: Response): void {
    try {
      const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
      if (!id) {
        res.status(400).json({ error: 'id is required' })
        return
      }
      const deleted = listsService.delete(id)
      if (!deleted) {
        res.status(404).json({ error: 'List not found' })
        return
      }
      res.status(200).json({ data: null, message: 'List deleted' })
    } catch {
      res.status(500).json({ error: 'Failed to delete list' })
    }
  },
}