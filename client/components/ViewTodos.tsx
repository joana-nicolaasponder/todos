import { useEffect, useState } from 'react'
import { Tasks } from '../../models/Tasks'
import { getTaskList } from '../apis/apiClient'
import { getAllTasks } from '../../server/db/dbFunctions'
import { useQuery } from '@tanstack/react-query'

// const initialTasks: Tasks[] = []
function ViewTodos() {
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
