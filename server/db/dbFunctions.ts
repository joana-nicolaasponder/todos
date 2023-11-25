import { TaskData } from '../../models/Tasks'

import db from './connection'

export async function getAllTasks() {
  return db('tasks').select('*')
}

export function addTask(task: TaskData) {
  
  return db('tasks').insert(task).returning('*')
}

export function checkOffTask(id: number) {
  return db('tasks').where('id', id).update({ completed: true })
}

export function deleteTask(id: number) {
  return db('tasks').where('id', id).delete().returning('*')
}
