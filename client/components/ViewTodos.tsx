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
                  name={`checkbox-${todo.id}`}
                  id={`checkbox-${todo.id}`}
                  aria-label="task-details"
                  onChange={() => {
                    // Handle non-keyboard changes (e.g., mouse clicks)
                    handleCheckOffTask(todo.id)
                  }}
                  onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                    // Handle keyboard events (e.g., Space or Enter key)
                    if (event.key === ' ' || event.key === 'Enter') {
                      handleCheckOffTask(todo.id)
                    }
                  }}
                  className="toggle"
                  type="checkbox"
                  checked={todo.completed}
                  tabIndex={0}
                />
                <label htmlFor={`checkbox-${todo.id}`}>
                  {todo.taskDetails}
                </label>
                <button
                  id={`delete-label-${todo.id}`}
                  aria-labelledby={`delete-label-${todo.id}`}
                  aria-label="delete-task"
                  className="destroy"
                  onClick={() => handleClick(todo.id)}
                  onKeyDown={(
                    event: React.KeyboardEvent<HTMLButtonElement>
                  ) => {
                    // Handle keyboard events (e.g., Space or Enter key)
                    if (event.key === ' ' || event.key === 'Enter') {
                      handleClick(todo.id)
                    }
                  }}
                ></button>
              </div>
              <label id={`delete-label-${todo.id}`} style={{ display: 'none' }}>
                Delete task: {todo.taskDetails}
              </label>
              <input
                id="edit"
                aria-label="edit-task"
                className="edit"
                value={todo.taskDetails}
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}

export default ViewTodos
