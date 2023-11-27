import { describe, it, expect, beforeAll, beforeEach } from 'vitest'
import request from 'supertest'
import connection from '../db/connection'
import server from '../server'


beforeAll(async () => {
  await connection.migrate.latest()
})

beforeEach(async () => {
  await connection.seed.run()
})

describe('adding todo', () => {
  it('adds a todo', async () => {
    const before = await request(server).get('/api/v1/todos')
    expect(before.body).toHaveLength(3)
    const response = await request(server)
      .post('/api/v1/todos')
      .send({ newTask: { taskDetails: 'Wash dog' } })

    const after = await request(server).get('/api/v1/todos')
    expect(after.body).toHaveLength(4)

    expect(after.body.at(-1)).toMatchInlineSnapshot(`
      {
        "completed": 0,
        "id": 4,
        "priority": "Low",
        "taskDetails": "Wash dog",
      }
    `)
    expect(response.body).toEqual([
      {
        completed: 0,
        id: 4,
        priority: 'Low',
        taskDetails: 'Wash dog',
      },
    ])
  })
})
