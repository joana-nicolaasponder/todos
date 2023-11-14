import { useEffect, useState } from 'react'
import { Tasks } from '../../models/Tasks'
import { getTaskList } from '../apis/apiClient'

const initialTasks: Tasks[] = []
function ViewTodos() {
  const [todos, setTodos] = useState(initialTasks as Tasks[])

  useEffect(() => {
    try {
      // eslint-disable-next-line no-inner-declarations
      async function fetchTodos() {
        const initialTasks = await getTaskList()
        console.log('this is from the VIEW Component', initialTasks)
        setTodos(initialTasks)
      }
      fetchTodos()
    } catch (error) {
      console.log(error)
    }
  }, [])

  return (
    <>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.taskDetails}, Priority: {todo.priority}
          </li>
        ))}
      </ul>
    </>
  )
}

export default ViewTodos
