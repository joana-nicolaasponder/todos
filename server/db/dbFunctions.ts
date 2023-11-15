import knex from 'knex'
import config from '../db/knexfile'
import { TaskData } from '../../models/Tasks'

const db = knex(config.development)

export function getAllTasks() {
  return db('tasks').select('*')
}

export function addTask(task: TaskData) {
  return db('tasks').insert(task).returning('*')
}

export function checkOffTask(id: number) {
  return db('tasks').where('id', id).update({ completed: true })
}
