import { ChangeEvent } from 'react'
import { checkOffTask, deleteTask, getTaskList } from '../apis/apiClient'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

function ViewTodos() {
  const queryClient = useQueryClient()

  const checkedTask = useMutation(checkOffTask, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  const deleteTodo = useMutation(deleteTask, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  const {
    data: todos,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: () => getTaskList(),
  })

  if (error) {
    return <p>There was an error fetching the tasks</p>
  }

  if (!todos || isLoading) {
    return <p>Loading...</p>
  }

  function handleCheckOffTask(id: number) {
    checkedTask.mutate(id)
  }

  function handleClick(id: number) {
    deleteTodo.mutate(id)
  }

  return (
    <>
      <section className="main">
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              <div className="view">
                <input
                  onChange={() => handleCheckOffTask(todo.id)}
                  className="toggle"
                  type="checkbox"
                  checked={todo.completed}
                />
                <label>{todo.taskDetails}</label>
                <button
                  className="destroy"
                  onClick={() => handleClick(todo.id)}
                ></button>
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
