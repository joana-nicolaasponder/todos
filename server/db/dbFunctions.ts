import knex from 'knex'
import config from '../db/knexfile'

const db = knex(config.development)

export function getAllTasks() {
  return db('tasks').select('*')
}
