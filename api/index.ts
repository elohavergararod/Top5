import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

const app = express()

app.use(cors())
app.use(express.json())

const DATA_FILE = path.join('/tmp', 'lists.json')

function readData(): any[] {
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]', 'utf-8')
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'))
}

function writeData(lists: any[]): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(lists, null, 2), 'utf-8')
}

app.get('/api/v1/lists', (_req, res) => {
  res.json({ data: readData() })
})

app.get('/api/v1/lists/:id', (req, res) => {
  const list = readData().find((l: any) => l.id === req.params.id)
  if (!list) { res.status(404).json({ error: 'List not found' }); return }
  res.json({ data: list })
})

app.post('/api/v1/lists', (req, res) => {
  const { title, category, items } = req.body
  if (!title || !category || !items || items.length !== 5) {
    res.status(400).json({ error: 'title, category and exactly 5 items are required' })
    return
  }
  const now = new Date().toISOString()
  const newList = {
    id: uuidv4(),
    title: title.trim(),
    category,
    items: items.map((item: any, i: number) => ({
      id: uuidv4(),
      rank: i + 1,
      name: item.name.trim(),
      description: item.description?.trim(),
    })),
    createdAt: now,
    updatedAt: now,
  }
  const lists = readData()
  lists.unshift(newList)
  writeData(lists)
  res.status(201).json({ data: newList, message: 'List created' })
})

app.put('/api/v1/lists/:id', (req, res) => {
  const { title, category, items } = req.body
  if (!title || !category || !items || items.length !== 5) {
    res.status(400).json({ error: 'title, category and exactly 5 items are required' })
    return
  }
  const lists = readData()
  const index = lists.findIndex((l: any) => l.id === req.params.id)
  if (index === -1) { res.status(404).json({ error: 'List not found' }); return }
  const updated = {
    ...lists[index],
    title: title.trim(),
    category,
    items: items.map((item: any, i: number) => ({
      id: lists[index].items[i]?.id ?? uuidv4(),
      rank: i + 1,
      name: item.name.trim(),
      description: item.description?.trim(),
    })),
    updatedAt: new Date().toISOString(),
  }
  lists[index] = updated
  writeData(lists)
  res.json({ data: updated, message: 'List updated' })
})

app.delete('/api/v1/lists/:id', (req, res) => {
  const lists = readData()
  const filtered = lists.filter((l: any) => l.id !== req.params.id)
  if (filtered.length === lists.length) { res.status(404).json({ error: 'List not found' }); return }
  writeData(filtered)
  res.json({ data: null, message: 'List deleted' })
})

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

export default app