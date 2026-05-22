import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import { listsRouter } from './routes/lists.routes'
import { swaggerSpec } from './config/swagger'

const app = express()
const PORT = process.env.PORT ?? 3001

app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.use('/api/v1/lists', listsRouter)
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
  console.log(`Swagger docs at http://localhost:${PORT}/api/docs`)
})