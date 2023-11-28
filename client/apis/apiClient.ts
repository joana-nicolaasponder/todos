import request from 'superagent'
import { Tasks, Task } from '../../models/Tasks'

const url = '/api/v1/todos'
export async function getTaskList(): Promise<Tasks[]> {
  const response = await request.get(url)
  // console.log('this is from the apiclient', response)
  return response.body
}

export async function addTask(newTask: Task): Promise<Task[]> {
  const response = await request.post(url).send({ newTask })
  // console.log('this is the add request from the apiclient:', response.body)
  return response.body
}

export async function checkOffTask(id: number): Promise<Tasks[]> {
  const response = await request.patch(url).send({ id: id })
  return response.body
}

export async function deleteTask(id: number): Promise<Tasks[]> {
  const response = await request.delete(url).send({ id: id })
  return response.body
}
