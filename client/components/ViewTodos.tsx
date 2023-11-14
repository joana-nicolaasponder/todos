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
      <section className="main">
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              <div className="view">
                <input
                  className="toggle"
                  type="checkbox"
                  checked={todo.completed}
                />
                <label>{todo.taskDetails}</label>
                <button className="destroy"></button>
              </div>
              <input className="edit" value={todo.taskDetails} />
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default ViewTodos
