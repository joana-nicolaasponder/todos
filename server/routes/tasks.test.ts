import request from 'supertest'
import { expect, it, vi, describe } from 'vitest'
import server from '../server'
import { addTask, getAllTasks } from '../db/dbFunctions'

vi.mock('../db/dbFunctions')

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
        {
          id: 2,
          taskDetails: 'Finish personal project',
          priority: 'High',
          completed: false,
        },
        {
          id: 3,
          taskDetails: 'Clean house',
          priority: 'Medium',
          completed: false,
        },
      ]
    })
    const res = await request(server).get('/api/v1/todos')
    expect(getAllTasks).toHaveBeenCalled()
    expect(res.statusCode).toBe(200)
  })

  it('calls addTask', async () => {
    vi.mocked(addTask).mockResolvedValue({
      id: 99,
      taskDetails: 'Wash dog',
      completed: false,
    })

    const response = await request(server)
      .post('/api/v1/todos')
      .send({ newTask: 'Wash dog' })
    expect(vi.mocked(addTask)).toHaveBeenCalledWith('Wash dog')
    expect(response.status).toBe(200)
    expect(response.body).toMatchInlineSnapshot(
      {
        completed: false,
        id: 99,
        taskDetails: 'Wash dog',
      },
      `
      {
        "completed": false,
        "id": 99,
        "taskDetails": "Wash dog",
      }
    `
    )
  })
})
