import { Router } from 'express'
import { listsController } from '../controllers/lists.controller'

export const listsRouter = Router()

/**
 * @swagger
 * /lists:
 *   get:
 *     summary: Get all lists
 *     tags: [Lists]
 *     responses:
 *       200:
 *         description: Array of all lists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/TopList'
 */
listsRouter.get('/',        listsController.getAll)

/**
 * @swagger
 * /lists/{id}:
 *   get:
 *     summary: Get a list by ID
 *     tags: [Lists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/TopList'
 *       404:
 *         description: List not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
listsRouter.get('/:id',    listsController.getOne)

/**
 * @swagger
 * /lists:
 *   post:
 *     summary: Create a new list
 *     tags: [Lists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ListInput'
 *     responses:
 *       201:
 *         description: List created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/TopList'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
listsRouter.post('/',      listsController.create)

/**
 * @swagger
 * /lists/{id}:
 *   put:
 *     summary: Update an existing list
 *     tags: [Lists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ListInput'
 *     responses:
 *       200:
 *         description: List updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   $ref: '#/components/schemas/TopList'
 *       404:
 *         description: List not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
listsRouter.put('/:id',    listsController.update)

/**
 * @swagger
 * /lists/{id}:
 *   delete:
 *     summary: Delete a list
 *     tags: [Lists]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List deleted
 *       404:
 *         description: List not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
listsRouter.delete('/:id', listsController.remove)