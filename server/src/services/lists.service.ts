import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

export type Category =
  | 'film' | 'music' | 'food' | 'travel' | 'sport' | 'books' | 'games' | 'other'

export interface ListItem {
  id: string
  rank: number
  name: string
  description?: string
}

export interface TopList {
  id: string
  title: string
  category: Category
  items: ListItem[]
  createdAt: string
  updatedAt: string
}

export interface CreateListDTO {
  title: string
  category: Category
  items: { name: string; description?: string }[]
}

const DATA_DIR  = path.join(__dirname, '../../data')
const DATA_FILE = path.join(DATA_DIR, 'lists.json')

function readData(): TopList[] {
  if (!fs.existsSync(DATA_DIR))  fs.mkdirSync(DATA_DIR, { recursive: true })
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, '[]', 'utf-8')
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8')) as TopList[]
}

function writeData(lists: TopList[]): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(lists, null, 2), 'utf-8')
}

function validateItems(items: CreateListDTO['items']): void {
  if (!Array.isArray(items) || items.length !== 5) {
    throw new Error('A list must have exactly 5 items.')
  }
  items.forEach((item, i) => {
    if (!item.name?.trim()) throw new Error(`Item ${i + 1} must have a name.`)
  })
}

export const listsService = {
  findAll(): TopList[] {
    return readData()
  },

  findById(id: string): TopList | undefined {
    return readData().find(l => l.id === id)
  },

  create(dto: CreateListDTO): TopList {
    validateItems(dto.items)
    const now = new Date().toISOString()
    const newList: TopList = {
      id: uuidv4(),
      title: dto.title.trim(),
      category: dto.category,
      items: dto.items.map((item, i) => ({
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
    return newList
  },

  update(id: string, dto: CreateListDTO): TopList | undefined {
    validateItems(dto.items)
    const lists = readData()
    const index = lists.findIndex(l => l.id === id)
    if (index === -1) return undefined
    const updated: TopList = {
      ...lists[index],
      title: dto.title.trim(),
      category: dto.category,
      items: dto.items.map((item, i) => ({
        id: lists[index].items[i]?.id ?? uuidv4(),
        rank: i + 1,
        name: item.name.trim(),
        description: item.description?.trim(),
      })),
      updatedAt: new Date().toISOString(),
    }
    lists[index] = updated
    writeData(lists)
    return updated
  },

  delete(id: string): boolean {
    const lists = readData()
    const filtered = lists.filter(l => l.id !== id)
    if (filtered.length === lists.length) return false
    writeData(filtered)
    return true
  },
}