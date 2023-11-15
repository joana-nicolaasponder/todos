import express from 'express'

import { addTask, checkOffTask, getAllTasks } from '../db/dbFunctions'

const router = express.Router()

//PATCH /api/v1/todos
router.patch('/', async (req, res) => {
  const task = req.body.id
  console.log('this is from the routes', task)
  const tasks = await checkOffTask(task)
  res.json(tasks)
})

//POST /api/v1/todos
router.post('/', async (req, res) => {
  const { newTask } = req.body
  const addedTask = await addTask(newTask)
  res.json(addedTask)
})

//GET /api/v1/todos
router.get('/', async (req, res) => {
  const tasks = await getAllTasks()
  console.log('this is from the routes', tasks)
  res.json(tasks)
})

export default router
