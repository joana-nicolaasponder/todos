import request from 'superagent'
import { Tasks } from '../../models/Tasks'

const url = '/api/v1/todos'
export async function getTaskList(): Promise<Tasks[]> {
  const response = await request.get(url)
  console.log('this is from the apiclient', response)
  return response.body
}
