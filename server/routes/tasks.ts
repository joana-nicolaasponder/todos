import express from 'express'

import {
  addTask,
  checkOffTask,
  deleteTask,
  getAllTasks,
} from '../db/dbFunctions'

const router = express.Router()

//DELETE
router.delete('/', async (req, res) => {
  try {
    const task = req.body.id
    const tasks = await deleteTask(task)
    res.json(tasks)
  } catch (error) {
    console.log('Error in DELETE route:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

//PATCH /api/v1/todos
router.patch('/', async (req, res) => {
  try {
    const task = req.body.id
    const tasks = await checkOffTask(task)
    res.json(tasks)
  } catch (error) {
    console.log('Error in PATCH route:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

//POST /api/v1/todos
router.post('/', async (req, res) => {
  try {
    const { newTask } = req.body
    const addedTask = await addTask(newTask)
    res.json(addedTask)
  } catch (error) {
    console.error('Error in POST route:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

//GET /api/v1/todos
router.get('/', async (req, res) => {
  try {
    const tasks = await getAllTasks()
    res.json(tasks)
  } catch (error) {
    console.error('Error in GET route:', error)
    res.status(500).json({ error: 'Internal Server Error' })
  }
})

export default router
