import request from 'supertest'
import { expect, it, vi, describe } from 'vitest'
import server from '../server'
import { addTask, getAllTasks } from '../db/dbFunctions'

vi.mock('../../db/dbFunctions')

describe('/', () => {
  it('should return all tasks', async () => {
    vi.mocked(getAllTasks).mockImplementation(async () => {
      return [
        {
          id: 1,
          taskDetails: 'Cook dinner',
          priority: 'Low',
          completed: false,
        },
      ]
    })

    const res = await request(server).get('/')
    expect(res.statusCode).toBe(200)
  })
})
