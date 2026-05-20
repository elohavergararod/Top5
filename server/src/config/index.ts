import path from 'path'

export const config = {
  port: Number(process.env.PORT) || 3001,
  dataFile: path.join(__dirname, '../../data/lists.json'),
  clientUrl: process.env.CLIENT_URL ?? 'http://localhost:5173',
}