import { useState } from 'react'
import { addTask } from '../apis/apiClient'

import { useMutation, useQueryClient } from '@tanstack/react-query'

// eslint-disable-next-line no-unused-vars
function AddTodo() {
  const [todoText, setTodoText] = useState('')

  const queryClient = useQueryClient()

  const editMutation = useMutation(addTask, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })

  const handleInputChange = (event) => {
    setTodoText(event.target.value)
  }

  const handleAddTodo = async (event) => {
    event.preventDefault()
    console.log('Adding todo:', todoText)
    editMutation.mutate({ taskDetails: todoText })

    setTodoText('')
  }

  return (
    <>
      <form onSubmit={handleAddTodo}>
        <input
          className="new-todo"
          aria-label="new-task-details"
          placeholder="What needs to be done?"
          autoFocus={true}
          // onSubmit={handleSubmit}
          value={todoText}
          onChange={handleInputChange}
        />
      </form>
    </>
  )
}

export default AddTodo
