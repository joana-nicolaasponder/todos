import connection from './connection'
import * as db from './dbFunctions'

import { describe, it, expect, beforeAll, beforeEach } from 'vitest'

beforeAll(() => {
  return connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

describe('getAllTasks', () => {
  it('gets all tasks', async () => {
    const tasks = await db.getAllTasks()
    expect(tasks.length).toBe(3)
    expect(tasks[0].taskDetails).toBe('Cook dinner')
  })
})

describe('addTask', () => {
  it('adds a task', async () => {
    await db.addTask({
      taskDetails: 'Wash dog',
      completed: false,
    })
    const newTasks = await db.getAllTasks()
    expect(newTasks.length).toBe(4)
    expect(newTasks[3].taskDetails).toBe('Wash dog')
  })

  describe('checkOffTask', () => {
    it('checks off a task', async () => {
      await db.checkOffTask(1)
      const newTasks = await db.getAllTasks()
      expect(newTasks[1].completed).toBe(0)
    })
  })

  describe('deleteTask', () => {
    it('deletes a task', async () => {
      await db.deleteTask(1)
      const newTasks = await db.getAllTasks()
      expect(newTasks.length).toBe(2)
    })
  })
})
