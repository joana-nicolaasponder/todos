import express from 'express'

import { getAllTasks } from '../db/dbFunctions'

const router = express.Router()

//GET /api/v1/tasks
router.get('/', async (req, res) => {
  const tasks = await getAllTasks()
  console.log('this is from the routes', tasks)
  res.json(tasks)
})

export default router
